# Tercera iteració — implementació de novembre de 2026

## Fonts i generador

El paquet adjunt `Codez-webarts.zip` s’ha importat perquè encara no era present al checkout. Només s’han importat els seus fitxers nous; no s’ha substituït el codi ni eliminat recursos antics. El PDF de 40 pàgines i la transcripció actualitzada són les fonts vigents.

`build_content.py` comprova les 40 pàgines, elimina només marcadors d’extracció i imatges Markdown i delimita els mòduls mitjançant els encapçalaments acadèmics. P3 conté proposta, objectius, desenvolupament/reflexió, metodologia i materials; P4 conté totes les fases i resultats. Les deu obres es llegeixen del Markdown estructurat actualitzat, contrastat amb la taula nova, i les observacions botàniques s’extreuen directament de la nova transcripció. Les versions estructurades anteriors es conserven a `content/archive-34p/`. No s’ha editat manualment el JavaScript generat.

## Vistes i disseny

- Portada: retirada la secció Presentació; títol únic «Art i educació» i frase exacta demanada per al Bloc II. Hero i índex visual d’enllaços conservats.
- Bloc II: fotografia completa del grup amb carbasses, IMG_5041; cap rostre ni carbassa retallats.
- Títols i navegació: PART en els dos blocs, sense alterar les rutes. Encaps acadèmics literals; excepció explícita del títol de PART 2 sol·licitada per Ariadna.
- PART 2: tres pestanyes accessibles. Eliminada Educar a través de les arts; conservades totes les activitats individuals de les deu obres. Deu fotografies de plantes i collage, amb observacions completes.
- Conclusions: tres preguntes separades, amb tot el text directament visible i tres fotografies. La revisió visual va detectar una primera separació incorrecta dels paràgrafs després d’unir salts de pàgina; es va corregir amb delimitadors de les preguntes i una prova que exigeix text extens en cadascuna.
- PART 3: Natura viva, justificació de les tires a doble cara, reflexió íntegra, metodologia i materials. Seqüència d’observació/recollida, experimentació, selecció/muntatge i llibre acabat. Els dos vídeos verticals queden junts a escriptori i apilats al mòbil.
- PART 4: proposta, objectius, tres fases, dues tintes, comparació, metodologia i materials. Fotografies i tres vídeos contextualitzats; sense estat pendent.
- Bibliografia: dues fonts originals i portades relacionades.
- Paràgrafs llargs justificats amb partició de paraules en català, columna de lectura i negretes verdes selectives sobre conceptes literals. A menys de 600 px s’alineen a l’esquerra per evitar buits excessius. Encapçalaments, llistes i peus no es justifiquen.
- Es conserven CSS original, colors, tipografies, components, router, menús, ampliació i compatibilitat estàtica. Les procedències queden als documents interns.

## Correspondència d’imatges

Les nou fotos d’obres s’han contrastat visualment amb les imatges ja identificades: 1 img_4614, 2 img_2174, 4 img_2192, 5 img_2165, 6 img_4680, 7 img_4719, 8 img_4687, 9 img_4674, 10 img_4685. La sega, obra 3, conserva la fotografia anterior, absent del lot nou de nou imatges.

Les plantes segueixen l’ordre acadèmic: img_4979, 3, img_4985, 5, 1, img_4964, img_4968, img_4773, 4 i 2. Revisades les característiques visibles als catàlegs, sense afirmar una verificació taxonòmica. Les tres associacions de certesa mitjana consten a `PENDENTS_ARIADNA.md`.

Conclusions: img_4655 (mans/terra), img_4724 (paisatge des de Montjuïc), img_4981 (observació d’una rosa). El llibre s’ordena pel contingut visible de les fotos, sense inferir dates dels noms. Els grups antics no substituïts es mantenen; els grups actualitzats utilitzen les noves versions optimitzades. El manifest nou i l’anterior es conserven.

## Comprovacions

Recorregut verificat: transcripció de 40 pàgines → generador → dades estàtiques → rutes i lectures al navegador. No hi ha API ni base de dades.

- Generació i validació de continguts executades amb Python; deu obres, deu espècies, dues referències i 72 recursos locals comprovats.
- Sintaxi JavaScript comprovada.
- Playwright amb Edge: 17 rutes a 375, 390, 430, 768, 1024 i 1440 px; tres panells a les sis amplades, lectures, menú, teclat, focus, Esc, lightbox, cinc vídeos reproduïts i obertura directa file://.
- Sense errors de consola, recursos absents ni desbordaments en les comprovacions.
- Captures a 390 i 1440 px a `verification/novembre-2026/`, incloent portada, Bloc II, plantes/obres, conclusions i P3/P4. Revisió visual amb ajust de la separació de conclusions i compactació de fotografies de P3.

Els resultats detallats són a `verification/novembre-2026/report.json`. Les úniques qüestions documentals obertes són el nou títol de la primera obra i les tres correspondències de plantes indicades. No s’ha fet commit, push ni desplegament.
