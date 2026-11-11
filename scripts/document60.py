"""Documentary sections added in the definitive 60-page edition.

Only extraction whitespace, page boundaries and wrapped URLs are normalized.
The original PDF remains authoritative; editable Markdown is loaded afterwards.
"""
import json
import re
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
CONCEPTS=['Pedagogia verda','Pigment','Frottage','Superposició','Abstracció','Llibre d’artista','Visor','Land Art']

def add_document60(data, pages, normalize, between):
    def clean(text):
        text=re.sub(r'!\[[^\]]*\]\([^\n]+\)', '', text)
        return text.replace('\u200b','').strip()
    def joined(first,last):
        parts=[]
        for n in range(first,last+1):
            body=clean(pages[n])
            if parts and not re.search(r'[.!?:…]$',parts[-1]): parts[-1]+=' '+body
            else: parts.append(body)
        return normalize('\n\n'.join(parts))
    def flat(text): return re.sub(r'\s+',' ',text).strip()
    cdan=joined(24,27)
    data['cdan']={
        'introduction':cdan.split('Obra:')[0].strip(),
        'orchidaceae':between(cdan,'Artista: Sarah Anne Drake i Augusta Innes Withers','Obra: Paisatges perduts de la Terra'),
        'paisatges':between(cdan,'Autora: Aina Bestard','Obra: A Curious Herbal'),
    }
    further=joined(46,53)
    data['further']={
        'goldsworthy':between(further,'El documental Ríos y mareas','Obra: Rowan Leaves'),
        'loren':between(further,'2. Lucía Loren – Art i ecologia','Obra: Matriz de agua'),
        'hill':between(further,'3. Martin Hill – El cercle de la vida','Obra: Sunrise circle'),
    }
    data['further']['goldsworthy']='El documental Ríos y mareas'+data['further']['goldsworthy']
    # The table crosses a page boundary; extract its eight complete cells.
    glossary=flat(between(joined(51,52),'Explicació'))
    positions=[glossary.index(c) for c in CONCEPTS]
    data['glossary']=[{'concept':c,'explanation':glossary[positions[i]+len(c):positions[i+1] if i+1<len(positions) else len(glossary)].strip()} for i,c in enumerate(CONCEPTS)]
    references=clean(pages[54]).split('Bibliografia recomanada per l’assignatura:')
    def refs(text):
        return [flat(x).replace('el_sentido_ del_asombro.pdf','el_sentido_del_asombro.pdf').replace('trabajando -tiempo/','trabajando-tiempo/') for x in text.split('●')[1:] if x.strip()]
    data['bibliography']=refs(references[0]);data['recommended']=refs(references[1])
    assert len(data['bibliography'])==6 and len(data['recommended'])==5
    media=json.loads((ROOT/'docs/MANIFEST_RECURSOS_60P.json').read_text(encoding='utf-8'))
    assert len(media)==19
    for m in media:
        assert (ROOT/m['file']).is_file(),m['file']
        data['media'].append(dict(output=m['file'],group=m['group'],type='image',dimensions=m['dimensions']))
