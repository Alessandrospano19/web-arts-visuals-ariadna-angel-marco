# Revisión de fuentes y mapa editorial — 8/11/2026

## 1. Qué archivos son fuente de verdad

1. **`source/ESTRUCTURA_ARIADNA_ACTUAL_40P.pdf`** (40 páginas): versión académica más reciente, prevalece sobre el PDF de 34 páginas del repositorio anterior. Textos, estructura y titulaciones deben conservarse.
2. **`content/PDF_ACTUALITZAT_40P.md`**: extracción íntegra por páginas del PDF. Los saltos de línea y tablas a dos columnas pueden requerir contrastar con el PDF, sobre todo en las diez obras de las pp. 13-22.
3. **`docs/INVENTARIO_ACTUALIZACION.json`**: 60 fotografías y 5 vídeos con nombres originales y rutas nuevas optimizadas. Incluye 11 imágenes documentales que estaban incrustadas en el PDF.
4. **Indicaciones directas de Ariadna** recogidas en `docs/PROMPT_CODEX_NOVIEMBRE_2026.md`. Prevalecen cuando piden modificar expresamente una formulación del PDF (caso del título de la Parte 2).

**No borrar material antiguo antes de cotejarlo:** el ZIP nuevo no es necesariamente un inventario completo de todos los activos del proyecto. En particular, en la carpeta nueva de 10 artistas hay 9 fotos; el PDF contiene diez obras, incluida una cuya foto puede recuperarse del material ya integrado.

## 2. Estructura académica actual (PDF de 40 páginas)

| Ubicación | Título | Páginas PDF | Observaciones |
|---|---|---:|---|
| Introducció | `INTRODUCCIÓ. ART I NATURA A EDUCACIÓ INFANTIL` | 1-7 | Reflexión de la conferencia completa |
| Bloc I | `BLOC I. ART I EDUCACIÓ` | 8-10 | Carson y Freire; texto completo |
| Bloc II | `BLOC II. LA FORMACIÓ EN LA PRÀCTICA DE L’ART. EL JARDÍ COM AGENT PEDAGÒGIC.` | 11-38 | Cuatro PARTES, no cuatro propuestas |
| Bloc II / Parte 1 | `PART 1. INTRODUCCIÓ- FORMES D’APROPAR-SE A LA NATURA` | 11 | Reflexión completa |
| Bloc II / Parte 2 | `PART 2. VISITA A MUSEU I JARDÍ` | 12-32 | **Título web solicitado por Ariadna:** `Visita al MNAC i passejada pels jardins de Montjuïc` |
| Parte 2 / Propuesta 1 | `PROPOSTA 1: VISITA MUSEU MNAC` | 12-23 | Diez obras, reflexiones, conclusiones, metodología, materiales |
| Parte 2 / Propuesta 2 | `PROPOSTA 2: DIÀLEG AMB EL JARDÍ` | 23-28 | Diez especies, collage y fotografías individuales |
| Parte 2 / Conclusiones | `CONCLUSIONS DE LA SORTIDA.` | 28-32 | Tres preguntas con respuestas largas, visibles sin desplegable |
| Bloc II / Parte 3 | `PART 3. DESCRIPCIÓ DEL JARDÍ` | 32-35 | `Natura viva`: proceso, justificación, reflexiones, estrategias, materiales |
| Bloc II / Parte 4 | `PART 4. EXPERIMENTEM AMB TINTES VIVES` | 35-38 | Texto ahora completo: tres fases, resultados de dos tintes, estrategias y materiales |
| Bloc III | `BLOC III. LA FORMACIÓ EN LA PRÀCTICA DE L’ART. MODA, ARTIVISME I PERFORMATIVITAT EN LES ARTS I L’EDUCACIÓ.` | 39 | Solo títulos: mantener `Pendent d'incorporar` discreto |
| Cierre | `CONCLUSIONS GENERALS DE L’ASSIGNATURA`, `REFLEXIONS PERSONALS`, `PER SABER-NE MÉS…` | 39 | Pendientes reales |
| Bibliografía | `REFERÈNCIES BIBLIOGRÀFIQUES` | 40 | Referencias a Carson (2012) y Freire (2010) |

**Retirar:** `Proposta 3. Educar a través de les arts` de la Parte 2. No aparece en la estructura nueva.

## 3. Fotografía principal del Bloc II (localizada)

- **Archivo original:** `FOTOS/.../PART 3. DESCRIPCIÓ DEL JARDÍ/IMG_5041.JPG`.
- **Archivo web convertido:** `assets/actualizacion-2026-11-08/bloc-ii/part-3-llibre/img_5041.webp`.
- **Comprobación visual:** fotografía de un grupo sonriendo y sujetando calabazas.
- **Uso:** hero de la página del Bloc II, sustituyendo el collage botánico. No es necesario recortarla agresivamente.

## 4. Fotografías para `CONCLUSIONS DE LA SORTIDA`

| Foto | Archivo web | Motivo editorial / pie sugerido |
|---|---|---|
| Manos en contacto con tierra | `assets/actualizacion-2026-11-08/bloc-ii/part-2-conclusions/img_4655.webp` | Refuerza el vínculo corporal y sensorial con la naturaleza. Pie: `El contacte directe amb la terra.` |
| Vista desde Montjuïc | `assets/actualizacion-2026-11-08/bloc-ii/part-2-conclusions/img_4724.webp` | Ilustra observar el entorno y cambiar el punto de vista. Pie: `Una mirada al paisatge des de Montjuïc.` |
| Retrato junto a una rosa roja | `assets/actualizacion-2026-11-08/bloc-ii/part-2-conclusions/img_4981.webp` | Vincula observación, sensibilidad y experiencia personal. Pie: `L'observació propera d'una flor.` |

No atribuir a las fotografías momentos o sentimientos que no consten en el documento.

## 5. Imágenes individuales de las diez plantas

Hay **10 imágenes** en `.../bloc-ii/part-2-plantes/`. No sustituirlas por el collage; incorporar además el collage original, que ya forma parte de la documentación del PDF.

**Correspondencias tentativas por inspección visual (Ariadna debe confirmarlas si es necesario):**

| Especie en el PDF | Fotografía sugerida | Certeza |
|---|---|---|
| Rosa ‘Fortuna’ | `img_4979.webp` | Alta (rosa roja) |
| Blush Noisette | `3.webp` | Media (flores rosas) |
| Nandina domestica | `img_4985.webp` | Alta (bayas rojas) |
| Pittosporum lobiru (transcripción del PDF) | `5.webp` | Media (frutos verdes) |
| Viburnum tinus | `1.webp` | Media (frutos oscuros) |
| Rosa ‘Golden Wedding’ | `img_4964.webp` | Alta (rosa anaranjada) |
| ‘Abelia x grandiflora | `img_4968.webp` | Alta (flores claras y rosadas) |
| ’Senna Corymbosa’ | `img_4773.webp` | Alta (flores amarillas) |
| Schefflera arboricola | `4.webp` | Alta (hojas compuestas en forma radial) |
| Eounymus japonicus (grafía del PDF) | `2.webp` | Alta (hojas variegadas) |

**No modificar grafías botánicas ni proclamar verificaciones taxonómicas no realizadas.** Mantener títulos de Ariadna y anotar posibles errores en informe interno, no en la web.

## 6. Proceso del libro de artista `Natura viva` (orden visual editorial)

Esta secuencia es una **propuesta de relato visual**, no una datación demostrada de las fotografías. Confirmar orden final con Ariadna cuando sea necesario.

1. **Observació i recollida:** `img_4784.webp`, `img_4785.webp`, `img_4790.webp`, `img_4791.webp`, `img_4795.webp`, `img_4798.webp`, `img_4799.webp`, `1.webp`, `3.webp`, `4.webp`.
2. **Experimentació plàstica:** `img_5100.webp`, `img_5101.webp`, `img_5103.webp`.
3. **Retall, selecció i muntatge:** `img_5105.webp`, `img_5106.webp`.
4. **Llibre finalitzat:** `img_5107.webp`, `img_5125.webp`, `img_5127.webp`, `img_5126.mp4`, `img_5128.mp4`.

`img_5041.webp` se reserva principalmente para la portada del Bloc II, pero puede conservarse en la galería de la experiencia si aporta valor.

**Vídeos:** `IMG_5126.MOV` y `IMG_5128.MOV` se grabaron en formato vertical. Mostrar ambos en una fila horizontal en escritorio, cada uno con sus proporciones verticales intactas y sus controles. En móvil, apilar.

## 7. Bibliografia y por qué esas fotos

Utilizar las portadas que ya están en la carpeta de Bloc I:

- `assets/actualizacion-2026-11-08/bloc-i/img_2227.webp` — cubierta de **Rachel Carson, *El sentido del asombro***. Se usa porque se cita en la bibliografía y se trabaja directamente en el Bloc I.
- `assets/actualizacion-2026-11-08/bloc-i/img_2228.webp` — captura/portada de **Heike Freire, *La escuela es el bosque***. Se usa por el mismo motivo y mantiene una relación académica directa.

No decorar Bibliografia con imágenes aleatorias sin relación con las fuentes.

## 8. Advertencia sobre primera obra

En **página 13 del PDF nuevo**, la obra 1 todavía aparece así:

- Obra: `Verd de coure sobre tela reciclada`.
- Artista: `Solé Duc`.
- Tècnica: `verd de coure sobre tela reciclada. Pigment alquímic`.

Ariadna declara que el título se ha corregido, pero esa modificación **no figura en el PDF adjuntado**. Hasta disponer del título correcto, no inventar. Añadir a `docs/PENDIENTES_ARI.md` como cuestión por confirmar y comunicarla al usuario, **no mostrar advertencia al público**.

## 9. Precaución técnica con la versión existente

En `scripts/build_content.py` del proyecto anterior aparece `assert len(PAGE) == 34` y rangos de páginas fijos. Con el nuevo PDF de 40 páginas, esas reglas dejarían fuera contenido o lo clasificarían mal. Actualizar `build_content.py` y sus validaciones; utilizar secciones académicas como delimitadores o una estructura de contenido explícita, no solo números de página.
