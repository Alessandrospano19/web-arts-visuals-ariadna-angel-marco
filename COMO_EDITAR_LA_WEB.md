# Cómo editar la web de Ariadna

Abre esta carpeta en VS Code. Los textos están en `content/`; los estilos, en `styles/integration.css`. Para cambiar contenido no necesitas tocar JavaScript.

## Ver los cambios

Ejecuta una vez en la terminal de VS Code:

```powershell
python scripts/dev.py
```

Abre **http://127.0.0.1:8001**. Guarda un archivo de contenido: la terminal indicará que se ha actualizado. Recarga el navegador para verlo. Ctrl+C detiene la previsualización. Puedes elegir otro puerto con `python scripts/dev.py --port 8002`.

Si prefieres abrir directamente `index.html`, después de guardar ejecuta únicamente:

```powershell
python scripts/build_content.py
```

Después recarga el HTML. La web final continúa siendo estática y no necesita Python en el alojamiento.

## Dónde cambiar cada cosa

| Qué quieres editar | Archivo de contenido |
|---|---|
| Títulos de las entradas de portada | `content/editables/titulos.json`: `portada_bloc_ii`, `portada_bloc_iii` |
| Título «Art i educació» | `content/editables/textos-generales.json`: `text_art_i_educacio` |
| Bienvenida, presentación y descripciones de los tres bloques | `content/editables/portada.json` |
| Títulos académicos de las páginas | `content/editables/titulos.json`, dentro de `academicos` |
| Subtítulo y etiqueta de cada página | `content/editables/paginas.json`, buscando su ruta |
| Frase breve del Bloc II | `content/editables/textos-generales.json`: `bloc_ii_entradilla` |
| Otros rótulos, encabezados y frases editoriales | `content/editables/textos-generales.json` (busca el texto visible con Ctrl+F) |
| Reflexiones, propuestas, objetivos, estrategias y materiales | Markdown de `content/academic/`; consulta `mapa-academic.json` para relacionar campo y archivo |
| Resúmenes temáticos de las reflexiones | `content/EDITORIAL.json` |
| Texto y ficha académica de las diez obras | `content/OBRES_I_REFLEXIONS.md` |
| Fotografías y sus textos alternativos | `content/editables/imagenes.json` |
| Pies de foto y vídeo | `content/editables/pies-de-foto.json` |
| Reparto de imágenes y títulos de las fases del libro y las tintas | `content/editables/narrativa.json` |

Los títulos académicos y las asociaciones de plantas ya acordadas deben conservarse salvo corrección documental de Ariadna. Las observaciones botánicas se editan en `content/ESPECIES_MONTJUIC.md`, ya cotejado con la transcripción académica.

## Cambiar una frase o una reflexión

Por ejemplo, cambia solamente el valor de `bloc_ii_entradilla` en `textos-generales.json`. Conserva sus comillas dobles y la coma entre entradas. No escribas HTML dentro del JSON.

La reflexión final del libro está en `content/academic/book-development.md`. La reflexión de la introducción está en `intro-reflection.md`; los materiales del libro, en `book-materials.md`; la actividad completa de tintas, en `dyes.md`. Los párrafos se separan con una línea en blanco. Las listas utilizan `- ` al principio de cada elemento.

`narrativa.json` divide el libro mediante frases literales del Markdown (`inicio`). Si cambias una de esas frases, actualízala también en ese archivo. En las tintas ocurre lo mismo con los encabezados de `tintes_apartats`: deben seguir coincidiendo con los del texto. El generador y las pruebas avisan de las divisiones que necesitan revisión.

## Negritas verdes

En un Markdown académico puedes escribir:

```markdown
La intenció era transmetre allò que podem trobar en un **jardí**.
```

Se mostrará en negrita verde sin cambiar las palabras. Otra opción es añadir una expresión literal en `content/editables/destacados.json`, dentro de `conceptos`. El renderizador de los resúmenes selecciona como máximo dos coincidencias por unidad de texto; no destaca automáticamente todas las frases entre comillas. Los resúmenes temáticos también admiten `**...**`.

## Cambiar una fotografía

En `imagenes.json` busca el identificador de su uso. Por ejemplo:

```json
"bloc_ii_portada": {
  "imagen": "assets/actualizacion-2026-11-08/bloc-ii/part-3-llibre/img_5041.webp",
  "alt": "Grup amb les carbasses a l’hort",
  "ancho": 2048,
  "alto": 1536
}
```

Es un ejemplo de la ruta real de la foto de grupo; conserva las dimensiones reales que figuran en tu archivo. Cambia `imagen` por una ruta local existente y describe su contenido en `alt`. Usa `/` en las rutas, sin `C:` ni barras de Windows. El generador detecta las dimensiones de los recursos ya inventariados; para una imagen nueva indica su anchura y altura reales en píxeles.

`bloc_ii_portada` controla la foto de grupo de portada y Bloc II. `portada_retrat` controla el retrato inicial. `obra_01` a `obra_10` controlan las imágenes de las fichas de museo. Los identificadores de las fases, como `descripcio_img_5103`, mantienen el lugar de la fotografía aunque sustituyas su archivo. Cambiar una imagen de una fase no cambia las otras imágenes de su galería. Si el mismo recurso se reutiliza expresamente en otra página, su identificador conserva ese vínculo.

La entrada vacía `universitat_logo` está reservada para el PNG correcto, todavía no entregado; no introduzcas un logotipo sin confirmar su identidad y uso.

## Cambiar un pie de foto

En `pies-de-foto.json`, utiliza el identificador de la imagen. Por ejemplo:

```json
"descripcio_img_5103": "Visor utilitzat per seleccionar fragments de les composicions i construir el llibre d’artista «Natura viva»."
```

Las entradas con identificador completo prevalecen sobre las descripciones generales del archivo. Para la imagen de grupo puedes añadir `bloc_ii_portada`. El texto alternativo se edita separadamente en `imagenes.json`.

## Añadir una fotografía

Guarda el archivo optimizado en `assets/`. Añade en `imagenes.json` una entrada nueva con un identificador propio, ruta, `alt`, dimensiones y `grupo`. Por ejemplo, para el libro, el grupo es `descripcio`:

```json
"llibre_detall_nou": {
  "imagen": "assets/llibre-detall-nou.webp",
  "alt": "Descripción fiel de la nueva fotografía, en catalán",
  "ancho": 1200,
  "alto": 900,
  "grupo": "descripcio"
}
```

Esta ruta es ilustrativa: el archivo debe existir. La foto aparecerá en «Altres mirades del procés». Para situarla en una fase concreta, añade su identificador al listado `imagenes` de esa fase en `narrativa.json`; dejará de repetirse en la galería complementaria. Añade su pie en `pies-de-foto.json`. No cambies asociaciones botánicas por intuición ni incorpores archivos de vídeo sin optimizar.

## Qué se conserva al regenerar

Hay dos niveles claros:

1. **Fuente documental:** `content/PDF_ACTUALITZAT_40P.md`, PDF original y documentos estructurados. Se conservan íntegros para comprobar la fidelidad.
2. **Edición de la web:** `content/academic/`, `content/editables/` y `content/EDITORIAL.json`. Son los archivos que debes editar para la presentación actual. Prevalecen en cada regeneración y nunca se sobrescriben.

No edites `scripts/content.js`, `scripts/editorial.js`, `scripts/web-editables.js` ni `scripts/source-content.json`: son salidas generadas. Este último conserva la extracción documental para cotejarla con la edición de la web. Si llega un nuevo documento académico, hay que revisar las diferencias con los Markdown editables; no se reemplazan automáticamente y no perderás tus correcciones.

Para una comprobación documental y de rutas locales:

```powershell
python scripts/verify_content.py
```

La prueba `scripts/verify_editing.cjs` verifica con navegador cambios de título, frase, negrita, foto, pie y texto académico a través de dos generaciones; restaura los originales al finalizar. Las pruebas de navegador necesitan Playwright y Edge en el entorno de desarrollo, no en el alojamiento.

## Refinamiento de los textos completos (quinta iteración)

`content/editables/lectura-academica.json` controla los destacados de los párrafos académicos: `conceptos` contiene fragmentos literales por orden de prioridad y `citas_literales` contiene únicamente las citas revisadas, con sus comillas originales. No añadas títulos de obras ni actividades a esta última lista. Las referencias quedan fuera del formato de cita y se conservan.

Este sistema selecciona hasta dos destacados por párrafo (uno en fragmentos breves), respeta palabras completas y evita superponer selecciones. No es obligatorio resaltar todos los párrafos. Los resúmenes editoriales siguen utilizando `destacados.json`, sin cambiar la presentación de la portada. Los Markdown siguen admitiendo negritas explícitas mediante `**...**`.

## Ajustes del 9 de noviembre

Los títulos breves de las tres conclusiones están en `textos-generales.json`, campo `conclusions_apartats`. Las preguntas y respuestas completas siguen procediendo de `content/academic/outing.md`; no hay que duplicarlas ni recortarlas. Cada panel abre independientemente.

`reflexio_final_hort` en `imagenes.json` controla la foto confirmada de Ariadna haciendo frottage; `narrativa.json` la sitúa en la reflexión final. Los pies se editan en `pies-de-foto.json`.

Las fotografías `descripcio_img_5125` y `descripcio_img_5127` tienen `rotation: 90`: el navegador las presenta giradas en la página y en la ampliación, conservando los archivos originales. Los subrayados selectivos se eligen mediante `subrayados` en `lectura-academica.json`, con fragmentos literales.
