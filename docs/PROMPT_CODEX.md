# Encàrrec principal per a Codex — Portafoli Arts Visuals I

Treballa sobre **aquest repositori**. Abans de tocar codi, llegeix:

1. `index.html` (prototip Argon existent, base visual obligatòria).
2. `docs/ESTRUCTURA_WEB.md` (mapa de rutes i parts desenvolupades).
3. `content/PDF_COMPLET.md` (transcripció paginada del PDF original).
4. `content/OBRES_I_REFLEXIONS.md` (10 artistes/obres + reflexions personals + fotos extretes del PDF).
5. `content/ESPECIES_MONTJUIC.md` (10 espècies amb observacions originals).
6. `docs/INVENTARI_MEDIA.md` i, quan calgui, `docs/INVENTARI_ASSETS.json` (recursos reals i procedències).

## Objectiu

Transformar l’actual prototip HTML d’Ariadna Angel Marco (`Educació de les Arts Visuals I`, curs 2026–2027) en una web acadèmica real, rica en continguts, **sense perdre el disseny, navegació, tipografies, paleta cromàtica ni personalitat editorial actuals**. Es tracta d’**integrar dades reals**, no de tornar a generar la web.

## Restriccions no negociables

- **Respectar la base actual `index.html`.** No començar un projecte visual nou, no substituir el disseny per components genèrics ni migrar a React/Next sense necessitat.
- Navegació per hash `#/...` actual: mantenir rutes, menu responsive, modal d’imatges i estil editorial. També els submenús de Bloc II i Bloc III.
- **Idioma de tot el contingut: català.** Respectar exactament noms i textos ja redactats per Ariadna, incloses primeres persones. No corregir ni resumir textos personals sense indicació explícita.
- **No inventar** experiències, cites, visites, obres, carteles, espècies, bibliografia o resultats. Les pàgines sense contingut desenvolupat han de mostrar «Pendent d'incorporar» amb disseny coherent.
- Prioritzar **assets locals** de la carpeta `assets/` sobre imatges Unsplash. Les imatges del PDF han de relacionar-se amb les 10 obres que els corresponen. No intercanviar imatges d'artistes.
- No assignar fotos de plantes específiques a noms científics concrets sense una correspondència confirmada. Es poden mostrar en una galeria genèrica de la sortida amb crèdit d'imatge pròpia.
- El PDF p.13 esmenta l’exposició del Museu Mater: no tractar tots els referents com si fossin exclusivament del MNAC.
- Separar codi, dades i estil amb prudència: si modularitzes, conserva la identitat visual i funcional i evita desfer el prototip per complet.
- La web ha de funcionar en **Cloudflare Pages** com a projecte estàtic, sense backend ni credencials. Si utilitzes fitxers JSON i fetch, comprova que funcionin al servidor local i desplegament; si l’obertura directa file:// falla, documenta el servidor necessari.

## Tasques d’implementació en ordre

### Fase 1. Auditoria i salvaguarda

- Examina l’HTML actual (single-file HTML/CSS/JS), identificant el router, `ROUTES`, `VIEWS`, galeries i components reutilitzables.
- Anota què està implementat i què encara és demostració. Identifica fotos externes, dades d’artistes inventades i fallbacks.
- Crea un pla breu d’edició, **sense descartar el codi actual**. Si fas una refactorització, mantén la versió original recuperable a Git.

### Fase 2. Dades reals del document

- `#/introduccio`: incorpora íntegrament les reflexions personals del PDF p. 1–7 amb subtítols i respiració editorial, i fotografies locals `assets/introduccio/`.
- `#/bloc-i`: incorpora text de les lectures de Rachel Carson i Heike Freire (PDF p. 8–10), amb fotos `assets/bloc-i/mar-moron/` quan siguin apropiades.
- `#/bloc-ii` i `#/bloc-ii/p1-formes-dapropar-se-a-la-natura`: incorpora text desenvolupat p. 11–12.
- `#/bloc-ii/p2-visita-museu-i-jardi`:
  - Crea una **galeria editorial de 10 obres reals** extretes del PDF amb el títol, l’artista, la tècnica i la reflexió/proposta educativa corresponent, provinents de `content/OBRES_I_REFLEXIONS.md`.
  - Cada imatge correcta surt de `assets/pdf-obres/`; permet obrir-la en un lightbox accessible. Utilitza les imatges complementàries `assets/bloc-ii/mnac-visita/` quan correspongui.
  - Crea l’apartat «Diàleg amb el jardí» amb les 10 espècies i observacions **tal com es troben al PDF**, `content/ESPECIES_MONTJUIC.md`. Separa les fotografies locals de les identificacions fins a tenir la correspondència verificada.
  - Integra les estratègies metodològiques, materials, desenvolupament i les **conclusions originals** de la sortida, PDF p. 22–31. Evita repeticions; estructura-ho en subtítols clars.
  - La proposta «Educar a través de les arts» es pot presentar amb les activitats suggerides per les artistes, però **no fingir una activitat final autònoma no documentada**.
- `#/bloc-ii/p3-descripcio-del-jardi`: utilitza imatges i vídeos locals, mostra els objectius del PDF p. 31–32, i marca com a pendent el desenvolupament no redactat.
- Afegeix `#/bloc-ii/p4-experimentem-amb-tintes-vives` com a **secció provisional** al submenú de Bloc II perquè hi ha imatges/vídeos nous a la carpeta original. No atribueixis reflexions no escrites; utilitza «Pendent d'incorporar».
- `#/bloc-iii` i 4 subpàgines: mantén navegació i proposta visual, però reconeix que p. 33 només conté títols.
- `#/conclusions`, `#/reflexio-personal`, `#/per-saber-ne-mes`: mantén estructures placeholders on no hi ha redacció original.
- `#/referencies-bibliografiques`: importa només les dues referències existents a p. 34, amb enllaços reals si la font ja els aporta.

### Fase 3. Imatges i vídeos

- Les imatges `.webp` del directori `assets/` ja estan preparades per a web; **no cal fer una conversió nova**.
- Els vídeos `.mp4` ja estan reencodats en H.264 amb `poster.webp`; insereix-los com a reproductors natius (`controls`, `preload="metadata"`, `playsinline`). No autoplay amb so.
- Mantén dimensions, `object-fit` controlat, `loading="lazy"` i textos `alt` descriptius però no ficticis.
- En galeries d’obres, mostra les fotografies completes sense retallades agressives; a les cobertes es pot utilitzar `cover`.
- Afegeix crèdits honestos: «Fotografia pròpia d'Ariadna» quan la procedència ho permeti, «Imatge extreta del document d'Ariadna» en les obres del PDF. No atribuir-les automàticament a Unsplash.
- La portada podria utilitzar `assets/inici/` i no continuar depenent de fotografies externes quan hi ha fitxers locals adients.

### Fase 4. Responsive, UX i qualitat

- Comprova 375px, 390px, 430px, 768px, 1024px i 1440px, amb **prioritat mòbil**.
- Cap scroll horitzontal, solapament, foto sticky que tapi contingut ni text truncat.
- Menus mòbils desplegables, estats aria, focus de teclat, tancament de lightbox amb Esc, retorn de focus i gestió de scroll.
- Accessibilitat, contrast, càrrega progressiva i no carregar totes les imatges d’una sola vegada.
- Que els enllaços no canviïn cap a Google Sites: totes les rutes han de ser locals.
- Revisar coherència de títols, elements semàntics, 404 i metadades.

### Fase 5. Verificació i entrega

1. Executa el projecte en un servidor estàtic local; si cal, `python -m http.server 8000`.
2. Comprova totes les rutes del menú i submenús, inclosa la nova P4.
3. Comprova absència d'errors de consola i assets inexistents.
4. Si tens Playwright o navegador disponible, captura la portada, la galeria de 10 obres i la vista mòbil.
5. Resumeix els fitxers canviats, els continguts incorporats i els punts pendents de confirmar amb Ariadna.
6. **No realitzis `git push` ni desplegaments sense que t'ho demanem.**

## Criteri d’acceptació

Es reconeix visualment la **mateixa web editorial d’Argon**, ara alimentada amb les reflexions originals, 10 obres artístiques documentades i les fotos/vídeos locals, mantenint les 16 vistes originals i afegint només la nova secció P4 quan sigui coherent. La professora ha de poder trobar els requeriments acadèmics sense cercar en una pàgina infinita.

**Comença analitzant els fitxers existents i després implementa. No et limitis a descriure el procés.**
