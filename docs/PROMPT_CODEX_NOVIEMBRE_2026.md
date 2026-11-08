# PROMPT PARA CODEX — Tercera iteración editorial de la web de Ariadna (8 de noviembre de 2026)

Eres un desarrollador frontend sénior y editor de contenidos académicos en catalán. **Debes modificar el proyecto existente**; NO generar una web nueva. Conserva el diseño editorial, la tipografía, el estilo de las galerías, la navegación, el router hash, las animaciones discretas y el funcionamiento responsive que ya nos gustan.

## CONTEXTO Y DOCUMENTACIÓN A LEER ANTES DE EDITAR

En la raíz del repositorio tienes el código ya trabajado por Codex (`index.html`, `scripts/app.js`, `scripts/build_content.py`, `scripts/content.js`, `styles/integration.css`, etc.). Acabamos de incorporar un paquete de actualización que contiene:

- `source/ESTRUCTURA_ARIADNA_ACTUAL_40P.pdf` — **PDF académico actualizado** con 40 páginas.
- `content/PDF_ACTUALITZAT_40P.md` — transcripción completa por páginas, con enlaces a las imágenes del propio PDF.
- `docs/INFORME_FUENTES_Y_CAMBIOS.md` — mapa de cambios, correspondencia de fotografías y advertencias.
- `docs/INVENTARIO_ACTUALIZACION.json` y `.csv` — nombres originales y rutas de las 60 fotografías y 5 vídeos optimizados.
- `assets/actualizacion-2026-11-08/` — multimedia nuevo (WebP y MP4), incluidas las imágenes extraídas del PDF.
- `docs/CATALOGO_FOTOS_*.jpg` — contacto visual para identificar las fotos.

Lee primero `AGENTS.md`, los documentos anteriores y el código actual. **El PDF de 40 páginas reemplaza en autoridad académica al antiguo PDF de 34 páginas**. La ruta original del PDF antiguo puede permanecer archivada, pero no debe seguir siendo el origen de la generación. Cuando haya una petición expresa de Ariadna que modifique un título del PDF, aplica esa petición concreta; documenta la excepción.

**No presupongas que este paquete sustituye todas las imágenes anteriores:** es una actualización que hay que fusionar con las fotos y componentes ya existentes. No elimines activos por ausencia en el nuevo ZIP.

## OBJETIVO

Queremos que la página conserve su estética actual, pero que se lea y navegue mejor, respete exactamente la estructura exigida por las profesoras y presente TODAS las aportaciones reales de Ariadna. No queremos etiquetas internas, resúmenes artificiales en lugar del contenido académico ni páginas interminables sin jerarquía.

La web permanece íntegramente en **catalán**. Las reflexiones de Ariadna son suyas: no las inventes, no cambies su significado y no elimines contenido del texto íntegro. Puedes elaborar subtítulos breves, resúmenes introductorios y pies de foto como componentes editoriales, diferenciados del texto original.

## A. PORTADA / INICI (PRIORIDAD ALTA)

1. En `home()` de `scripts/app.js`, **elimina completamente el apartado `02 · Presentació`**, incluida la sección «Sobre aquest projecte», su foto y su texto. No lo traslades a otro sitio salvo que ya exista allí un contenido académico necesario.
2. El bloque que ahora pone `03 · Índex visual` y `Tres maneres d’apropar-se a les arts` debe perder esos rótulos y esa numeración. **Usa exclusivamente el título visible `Art i educació`**, conservando, si siguen siendo útiles, los enlaces visuales que permiten navegar a los tres bloques. Evita repetir el mismo título dos veces a pocos centímetros.
3. En el resumen del Bloc II de la portada sustituye la frase antigua por esta, con ortografía catalana correcta y sin reformulaciones adicionales:

   > La visita al MNAC, la passejada sonora pels Jardins de Montjuïc, la creació d’un llibre d’artista i l’experiment amb les tintes naturals.

4. Conserva el hero y la identidad editorial general. No reintroduzcas fotos personales en una sección de presentación eliminada.

## B. FOTO PRINCIPAL DEL BLOC II

**Sustituye el collage botánico** que aparece actualmente en la presentación del Bloc II por la fotografía del grupo sonriendo con calabazas:

`assets/actualizacion-2026-11-08/bloc-ii/part-3-llibre/img_5041.webp`

El archivo original es `IMG_5041.JPG`. Está verificado visualmente; en la foto aparecen varias personas con calabazas. Mantén la fotografía completa o recorta mínimamente con `object-position` apropiado, sin cortar rostros ni calabazas. El collage NO se elimina del proyecto: debe seguir apareciendo donde corresponde, en la documentación botánica de la Parte 2.

## C. TÍTULOS ACADÉMICOS: NO CAMBIARLOS POR CREATIVIDAD

Los títulos académicos deben respetar **el texto del PDF actualizado**, para que la profesora encuentre el trabajo. No sustituyas encabezados por frases poéticas. Si quieres un subtítulo editorial creativo, ponlo DEBAJO del encabezado literal y como texto secundario.

La navegación de Bloc II debe decir **PART 1, PART 2, PART 3, PART 4**, nunca `Proposta 1`, `Proposta 2`, etc. «Proposta 1» y «Proposta 2» son exclusivamente las dos propuestas DENTRO de la Parte 2.

Estructura que debe reflejar la web:

- `INTRODUCCIÓ. ART I NATURA A EDUCACIÓ INFANTIL`
- `BLOC I. ART I EDUCACIÓ`
- `BLOC II. LA FORMACIÓ EN LA PRÀCTICA DE L’ART. EL JARDÍ COM AGENT PEDAGÒGIC.`
  - `PART 1. INTRODUCCIÓ- FORMES D’APROPAR-SE A LA NATURA`
  - `PART 2. Visita al MNAC i passejada pels jardins de Montjuïc` **(excepción solicitada expresamente por Ariadna: sustituye al título más genérico de la Parte 2 que figura en el PDF)**
    - `PROPOSTA 1: VISITA MUSEU MNAC`
    - `PROPOSTA 2: DIÀLEG AMB EL JARDÍ`
    - `CONCLUSIONS DE LA SORTIDA.`
  - `PART 3. DESCRIPCIÓ DEL JARDÍ`
  - `PART 4. EXPERIMENTEM AMB TINTES VIVES`
- `BLOC III. LA FORMACIÓ EN LA PRÀCTICA DE L’ART. MODA, ARTIVISME I PERFORMATIVITAT EN LES ARTS I L’EDUCACIÓ.`
  - `PART 1. LLENGUATGES DEL COS I EL TEIXIT`
  - `PART 2. EXPOSICIÓ: EL COS VESTIT + MATER MATTERS`
  - `PART 3. BIOTEIXITS_DU-DA`
  - `PART 4. LA PASSAREL·LA: ESPAI DE CREACIÓ`
- `CONCLUSIONS GENERALS DE L’ASSIGNATURA`
- `REFLEXIONS PERSONALS`
- `PER SABER-NE MÉS…`
- `REFERÈNCIES BIBLIOGRÀFIQUES`

**Conserva las URLs/rutas hash existentes** para no romper enlaces, pero actualiza los nombres visibles en menús, enlaces internos, migas, encabezados, breadcrumbs y títulos de pestañas/secciones.

## D. PARTE 2 DEL BLOC II: REORDENAR A FONDO

1. El título principal de esta página será **`Visita al MNAC i passejada pels jardins de Montjuïc`** precedido de `PART 2` en una etiqueta secundaria, no `Proposta 02`.
2. Mantén únicamente **dos propuestas** (la visita al MNAC y el diálogo con el jardín), seguidas de **Conclusiones de la salida**.
3. **ELIMINA por completo la sección `Proposta 03 · Educar a través de les arts`**, sus gráficos y sus entradas de navegación. No aparece en el PDF actualizado. No borres por ello reflexiones individuales de las obras o sus actividades didácticas: esas sí forman parte de la `PROPOSTA 1`.
4. Integra los contenidos del documento de las páginas 12–32: las diez obras con descripción/reflexión/actividad, objetivos, desarrollo y resultados, estrategias, materiales, diez observaciones botánicas y conclusiones.
5. Mantén los botones/galerías que ya nos gustan, pero evita una vista kilométrica. Usa navegación real por **tres subapartados** (MNAC, jardí y conclusions) o pestañas accesibles que cambien el contenido. La sección de conclusiones NO debe ocultar su reflexión bajo un desplegable.

### D.1. Las diez obras artísticas

- Conserva las diez obras y sus fotografías reales. Usa principalmente los originales de `assets/actualizacion-2026-11-08/bloc-ii/part-2-obres/` y, para la obra que no esté en ese lote de 9 fotos, conserva la imagen ya integrada desde el PDF. **Nunca muestres solo nueve si el documento requiere diez.**
- Cada ficha abre una vista con foto ampliada, obra, artista, técnica, reflexión y propuesta de actividad; la cuadrícula inicial permanece breve y visual.
- No muestres `Imatge extreta del PDF`, `document, pàgina X`, `fotografia pròpia d'Ariadna` ni otras notas de origen. Los créditos y rastreo se mantienen en `docs/`, no en la interfaz.
- **ATENCIÓN a la obra 1:** Ariadna pide corregir «Verd de coure». No obstante, el PDF actual, pág. 13, TODAVÍA pone `Verd de coure sobre tela reciclada`, de Solé Duc. No inventes un título diferente ni digas que ya está corregido; deja el texto exactamente como consta por ahora y abre una observación en el informe interno `docs/PENDENTS_ARIADNA.md` para que se aporte el título nuevo.
- Verifica la correspondencia real entre fotos, autores y obras, sin asignar por orden alfabético ni inferir identidades.

### D.2. Proposta 2 — Diàleg amb el jardí

- Recupera el collage de las diez plantas que ya existía y **añade también las diez fotografías individuales**, una por especie, con una cuadrícula limpia y ampliación al pulsar.
- Las fotos están en `assets/actualizacion-2026-11-08/bloc-ii/part-2-plantes/`; `docs/INFORME_FUENTES_Y_CAMBIOS.md` aporta correspondencias visuales sugeridas. Comprueba las asociaciones; si alguna es dudosa, usa un identificador provisional solo en la documentación interna y comunícalo.
- Incorpora el texto de cada observación botánica y conserva las denominaciones tal como Ariadna las escribió; no hagas correcciones botánicas silenciosas.
- Una ficha compacta puede mostrar nombre + foto + 1 frase; la observación íntegra puede quedar accesible al abrir la ficha o un desplegable.
- Integra también objetivos, desarrollo, metodología, materiales y reflexión de las páginas 23–28.

### D.3. Conclusions de la sortida

- **El texto completo de las tres reflexiones debe poder leerse directamente, sin estar escondido en un acordeón**. Evita el tamaño de letra pequeño de la versión anterior.
- Subdivide claramente las tres preguntas del documento (vínculo con la natura, práctica artística, futura práctica docente), con párrafos cómodos, espacios y subtítulos, sin alterar el argumento.
- Intercala imágenes reales: `img_4655.webp` (tierra/manos), `img_4724.webp` (vista desde Montjuïc) e `img_4981.webp` (rosa). Rutas completas en `docs/INFORME_FUENTES_Y_CAMBIOS.md`.
- Sustituye la etiqueta pequeña e irrelevante de la versión previa por una entradilla significativa basada en la experiencia (si quieres, deriva una frase breve de lo que realmente dice la reflexión), sin presentar una cita fabricada como literal.
- No reduzcas la reflexión a tres titulares ni elimines párrafos para mejorar artificialmente la página.

## E. PARTE 3 DEL BLOC II — `DESCRIPCIÓ DEL JARDÍ`

Las páginas 32–35 del PDF de 40 páginas contienen **toda la propuesta ya desarrollada**: ahora NO debe figurar como pendiente. Integra:

- `Què és un jardí? Descripció visual`.
- Propuesta y objetivos.
- Desarrollo y resultados completos, incluyendo prácticas en `l'hort de les temptacions` de la UAB.
- Técnicas: dibujo, pintura, estampación y frottage.
- El libro de artista **`Natura viva`** y la justificación de su formato de tiras a doble cara.
- Reflexión personal completa.
- Estrategias metodológicas y materiales.

Organiza una **secuencia fotográfica narrativa** de observación/recogida → experimentación → selección y montaje → resultado final, con fotos del lote `assets/actualizacion-2026-11-08/bloc-ii/part-3-llibre/`. No fuerces que el orden de los nombres de archivo demuestre la cronología: coteja el contenido visual y permite ajustes. Añade **pies de foto cortos, factuales, en catalán** (p. ej., `Experimentació amb pigments i textures`, `Composició de les tires del llibre`, `El llibre d'artista acabat`).

Los vídeos finales `img_5126.mp4` y `img_5128.mp4` son verticales de origen: **disponlos lado a lado horizontalmente en escritorio**, con cada vídeo bien proporcionado (`object-fit: contain`); en móvil, uno debajo de otro. No estires, recortes agresivamente ni gires su contenido. El usuario quiere una presentación horizontal, no deformar los archivos.

## F. PARTE 4 — `EXPERIMENTEM AMB TINTES VIVES`

Esta actividad **YA NO ES PROVISIONAL**. Está desarrollada en las páginas 35–38. Retira los rótulos `Secció provisional`, `Sense text`, `Pendent d'incorporar` de esta actividad cuando sí consta texto.

Integra todo el contenido real, dividido en una narración visual:

1. `Proposta` y `Objectius`.
2. `Primera fase. Preparació de les tintes naturals`.
3. `Segona fase. Experimentació amb les tintes` (llimona, llevat, sabó, bicarbonat, sal y vinagre).
4. `Tercera fase. Aplicació artística sobre el paper`.
5. `Tinta de remolatxa` y `Tinta de col llombarda` (resultados y comparación).
6. `Estratègies metodològiques` y `Materials` (preferentemente en tabla editorial o fichas).

Incorpora las fotos y vídeos de `assets/actualizacion-2026-11-08/bloc-ii/part-4-tintes/` contextualizados según las fases. Respeta el texto original; no conviertas los resultados observados por Ariadna en una explicación química inventada.

## G. TEXTOS, JUSTIFICACIÓN, ACENTOS Y LIMPIEZA EDITORIAL

1. Implementa `text-align: justify` y `hyphens: auto` **en los párrafos de reflexión largos**; establece `lang="ca"` adecuadamente. Ajusta el ancho de columna y los espacios para que no queden grandes huecos. En pantallas móviles estrechas, si la justificación provoca espacios excesivos, prioriza legibilidad y usa `text-align: left`; documenta esa excepción.
2. **No justificar** encabezados, pies de foto breves, botones, fichas pequeñas ni listas: se verían peor.
3. Destaca mediante **negrita verde bosque** solo frases reales o conceptos relevantes, como en el PDF. Evita convertir un párrafo entero en negrita. Si la frase es una cita textual, conserva exactamente sus palabras; no inventes comillas o atribuciones.
4. Elimina de todas las vistas la terminología técnica interna: `Text original d'Ariadna`, `Document Part`, `pàgina 30`, `Imatge extreta`, `Fotografia pròpia d'Ariadna`, `Font: document`, etc. La procedencia se conserva en la documentación, no visible públicamente.
5. Donde el nuevo PDF siga sin aportar contenido (principalmente Bloc III, conclusions generals, reflexions personals, per saber-ne més), mantén **solo `Pendent d'incorporar`** de forma discreta, sin repetidas explicaciones administrativas.
6. No elimines las reflexiones completas: cuando sean muy largas, organiza una primera lectura por temas, inserta imágenes relacionadas y ofrece también `Llegir la reflexió completa`, con el texto literal; **excepción**: las conclusiones de la salida deben quedar visibles íntegramente.
7. Mantén una paleta editorial con variedad cromática suave, no todos los bloques en blanco. No añadas efectos pesados ni patrones de tarjetas repetitivos.

## H. BIBLIOGRAFIA

En `REFERÈNCIES BIBLIOGRÀFIQUES` incorpora dos recursos fotográficos que ya son pertinentes:

- `assets/actualizacion-2026-11-08/bloc-i/img_2227.webp` — portada de *El sentido del asombro*, Rachel Carson.
- `assets/actualizacion-2026-11-08/bloc-i/img_2228.webp` — captura/portada de *La escuela es el bosque*, Heike Freire.

Integra las dos referencias del PDF (pág. 40), con los títulos originales y un diseño sobrio. Justificación editorial: son **los dos textos de lectura utilizados expresamente en el Bloc I**; no son fotos decorativas arbitrarias. No inventes nuevas referencias.

## I. CAMBIOS TÉCNICOS NECESARIOS EN EL REPOSITORIO

1. Modifica `scripts/build_content.py`: actualmente hace `assert len(PAGE) == 34` y extrae por intervalos numéricos del antiguo PDF. Debe migrar a **40 páginas** y, preferiblemente, a delimitadores por encabezados/estructuras académicas y módulos de contenidos, porque ahora `PART 3` y `PART 4` contienen desarrollo real. No basta con cambiar `34` por `40`.
2. Regenera `scripts/content.js` desde los Markdown actuales; evita editarlo a mano si es un archivo generado. Mantenlo reproducible.
3. Actualiza los Markdown estructurados de `content/` de acuerdo con la nueva fuente, preservando el texto literal, y versiona el antiguo contenido si necesitas conservarlo por auditoría.
4. Revisa `scripts/app.js`, especialmente `home()`, `ROUTES`, `B2`, `b2p1()`, `b2p2()`, `b2p3()`, `b2p4()`, `bibliografia()` y los helpers de fotografía y fuente. Mantén el estilo del `index.html` original y utiliza `styles/integration.css` para ajustes locales.
5. Actualiza `docs/ESTRUCTURA_WEB.md` y `AGENTS.md` para apuntar a la fuente de 40 páginas, sin borrar las pautas técnicas útiles ya existentes.
6. Usa los WebP y MP4 optimizados, no los HEIC/MOV originales, y conserva carga diferida, `width`/`height`, poster para vídeo y `alt` descriptivo. Las imágenes web optimizadas no contienen los metadatos privados de las capturas originales.
7. Mantén la galería/lightbox accesible, el menú móvil y las rutas hash; no reescribas el proyecto en React, Next o un framework sin necesidad. Se desplegará como web estática.
8. Si hay fotos originales duplicadas con las nuevas, selecciona la versión mejor encuadrada o con más calidad; no dupliques en la interfaz el mismo contenido sin motivo.

## J. CRITERIOS DE ACEPTACIÓN Y PRUEBAS

La tarea solo estará finalizada cuando compruebes lo siguiente:

- Portada sin `02 · Presentació`, sin `03 · Índex visual`, con título `Art i educació` y con la frase exacta del Bloc II.
- Bloc II con `IMG_5041` como foto de portada, sin cortar rostros ni calabazas.
- Menús de Bloc II y Bloc III con `PART`, no `PROPOSTA` en nivel de navegación; títulos académicos fieles al documento, salvo la excepción explícita de Parte 2.
- Parte 2 con solo Proposta 1, Proposta 2 y Conclusions; SIN `Educar a través de les arts`.
- Diez obras y diez fotografías individuales de plantas además del collage; correspondencias verificadas o consignadas como dudas.
- Conclusiones completas visibles y legibles con tres fotos pertinentes.
- Parte 3 con texto completo, proceso fotográfico ordenado, pies breves y vídeos verticales presentados juntos sin distorsión.
- Parte 4 con fases, resultados, metodología, materiales, fotos/vídeos y SIN etiqueta provisional.
- Bibliografía ilustrada mediante las portadas reales de Carson y Freire.
- Ninguna nota técnica sobre PDF, páginas, procedencia de imágenes o «document original» visible en UI.
- Justificación de textos largos en escritorio y negritas verdes selectivas, sin degradación en móvil.
- Todas las rutas existentes y submenús siguen funcionando; sin errores en consola, imágenes rotas, desbordamientos o regresiones de accesibilidad.
- Ejecutar `python scripts/build_content.py`, `python scripts/verify_content.py` y `scripts/verify_browser.cjs` (cuando el entorno y dependencias lo permitan). Tomar capturas a 390 px y 1440 px como mínimo de portada, Parte 2, conclusiones, Parte 3 y Parte 4.

## K. ENTREGA Y COMUNICACIÓN

Implementa directamente sobre el proyecto. Al terminar:

1. Describe qué vistas y archivos has modificado.
2. Explica cómo has mapeado cada grupo de imágenes y cuál es la nueva lógica del generador de contenidos.
3. Enumera solo las dudas reales que Ariadna deba aclarar, especialmente **el título correcto de la primera obra** y cualquier foto de planta cuya correspondencia sea incierta.
4. Indica resultados reales de pruebas y capturas; no afirmes que están verificadas si no las ejecutaste.
5. No hagas `git commit`, `push` ni despliegues sin autorización.

**Empieza leyendo el PDF de 40 páginas, el Markdown y los inventarios. Después implementa.**
