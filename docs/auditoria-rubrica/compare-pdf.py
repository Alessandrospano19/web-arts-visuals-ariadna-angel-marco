"""Independent read-only comparison against actual PDF text, not the transcript."""
from pathlib import Path
import re, json, hashlib
import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
d = pdfium.PdfDocument(ROOT / 'source/ESTRUCTURA_ARIADNA_ACTUAL_60P.pdf')
pages = [d[i].get_textpage().get_text_range() for i in range(len(d))]
def norm(s):
    return re.sub(r'\s+', '', s.replace('\u200b','').replace('**','').replace('●','').replace('•',''))
body = norm(' '.join(pages))
evidence = json.loads((OUT/'browser-evidence.json').read_text(encoding='utf8'))
data = evidence['data']['portfolio']
checks = []
for group in ['intro','reading','block','museum','garden','book','cdan','further']:
    for key,value in data[group].items():
        if isinstance(value,str):
            n=norm(value)
            checks.append({'field':group+'.'+key,'pdfContainsExactNormalizedText':n in body,'characters':len(value)})
for key in ['dyes','outing']:
    checks.append({'field':key,'pdfContainsExactNormalizedText':norm(data[key]) in body,'characters':len(data[key])})
for group,key in [('artworks','reflection'),('species','observation')]:
    for i,row in enumerate(data[group]):
        checks.append({'field':group+'.'+str(i+1),'pdfContainsExactNormalizedText':norm(row[key]) in body})
for i,r in enumerate(data['glossary']):
    checks.append({'field':'glossary.'+r['concept'],'pdfContainsExactNormalizedText':norm(r['explanation']) in body})
# URLs split across lines are joined only by whitespace normalization.
for group in ['bibliography','recommended']:
    for i,v in enumerate(data[group]):
        checks.append({'field':group+'.'+str(i+1),'pdfContainsExactNormalizedText':norm(v) in body})
report={'pdfPages':len(d),'checks':checks,'pdfSha256':hashlib.sha256((ROOT/'source/ESTRUCTURA_ARIADNA_ACTUAL_60P.pdf').read_bytes()).hexdigest()}
(OUT/'pdf-comparison.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'checks':len(checks),'mismatches':[x['field'] for x in checks if not x['pdfContainsExactNormalizedText']]},ensure_ascii=False))
