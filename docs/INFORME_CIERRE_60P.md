# Informe de cierre documental y editorial — 60 páginas

Fecha: 11 de noviembre de 2026. Cambios implementados en el repositorio existente, sin commit, push ni despliegue.

## Fuentes y conservación

Se leyó íntegramente `PROMPT_CODEX_CIERRE_FINAL_60P.md`, junto con las instrucciones del proyecto, el mapa y el manifiesto de recursos. Los materiales nuevos de `Prompts/` se incorporaron de forma aditiva a `source/`, `content/`, `docs/` y `assets/document-60p/`, sin sustituir el código con una copia antigua.

La fuente principal es `source/ESTRUCTURA_ARIADNA_ACTUAL_60P.pdf`. Se cotejaron extracción, texto renderizado, tablas e imágenes con la transcripción y las páginas visuales del PDF: Bloc I, CDAN, taller, glosario y bibliografía. Las diez cartelas se revisaron visualmente y se asociaron según el mapa suministrado. Los 19 archivos incorporados coinciden byte a byte con los entregados.

La comparación con la extracción de 40 páginas confirma que los apartados anteriores conservan su texto, salvo los cambios documentados del taller y la cita de Freire. De los 27 Markdown académicos que existían, solo se modificaron `dyes.md` y `reading-reflection.md`; se añadieron seis archivos CDAN/artistas. Se actualizaron las páginas de procedencia de las fichas de obras. El bloque CSS original de `index.html` permanece intacto.

## Implementación

- **Taller:** título literal «PART 3_bis. TALLER DE TINTES NATURALS» en página, menús, capítulos y navegación; ruta canónica `#/bloc-ii/p3-bis-taller-de-tintes-naturals`. La antigua ruta p4 redirige sin duplicar la actividad. Se incorporaron propuesta, objetivos y reflexión completos; se conservaron fases, comparación, metodologías, tabla y vídeos. Bloc III conserva su numeración.
- **Bloc I:** referencia `(Freire, 2010, p.72)` y cuatro citas literales destacadas en negrita verde y cursiva, tanto en ideas resumidas como en la reflexión completa.
- **Museo:** diez cartelas reales en diez desplegables secundarios con ampliación accesible. Se mantienen las diez obras, sus reflexiones, los desplegables anteriores y la lista semántica de tres composiciones de Riquer.
- **CDAN:** subsección diferenciada con cartel, tres obras, dos reflexiones completas y cuatro imágenes. Se conserva explícitamente que Ariadna no asistió presencialmente. La reflexión de Aina Bestard incluye su continuación. Blackwell mantiene título, autora e imagen, sin reflexión inventada.
- **Per saber-ne més…:** página completa con Goldsworthy, Loren y Hill; cinco fotografías con títulos, autorías y fechas documentados, incluida Philippa Jones; reflexiones completas con ampliaciones independientes; tabla semántica de ocho conceptos y definiciones íntegras.
- **Bibliografía:** seis referencias utilizadas y cinco recomendadas en listas separadas. Enlaces conservados; solo se corrigieron saltos técnicos dentro de dos URL.
- **Lectura:** pie y alt corregidos de `img_4790.webp`; justificación y guionado en narración amplia; estilos de citas y cartelas; ancho móvil del glosario ajustado para evitar cortes de conceptos. Las rúbricas no se publican.

## Archivos y mantenimiento

El generador `scripts/build_content.py` trabaja con las 60 páginas y delega las nuevas extracciones en `scripts/document60.py`. `scripts/editable_content.py` conserva las ediciones manuales y valida cantidades, identificadores, recursos y alt. Las salidas JavaScript se regeneraron desde sus fuentes.

Los nuevos textos están en `content/academic/cdan-*.md` y `further-*.md`. La composición y asociaciones se editan en `content/editables/document60.json`; el glosario en `glosari.json` y las referencias en `bibliografia.json`. Se actualizaron los JSON editoriales pertinentes, `scripts/app.js`, `views.js`, el nuevo `document60.js`, estilos acotados y las pruebas. `AGENTS.md`, `ESTRUCTURA_WEB.md` y `COMO_EDITAR_LA_WEB.md` identifican ya la fuente vigente y cómo editarla.

## Comprobaciones

| Comprobación | Resultado |
|---|---|
| Dos ejecuciones consecutivas de `build_content.py` | Salidas idénticas; 47 archivos editables intactos |
| `verify_content.py` | Texto y CSS original conservados; 91 rutas de medios locales existentes |
| `verify_browser.cjs` | 17 rutas canónicas × 6 anchuras = 102 comprobaciones; 18 paneles; cinco vídeos reproducidos; HTTP y `file://`; sin errores de consola ni peticiones fallidas |
| `verify_document60.cjs` | Alias en seis anchuras; diez cartelas y ampliaciones; tres obras CDAN; cinco imágenes de artistas; ocho filas de glosario; referencias 6 + 5; textos completos; teclado y foco |
| `verify_editing.cjs` | Título, frase, negrita, fotografía, pie y texto académico persisten tras dos generaciones; entradas restauradas |
| `verify_academic_reading.cjs` | 34 visitas, 226 aperturas, 392 párrafos/elementos, 352 destacados y 12 citas; sin desbordamientos ni errores |
| `verify_09_nov.cjs` | 390/768/1440 px: tres conclusiones independientes y operables con teclado; vídeos centrados; dos fotos horizontales y lightbox correctos |
| Revisión visual | 390 y 1440 px: portada, Bloc II, ficha/cartela, CDAN, taller, artistas desplegados, glosario y bibliografía; ajuste móvil del glosario comprobado |
| `git diff --check` | Sin errores de espacios |

Las pruebas anteriores se adaptaron a la ruta canónica y a las imágenes de cartelas con carga diferida. Las capturas históricas se conservaron; los resultados nuevos están en `verification/cierre-60p/`.

Evidencias: [contenido nuevo y teclado](verification/cierre-60p/report.json), [regresión general](verification/cierre-60p/regression/report.json), [regeneración](verification/cierre-60p/generation-report.json) y [pruebas específicas](verification/cierre-60p/previous-checks/reading-report.json). Hay 16 capturas nuevas de páginas/secciones, 24 de regresión y una hoja de contacto de las diez cartelas.

Capturas de muestra: [CDAN escritorio](verification/cierre-60p/cdan-1440.png), [artistas escritorio](verification/cierre-60p/per-saber-ne-mes-1440.png), [artistas móvil](verification/cierre-60p/per-saber-ne-mes-390.png), [glosario móvil](verification/cierre-60p/glosari-390.png), [cartela móvil](verification/cierre-60p/obra-cartela-390.png).

## Material pendiente

No falta ninguna de las 19 imágenes documentales nuevas. El documento no aporta una reflexión individual de Elizabeth Blackwell; no se ha añadido ninguna. Bloc III, las conclusiones generales y las reflexiones personales finales siguen sin desarrollo propio en la fuente y mantienen sus avisos discretos. No se han reabierto asociaciones de especies ni fotografías ya confirmadas.
