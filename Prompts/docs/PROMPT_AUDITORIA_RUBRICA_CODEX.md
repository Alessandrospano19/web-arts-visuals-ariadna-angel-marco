# PROMPT PARA CODEX - Auditoria del portfolio de Ariadna contra la rúbrica original

## 0. Rol y objetivo

Actua como **auditor academico, documental y de experiencia de usuario**. Debes **contrastar los criterios de evaluación oficiales con el estado real del portfolio** y elaborar un diagnostico objetivo, accionable y respaldado por evidencias. El objetivo es detectar exactamente que falta para acercarnos al **nivel 4 en cada una de las cuatro rúbricas**.

**ESTA EJECUCION ES SOLO DE AUDITORIA, NO DE CAMBIOS.** No modifiques HTML, JavaScript, CSS, contenido academico, imágenes, PDFs, generador ni datos. No hagas commit, push o despliegue. Puedes crear unicamente informes y capturas en `docs/auditoria-rúbrica/`.

## 1. Fuentes obligatorias y prioridad

1. **`source/RUBRICA_ORIGINAL_2026.pdf` (2 páginas).** Autoridad sobre exigencias y puntuaciones. Las tablas estan incrustadas como imágenes, por lo que debes renderizarlas o visualizarlas; extraer texto plano NO basta.
2. **`docs/MATRIZ_RUBRICA_ORIGINAL.md`.** Guia de cotejo y desgloses de criterios. Si difiere del PDF, prevalece el PDF original.
3. **Documento academico ACTUAL de Ariadna (60 páginas)**: localizar `source/ESTRUCTURA_ARIADNA_ACTUAL_60P.pdf` y/o copia equivalente. Contrastarlo con `content/PDF_ACTUALITZAT_60P.md` si existe. Es la fuente de texto, títulos, reflexiones, glosario, cartelas, bibliografía y rúbricas contextualizadas.
4. **Fuentes del repositorio**: `content/academic/`, `content/editables/`, `content/OBRES_I_REFLEXIONS.md`, `content/ESPECIES_MONTJUIC.md`, inventarios de assets, configuracion de rutas y archivos generados.
5. **La web real renderizada** en el navegador local: es lo que evaluara la profesora. Nunca basta con que una frase exista en Markdown si NO aparece en la web o se ha ocultado erroneamente.

Los informes de Codex anteriores, capturas de otras versiones y pruebas previas pueden orientar, pero NO prueban el estado actual.

## 2. Comprobacion preliminar obligatoria (preflight)

- Leer `AGENTS.md`, `README.md` y la documentacion de arquitectura.
- Ejecutar `git status --short` y anotarlo sin tocar ni limpiar el checkout.
- Identificar el PDF academico realmente vigente y comprobar su número de páginas. **Si el proyecto solo tiene el antiguo documento de 40 páginas, declarar `BLOQUEO DE FUENTE 60P` y NO afirmar que el contenido actualizado esta incorporado.** Precisar archivo que falta. Se permite auditoria provisional de lo que esta presente, marcada como tal.
- Comprobar que la rúbrica original tiene exactamente 2 páginas; leer las cuatro tablas visualmente con sus niveles 4/3/2/1/0.
- Determinar fuentes editables y archivos generados, como `scripts/build_content.py` y `scripts/content.js`, sin alterarlos. Documentar posible desfase entre fuente de 60p, datos generados y página renderizada.
- Descubrir las rutas reales leyendo el router: NO asumir que siguen siendo exactamente 17 ni que las rutas viejas existen. Buscar introducción, Bloc I, Bloc II P3, P3_bis, Per saber-ne més y bibliografía.
- Identificar el entorno de previsualizacion y las pruebas existentes (`scripts/verify_content.py`, `scripts/verify_browser.cjs`, etc.). Evitar builds o procesos de regeneracion que cambien archivos de trabajo en esta fase; si para probar es necesario generar, trabajar en copia temporal o explicar el limite.

**Distingue TRES estados diferentes:** 1) aparece en PDF; 2) esta en fuentes editables; 3) lo puede encontrar y leer alguien en la web. Un apartado no cumple por existir solo en el estado 1 o 2.

## 3. Metodo de cotejo por requisitos

Para cada condicion de cada rúbrica registrar:

- ID del criterio (R1.1, R1.2, ... R4.n).
- Requisito oficial y **página del PDF de rúbrica** (1 o 2).
- Referencia al contenido academico de 60p cuando proceda (página y título).
- Archivo fuente y, si aplica, identificador de contenido que termina renderizado.
- Ruta de la web y localizacion visible (seccion, pestana, desplegable, figura).
- Prueba concreta (texto literal verificable, selector del DOM, foto, screenshot).
- Estado: **COMPROBADO / PARCIAL / AUSENTE / NO COMPROBADO / PENDIENTE DE CONTRASTE**.
- Brecha respecto al nivel 4 y solucion minima propuesta.

No aceptar expresiones vagas como `correcto`, `parece bien` o `ya estaba implementado` sin prueba enlazada. NO redactar ni inventar frases que no esten en el documento de Ariadna.

## 4. RUBRICA 1: Introducció Web (PDF rúbrica página 1)

Comprobar cada elemento del descriptor de nivel 4 separadamente:

1. Se explica la importancia del **arte y la creatividad en Educación Infantil**.
2. Se recogen ideas importantes de la conferencia, no solamente un resumen introductorio.
3. Se identifican posibles **propuestas y aplicaciones didacticas**.
4. Se explica la dimension de **estrategias metodologicas**.
5. Se reflejan **materiales y recursos**.
6. Se analiza el **rol del educador** en la expresion artística infantil.
7. Hay **citas del propio conferenciante** bien atribuidas. Diferenciar estas de citas de pensadores o libros que Ariadna menciona.
8. La reflexion completa es localizable, legible y no pierde texto frente a la fuente original.
9. **Asistencia real**: requiere confirmacion de Ariadna; el texto narrado en primera persona no equivale a verificacion independiente de asistencia.

Evidenciar por que se considera nivel 4, 3, etc. No justificar el 4 exclusivamente por longitud del texto o por subrayados verdes.

## 5. RUBRICA 2: Bloc I - Art i educació (PDF rúbrica página 1)

1. Comprobar ideas principales de **Rachel Carson** y **Heike Freire**, ambas desarrolladas sustantivamente.
2. Existencia de **argumentacion crítica personal**, no solo reproduccion de ideas.
3. Coherencia con lecturas y tematicas pedidas; relacion explicita con futura práctica docente.
4. **Citas textuales de las dos autoras** incorporadas de forma fiel y con referencias.
5. Comprobar frente a la version de 60p las incorporaciones recientes a la reflexion, especialmente las citas y referencias de páginas.
6. Verificar el texto **completo dentro de los desplegables**, y que el formato no oculte citas o corte reflexiones.

Si las citas provienen de fuentes distintas o solo estan en el resumen, indicar el problema concreto. NO crear citas para elevar artificialmente la puntuacion.

## 6. RUBRICA 3: Part 3 Descripció del jardi + Part 3_bis Taller amb tintes naturals (PDF rúbrica página 1)

Evaluar el CONJUNTO de las dos partes, con evidencia individual para cada aspecto:

- Observacion profunda, sensible y personal del entorno del huerto, con interpretacion visual reconocible.
- Diversidad de técnicas y recursos (dibujo, pintura, estampacion, frottage, pigmentos naturales) y justificacion de sus elecciones.
- Coherencia del **libro de artista Natura viva**: proceso de observacion/recogida, experimentación, seleccion mediante visor, montaje, formato, obra terminada y reflexion.
- Fotos y videos relevantes colocados en fases correctas, con pies reales y sin piezas cortadas o mal orientadas.
- **Taller de tintes naturales**: título exacto vigente **`PART 3_bis. TALLER DE TINTES NATURALS`** en menu, portada, títulos, footer y ruta/canonical display. No mantener visible el título antiguo `PART 4. EXPERIMENTEM AMB TINTES VIVES`.
- Propuesta y objetivos nuevos del PDF de 60p; preparacion de tintes, fases experimentales, colores, pruebas, comparacion, resultados, reflexion, estrategias y materiales.
- Documentacion completa del proceso y del resultado. No confundir tener una foto con explicar el aprendizaje o la intencion pedagogica.
- Representaciones no estereotipadas, decisiones creativas justificadas, valor educativo de observar y transformar la materia.
- **Asistencia/participación en talleres**: marcar como verificable solo por Ariadna, no mediante tests ni por la existencia de fotos.

Respetar diferencia documental: la rúbrica utiliza el encabezado `Taller amb tintes naturals` y el texto academico actualizado exige `TALLER DE TINTES NATURALS`. Para la web, usar el título academico de Ariadna.

## 7. RUBRICA 4: Disseny de la web, Per saber-ne més... (PDF rúbrica página 2)

La tabla diferencia expresamente el nivel **4** del **3** por la ampliacion real de contenidos en `Per saber-ne més...`. Verificar:

1. Navegacion clara, estructura de bloques y denominaciones academicas literales, accesos a todas las páginas y desplegables, indice y footer coherentes.
2. Buenas imágenes que aportan información real (observacion, proceso, resultados, obras, plantas), no fotos estereotipadas elegidas solo por estética.
3. Textos bien redactados, justificados donde procede, parrafos legibles, citas y terminos destacados sin abusos; buena experiencia a **390px y 1440px**.
4. Proceso del jardín/libro/tintas documentado con fotos en el momento narrativo correcto, no concentradas sin contexto.
5. **BIBLIOGRAFIA:** identificar y contar las **6 referencias utilizadas** y las **5 referencias recomendadas por la asignatura**, segun página 54 del PDF de 60p; presentarlas en grupos diferenciados con datos exactos, sin duplicados.
6. **PER SABER-NE MES...:** no basta un enlace vacio. Comprobar **Andy Goldsworthy (2 fotos de obras), Lucia Loren (1 foto), Martin Hill (2 fotos)**, sus reflexiones originales y el valor educativo y artistico que aportan.
7. **GLOSARIO:** tabla de **8 conceptos** con su definicion: Pedagogia verda, Pigment, Frottage, Superposicio, Abstraccio, Llibre d'artista, Visor, Land Art. En movil la tabla debe poder leerse sin recortes.
8. Material visual y audiovisual relevante que amplie contenidos, citando rutas de los recursos y comprobando que el lector puede abrirlos.
9. Verificar los bloques de contenido y finales pendientes sin atribuirles textos inventados.
10. **Participacion en clase:** NO COMPROBADA por el repositorio; requiere confirmacion personal.

Si el apartado Per saber-ne més o la bibliografía reflejan la antigua version de 40p, indicar una brecha **P1** aunque todas las pruebas técnicas pasen.

## 8. Verificaciones transversales que respaldan la evaluación (NO rúbricas adicionales)

Contrastar con el documento academico de 60p sin crear una puntuacion nueva:

- **MNAC, Bloc II Part 2 Proposta 1:** 10 obras con nombre/artista/técnica, reflexion, foto principal y **cartelas correctas asociadas individualmente**. Verificar que no se confundan fotografías principales con sus cartelas.
- **CDAN / exposiciones de ilustracion botanica:** material nuevo de las páginas 24-27; Ariadna **no asistio presencialmente**. Revisar que el contenido no afirme lo contrario y que incorpora reflexiones/obras realmente documentadas.
- **Passejada Montjuic:** diez plantas y diez fotografías individuales, collage, observaciones sensoriales y conclusiones completas en tres desplegables accesibles.
- **Part 3 / 3_bis:** coherencia de títulos y numeracion despues del cambio desde P4; comprobar enlaces, hash, navegación interna y rutas directas. Se puede conservar compatibilidad con URLs antiguas mediante redireccion, pero nunca mostrar nombre obsoleto en interfaz.
- **Pie de foto de img_4790.webp:** verificar que no aparezca el antiguo pie generico `Fulles verdes amb nervis visibles` donde no corresponde; el reemplazo debe describir fielmente lo visible sin inventar especie.
- **Apartados pendientes de Bloc III y cierres:** identificar cuales no tienen texto en la fuente y cuales se omitieron accidentalmente; nunca rellenar vacios con contenido inventado.

## 9. Calificacion orientativa (sin inventar nota oficial)

Para cada rúbrica R1 a R4:

- Proponer un **nivel orientativo 0 a 4**, justificado mediante el descriptor correspondiente de la tabla original y evidencias reales de la web.
- Si hay requisitos de asistencia o participación, indicar la condicion **PENDIENTE DE VERIFICACION HUMANA**, y no presentarlo como puntuacion oficial definitiva.
- Diferenciar `AUSENTE`, `PARCIAL`, `NO COMPROBADO` y `PENDIENTE DE CONTRASTE`. No penalizar como ausente un hecho que simplemente no puede probarse desde el codigo.
- **No calcular nota final ponderada**. El PDF de rúbricas marca `15%` junto a la tabla de diseño, pero no contiene el cuadro completo de ponderaciones.
- Priorizar los defectos por impacto real en la rúbrica: **P0** bloqueo de fuente, seccion o build; **P1** impide acreditar nivel 4; **P2** lectura/accesibilidad/documentacion mejorable; **P3** acabado opcional.
- Identificar los cambios de maximo retorno: no recomendar remodelar toda la web para arreglar una cita o un pie de foto.

## 10. Pruebas y capturas de contraste

Utilizar preferentemente los verificadores existentes y navegación real. Si las pruebas requieren modificar fuentes por regeneracion, usar una **copia temporal** del repo o limitarse a lectura y registrar el bloqueo sin sobreescribir trabajo del usuario.

- Captura en **390 px y 1440 px**: introducción/reflexion, Bloc I/citas, Part 3/proceso del libro, Part 3_bis/tintas, página Per saber-ne més (incluyendo tabla de glosario) y bibliografía.
- Abrir los **desplegables**, no limitarse a la vista plegada. Comprobar integridad textual frente a la fuente.
- Verificar 5 videos cuando esten disponibles, fotos de proceso, cartelas, lightbox, menus, enlaces, menu movil y ausencia de roturas.
- Ejecutar verificaciones que correspondan a la version realmente instalada; registrar comandos, resultado, fecha del informe y limitaciones.
- Las 102 verificaciones responsive anteriores son utiles, pero no demuestran por si solas suficiencia de citas, profundidad de reflexion, participación o calidad educativa.

## 11. Entregables OBLIGATORIOS (sin cambiar la web)

Crear solo dentro de `docs/auditoria-rúbrica/`:

### A. `INFORME_EVALUACION.md`

- Estado inicial: checkout, commit, fuentes presentes, version de PDF (40 o 60), rutas principales y posibles desajustes fuente -> contenidos -> navegador.
- **Matriz de cobertura por subcriterio**, con estas columnas:

| ID | Rúbrica / exigencia | PDF fuente | Archivo local | Ruta visible | Evidencia / captura | Estado | Brecha para nivel 4 | Prioridad |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

- Tabla de conclusion por bloque:

| Rúbrica | Nivel orientativo 0-4 | Evidencia a favor | Que falta para nivel 4 | Necesita confirmacion humana |
| --- | --- | --- | --- | --- |
| R1 Introducció | ... | ... | ... | ... |
| R2 Bloc I | ... | ... | ... | ... |
| R3 Jardín + tintas | ... | ... | ... | ... |
| R4 Web + saber más | ... | ... | ... | ... |

### B. `PLAN_CORRECCIONES.md`

Solo incidencias reales, **ordenadas de P0 a P3**. Para cada una: archivo(s), ruta, problema concreto, motivo rúbricado, correccion minima recomendada, riesgo de regresion, criterio de aceptacion y responsable (`Codex`, `Ariadna`, `confirmacion personal`). Resaltar **5 correcciones prioritarias** que más contribuyan al nivel 4.

### C. `PRUEBAS_Y_CAPTURAS.md` y `capturas/`

Capturas de estados relevantes con ruta exacta y ancho de pantalla. Reportar pruebas realizadas y las que no se ejecutaron, sin afirmar verificacion inexistente.

## 12. Restricciones estrictas

- **No reescribir ni acortar las reflexiones personales de Ariadna**. El cotejo es evaluativo, no creativo.
- **No inventar citas, referencias, artistas, cartelas, fotos, fechas, asistencia o participación.**
- No incorporar la rúbrica a la web publica; es material de evaluación interna.
- No modificar JS generado, Markdown academico, CSS ni ninguna fuente del producto durante la auditoria.
- No instalar frameworks ni reestructurar el proyecto; no hacer commit/push/despliegue.
- Si el PDF de 60 páginas aun no fue incorporado, senalarlo explicitamente y suspender cualquier conclusion de cumplimiento documental definitivo.

**Entrega al finalizar un resumen ejecutivo breve en espanol con: nivel orientativo en los cuatro criterios, tres brechas más graves, cinco acciones concretas y las preguntas que deba responder Ariadna.** El detalle completo debe quedar en los informes.
