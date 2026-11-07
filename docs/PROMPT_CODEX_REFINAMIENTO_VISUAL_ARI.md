# Codex — Segona iteració: refinament visual i editorial del portafoli d'Ariadna

Actúa como **frontend senior, diseñador editorial digital y especialista en UX de lectura larga**. Debes trabajar **directamente sobre el repositorio actual** de `Educació de les Arts Visuals I — Ariadna Angel Marco`, sin reconstruirlo desde cero. Ya existe una implementación funcional realizada sobre el prototipo de Gemini Argon.

## Objetivo

La estructura y la estética general nos gustan, pero la página es **demasiado larga y excesivamente textual**, algunas imágenes están mal encuadradas y se muestran al lector muchas etiquetas técnicas procedentes de la integración del PDF. Quiero una **segunda iteración visual**: un portafolio artístico elegante, dinámico, coherente y legible, donde los textos de Ariadna respiren, las imágenes sean protagonistas y las secciones tengan composiciones diferentes.

**No se trata de borrar contenido académico ni de rehacer el diseño.** Hay que distinguir entre:

- **Lectura principal:** síntesis editorial fiel a las reflexiones reales, repartida en apartados temáticos breves, con subtítulos, fotografías, citas textuales y recursos gráficos.
- **Lectura completa:** texto original íntegro, conservado y accesible mediante `Llegir la reflexió completa` o un desplegable equivalente. No lo repitas íntegro en cada subsección.

Todo el texto visible de la web debe estar en **catalán**. Estas instrucciones están en español para facilitar el trabajo.

## Antes de editar

1. Lee `AGENTS.md`, `README.md`, `docs/INTEGRACIO.md`, `docs/ESTRUCTURA_WEB.md`, `docs/INVENTARI_MEDIA.md` y las fuentes `content/*.md`.
2. Revisa la arquitectura vigente: `index.html` (diseño original), `scripts/app.js` (componentes y páginas), `scripts/content.js` (GENERADO), `scripts/build_content.py` (generador) y `styles/integration.css` (estilos añadidos).
3. Comprueba cómo se representan ahora las rutas `#/inici`, `#/introduccio`, `#/bloc-i`, `#/bloc-ii/p1-formes-dapropar-se-a-la-natura`, `#/bloc-ii/p2-visita-museu-i-jardi`, `#/bloc-ii/p3-descripcio-del-jardi`, `#/bloc-ii/p4-experimentem-amb-tintes-vives` y el Bloc III.
4. **No edites manualmente `scripts/content.js`**, porque se regenera desde las fuentes. Si hacen falta nuevos resúmenes, apartados o metadatos editoriales, añádelos en una capa mantenible o en fuentes auxiliares claramente separadas de las transcripciones originales. Distingue entre contenido textual original y presentación editorial.

## 1. Limpieza de la interfaz: eliminar el lenguaje técnico

Retira **de toda la interfaz pública**, incluidos pies de foto, fichas, galerías, lightbox, desplegables y subtítulos, frases como:

- `Fotografia pròpia d’Ariadna` / `Fotografia aportada per Ariadna`.
- `Imatge extreta del document d’Ariadna`, `Composició del document original`, `Text original d’Ariadna · document, p. ...`.
- `segons el document`, `document, p. 11–12`, `document, p. 33`, `imatge del PDF`, `secció provisional`, referencias a páginas del documento fuente.
- Explicaciones de producción o verificaciones dirigidas al desarrollador: `les dades es transcriuen...`, `el document no inclou...`, `les correspondències estan pendents de confirmar...`.

**La procedencia se debe conservar internamente** en los Markdown, inventarios e informes; no en la web académica. No elimines las atribuciones necesarias de las **obras de arte**: autor, título y técnica son datos del contenido, no etiquetas técnicas.

Los pies de foto, cuando aporten algo, serán breves y descriptivos: `Interior del MNAC`, `Detall del jardí`, `Procés creatiu`, `Llibre d’artista`. Si no aportan nada, omítelos. No repitas sistemáticamente captions en todas las fotos.

Mantén exactamente la idea de **`Pendent d’incorporar`** en apartados realmente incompletos, pero con un único aviso discreto por sección o página. No expliques públicamente qué número de página del PDF falta ni por qué. Para la presentación personal, conserva el estado pendiente; no inventes una biografía de Ariadna.

Puntos concretos del código a inspeccionar: `source()`, `credit()`, `photoFigure()`, `videos()`, `artworkCard()`, `collageFigure()`, `note()`, `B3` y los textos literales de `scripts/app.js`. Verifica también el contenido del lightbox (`MEDIA.meta`).

## 2. Sistema visual: más variedad, sin perder la identidad Argon

**Conserva el lenguaje editorial, la navegación, el hero principal, las tipografías Cormorant Garamond y DM Sans, y la paleta base existente**. No sustituyas toda la web por tarjetas genéricas.

Amplía el uso de fondos ya coherentes con los tokens: crema, verde salvia/oliva claro, arena, terracota suave y secciones ocasionales verde oscuro con texto de buen contraste. Alterna deliberadamente:

- Texto corto a un lado + fotografía al otro.
- Imagen grande + epígrafe pequeño.
- Cita exacta extraída de la reflexión, destacada tipográficamente.
- Dos o tres ideas clave con jerarquía de tamaños distinta.
- Bloques breves de metodología o materiales en disposición tipo proceso.
- Galerías asimétricas, siempre ordenadas y responsive.

No quiero un mosaico de tarjetas idénticas, fondos chillones, efectos pesados o animaciones invasivas. Cuida espaciado, anchura de lectura (aprox. 60–68 caracteres por línea), altura de las imágenes, contraste y composición a 375/390 px. **Mobile first**.

Añade los estilos preferentemente en `styles/integration.css`, con componentes reutilizables y nombres claros. Puedes ajustar reglas de `index.html` cuando sea necesario para solucionar un problema real, pero conserva la identidad del diseño y evita un rediseño global.

## 3. Inicio: arreglar la imagen de «Art i educació»

En el índice visual de la portada, el bloque **`Art i educació`** usa actualmente la primera imagen de `assets/bloc-i/mar-moron/` (una cubierta de lectura) con `.exploration-media img { object-fit: cover; }`. La imagen queda encuadrada como si fuera una foto panorámica y se corta/muestra mal.

Rediseña **solo ese visual**: por ejemplo, una composición editorial con las dos imágenes de las lecturas, enmarcadas y completas, sobre un fondo suave (`object-fit: contain`), con juego de tamaños y posición, o una solución editorial equivalente. No recortes portadas ni distorsiones imágenes. No inventes una fotografía de una actividad real. Conserva las otras dos entradas de bloques y el estilo general del índice.

Retira `Fotografia pròpia d’Ariadna` del hero y de todos los demás lugares. Mantén la presentación personal como pendiente.

## 4. Introducció: convertir el gran ensayo en un recorrido de lectura

La reflexión de la conferencia tiene unas **21.000 letras**. La implementación actual la divide en secciones, pero cada sección sigue siendo un gran bloque de texto. Rediseña **la experiencia de lectura**, no solo los títulos.

Propón entre **5 y 7 capítulos temáticos**, basados en lo que Ariadna realmente escribió (ejemplos orientativos; revisa los párrafos antes de definirlos):

1. `Art i natura: una mateixa mirada`.
2. `La veu pròpia dels infants i la creativitat`.
3. `El procés creatiu per damunt del resultat`.
4. `La bellesa de la imperfecció`.
5. `El contacte amb la natura i el joc`.
6. `Materials, sensacions i experimentació`.
7. `El paper de la futura mestra`.

Para cada capítulo muestra una **síntesis fiel de unas 50–90 palabras máximo**, idealmente compuesta a partir de las ideas existentes, sin atribuirle experiencias nuevas, y ocasionalmente una **cita textual breve y exacta**. Incluye recursos visuales intercalados: las fotos de `assets/introduccio/` y, si encajan, fotos botánicas del archivo local de forma claramente ilustrativa, no como prueba de que proceden de la conferencia.

La **reflexión original completa** debe seguir disponible desde un único desplegable, situado al final de la página y cerrado por defecto. Nunca la elimines ni la mutiles en `content/`.

Mantén la propuesta y el objetivo visibles de forma compacta al principio.

## 5. Bloc I: lectura visual de Carson y Freire

La reflexión sobre Rachel Carson y Heike Freire tiene unas **7.500 letras**. Divídela en **4 o 5 ideas editoriales** fundamentadas en el texto real:

- La capacidad de asombro.
- Aprender con los sentidos y la experiencia directa.
- El contacto con el bosque y el entorno natural.
- Observar para crear, sin imponer modelos.
- El papel de la educadora.

Evita un H2 larguísimo como título de toda la reflexión. Coloca las dos imágenes de las lecturas con un tratamiento visual adecuado (cubiertas completas, sin recorte; fotos en su proporción). Presenta cada tema como un fragmento breve con título, imagen cuando corresponda y, ocasionalmente, una cita literal.

Coloca `Llegir la reflexió completa` en un desplegable accesible al final, con el texto íntegro y sin duplicación visual.

## 6. Bloc II · P1: Formes d'apropar-se a la natura

Esta página está prácticamente compuesta por **solo texto**. Organiza la reflexión en **3 o 4 ideas con títulos cortos**, un pequeño párrafo cada una, una cita y fotografías bien distribuidas.

Usa imágenes locales que encajen temáticamente. **Atención: el repositorio no tiene una carpeta fotográfica explícitamente atribuida a esta sesión P1**. Puedes reutilizar fotografías de naturaleza como apoyo visual, pero **no las presentes como registro documental de esta sesión** si la correspondencia no está acreditada. Si ninguna imagen existente encaja, crea una composición gráfica con material local o deja una incorporación fotográfica pendiente de manera discreta; nunca inventes una actividad.

Mantén la reflexión completa accesible bajo desplegable.

## 7. Bloc II · P2: visita al museo y al jardín — cambio estructural prioritario

Esta página es demasiado larga porque muestra consecutivamente los diez artistas, diez especies, propuestas, metodología y múltiples reflexiones completas. Actualmente los botones superiores solo hacen scroll a secciones. Quiero que reduzcas considerablemente la longitud **inicialmente visible**.

Convierte los cuatro accesos existentes en un **navegador interno por pestañas o paneles desplegables accesibles**, con estas entradas:

1. `Obres i museus`.
2. `Diàleg amb el jardí`.
3. `Educar a través de les arts`.
4. `Conclusions de la sortida`.

Mantén toda la información disponible, pero muestra **solo el panel seleccionado**. Si usas tabs, implementa semántica ARIA y teclado adecuadamente; si usas `details`, procura que la navegación sea clara, con buen estado visual. No rompas el router hash `#/...` actual.

### Panel «Obres i museus»

- Mantén las **10 obras y sus imágenes**; es una parte del diseño que nos gusta.
- Fichas compactas y visuales: imagen bien proporcionada, título, artista y técnica breve. Usa `object-fit: contain` para obras completas, sin deformar.
- Elimina de la ficha y el lightbox todos los mensajes de origen documental y la coletilla `segons el document`.
- Al pulsar la imagen o `Veure l'obra`, abre ampliación con obra, artista, técnica y reflexión / propuesta educativa **completa** como contenido secundario o desplegable. El lightbox debe seguir siendo accesible y desplazable.
- Las fotografías del edificio/interior del museo deben presentarse de forma editorial: imagen grande con pie opcional `Interior del MNAC`, `Vista des de Montjuïc`, etc.
- Preserva las actividades escritas por Ariadna, pero no muestres párrafos extensos en la cuadrícula.

### Panel «Diàleg amb el jardí»

- Presentación corta, galería botánica más visible y observaciones organizadas en 10 fichas compactas.
- Incluye el collage vegetal y las fotos de `assets/bloc-ii/dialeg-jardi/` en un lugar destacado.
- La identificación individual foto ↔ especie no está plenamente acreditada: **no atribuyas arbitrariamente fotos a nombres científicos**. El collage puede acompañar al conjunto; las fotos sin correspondencia segura serán una galería independiente.
- Muestra una observación breve por especie, con opción de ampliar el texto si hace falta. Conserva completas las observaciones en la capa de datos.
- Reorganiza objetivos, desarrollo, metodología y materiales en pequeños módulos de lectura; no como una lista infinita de párrafos.

### Panel «Educar a través de les arts»

- Representa el vínculo entre art, natura, ciències e infància con una composición visual limpia.
- Enlaza a las propuestas educativas ya recogidas en las fichas de las diez obras.
- Si falta una propuesta autónoma para este apartado, muestra solo `Pendent d'incorporar` de forma discreta. No expliques que no aparece en cierta página del PDF.

### Panel «Conclusions de la sortida»

- Presenta las tres reflexiones diferenciadas por tema: vínculo con la naturaleza, práctica artística y futura práctica docente.
- Para cada una, muestra una idea principal breve, con alternancia de colores o composición.
- Conserva las reflexiones completas en desplegables o lectura ampliable, sin repetir todo el texto en la vista inicial.

**Estrategias metodológicas y materiales:** deja de usar grandes bloques monótonos. Implementa listas agrupadas correctamente (la función `prose()` actual genera un `<ul>` separado para cada línea que empieza por `- `). Presenta estas estrategias como una secuencia numerada, filas editoriales breves o un acordeón bien jerarquizado. No conviertas cada frase en una tarjeta excesiva ni inventes pasos que no existan.

## 8. Bloc II · P3 y P4

**P3 — Descripció del jardí:** conserva el archivo fotográfico y los vídeos. Hay muchas imágenes; mejora la presentación con una selección inicial cuidada (por ejemplo 6–8 fotos) y un botón `Veure tota la galeria` que permita consultar las restantes, sin descartarlas. Ordena el proceso visualmente: observación, experimentación, libro de artista y resultado, solo si las fotos lo apoyan. Conserva los apartados sin texto como `Pendent d'incorporar`.

**P4 — Experimentem amb tintes vives:** fotos y vídeos existentes, diseño visual bien distribuido; evita carteles grandes sobre el carácter provisional o las carencias del PDF. Pon una sola indicación sobria `Pendent d'incorporar` donde falta el texto, no sobre las fotos ya disponibles.

## 9. Bloc III, conclusiones y reflexión personal

Todavía faltan contenidos reales. **No rellenes huecos con experiencias ficticias**, ni repitas tres o cuatro bloques enormes diciendo que faltan textos. Conserva el título y la jerarquía; muestra un único `Pendent d'incorporar` breve, con composición editorial limpia. En `Reflexió personal` pueden mantenerse `Punts forts` y `Punts febles` diferenciados, pero sin grandes cuadros vacíos.

## 10. Reglas de fidelidad, accesibilidad y mantenimiento

- Conserva todas las **17 rutas**, la navegación y los submenús actuales, el lightbox, los 10 artistas, las 10 especies, las 2 referencias y los 5 vídeos.
- Las síntesis deben ser **fieles** a la reflexión y estar diferenciadas del texto íntegro original; las citas entrecomilladas deben ser literales. No atribuyas nuevos hechos, opiniones o actividades a Ariadna.
- Todo el texto original debe permanecer íntegro en `content/` y disponible para lectura completa. No recortes los datos originales para conseguir una interfaz breve.
- Evita imágenes externas innecesarias; **reutiliza antes el material local** y conserva la relación entre imágenes y actividades. Si no hay una imagen justificada, no presentes una de otro contexto como prueba de esa actividad.
- Mantén la compatibilidad con una web estática en Cloudflare Pages, sin backend ni nuevos servicios.
- Los desplegables, pestañas y galerías deben responder a teclado, foco visible y móvil; respeta `prefers-reduced-motion`.
- No hagas commit, push ni despliegue sin permiso.

## 11. Validación y entregables

1. Ejecuta `python scripts/verify_content.py` y las comprobaciones de navegador de `scripts/verify_browser.cjs` con el servidor local. Añade pruebas de interacción para las nuevas pestañas/desplegables y la galería ampliable.
2. Revisa 375, 390, 430, 768, 1024 y 1440 px. Sin imágenes deformadas, textos cortados, scroll horizontal, errores de consola ni enlaces rotos.
3. Comprueba que **no aparece en el DOM visible** ninguna cadena de procedencia editorial del tipo `Fotografia pròpia d’Ariadna`, `Imatge extreta del document`, `Text original d’Ariadna`, `segons el document`, `document, p.` o `Secció provisional`. Las fuentes internas sí pueden conservarlas.
4. Captura al menos la página de inicio (incluido el visual de Bloc I), introducción, Bloc I, Bloc II P1, museo/jardín (cada pestaña), y Bloc III en **móvil y escritorio**. Evalúa visualmente las capturas, no solo el resultado de las pruebas automáticas.
5. Crea `docs/REFINAMENT_VISUAL.md` con: archivos modificados, decisiones editoriales, síntesis añadidas, fotografías reutilizadas, contenidos pendientes, pruebas realizadas y cualquier duda que Ariadna deba verificar. Los avisos técnicos para nosotros deben quedar **en este informe, nunca visibles al lector**.

**Prioridad de ejecución:** primero limpieza de etiquetas y nueva arquitectura de lectura; después portada/B1 e imágenes; luego P2 por pestañas; después P3, P4 y placeholders; al final responsive y pruebas. Implementa los cambios directamente, pero sin rehacer desde cero la web ni perder el código existente.
