"""Check documentary fidelity and every local media path independently of rendering."""
from pathlib import Path
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
generated = (ROOT / 'scripts/content.js').read_text(encoding='utf-8')
data = json.loads(generated.split('const PORTFOLIO = ', 1)[1].rstrip(';\n'))
pdf = (ROOT / 'content/PDF_ACTUALITZAT_40P.md').read_text(encoding='utf-8-sig')


def flat(text):
    return re.sub(r'\s+', ' ', text).strip()


# Reconstruct the continuous PDF text independently of the generator.
body = re.sub(r'\n---\s*\n## Pàgina \d+ del PDF\s*\n', ' ', pdf)
body = re.sub(r'!\[[^\]]*\]\([^\n]+\)', '', body)
body = flat(body)
for name in ['intro', 'reading', 'block']:
    assert flat(data[name]['reflection']) in body, f'Changed or missing {name} essay'
for key in ['conclusion', 'materials']:
    assert flat(data['museum'][key]) in body, f'Changed museum {key}'
for key in ['development', 'methodology', 'materials', 'reflection']:
    assert flat(data['garden'][key]) in body, f'Changed garden {key}'
assert flat(data['outing']) in body, 'Changed outing conclusions'
for key in ['development','materials']:
    assert flat(data['book'][key]) in body
assert 'Primera fase.' in data['dyes'] and 'Comparació dels resultats' in data['dyes']

art_md = (ROOT / 'content/OBRES_I_REFLEXIONS.md').read_text(encoding='utf-8-sig')
species_md = (ROOT / 'content/ESPECIES_MONTJUIC.md').read_text(encoding='utf-8-sig')
for art, original in zip(data['artworks'], re.split(r'\n## ', art_md)[1:], strict=True):
    expected = original.split('### Reflexió i proposta educativa', 1)[1].strip().removesuffix('---').strip()
    assert flat(art['reflection']) == flat(expected), art['title']
    assert f"- **Obra:** {art['title']}" in original
    assert f"- **Artista:** {art['artist']}" in original
    assert f"`{art['src']}`" in original
for sp, original in zip(data['species'], re.split(r'\n## ', species_md)[1:], strict=True):
    expected = original.split('**Text del document:**', 1)[1].split('\n---')[0]
    assert flat(sp['observation']) == flat(expected), sp['name']
    assert original.split('\n')[0].endswith(sp['name'])
assert len(data['bibliography']) == 2
assert len(data['artworks']) == len(data['species']) == 10
editorial = json.loads((ROOT / 'content/EDITORIAL.json').read_text(encoding='utf-8'))
assert 5 <= len(editorial['intro']) <= 7
assert len(editorial['reading']) in (4, 5)
assert len(editorial['block']) in (3, 4)
for group, items in editorial.items():
    source = data['outing'] if group == 'outing' else data[group]['reflection']
    for item in items:
        if item.get('quote'):
            assert flat(item['quote']) in flat(source), f"Non-literal quote: {item['title']}"
        assert len(item['summary'].split()) <= 90, item['title']
        if group == 'intro':
            assert len(item['summary'].split()) >= 50, item['title']
paths = set()
for m in data['media']:
    paths.add(m['output'])
    if 'poster' in m:
        paths.add(m['poster'])
paths.update(a['src'] for a in data['artworks'])
paths.add(data['collage']['web_asset'])
for path in paths:
    assert (ROOT / path).is_file(), f'Missing asset: {path}'

# The entire original CSS block is preserved, byte for byte after newline normalization.
original = subprocess.check_output(['git', 'show', '81ff424:index.html'], cwd=ROOT).decode('utf-8-sig')
current = (ROOT / 'index.html').read_text(encoding='utf-8-sig')
assert original.split('<style>')[1].split('</style>')[0].replace('\r\n','\n') == current.split('<style>')[1].split('</style>')[0]
print(f'Original prose and CSS preserved; {len(paths)} local assets exist; 10 artworks, 10 species, 2 references.')
