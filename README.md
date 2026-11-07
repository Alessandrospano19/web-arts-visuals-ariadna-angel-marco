# Educació de les Arts Visuals I — Ariadna Angel Marco

**Versió de treball per a VS Code / GitHub / Codex.** Curs 2026–2027.

Aquesta carpeta integra:

- `index.html`: el **prototip original d'Argon** sense modificar (HTML, CSS i JS en un arxiu).
- `source/*.pdf`: PDF original de 34 pàgines.
- `content/PDF_COMPLET.md`: transcripció del PDF amb paginació i enllaços a les imatges.
- `content/OBRES_I_REFLEXIONS.md`: 10 obres extretes del PDF, fitxa i reflexió.
- `content/ESPECIES_MONTJUIC.md`: 10 espècies botàniques documentades al PDF.
- `assets/`: fotografies web optimitzades en WebP; vídeos originals HEVC convertits a H.264/MP4; fotografies del PDF i originals extrets.
- `docs/ESTRUCTURA_WEB.md`: rutes i correspondència acadèmica.
- `docs/INVENTARI_MEDIA.md` / `.json`: correlació entre fonts, destins i rutes.
- `docs/PROMPT_CODEX.md`: instruccions d'implementació per a Codex.
- `AGENTS.md`: pautes persistents perquè Codex entengui el projecte.

## Desenvolupament local

Des de l'arrel del projecte:

```bash
python -m http.server 8000
```

Obre `http://localhost:8000`. Per a la primera integració, l'HTML actual encara fa servir imatges d'Unsplash per demostració. Codex les substituirà progressivament pels assets locals disponibles.

## Propera tasca

Obre la carpeta a VS Code i passa a Codex l'encàrrec que hi ha a `docs/PROMPT_CODEX.md`.

## Nota d'edició

No hi ha CMS en aquesta versió. El contingut està documentat en Markdown per importar-lo al frontend; el lloc original no llegeix automàticament aquests documents fins que Codex implementi la integració.
