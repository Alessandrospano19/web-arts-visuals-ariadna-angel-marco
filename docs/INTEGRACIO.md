# Integració documental del portafoli

## Auditoria inicial

El repositori estava net. El commit `81ff424` conserva el prototip inicial. `index.html` contenia el CSS editorial, 16 vistes, el router hash, els dos submenús, les galeries i el lightbox. Les imatges eren d’Unsplash i les fitxes de les obres, les espècies, les lectures i la bibliografia encara eren de demostració o estaven pendents. No hi havia obres ni identificacions verificades carregades al navegador.

S’han llegit les instruccions del projecte, el mapa de continguts, la transcripció completa, els Markdown estructurats i el manifest de procedències abans d’editar. Les vistes prèvies de les imatges han permès descriure’n el contingut sense assignar espècies ni identitats no confirmades.

## Disseny i implementació

- CSS original íntegre dins d’`index.html`; comprovació automàtica amb la versió inicial de Git.
- Mateixos tokens de color, Cormorant Garamond, DM Sans, composició de portada, capçaleres, índex visual, galeries, paginació i peu editorial.
- 16 rutes originals i una nova P4 de tintes vives; submenús d’escriptori i mòbil actualitzats.
- Dades generades des dels Markdown, JavaScript de la web separat i CSS complementari petit. Sense framework, backend ni credencials.
- Imatges locals amb dimensions, càrrega diferida i ampliació accessible. Les deu fotografies de les obres es mostren completes amb `contain`.
- Cinc vídeos MP4 amb controls natius, pòster, `preload="metadata"` i `playsinline`.
- Fonts originals locals amb llicències SIL OFL. No hi ha peticions externes necessàries per visualitzar el lloc.
- Menú amb contingut de fons inert, estats ARIA i focus contingut. Lightbox amb nom accessible, bloqueig del fons, tancament amb Esc i retorn del focus.
- Rutes desconegudes o malformades amb pàgina de retorn a l’inici.

## Continguts incorporats

| Vista | Material integrat |
|---|---|
| Inici | Retrat local, llibre d’artista i índex visual conservant la composició original. |
| Introducció | Proposta i objectiu; reflexió íntegra de la conferència, p. 1–7, amb subtítols editorials i dues imatges locals. |
| Bloc I | Proposta, objectius i reflexió íntegra de Carson i Freire, p. 8–10; coberta i imatge de les lectures amb crèdits diferenciats. |
| Bloc II i P1 | Marc del bloc i reflexió de la primera sessió, p. 11–12. El text complet és a P1, amb accés des de la presentació per evitar duplicacions. |
| Bloc II, P2 | Deu obres amb imatge correcta, autoria i tècnica del document; reflexions i activitats íntegres desplegables i al lightbox. Fotografies complementàries del museu. |
| Bloc II, P2 — jardí | Deu noms i observacions literals; objectius, desenvolupament, metodologia, materials i reflexions de la passejada. Galeria separada de les identificacions i composició original del PDF. |
| Bloc II, P2 — tancament | Conclusions originals de la proposta del museu i de la sortida, p. 22–31; accessos interns als apartats. |
| Bloc II, P3 | Proposta i tres objectius, p. 31–32; 21 fotografies i dos vídeos del procés i del llibre d’artista. |
| Bloc II, P4 | Quatre fotografies i tres vídeos de tintes vives; secció provisional explícita. |
| Bloc III i quatre subpàgines | Títols documentats i estructures editorials pendents, sense fotografies ni pràctiques inventades. |
| Conclusions, reflexió i recursos | Objectiu i títols disponibles, amb marcadors pendents. Les conclusions generals no es confonen amb les conclusions ja redactades de la sortida. |
| Bibliografia | Únicament les dues referències de p. 34; URL de Carson aportada per la font, reunida en una sola línia. |

La primera obra, «Verd de coure», es vincula a l’exposició del Museu Mater. Les fitxes transcriuen la documentació d’Ariadna; no s’han completat amb dates, cartel·les o atribucions externes. Les propostes educatives són les que Ariadna ja havia escrit a les reflexions de cada obra.

## Pendent d’Ariadna

1. Redactar la presentació personal de la portada.
2. Completar desenvolupament i resultats, metodologia, materials i reflexió del llibre d’artista. Les fotografies i els vídeos ja estan incorporats.
3. Validar la inclusió de P4 «Experimentem amb tintes vives» i aportar-ne objectius, desenvolupament, materials, metodologia i reflexió.
4. Aportar continguts i fotografies del Bloc III i les seves quatre activitats.
5. Escriure conclusions generals de l’assignatura, punts forts i febles, i recursos de «Per saber-ne més».
6. Confirmar les grafies botàniques, especialment `Pittosporum lobiru`, `‘Abelia x grandiflora`, `’Senna Corymbosa’` i `Eounymus japonicus`, i les correspondències individuals entre espècies i fotografies. No s’han corregit ni assignat automàticament.
7. Completar les cartel·les que no consten documentades, si cal incloure més metadades de museu.
8. Si l’assignatura exigeix una fitxa autònoma de «Proposta 3: Educar a través de les arts», aportar-la. El PDF actual només en desenvolupa les activitats dins de les reflexions de les obres.

## Verificació

`scripts/verify_content.py` contrasta les reflexions amb les fonts, les deu parelles obra/imatge, les deu observacions botàniques, les dues referències, els 57 recursos locals i la integritat del CSS original.

`scripts/verify_browser.cjs` comprova les 17 rutes a 375, 390, 430, 768, 1024 i 1440 px, incloent elements que sobresurtin encara que un `overflow` els ocultés. Comprova el text renderitzat, els submenús, les galeries, el lightbox, el teclat, el retorn del focus, els errors de rutes, l’accés HTTP als recursos, la reproducció dels cinc vídeos i l’obertura directa `file://`.

Resultats i captures a `verification/report.json` i `verification/*.png`. Sense errors de consola ni recursos locals inexistents. La captura del prototip inicial és una referència complementària; la comprovació exacta del CSS es fa contra Git.

Cap commit, push ni desplegament realitzat.
