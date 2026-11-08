# Cuarta iteración editorial — 8 de noviembre de 2026

Implementada sobre la web existente, conservando las 17 rutas, el router, la navegación, las tipografías originales, el lightbox y los recursos locales. El bloque CSS original de `index.html` sigue íntegro; los ajustes se concentran en los componentes existentes y en `styles/integration.css`. No se ha hecho commit, push ni despliegue.

## Auditoría inicial

El proyecto ya integraba el documento actualizado de 40 páginas. La revisión detectó títulos de portada todavía abreviados, cabeceras académicas desproporcionadas, lectura completa de obras disponible únicamente desde el lightbox y fotografías del libro acumuladas después de su desarrollo. Las tintas concentraban los tres vídeos en preparación. Los títulos y varios textos editoriales estaban incrustados en JavaScript, lo que dificultaba su edición.

Se leyeron las instrucciones del proyecto, el encargo de esta iteración y su apartado 12, los documentos de estructura y fuentes, inventarios, Markdown y generador. Se guardaron capturas antes de modificar la composición. Se ha conservado el cambio del enlace del Bloc II que ya existía en el footer al comenzar.

## Cambios de presentación

| Área | Implementación |
|---|---|
| Portada | Franjas continuas beige, verde salvia, beige y marrón cálido, separadores finos, títulos completos de Bloc II y III a escala contenida. «Art i educació» conserva su encabezado sencillo. Bienvenida más proporcionada; cubiertas y grupo completos. |
| Header y footer | «ARTS VISUALS» tiene marco verde, padding y foco visibles. Revisados nombre, asignatura y curso 2026–2027. El menú conserva su comportamiento móvil y de escritorio. |
| Lectura | Párrafos largos justificados también en móvil, `lang="ca"`, separación de párrafos y anchura controlada. Negritas verdes de fragmentos literales, normalmente hasta dos por unidad; citas mucho menores. Puntos editoriales en los subapartados; listas semánticas conservadas. |
| Bloc II | Denominación académica literal, cabecera y subtítulo menores. «UN RECORREGUT EN QUATRE CAPÍTOLS» es una etiqueta pequeña. Foto de observación antes de los capítulos y foto de grupo después, sin recortar caras ni calabazas. |
| Museo | Diez fichas con reproducción completa, artista, técnica y primera frase literal. Imagen y resumen en paralelo en escritorio; apilados en móvil. Cada ficha incorpora su propio desplegable completo y conserva el lightbox. Riquer tiene tres elementos de lista, valoración y aplicación docente en párrafos separados. |
| Jardín y conclusiones | Se conservan collage, diez fotografías y asociaciones existentes, avances de observaciones y desplegables individuales. Las tres conclusiones completas siguen visibles con sus tres imágenes. |
| Libro | Desarrollo íntegro repartido en seis momentos, con fotos entre sus textos. Las unidades breves usan pares de imágenes; las extensas alternan texto e imagen. Visor identificado y pie corregido. Galería complementaria accesible, sin repetir las fotografías del relato. Dos vídeos verticales juntos en escritorio y apilados en móvil, con proporción natural y controles. |
| Tintas | Preparación, experimentación, papel y comparación reciben sus recursos pertinentes. El vídeo de las sustancias aparece en experimentación; el resultado final, en comparación. Tabla de materiales reconstruida desde el Markdown, sin una segunda copia de sus textos en JavaScript. Sin aviso de pendiente. |
| Bloc III | Título académico literal, reducido; se conservan sus cuatro accesos y los avisos discretos de contenido aún pendiente. |

Las mayúsculas de las denominaciones académicas exigidas se conservan literalmente. Los encabezados de proceso y los títulos editoriales utilizan una escala más tranquila. No se han suprimido las reflexiones para reducir la densidad.

## Recursos utilizados

Todas las rutas siguientes parten de `assets/actualizacion-2026-11-08/bloc-ii/`:

- Bloc II: grupo `part-3-llibre/img_5041.webp` y observación `part-2-passejada/img_4758.webp`.
- Libro, en orden de lectura: `img_4784`, `img_4795`; `img_5100`, `img_5101`; `img_5103`, `img_5105`; `img_5106`, `img_5107`; `img_5125`, `img_5127`; `img_4799`, todos `.webp` de `part-3-llibre/`. Las restantes fotos siguen en «Altres mirades del procés». Vídeos `img_5126.mp4` y `img_5128.mp4`.
- Tintas: `part-4-tintes/img_5189.webp` y `img_5192.webp` con preparación; vídeos `img_5191.mp4` y `img_5193.mp4` en esa fase. `img_5195.mp4` documenta experimentación; `img_5187.webp`, el soporte plegado; `img_5194.webp`, la comparación de resultados.
- Se mantienen las diez reproducciones del museo, las diez plantas, el collage, las fotos de conclusiones y las cubiertas bibliográficas.

Se abrió `img_5103.webp`: el visor rectangular de papel es visible sobre la composición. Su pie dice: «Visor utilitzat per seleccionar fragments de les composicions i construir el llibre d’artista “Natura viva”.» Los pies de las tintas se ajustaron después de revisar fotos y pósteres de vídeo; no se han atribuido fechas ni experiencias nuevas. El orden del libro es editorial, sin afirmar una cronología fotográfica documentada.

**Recurso no localizado:** no hay PNG universitario identificable entre los recursos entregados del repositorio. No se ha sustituido por un logotipo inventado ni descargado. Está reservado el identificador `universitat_logo` para el recurso correcto; su identidad, proporciones y uso deberán verificarse al incorporarlo.

## Edición manual y archivos

- `content/editables/`: nueve JSON para títulos, portada, subtítulos, textos breves, destacados, imágenes, pies, narrativa y mapa académico.
- `content/academic/`: 27 Markdown para propuestas, objetivos, reflexiones, procesos y materiales. Prevalecen sobre la extracción documental y no se sobrescriben.
- `content/OBRES_I_REFLEXIONS.md` y `content/ESPECIES_MONTJUIC.md`: mantienen las fichas estructuradas. El generador ya no sobrescribe el documento de especies ni sustituye sus correcciones silenciosamente.
- `scripts/editable_content.py`: carga y valida los ajustes, rutas, dimensiones y anclas de lectura. Genera `web-editables.js`; `source-content.json` conserva la extracción anterior a los ajustes para su cotejo.
- `scripts/build_content.py`: mantiene la extracción del documento de 40 páginas y aplica después las ediciones de la web. `content.js` y `editorial.js` siguen siendo salidas generadas.
- `scripts/app.js`, `views.js` y el nuevo `story.js`: presentación, navegación y composición por fases. Los títulos académicos tienen una única autoridad editorial en JSON, compartida con la navegación.
- `scripts/dev.py`: previsualización local y regeneración al guardar, sin dependencias adicionales. El proceso habitual requiere un solo comando.
- `COMO_EDITAR_LA_WEB.md`: guía con archivos y ejemplos reales, cómo destacar texto, sustituir fotos, añadir imágenes, regenerar y revisar.

El PDF y la transcripción original de 40 páginas no se han alterado. Las fuentes documentales y las ediciones de la web se distinguen expresamente; los archivos generados no son el lugar de edición manual.

## Comprobaciones efectuadas

| Comprobación | Resultado |
|---|---|
| Fidelidad documental y CSS | `python scripts/verify_content.py`: reflexiones, obras, especies y referencias cotejadas; CSS original conservado; 72 rutas de recursos locales existentes. |
| Responsive automatizado | `scripts/verify_browser.cjs`: 17 rutas × 375, 390, 430, 768, 1024 y 1440 px = 102 comprobaciones; 18 estados de pestañas. Sin desbordamientos ni enlaces internos a rutas inexistentes. |
| Contenido completo en navegador | Diez reflexiones de obras, diez observaciones, textos completos de lectura y conclusiones. Desarrollo del libro y cada fase de tintas comparados con sus datos íntegros. Los tres elementos de la lista de Riquer verificados. |
| Interacción | Menú móvil, submenús, pestañas con flechas/Home/End, desplegables con Enter/Espacio, diez ampliaciones, Escape, retorno y contención de foco, rutas inválidas. Apertura directa mediante `file://` conservada. |
| Multimedia | 72 respuestas locales correctas. Cinco vídeos reproducidos, con controles, pósteres y sin autoplay. Vídeos del libro comprobados en paralelo y con proporción vertical natural. |
| Contraste | 281 muestras de texto de lectura, destacados, etiquetas y pies en rutas, paneles y obras abiertas; mínimo medido 4,78:1. Es una comprobación de estos estilos, no una certificación integral WCAG. |
| Consola y red | Ningún error JavaScript ni respuesta local fallida en la ejecución final. |
| Edición persistente | `scripts/verify_editing.cjs`: título de portada, frase de Bloc II, palabra verde, foto, pie y Markdown académico modificados y comprobados en el navegador tras dos builds. Archivos editables intactos tras cada build; originales restaurados y datos finales regenerados. Fuente original intacta. |
| Desarrollo automático | `scripts/dev.py --port 8002`: respuesta HTTP 200 y regeneración al guardar detectada; bytes del contenido conservados. |
| Sintaxis y cambios | Comprobación sintáctica de JavaScript y `git diff --check`, sin errores. |

Evidencia guardada en `docs/verification/quarta-iteracio/`:

- `before/`: 14 capturas anteriores, a 390 y 1440 px, de inicio, Bloc II, museo, jardín, libro, tintas y Bloc III. En esa serie, libro/tintas se llaman `llibre`/`tintes`.
- `final/`: 24 capturas finales de las páginas principales, incluidos los tres paneles de la salida, y `report.json`. Libro/tintas se llaman `bloc-ii-p3`/`bloc-ii-p4`.
- `details/`: 17 capturas legibles de header, footer, menú, bienvenida, fichas, Riquer abierto, visor, vídeos y experimentación, en móvil y escritorio.
- `editing-report.json`: resultado de la prueba de edición persistente.

Se revisaron visualmente las series antes/después solicitadas y los detalles de lectura; no se informa únicamente de capturas producidas automáticamente.

## Pendientes documentales

Además del PNG universitario, siguen exclusivamente los puntos anteriores de `PENDENTS_ARIADNA.md`: título definitivo de la obra de Solé Duc y confirmación de tres asociaciones botánicas de certeza media. No se han inventado respuestas ni cambiado esas asociaciones.

Los apartados académicos aún sin texto de Ariadna —Bloc III y cierres— conservan «Pendent d’incorporar» discretamente. Las partes 3 y 4 del Bloc II están completas.
