# CODEX — ÚLTIMA ITERACIÓN DOCUMENTAL Y EDITORIAL · WEB ARIADNA

## Encargo y prioridad

Trabaja sobre **el repositorio existente de la web de Ariadna Angel Marco**. Esta es una actualización de contenido real y unos últimos ajustes de lectura. **NO es un rediseño, ni una migración tecnológica, ni una web nueva.** Conserva HTML/CSS editorial, fuentes, colores, navegación, hash router, galerías, lightbox, desplegables, imágenes optimizadas, vídeos y accesibilidad que ya funcionan.

El PDF más reciente, de **60 páginas**, sustituye como autoridad documental al anterior de 40 páginas:
- `source/ESTRUCTURA_ARIADNA_ACTUAL_60P.pdf` — **fuente primaria y definitiva**.
- `content/PDF_ACTUALITZAT_60P.md` — transcripción auxiliar para localizar los fragmentos (no prevalece sobre las páginas visuales y las tablas del PDF).
- `docs/MAPA_RECURSOS_NOVIEMBRE_60P.md` y `docs/MANIFEST_RECURSOS_60P.json` — correspondencia explícita de las **19 imágenes extraídas** del nuevo PDF.
- `assets/document-60p/cartelas/` (10 cartelas), `assets/document-60p/cdan/` (4 imágenes) y `assets/document-60p/per-saber-ne-mes/` (5 imágenes).

Esta incorporación es ADITIVA: no borres recursos anteriores ni sobrescribas por accidente el código más reciente del repositorio con una instantánea del ZIP. La carpeta `.git` NO es necesaria para estos documentos; preserva la historia Git que ya existe localmente. Antes de comenzar, revisa `git status`, `AGENTS.md`, `COMO_EDITAR_LA_WEB.md`, las rutas y la arquitectura actual.

## Regla documental INNEGOCIABLE

Todos los títulos académicos, nombres de obras, citas, textos de Ariadna, propuestas, objetivos y referencias deben respetar el documento más reciente. **No inventar, resumir ni reescribir en primera persona las reflexiones**. Una síntesis editorial puede seguir existiendo como presentación, pero el contenido académico completo debe permanecer íntegro y accesible. Si hay una divergencia entre el resumen anterior, los Markdown antiguos de 40 páginas y el PDF nuevo, revisar cuidadosamente y actualizar la capa editable **sin eliminar cambios manuales ajenos a los apartados modificados**. El PDF de 60 páginas es la fuente de la versión académica vigente.

No publicar textos como «extraído del PDF», «documento página 14», «texto original de Ariadna» ni estados internos de seguimiento. Conservar las secciones que de verdad siguen sin desarrollar con el indicador discreto ya existente.

## 1. CAMBIO DE DENOMINACIÓN Y ORDEN — BLOC II, PART 3_BIS

La actividad que aparecía como **«PART 4. EXPERIMENTEM AMB TINTES VIVES»** debe pasar a denominarse **«PART 3_bis. TALLER DE TINTES NATURALS»**, literalmente como en la página 41 del nuevo PDF.

Aplica esta denominación a: página, título académico, subtítulo, tarjetas y listado de capítulos del Bloc II, índice de portada si aparece, navegación escritorio y móvil, migas de pan, accesos anterior/siguiente, metadatos editoriales, pies de vídeo donde proceda, y documentación visible. El orden del Bloc II debe ser **PART 1, PART 2, PART 3, PART 3_bis**. No modificar la numeración del Bloc III.

Rutas: define, si la arquitectura lo permite, la ruta canónica `#/bloc-ii/p3-bis-taller-de-tintes-naturals`; conserva la URL antigua `#/bloc-ii/p4-experimentem-amb-tintes-vives` como alias/redirect compatible para que los enlaces previos no se rompan. El regex actual de las rutas (`/\/p(\d)-/`) no reconocerá `p3-bis`: actualiza la derivación de etiquetas para que **PART 3_bis** no se convierta en «PART 3», «PART 4», `undefined` o un índice automático incorrecto. Lo mismo ocurre con `chapterLinks`, que numera por posición. No dupliques la actividad en el menú.

**No hace falta renombrar la carpeta física** `assets/actualizacion-2026-11-08/bloc-ii/part-4-tintes/` si eso rompe referencias: la URL académica y la ubicación física de recursos son asuntos distintos.

## 2. NUEVO TEXTO DEL TALLER DE TINTES NATURALS

En las páginas **41–44** hay una propuesta y unos objetivos sustancialmente distintos, y ahora también una reflexión final propia.

- Sustituye la **Proposta** anterior por la nueva, que comienza «Elaborarem tintes naturals a partir d’elements botànics com vegetals i espècies» y desarrolla la preparación artesanal, la experimentación sobre soportes, la observación de color/texturas/transparencias y la reflexión conjunta.
- Sustituye los **Objectius** anteriores por los nuevos: comprensión vivencial de la transformación de elementos botánicos en color y asimilación del valor pedagógico del proceso, juego, duda y error. Conservar el texto literal de la página 41 (no convertir en una lista de objetivos inventados).
- Conservar e integrar el **Desenvolupament i resultats** en sus tres fases, la comparación de remolacha y col lombarda y las metodologías y materiales ya existentes. No perder fotos ni cinco vídeos de todo el proyecto.
- Añadir íntegramente la **Reflexió** nueva de la página 43, que empieza «Aquesta proposta m’ha fet adonar que l’elaboració de tintes naturals…», con la reflexión docente y de aprovechamiento sostenible. Ubicarla en un bloque visual diferenciado, sin sustituir el resto de contenido.
- Conservar los cuadros de materiales y los detalles sobre pigmentos/pH tal como constan en la fuente. No reescribir conclusiones científicas por cuenta propia.

El generador `scripts/build_content.py` **todavía espera `assert len(PAGE)==40`**, busca el encabezado `PART 4. EXPERIMENTEM AMB TINTES VIVES` y lee la bibliografía desde `PAGE[40]`. Actualiza la extracción por secciones académicas para las 60 páginas, cambia los delimitadores y protege las ediciones manuales de `content/academic/`. Si `WEB.narrativa.tintes_apartats` divide el contenido por substrings exactos, verifica los encabezados nuevos y evita secciones vacías o trozos repetidos. No editar `scripts/content.js`, `editorial.js` o `web-editables.js` como única solución: son salidas generadas.

## 3. BLOC I — CAMBIOS DOCUMENTALES Y CITAS

Comparar la versión anterior de `content/academic/reading-reflection.md` y los textos renderizados con las páginas **8–10** del PDF vigente. Incorporar todos los pequeños cambios reales sin sobrescribir silenciosamente mejoras editoriales ya aprobadas. Revisar particularmente:
- Cita de Rachel Carson sobre explorar la naturaleza, con atribución **(Carson, 2012, p. 16)**.
- Citas de Carson «no es ni siquiera la mitad de importante conocer como sentir» y «la tierra fértil en la cual la semilla debe crecer», con las referencias del documento.
- Cita de Heike Freire «la intensidad de sus juegos, la sensibilidad y creatividad de sus aprendizajes», ahora con **(Freire, 2010, p.72)**.

En las ideas resumidas y en el desplegable de reflexión completa, **destacar las citas textuales de ambas autoras con negrita verde y cursiva**. Conservar literalmente comillas, palabras, atribuciones y números de página; no transformar títulos de libros en citas. Ajustar `content/editables/lectura-academica.json` o la capa editable que utiliza `academicInline`, de manera persistente tras regenerar. Evitar exceso de destacados.

## 4. BLOC II, PART 2, PROPOSTA 1 — DIEZ OBRAS, CARTELAS Y NUEVA SECCIÓN CDAN

### 4.1 Diez obras originales y fotografías de cartelas

Conservar las **diez fichas del MNAC/Mater** y sus fotografías de obras, su información artística y la reflexión/propuesta completa existente. Añadir la cartela correspondiente en cada ficha, usando exactamente las 10 imágenes suministradas en `assets/document-60p/cartelas/`, del 01 al 10, asociadas en `docs/MAPA_RECURSOS_NOVIEMBRE_60P.md`.

Diseño: en cada ficha incluir un botón/pestaña/miniatura «Veure cartel·la» o un desplegable secundario. Permitir ampliar la cartela con lightbox accesible, sin sustituir la fotografía artística principal ni convertir todas las fichas en pantallas interminables. Preservar los dos despliegues actuales, la lista separada de las tres composiciones de Alexandre de Riquer, y la compatibilidad móvil. **No inventar texto ilegible de las cartelas.** La obra de Solé Duc conserva el título aprobado «Verd de coure sobre tela reciclada».

### 4.2 Material complementario sobre CDAN (págs. 24–27)

Después de las diez obras aparece un **nuevo apartado escrito por Ariadna**. Incorporarlo en la misma PART 2, PROPOSTA 1, como subsección editorial diferenciada (p. ej., «Altres referents: il·lustració botànica»), sin alterar la estructura principal exigida por las profesoras.

**Atención a la autenticidad:** Ariadna declara explícitamente que **NO asistió presencialmente a la salida al CDAN**. Conoció las obras mediante una carpeta facilitada por las profesoras y explicaciones de compañeras. Hay que conservar ese párrafo y NO redactar «durante mi visita al CDAN observé…», ni mezclar estas obras con las diez seleccionadas presencialmente. No renumerar las diez fichas originales a trece.

Obras y materiales, con textos íntegros del PDF:
- Pág. 24: cartel de «Ellas ilustran botànica» e introducción personal de Ariadna.
- Pág. 25: **Orchidaceae of Mexico and Guatemala**, Sarah Anne Drake y Augusta Innes Withers, reflexión completa.
- Pág. 26: **Paisatges perduts de la Terra**, Aina Bestard, reflexión completa continuada en la pág. 27.
- Pág. 27: **A Curious Herbal**, Elizabeth Blackwell (imagen y denominación tal como constan en el PDF; no inventar reflexión individual si el documento no la aporta).

Usar las cuatro imágenes de `assets/document-60p/cdan/`. Las reflexiones deben respetar párrafos y cortes semánticos, con imágenes distribuidas, no todo en un bloque final. Para las obras donde el PDF no facilita una reflexión extensa, no inventarla. En el informe final identificar qué material procede del nuevo PDF y si hay puntos pendientes.

Conservar las dos propuestas de PART 2: **PROPOSTA 1. VISITA MUSEU MNAC** y **PROPOSTA 2. DIÀLEG AMB EL JARDÍ**. No reincorporar una tercera propuesta «Educar a través de les arts», que Ariadna pidió retirar.

## 5. PER SABER-NE MÉS… — IMPLEMENTACIÓN COMPLETA (PÁGS. 46–53)

La web aún muestra un aviso pendiente, pero ahora hay contenido real. Sustituirlo por una página académica terminada, con un diseño editorial consistente, tres secciones de artista y un glosario:

1. **Andy Goldsworthy — Ríos y mareas** (pág. 46–48): reflexión íntegra sobre la creación efímera y la práctica educativa; imágenes **Rowan Leaves Laid Around a Hole (1987)** y **Reconstructed Icicles (2010)**.
2. **Lucía Loren — Art i ecologia** (pág. 49): reflexión íntegra; imagen **Matriz de agua (2018)**.
3. **Martin Hill — El cercle de la vida** (págs. 49–51 y 53): reflexión íntegra; imágenes **Sunrise circle (2011)** y **Store Circle (1992)**, acreditadas junto a **Philippa Jones** cuando así figura en el PDF.

Las cinco imágenes están en `assets/document-60p/per-saber-ne-mes/`. Verificar las parejas imagen/autor/título por el mapa. Alternar fotografías y texto; usar desplegables para ampliaciones o contenido largo, no esconder toda la página detrás de un único botón. Los desplegables deben abrirse con teclado y conservar foco y contexto.

### Glosari (págs. 51–52)

Incorporar el **glosario completo de ocho entradas**, en el orden del documento, sin abreviar las definiciones: **Pedagogia verda, Pigment, Frottage, Superposició, Abstracció, Llibre d’artista, Visor, Land Art**.

Utilizar una **tabla HTML semántica** con encabezados `Concepte` y `Explicació`, filas con suficiente espaciado y diseño coherente con la paleta beige/verde. Puede estar dentro de un desplegable «Glosari» inicialmente cerrado. En móvil asegurar legibilidad y que no hay desbordamiento horizontal sin control; si se adopta un contenedor con scroll horizontal, que sea accesible y evidente. El glosario continúa en la pág. 52: no perder entradas por un salto de página.

No incluir en la página web las **rúbricas de evaluación** de las páginas 55–60. Úsalas únicamente como lista interna de control de calidad académico y navegación si resulta útil.

## 6. REFERÈNCIES BIBLIOGRÀFIQUES — PÁG. 54

Actualizar el apartado completo, separando claramente:
- **REFERÈNCIES BIBLIOGRÀFIQUES:** las seis referencias utilizadas que figuran en el PDF (Arte Informado/Lucía Loren; Carson; Freire; Iwai; RTVE/Goldsworthy; Zona Libre Radio Online/Martin Hill).
- **Bibliografia recomanada per l’assignatura:** las cinco referencias que figuran bajo este subtítulo (Álvarez-Valdivia y Morón-Velasco; Eisner; Freire; González; Hoyuelos).

Transcribir datos, fechas, autores y enlaces desde la versión de 60 páginas, sin añadir referencias no documentadas ni suprimir las nuevas. Respetar la grafía original salvo errores tipográficos puramente técnicos de extracción (saltos de URL), que deben corregirse sin cambiar el destino. No deduplicar entradas de diferentes secciones que puedan referirse a publicaciones distintas. Conservar la presentación de bibliografía académica y su navegación; solo añadir imágenes cuando sean genuinamente pertinentes, no decoración aleatoria.

## 7. CORREGIR PIES DE FOTO Y DESCRIPCIONES

Buscar **todas** las apariciones de «Fulles verdes amb nervis visibles», incluyendo pies visibles, alt, galerías, lightbox, versiones editables y generados (solo cambiar fuentes, después regenerar). El archivo revisado es:
`assets/actualizacion-2026-11-08/bloc-ii/part-3-llibre/img_4790.webp`.

Sustituir por un pie más preciso, contextual y neutro: **«Fulles amples observades a l’hort de les temptacions»**. Alt sugerido: **«Fulles amples i arrodonides entre la vegetació de l’hort»**. No atribuir especie botánica sin confirmación y no aplicar este pie indiscriminadamente a fotografías distintas.

Verificar las imágenes nuevas de artistas, de CDAN y de las cartelas; alt descriptivo en catalán, título/autor si está documentado, ampliación real mediante el lightbox.

## 8. JUSTIFICACIÓN, DESTACADOS Y LIMPIEZA EDITORIAL

Revisar las páginas actuales y las nuevas. Hay párrafos largos que todavía no se justifican, especialmente dentro de desplegables, fichas de obras, conclusiones, Bloc I y «Per saber-ne més…». Aplicar justificación coherente a texto narrativo amplio, con `lang="ca"`, `hyphens: auto`, ancho de lectura razonable e interlineado suficiente. No justificar encabezados, tablas, pies breves ni listas; en móvil corregir los huecos excesivos sin forzar una mala composición.

Destacar **fragmentos realmente significativos** mediante negrita verde y, de manera muy selectiva, subrayado; las citas textuales de autoras deben mostrarse en negrita cursiva. Limitar la densidad de destacados para que mantengan valor editorial. Conservar íntegramente los textos y no usar reemplazos globales que alteren citas, HTML o referencias. No crear una cascada de tarjetas decorativas: mantener la elegancia actual.

## 9. ARQUITECTURA ACTUAL A RESPETAR

En la copia recibida se identificaron:
- `scripts/build_content.py`: extracciones y datos generados (hoy anclado a 40 páginas).
- `content/academic/*.md`: ediciones manuales que prevalecen sobre la extracción, **actualizar los archivos pertinentes con el nuevo contenido**, no ignorarlos ni sobrescribir cambios de otras áreas.
- `content/editables/titulos.json`, `paginas.json`, `mapa-academic.json`, `lectura-academica.json`, `pies-de-foto.json`, `imagenes.json`: fuente para títulos, presentaciones, estilos textuales y medios.
- `content/OBRES_I_REFLEXIONS.md`, `content/ESPECIES_MONTJUIC.md`: fichas estructuradas; conservar el mapeo de las diez plantas confirmado previamente.
- `scripts/app.js`, `views.js`, `story.js`: componentes, router, pestañas y detalle académico.
- `styles/integration.css`: ajustes de estilo con CSS original respetado.
- `scripts/content.js`, `scripts/web-editables.js`, `scripts/editorial.js`, `scripts/source-content.json`: salidas de generación, NO fuente de verdad.

Comprueba primero si en el checkout real hay modificaciones posteriores al ZIP y respétalas. Puedes ampliar la estructura de datos para añadir `cartela`, `obras_cdan`, `per_saber_ne_mes` y `glosari`, pero evita duplicar texto en varias fuentes autoritativas. Añade validaciones que fallen claramente si faltan contenidos o recursos. No trasladar material académico a textos incrustados en JavaScript como única implementación.

## 10. VERIFICACIÓN OBLIGATORIA Y CRITERIOS DE ACEPTACIÓN

Completa la actualización y después:
1. Compara la nueva extracción y web con el PDF por apartados, **incluidas las tablas y las imágenes**. Documenta brevemente qué cambió desde el PDF de 40 páginas.
2. Ejecuta `python scripts/build_content.py` dos veces y `python scripts/verify_content.py`; confirma que las ediciones manuales persisten.
3. Ejecuta las pruebas JS y de navegador que ya usa el proyecto (`scripts/verify_browser.cjs`, pruebas específicas), adaptándolas a la ruta canónica nueva y su alias. No mantengas una aserción de exactamente 17 rutas si ahora hay una ruta alias adicional; prueba todas las rutas reales.
4. Comprueba las **10 cartelas**, las 10 fotografías principales de museo, 10 especies, 3 nuevas obras/contexto CDAN, 3 artistas y 5 imágenes de «Per saber-ne més…», 8 filas del glosario y las 6 + 5 referencias bibliográficas.
5. Verifica especialmente que el párrafo «Tot i que no vaig poder assistir presencialment a la sortida al CDAN…» esté presente, y que NO existan frases que falseen esa circunstancia.
6. Comprueba **PART 3_bis. TALLER DE TINTES NATURALS** en todas las vistas, enlaces y navegación; la ruta antigua sigue resolviendo.
7. Verifica la nueva propuesta, objetivos y reflexión de tintes, el cambio de Freire a **p.72**, y el pie corregido de `img_4790.webp`.
8. Capturas a **390 px y 1440 px** de portada + índice BII, museo con ficha y cartela abierta, CDAN, taller tintes, «Per saber-ne més…» desplegado y glosario, bibliografía. Inspección visual: proporciones, justificación, imágenes correctas, ausencia de desbordamientos y errores de consola.
9. Mantén menú móvil, tabs, `<details>`, lightbox, teclado, Esc, vídeos y apertura estática `file://` si es compatible con la arquitectura actual. No añadir API, DB ni backend.
10. Comprueba que las referencias a imágenes y sus `alt` están enlazadas con archivos locales reales. No inventar cartel·les ni datos de autores.

### Entrega del trabajo

Implementa los cambios directamente en el repositorio. Al terminar, entrega un informe breve y verificable con: archivos modificados, secciones nuevas, número de cartelas integradas, imágenes faltantes si las hubiera, tests ejecutados con resultados y decisiones técnicas relevantes. En `docs/INFORME_CIERRE_60P.md` deja constancia de la revisión de fuentes.

**NO hagas commit, push ni despliegue**. Yo revisaré el resultado antes de consolidarlo.
