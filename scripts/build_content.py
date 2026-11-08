"""Generate browser data from the documentary Markdown; no third-party dependencies.

Only layout whitespace and PDF page breaks are normalized. Personal wording,
punctuation, botanical spellings and artwork attributions are preserved.
"""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]


def read(path):
    return (ROOT / path).read_text(encoding="utf-8-sig")


def between(text, start, end=None):
    tail = text.split(start, 1)[1]
    return tail.split(end, 1)[0].strip() if end else tail.strip()


def normalize(text):
    text = re.sub(r"(?m)^(?=[-●] )", "\n", text)
    return "\n\n".join(re.sub(r"\s+", " ", p).strip()
                         for p in re.split(r"\n\s*\n", text.strip()))


def pages(first, last):
    parts = []
    for number in range(first, last + 1):
        body = PAGE[number]
        # Remove extraction annotations, never the academic prose.
        body = body.split("### Imatges extretes d’aquesta pàgina")[0].strip()
        if parts and not re.search(r"[.!?:…]$", parts[-1]) and not body.startswith("- "):
            parts[-1] += "\n" + body
        else:
            parts.append(body)
    return "\n\n".join(parts)


raw = read("content/PDF_ACTUALITZAT_40P.md")
PAGE = {int(n): re.sub(r"!\[[^\]]*\]\([^\n]+\)", "", body).strip().removesuffix("---").strip()
        for n, body in re.findall(r"## Pàgina (\d+) del PDF\n(.*?)(?=\n## Pàgina |\Z)", raw, re.S)}
assert len(PAGE) == 40
academic = "\n".join(PAGE.values())
academic = re.sub(r"(?m)^-\s*\n", "- ", academic)
academic = normalize(academic)
intro = academic.split('BLOC I. ART I EDUCACIÓ')[0]
reading = between(academic,'BLOC I. ART I EDUCACIÓ','BLOC II.')
block = between(academic,'BLOC II.','Artistes referents')
museum = between(academic,'CONCLUSIÓ PROPOSTA 1:','PROPOSTA 2:')
garden = between(academic,'PROPOSTA 2:','CONCLUSIONS DE LA SORTIDA.')
outing = between(academic,'CONCLUSIONS DE LA SORTIDA.','PART 3. DESCRIPCIÓ DEL JARDÍ')
book = between(academic,'PART 3. DESCRIPCIÓ DEL JARDÍ','PART 4. EXPERIMENTEM AMB TINTES VIVES')
dyes = between(academic,'PART 4. EXPERIMENTEM AMB TINTES VIVES','BLOC III.')
update = json.loads(read('docs/INVENTARIO_ACTUALIZACION.json'))
artworks = []
manifest = json.loads(read("docs/INVENTARI_ASSETS.json"))
for entry in re.split(r"\n## ", read("content/OBRES_I_REFLEXIONS.md"))[1:]:
    def field(name):
        return re.search(r"- \*\*" + re.escape(name) + r":\*\* (.+)", entry)[1].strip().strip("`")
    asset = field("Fitxer de la imatge")
    metadata = next((a for a in manifest["images_from_pdf"] if a["web_asset"] == asset), None)
    new_media = next((m for m in update["media"] if m["asset"] == asset), None)
    reflection = between(entry, "### Reflexió i proposta educativa").removesuffix("---").strip()
    artworks.append(dict(title=field("Obra"), artist=field("Artista"),
                         technique=field("Tècnica (segons el PDF)"),
                         page=int(field("Pàgina de la imatge")), src=asset,
                         dimensions=metadata["dims"] if metadata else [new_media["width"],new_media["height"]], reflection=normalize(reflection)))

species = []
for entry in re.split(r"\n## ", read("content/ESPECIES_MONTJUIC.md"))[1:]:
    title = entry.split("\n", 1)[0].split(". ", 1)[1]
    text = between(entry, "**Text del document:**").split("\n---")[0]
    species.append(dict(name=title, observation=normalize(text)))
assert len(artworks) == len(species) == 10

data = dict(
    intro=dict(
        proposal=normalize(between(intro, "- PROPOSTA:", "- OBJECTIU:")),
        objective=normalize("Conèixer propostes" + between(intro, "- Conèixer propostes", "- Reflexió sobre")),
        reflection=normalize("Dijous passat " + between(intro, "Dijous passat"))),
    reading=dict(
        proposal=normalize(between(reading, "- PROPOSTA:", "- OBJECTIUS")),
        objectives=normalize(between(reading, "- OBJECTIUS", "La importància de l’observació")),
        reflection=normalize("La lectura de " + between(reading, "La lectura de"))),
    block=dict(
        framing=normalize(between(block, "PART 1. INTRODUCCIÓ- FORMES D’APROPAR-SE A LA NATURA", "ART, NATURA I EDUCACIÓ:")),
        reflection=normalize(between(block, "ART, NATURA I EDUCACIÓ:", "PART 2. VISITA A MUSEU I JARDÍ"))),
    museum=dict(
        proposal=normalize(between(block, "PROPOSTA 1: VISITA MUSEU MNAC:", "A partir de la visita al MNAC")),
        introduction=normalize("A partir de la visita al MNAC " + between(block, "A partir de la visita al MNAC", "OBJECTIUS DE LA PROPOSTA:")),
        objectives=normalize(between(block, "OBJECTIUS DE LA PROPOSTA:")),
        conclusion=normalize(museum.split("ESTRATÈGIES METODOLÒGIQUES:")[0]),
        methodology=normalize(between(museum, "ESTRATÈGIES METODOLÒGIQUES:", "MATERIALS:")),
        materials=normalize(between(museum, "MATERIALS:"))),
    garden=dict(
        proposal=normalize(between(academic, "PROPOSTA 2:", "Imatge: 10 espècies")),
        objectives=normalize(between(garden, "OBJECTIUS DE LA PROPOSTA:", "DESENVOLUPAMENT I RESULTATS:")),
        development=normalize(between(garden, "DESENVOLUPAMENT I RESULTATS:", "1. Rosa ‘Fortuna’:")),
        methodology=normalize(between(garden, "ESTRATÈGIES METODOLÒGIQUES:", "MATERIALS:")),
        materials=normalize(between(garden, "MATERIALS:", "REFLEXIONS I CONCLUSIONS:")),
        reflection=normalize(between(garden, "REFLEXIONS I CONCLUSIONS:"))),
    outing=normalize("Aquesta passejada pels jardins " + between(outing, "Aquesta passejada pels jardins")),
    book=dict(
        proposal=normalize(between(book, "PROPOSTA :", "OBJECTIUS DE LA PROPOSTA:")),
        objectives=normalize(between(book, "OBJECTIUS DE LA PROPOSTA:", "DESENVOLUPAMENT I RESULTATS:")),
        development=normalize(between(book,"DESENVOLUPAMENT I RESULTATS:","ESTRATÈGIES METODOLÒGIQUES:")),
        methodology=normalize(between(book,"ESTRATÈGIES METODOLÒGIQUES:","MATERIALS:")),
        materials=normalize(between(book,"MATERIALS:"))),
    dyes=normalize(dyes),
    artworks=artworks, species=species,
    media=manifest["media_original_zip"],
    collage=next(a for a in manifest["images_from_pdf"] if a["kind"] == "collage"),
    bibliography=[normalize(x).replace("el_sentido_ del_asombro.pdf", "el_sentido_del_asombro.pdf")
                  for x in PAGE[40].split("●")[1:] if x.strip()],
)
groups={'bloc-i':'bloc-i','inici':'inici','introduccio':'introduccio','bloc-ii/part-2-mnac':'mnac','bloc-ii/part-2-passejada':'jardi','bloc-ii/part-3-llibre':'descripcio','bloc-ii/part-4-tintes':'tintes','bloc-ii/part-1':'part1','bloc-ii/part-2-conclusions':'conclusions','bloc-ii/part-2-plantes':'plantes'}
new=[]
for m in update['media']:
    if m['category'] not in groups: continue
    new.append(dict(output=m['asset'],group=groups[m['category']],type=m['type'],dimensions=[m['width'],m['height']],**({'poster':m['poster']} if 'poster' in m else {})))
replaced={m['group'] for m in new}
data['media']=[m for m in data['media'] if m['group'] not in replaced]+new
plant_files=['img_4979','3','img_4985','5','1','img_4964','img_4968','img_4773','4','2']
for sp, stem in zip(data['species'],plant_files,strict=True):
    sp['image']=next(m for m in new if m['group']=='plantes' and Path(m['output']).stem==stem)
# New structured botanical observations come directly from the current source.
plant_text=normalize(between(garden,'1. Rosa','ESTRATÈGIES METODOLÒGIQUES:'))
plant_text='1. Rosa'+plant_text
entries=re.split(r"(?<!\d)(?:[1-9]|10)\.\s*",plant_text)[1:]
assert len(entries)==10
for sp, entry in zip(data['species'],entries,strict=True):
    sp['observation']=entry.split(':',1)[1].strip()
lines=['# Espècies — transcripció actualitzada de 40 pàgines']
for i,sp in enumerate(data['species']): lines.append(f"\n## {i+1:02}. {sp['name']}\n\n**Text del document:**\n\n{sp['observation']}\n")
(ROOT/'content/ESPECIES_MONTJUIC.md').write_text('\n'.join(lines),encoding='utf-8')
# A classic deferred script keeps the site usable over HTTP and file://.
output = "// Generated by scripts/build_content.py. Edit the source Markdown.\nconst PORTFOLIO = "
output += json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
(ROOT / "scripts/content.js").write_text(output, encoding="utf-8")
editorial = json.loads(read("content/EDITORIAL.json"))
(ROOT / "scripts/editorial.js").write_text(
    "// Generated from content/EDITORIAL.json; editorial summaries, separate from original prose.\nconst EDITORIAL = "
    + json.dumps(editorial, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
print(f"Generated {len(artworks)} artworks, {len(species)} species and {len(data['media'])} media records.")
