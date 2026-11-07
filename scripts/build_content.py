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


raw = read("content/PDF_COMPLET.md")
PAGE = {int(n): body.strip().removesuffix("---").strip()
        for n, body in re.findall(r"## Pàgina (\d+) del PDF\n(.*?)(?=\n## Pàgina |\Z)", raw, re.S)}
assert len(PAGE) == 34
intro = pages(1, 7)
reading = pages(8, 10)
block = pages(11, 12)
museum = pages(22, 23)
garden = pages(24, 28)
outing = pages(28, 31)
book = pages(31, 32)

artworks = []
manifest = json.loads(read("docs/INVENTARI_ASSETS.json"))
for entry in re.split(r"\n## ", read("content/OBRES_I_REFLEXIONS.md"))[1:]:
    def field(name):
        return re.search(r"- \*\*" + re.escape(name) + r":\*\* (.+)", entry)[1].strip().strip("`")
    asset = field("Fitxer de la imatge")
    metadata = next(a for a in manifest["images_from_pdf"] if a["web_asset"] == asset)
    reflection = between(entry, "### Reflexió i proposta educativa").removesuffix("---").strip()
    artworks.append(dict(title=field("Obra"), artist=field("Artista"),
                         technique=field("Tècnica (segons el PDF)"),
                         page=int(field("Pàgina de la imatge")), src=asset,
                         dimensions=metadata["dims"], reflection=normalize(reflection)))

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
        conclusion=normalize(between(museum, "- CONCLUSIÓ PROPOSTA 1:", "ESTRATÈGIES METODOLÒGIQUES:")),
        methodology=normalize(between(museum, "ESTRATÈGIES METODOLÒGIQUES:", "MATERIALS:")),
        materials=normalize(between(museum, "MATERIALS:", "PROPOSTA 2:"))),
    garden=dict(
        proposal=normalize(between(museum, "PROPOSTA 2:", "Imatge: 10 espècies")),
        objectives=normalize(between(garden, "OBJECTIUS DE LA PROPOSTA:", "DESENVOLUPAMENT I RESULTATS:")),
        development=normalize(between(garden, "DESENVOLUPAMENT I RESULTATS:", "1. Rosa ‘Fortuna’:")),
        methodology=normalize(between(garden, "ESTRATÈGIES METODOLÒGIQUES:", "MATERIALS:")),
        materials=normalize(between(garden, "MATERIALS:", "REFLEXIONS I CONCLUSIONS:")),
        reflection=normalize(between(garden, "REFLEXIONS I CONCLUSIONS:", "CONCLUSIONS DE LA SORTIDA."))),
    outing=normalize("Aquesta passejada pels jardins " + between(outing, "Aquesta passejada pels jardins", "PART 3. DESCRIPCIÓ DEL JARDÍ")),
    book=dict(
        proposal=normalize(between(book, "PROPOSTA :", "OBJECTIUS DE LA PROPOSTA:")),
        objectives=normalize(between(book, "OBJECTIUS DE LA PROPOSTA:", "DESENVOLUPAMENT I RESULTATS:"))),
    artworks=artworks, species=species,
    media=manifest["media_original_zip"],
    collage=next(a for a in manifest["images_from_pdf"] if a["kind"] == "collage"),
    bibliography=[normalize(x).replace("el_sentido_ del_asombro.pdf", "el_sentido_del_asombro.pdf")
                  for x in PAGE[34].split("●")[1:] if x.strip()],
)
# A classic deferred script keeps the site usable over HTTP and file://.
output = "// Generated by scripts/build_content.py. Edit the source Markdown.\nconst PORTFOLIO = "
output += json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
(ROOT / "scripts/content.js").write_text(output, encoding="utf-8")
print(f"Generated {len(artworks)} artworks, {len(species)} species and {len(data['media'])} media records.")
