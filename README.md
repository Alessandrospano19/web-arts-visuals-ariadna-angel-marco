# Educació de les Arts Visuals I — Ariadna Angel Marco

Portafoli acadèmic estàtic. Curs 2026–2027. Contingut documental integrat sobre el disseny editorial original d’Argon.

Aquesta carpeta integra:

- `index.html`: estructura, menús i **CSS original d’Argon conservat íntegrament**. La versió inicial és recuperable al commit `81ff424`.
- `scripts/app.js`: components compartits, portada, navegació hash i lightbox.
- `scripts/views.js`: vistes editorials, tres panells de la visita i galeria ampliable.
- `scripts/content.js`: dades generades a partir dels Markdown i del manifest; sense `fetch` ni backend.
- `content/EDITORIAL.json` i `scripts/editorial.js`: síntesis i cites per a la lectura breu, separades de les reflexions íntegres. El JavaScript es genera automàticament.
- `styles/integration.css`: ajustos per integrar el contingut i millorar l’accessibilitat.
- `styles/fonts.css` i `assets/fonts/`: Cormorant Garamond i DM Sans originals, servides localment amb les llicències SIL OFL.
- `source/*.pdf`: PDF acadèmic actualitzat de 40 pàgines i versió històrica de 34 pàgines.
- `content/PDF_ACTUALITZAT_40P.md`: font acadèmica vigent; `content/PDF_COMPLET.md` conserva la transcripció antiga.
- `content/OBRES_I_REFLEXIONS.md`: 10 obres extretes del PDF, fitxa i reflexió.
- `content/ESPECIES_MONTJUIC.md`: 10 espècies botàniques documentades al PDF.
- `assets/`: fotografies web optimitzades en WebP; vídeos originals HEVC convertits a H.264/MP4; fotografies del PDF i originals extrets.
- `docs/ESTRUCTURA_WEB.md`: rutes i correspondència acadèmica.
- `docs/INVENTARI_MEDIA.md` i `docs/INVENTARI_ASSETS.json`: correspondència entre fonts, destins i rutes.
- `docs/PROMPT_CODEX.md`: instruccions d'implementació per a Codex.
- `AGENTS.md`: pautes persistents perquè Codex entengui el projecte.

## Desenvolupament local

Des de l'arrel del projecte:

```bash
python -m http.server 8000
```

Obre `http://localhost:8000`. També funciona obrint `index.html` directament amb `file://`. Les imatges, els vídeos i les fonts són locals; la navegació necessita JavaScript.

## Actualitzar els continguts

Edita les fonts documentals de `content/` i, si canvien els recursos, el manifest `docs/INVENTARI_ASSETS.json`. Regenera les dades amb Python, sense instal·lar dependències:

```bash
python scripts/build_content.py
python scripts/verify_content.py
```

No editis manualment `scripts/content.js` ni `scripts/editorial.js`: són fitxers generats. El generador conserva el text personal, normalitza els salts de línia i uneix les continuacions de pàgina. Les síntesis s’editen exclusivament a `content/EDITORIAL.json`; les cites s’han de mantenir literals. Si canvia l’estructura dels Markdown, revisa també els delimitadors a `scripts/build_content.py`. No hi ha CMS.

## Verificació de navegador

Amb el servidor local en marxa i Playwright disponible per a Node:

```bash
node scripts/verify_browser.cjs
```

A Windows utilitza Microsoft Edge; en altres sistemes, Chromium de Playwright. `ARI_PLAYWRIGHT_MODULE` permet indicar el camí a una instal·lació existent de Playwright; `ARI_PREVIEW_URL` permet canviar l’URL del servidor. L’aplicació no necessita Node ni Playwright per funcionar.

Resultat verificat: **17 rutes × 6 amplades = 102 comprovacions**, més els tres panells a les sis amplades, 57 recursos multimèdia, 10 obres, 10 espècies i 5 vídeos reproduïts. Es comproven les reflexions íntegres, les cites literals, els desplegables, les pestanyes amb teclat, el focus, la galeria ampliable i `file://`. Sense errors de consola ni recursos locals absents. L’informe i les 24 captures de la segona iteració són a `docs/verification/refinement/`; les captures de la primera es conserven al directori superior.

## Allotjament estàtic

Compatible amb Cloudflare Pages: arrel del repositori com a directori de publicació i cap ordre de compilació necessària, ja que les dades generades s’inclouen al projecte. Les rutes `#/...` no requereixen regles de reescriptura. No s’ha fet cap desplegament ni `git push`.

## Contingut pendent

Consulta `docs/REFINAMENT_VISUAL.md` per a les decisions editorials i els pendents actuals. `docs/INTEGRACIO.md` conserva l’auditoria de la primera integració.

## Tercera iteració — novembre de 2026

Font acadèmica vigent de 40 pàgines, P3 i P4 desenvolupades i conclusions visibles. Informe a `docs/INFORME_IMPLEMENTACIO_NOVEMBRE_2026.md`; comprovacions i captures actuals a `docs/verification/novembre-2026/`. Els informes i captures de les iteracions anteriors són històrics.
