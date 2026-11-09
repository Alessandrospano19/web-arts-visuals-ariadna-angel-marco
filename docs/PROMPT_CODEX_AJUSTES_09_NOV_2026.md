# Codex - Ajustes editoriales puntuales (9 de noviembre de 2026)

## Contexto y alcance

Estamos trabajando en el portafolio académico de **Ariadna Angel Marco**. La cuarta iteración está validada visualmente: **no rediseñes la web**, no modifiques la estructura global ni vuelvas a reorganizar el proyecto. La tarea consiste exclusivamente en resolver los comentarios finales de Ariadna.

Revisa antes de empezar `AGENTS.md`, la estructura actual del repositorio y los contenidos editables vigentes. Usa como referencia visual las capturas adjuntas a este encargo:

- `docs/referencias/feedback-01-libro-y-rotulos.png`: cabecera de la Parte 2, vídeos del libro y pie de foto de las calabazas.
- `docs/referencias/feedback-02-reflexion-y-footer.png`: imagen de «La reflexió final» y rótulo antiguo del footer.

Las capturas son **referencias de problemas**, no recursos que deban publicarse en la web.

### 1. Inicio - mayúsculas en Parte 2 del Bloc II

En la página de inicio, donde aparezca el nombre de la **Parte 2** del Bloc II, utiliza el rótulo:

**`PART 2. VISITA AL MNAC I PASSEJADA PELS JARDINS DE MONTJUÏC`**

Es un cambio **del rótulo visible de la portada**, no una orden de renombrar rutas o romper los enlaces. Si el mismo texto se reutiliza en otra navegación académica, comprueba la jerarquía vigente y respeta la denominación que corresponda al documento de Ariadna. Usa un único origen de contenido editable para evitar inconsistencias.

### 2. Justificación y jerarquía tipográfica en todas las páginas

Ariadna todavía observa párrafos extensos que no aparecen justificados. Revisa los componentes de reflexión, texto académico completo, propuestas, metodologías y conclusiones, tanto en la lectura normal como dentro de desplegables.

- Justifica **los párrafos de lectura continua**, con columna de lectura, separación suficiente y partición de palabras en catalán (`lang="ca"`, `hyphens: auto` cuando proceda).
- No justifiques títulos, encabezados, pies de foto, listas breves ni textos de botones.
- Revisa especialmente los párrafos dentro de componentes nuevos o desplegables: quizá no están heredando la clase de lectura.
- En 375/390 px, evita huecos tipográficos exagerados; prioriza la legibilidad si en un caso concreto el justificado produce un efecto malo.
- No reduzcas el tamaño de fuente hasta volverlo ilegible para hacer encajar el texto.

### 3. Destacados editoriales adicionales: negritas verdes y subrayados

Además de las **negritas verdes** ya aplicadas, Ariadna quiere que en **ocasiones justificadas** se subraye una palabra o una oración especialmente importante.

- Selecciona **ideas pedagógicas centrales, afirmaciones personales relevantes o conceptos esenciales** ya presentes literalmente en el texto original. No inventes ni reformules frases.
- Usa el verde oscuro del sistema visual y, para algunos fragmentos, **negrita verde + subrayado sutil** (`text-underline-offset` y grosor discreto) para que no parezca un hipervínculo.
- No subrayes una frase en cada párrafo ni conviertas todo el texto en una sucesión de destacados.
- Las citas textuales auténticas pueden conservar **negrita + cursiva**; los subrayados son opcionales y no deben estropear su lectura.
- Aplica estas reglas también al contenido que se muestra tras «Llegir la reflexió completa».
- Asegura que el formato persistirá después de ejecutar el generador; no edites solamente JavaScript generado.

### 4. Bloc II - Part 3: centrar «El llibre d'artista en moviment»

En la sección que muestra los **dos vídeos del libro de artista terminado** (`El llibre d'artista en moviment`), el conjunto se percibe desplazado hacia la izquierda. **Centra visualmente el bloque entero**, con su título, vídeos y pies, dentro del contenedor disponible.

- Mantén los vídeos juntos en escritorio y apilados en móvil si el ancho lo exige.
- No estires los vídeos verticales ni los conviertas en horizontales por CSS; conserva su proporción y controles.
- No centres todos los párrafos de la Part 3: esta solicitud se refiere al **bloque multimedia indicado en la captura**.
- Comprueba el centrado a 390, 768 y 1440 px.

### 5. Bloc II - Part 3: cambiar un pie de foto

Encuentra la fotografía con **calabazas alargadas verdes colgando de una planta**, cuyo pie actual indica:

`Fruits allargats entre les branques`

Sustituye ese pie por:

**`Carbasses allargades`**

Conserva la fotografía y su función de ampliación. Si el texto alternativo describe los mismos frutos, ajústalo para que sea coherente con la imagen. No modifiques otros pies de foto por similitud. (En la nota original aparece la grafía «carbassess»; se utiliza la grafía catalana correcta «carbasses».)

### 6. Bloc II - Part 3: cambiar la fotografía de «La reflexió final»

En la sección «La reflexió final» de la actividad del libro de artista, **sustituye la fotografía actual de pétalos** por **una fotografía real de Ariadna durante la actividad en el huerto/jardín**, más directamente relacionada con el proceso y su reflexión.

- Busca primero entre las fotografías locales ya incorporadas a `assets/`, los catálogos de imágenes y las carpetas de la actividad.
- Elige una foto en la que Ariadna aparezca participando en el huerto, si hay una correspondencia fiable. **No deduzcas quién es Ariadna por su cara** si no hay una identificación fiable en los recursos o metadatos: ante la duda, muestra las candidatas en el informe para confirmación.
- Si la fotografía está únicamente en una carpeta de Drive no sincronizada con el repositorio, **no simules disponer de ella**: explica qué archivo falta y deja la imagen vigente hasta recibirlo.
- Ajusta encuadre (`object-position`, proporción), pie y `alt` según la imagen efectivamente elegida. No recortes a una persona ni ocultes el contexto de la actividad.
- Conserva el texto completo de la reflexión, su justificación y destacados.

### 7. Footer - denominación académica del Bloc III

Localiza el texto antiguo del pie de página:

`Cos, teixit i creació`

Sustitúyelo por el título académico completo:

**`La formació en la pràctica de l’art. Moda, artivisme i performativitat en les arts i l’educació`**

Este rótulo puede mostrarse en versales mediante CSS si así lo requiere el diseño, pero **no debe volver a abreviarse**. Verifica que cabe en escritorio y que en móvil salta de línea sin desbordamientos. Mantén intacto el enlace correspondiente.

### 8. Bloc II - Part 2: «Conclusions de la sortida» en tres desplegables

Actualmente las conclusiones de la visita al MNAC y la passejada pels jardins de Montjuïc presentan tres reflexiones extensas visibles directamente. Ariadna quiere que sean **tres desplegables independientes**.

- Conserva el título académico **`CONCLUSIONS DE LA SORTIDA`**.
- Mantén visible la breve introducción general, si existe en el contenido original.
- Crea tres apartados desplegables, preferiblemente mediante un componente reutilizable o `details/summary` accesible, con los encabezados académicos del documento (sin inventar nuevos títulos):
  1. `Què penso que m'ha aportat aquesta visita en relació amb el meu vincle amb la natura?`
  2. `Què penso que m'ha aportat aquesta visita en relació amb la meva pràctica artística?`
  3. `Què penso que m'ha aportat aquesta visita en relació amb la meva futura pràctica docent?`
- El texto **íntegro, sin cortes ni resúmenes**, de cada reflexión debe estar dentro de su desplegable correspondiente.
- Reutiliza las tres fotografías de conclusiones ya vinculadas si encajan con los apartados. Las imágenes pueden aparecer dentro de cada desplegable, junto a su reflexión, manteniendo el contenido bien distribuido.
- Permite abrir cada apartado de forma independiente; no es obligatorio cerrar uno al abrir otro. Estado inicial contraído salvo que exista una razón funcional para otra cosa.
- Mantén la justificación, negritas verdes, posibles subrayados selectivos, accesibilidad de teclado y estilo editorial uniforme.
- Comprueba que **ningún contenido desaparezca** por el cambio de presentación.

### 9. Regla de contenido: no alterar la voz de Ariadna

No reescribas, resumas ni suprimas textos personales. Mantén los nombres, títulos y la estructura que exige el PDF académico. Esta iteración es de presentación y cambios textuales **expresamente solicitados**, no de redacción de nuevas reflexiones.

No alteres las diez obras, las diez especies ni sus correspondencias confirmadas. El título de Solé Duc «Verd de coure sobre tela reciclada» y las tres fotografías botánicas anteriormente consultadas **ya fueron confirmados** y no deben reabrirse como cuestiones pendientes.

### 10. Ejecución, QA y entrega

1. Localiza los archivos fuente editables y realiza cambios mínimos, coherentes con la arquitectura actual. No rehagas el CSS original ni la navegación.
2. Regenera el contenido siguiendo el flujo del proyecto.
3. Comprueba las 17 rutas, enlaces de portada y footer, ausencia de errores de consola y recursos inexistentes.
4. Comprueba en 390 y 1440 px el bloque de los vídeos centrados, la nueva imagen de «La reflexió final», el nuevo pie de foto y los tres desplegables de conclusiones abiertos/cerrados. Añade 768 px para el bloque de vídeo.
5. Comprueba con teclado la apertura y cierre de cada desplegable, foco visible y la persistencia del texto íntegro.
6. Genera capturas de antes/después de los componentes modificados y un informe **breve** con los cambios realizados y cualquier archivo realmente pendiente.

**No hagas commit, push ni despliegue.** Quiero comprobar las correcciones antes de guardar y publicar esta versión.
