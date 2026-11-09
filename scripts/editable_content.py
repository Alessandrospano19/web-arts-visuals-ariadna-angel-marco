"""Manual web edits override generated data. Never overwrite an existing editable."""
from pathlib import Path
from copy import deepcopy
import json

ROOT = Path(__file__).resolve().parents[1]
EDIT = ROOT / 'content/editables'


def seed(name, value):
    path = EDIT / (name + '.json')
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    return json.loads(path.read_text(encoding='utf-8-sig'))


def apply_edits(data):
    # Independent original output supports fidelity checks even after manual edits.
    (ROOT/'scripts/source-content.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    academic = ROOT/'content/academic'
    academic.mkdir(parents=True,exist_ok=True)
    mapping = {}
    for module in ['intro','reading','block','museum','garden','book']:
        for field,text in data[module].items():
            if not isinstance(text,str): continue
            filename=f'{module}-{field}.md'
            mapping[f'{module}.{field}']=filename
            path=academic/filename
            if not path.exists(): path.write_text(text+'\n',encoding='utf-8')
    for field in ['outing','dyes']:
        path=academic/(field+'.md'); mapping[field]=path.name
        if not path.exists(): path.write_text(data[field]+'\n',encoding='utf-8')
    mapping=seed('mapa-academic',mapping)
    for field,filename in mapping.items():
        path=(academic/filename).resolve()
        if not path.is_relative_to(academic.resolve()) or path.suffix!='.md':
            raise ValueError('Invalid academic file: '+filename)
        target=data
        parts=field.split('.')
        for part in parts[:-1]: target=target[part]
        target[parts[-1]]=path.read_text(encoding='utf-8-sig').strip()
    # Every media record has a stable identity independent of its editable URL.
    defaults={}
    for m in data['media']:
        ident=m['group']+'_'+Path(m['output']).stem
        m.update(id=ident,originalOutput=m['output'])
        defaults[ident]={'imagen':m['output'],'alt':'','grupo':m['group'],'ancho':m.get('dimensions',[0,0])[0],'alto':m.get('dimensions',[0,0])[1]}
    for i,art in enumerate(data['artworks']):
        defaults[f'obra_{i+1:02}']={'imagen':art['src'],'alt':art['title']+' — '+art['artist'],'ancho':art['dimensions'][0],'alto':art['dimensions'][1]}
    defaults['bloc_ii_portada']=deepcopy(defaults['descripcio_img_5041'])
    defaults['bloc_ii_detall']=deepcopy(defaults['jardi_img_4758'])
    defaults['portada_retrat']=deepcopy(next(v for k,v in defaults.items() if k.startswith('inici_')))
    defaults['universitat_logo']={'imagen':'','alt':''}
    images=seed('imagenes',defaults)
    known={v['imagen']:(v['ancho'],v['alto']) for v in defaults.values() if 'ancho' in v}
    for ident,item in images.items():
        if not item['imagen']: continue
        path=(ROOT/item['imagen']).resolve()
        if not path.is_relative_to(ROOT) or not path.is_file(): raise ValueError('Invalid local image: '+item['imagen'])
        dims=known.get(item['imagen'],(item.get('ancho',0),item.get('alto',0)))
        if not all(isinstance(n,(int,float)) and n>0 for n in dims):
            raise ValueError('Indica ancho y alto reales para: '+ident)
        item['dimensions']=list(dims)
        item['output']=item['imagen']
        item['id']=ident
        item['originalOutput']=defaults.get(ident,item)['imagen']
    for m in data['media']:
        image=images[m['id']]
        m.update(output=image['imagen'],alt=image.get('alt',''),dimensions=image['dimensions'],rotation=image.get('rotation',0))
    for i,art in enumerate(data['artworks']):
        image=images[f'obra_{i+1:02}']; art.update(src=image['imagen'],alt=image.get('alt',''),dimensions=image['dimensions'])
    by_original={m['originalOutput']:m for m in data['media']}
    for sp in data['species']: sp['image']=deepcopy(by_original[sp['image']['output']])
    for ident,image in images.items():
        if ident not in defaults and image.get('grupo'):
            data['media'].append(dict(image,group=image['grupo'],type='image'))
    web={p.stem:json.loads(p.read_text(encoding='utf-8-sig')) for p in EDIT.glob('*.json')}
    web['imagenes']=images
    story=web['narrativa']
    previous=-1
    for i,step in enumerate(story['llibre']):
        position=0 if i==0 else data['book']['development'].find(step['inicio'])
        if position<=previous: raise ValueError('Revisa inicio de la fase: '+step['titulo'])
        previous=position
    previous=-1
    for heading in story['tintes_apartats']:
        position=data['dyes'].find(heading)
        if position<=previous: raise ValueError('Revisa el apartado de tintas: '+heading)
        previous=position
    for step in story['llibre']+list(story['tintes'].values()):
        for ident in step.get('imagenes',[])+step.get('videos',[]):
            if ident not in images: raise ValueError('Unknown narrative media: '+ident)
    (ROOT/'scripts/web-editables.js').write_text('// Generated. Edit content/editables/*.json instead.\nconst WEB = '+json.dumps(web,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    return data
