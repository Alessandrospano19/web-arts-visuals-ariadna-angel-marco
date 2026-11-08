# Encargo a Codex — Cuarta iteración: refinamiento editorial y visual de la web de Ariadna

## 0. Contexto y criterio rector

Actúa como **senior frontend developer, diseñador UX/UI y director de arte editorial**. Trabaja sobre el repositorio **tal como está actualmente**, después de la tercera iteración de noviembre de 2026. No reinicies el proyecto ni sustituyas el diseño de Gemini Argon. La navegación, la estructura académica, las 17 rutas, las imágenes originales y los materiales audiovisuales actuales deben conservarse.

**Objetivo:** reducir la sensación de página saturada, mejorar la lectura de las reflexiones y hacer que texto, fotografía y color compongan un portafolio artístico elegante. El problema a resolver no es la falta de contenido, sino **cómo se presenta**.

**Reglas de contenido:**
- El **PDF académico actualizado de 40 páginas** es la fuente principal de títulos, organización, reflexiones y actividades. Comprueba que sus apartados se correspondan con la web y conserva el contenido completo.
- Las peticiones específicas de Ariadna recogidas aquí prevalecen sobre decisiones editoriales anteriores. **No cambies la nomenclatura de las actividades por motivos estéticos**.
- Usa el contenido original de Ariadna; **no inventes, no reformules de modo que cambie su voz y no suprimas párrafos académicos**. Se permite segmentar y destacar partes literales, y usar paneles desplegables donde corresponda.
- No muestres al público referencias a archivos, PDFs, páginas, nombres internos, `Document Part`, índices de extracción o procedencia técnica de las fotos.
- Toda la interfaz estará en **catalán correcto**. Instrucciones técnicas y reporte pueden estar en español o catalán.
- Lee `AGENTS.md`, los informes de integración y los ficheros fuente antes de editar. Respeta la separación entre archivos generadores, contenido estructurado, CSS y código generado. No edites a mano salidas generadas que se sobrescribirán al reconstruir el proyecto.

## 1. INICI: jerarquía, separadores y textos exactos

1. Sobre el bloque/entrada **«Art i educació»**, introduce un **separador horizontal fino y elegante**, coherente con el sistema editorial. No reintroduzcas el antiguo encabezado «03. Índex visual / Tres maneres d'apropar-se a les arts»: el título de esa sección debe quedar simplemente como **«Art i educació»**.
2. En la tarjeta o entrada del **Bloc II** de la portada, sustituye el título corto **«Art i natura»** por:
   **«La formació en la pràctica de l’art. El jardí com agent pedagògic»**.
3. En la tarjeta o entrada del **Bloc III** de la portada, sustituye **«Cos, teixit i creació»** por:
   **«La formació en la pràctica de l’art. Moda, artivisme i performativitat en les arts i l’educació»**.
4. Estos títulos son largos: no los conviertas en titulares enormes. Utiliza tipografía más contenida, salto editorial entre frase general y subtítulo si lo permite el diseño, buena altura de línea y adaptación específica a móvil. Deben ser legibles, sin recortes.
5. Conserva los accesos a sus respectivas páginas, el resto de textos de la portada ya aceptados, y la frase de presentación del Bloc II solicitada en la iteración anterior. No reintroduzcas la sección «Presentació» retirada del inicio.
6. Reorganiza cromáticamente el inicio por franjas/secciones delimitadas con separadores: secuencia orientativa **beige → verde suave → beige en otra tonalidad → marrón cálido suave**, con variaciones beige. Debe parecer una revista de arte y naturaleza, no una colección de cajas desconectadas. Conecta las franjas mediante ritmo, márgenes y líneas finas. Mantén contraste AA para textos normales y evita fondos demasiado saturados.

## 2. Header y footer: marca e identificación

1. Da al elemento **«ARTS VISUALS»** del header tratamiento de **logotipo tipográfico discreto**: contorno o marco verde, proporciones cuidadas, padding equilibrado, buena alineación y estados focus/hover. No conviertas el logo en una etiqueta pequeña irrelevante ni en una gran pastilla que ocupe todo el menú.
2. **Añade el PNG del logotipo de la universidad al header**, localizando primero el recurso correcto entre los archivos del repositorio. Verifica su identidad, proporción, transparencia, legibilidad y derecho de uso según el recurso entregado. Utiliza `object-fit: contain`, sin deformarlo. Si el PNG no existe o no puedes identificar inequívocamente la institución, **no inventes un logo**, no utilices uno arbitrario de internet: incorpora la mejora que sí sea posible y especifica el asset pendiente en el informe.
3. Revisa el **footer** para que la identificación sea coherente con el header y los datos académicos vigentes: **Ariadna Angel Marco**, **Educació de les Arts Visuals I**, **curs 2026–2027** y la denominación de la universidad **solo si el recurso y los datos del proyecto permiten confirmarla**. Retira etiquetas antiguas o incongruentes. No inventes nombres nuevos o datos no suministrados.
4. Mantén header y footer responsivos. Comprueba que el doble logo no haga colapsar el menú en 375–430 px.

## 3. Tipografía global, justificación, destacados y citas

1. **Justifica los párrafos de lectura larga en toda la web** (introducción, bloques, actividades, reflexiones, conclusiones). Usa `text-align: justify`, `hyphens: auto`, `lang="ca"` y un ancho de columna razonable; evita ríos de espacios. Mantén encabezados, pies de foto, etiquetas, fichas breves y listas con alineación natural. En móvil cuida la legibilidad de la justificación y no provoques palabras cortadas incorrectamente.
2. Refuerza **frases o conceptos importantes con negrita verde bosque** en cada texto extenso, usando selección editorial moderada (normalmente una o dos ideas por unidad temática; nunca media página resaltada). Selecciona fragmentos **literales** del texto de Ariadna y no cambies su significado. No apliques una sustitución global de todas las frases entre comillas.
3. Los **destacados con comillas / pull quotes** actualmente son demasiado grandes. **Reduce claramente su tamaño** para que sean apoyos visuales, no titulares gigantes. Usa espaciado, borde sutil o un tono vegetal y una jerarquía inferior a los títulos de sección.
4. Aumenta la legibilidad reduciendo la densidad: más espaciado entre párrafos, subtítulos semánticos, anchura de lectura controlada, algunas figuras insertadas entre grupos de párrafos y alternancia suave de fondos. **No repitas la misma estructura de tarjeta para todos los bloques.**
5. Las líneas que aparecen como **guion decorativo `-` antes de los subapartados** deben sustituirse por un recurso más elegante: **punto verde discreto, numeración fina o pequeña regla editorial**, según el tipo de contenido. No elimines guiones que sí forman parte de textos o listas semánticas.
6. Limita el uso de mayúsculas a pequeñas etiquetas/eyebrows y al caso expreso de «UN RECORREGUT EN QUATRE CAPÍTOLS». No conviertas títulos extensos en gritos tipográficos.

## 4. Bloc II: portada del bloque

1. Conserva la denominación académica **«BLOC II. LA FORMACIÓ EN LA PRÀCTICA DE L’ART. EL JARDÍ COM AGENT PEDAGÒGIC.»**. El subtítulo **«El jardí com a agent pedagògic»** debe quedar **más pequeño** que ahora; evita duplicar visualmente títulos grandes y repetitivos.
2. Reparte mejor las imágenes del bloque: mantén la foto de grupo con calabazas ya aprobada, sin cortar caras ni calabazas, y combina otras fotos pertinentes del material local **entre contenido y secciones**, no todas en una gran galería al principio o al final.
3. Cambia la etiqueta de entrada a las actividades por **«UN RECORREGUT EN QUATRE CAPÍTOLS»**, completamente en mayúsculas y en **fuente pequeña de etiqueta editorial**, con algo de tracking. Las cuatro partes deben conservarse y seguir accesibles.
4. Revisa la frase destacada literal: «La creativitat no depèn de disposar materials elaborats, depèn de la nostra capacitat de mirar allò quotidià amb curiositat i descobrir-hi noves possibilitats». Mantén su importancia, pero **mucho más pequeña** y con tratamiento visual menos invasivo.

## 5. Bloc II · Part 2 «Visita al MNAC i passejada pels jardins de Montjuïc»

Esta es una prioridad visual. La página se percibe sobrecargada por el contraste entre fotografías de obras y textos completos muy largos.

1. **Conserva el título exigido:** «Visita al MNAC i passejada pels jardins de Montjuïc». Bajo esa cabecera, conserva la estructura del PDF: **PROPOSTA 1. VISITA MUSEU MNAC** y **PROPOSTA 2. DIÀLEG AMB EL JARDÍ**; no recuperes la antigua propuesta «Educar a través de les arts». Mantén las conclusiones de la salida, sus tres fotografías y la lectura íntegra visible en su sección si así está implementada.
2. Mantén las pestañas/paneles que ya funcionan y **añade desplegables accesibles** para el detalle extenso de **cada una de las diez obras** y, donde sea necesario, para textos de desarrollo/estrategias. Recomiendo ficha resumen siempre visible (foto, artista, obra, técnica y breve idea relevante **basada en el texto original**) + control «Llegir la reflexió i la proposta completa». El contenido completo se despliega **en el contexto de su obra**; no debe quedar oculto de forma irreversible.
3. **Reorganiza la posición relativa de imagen y texto**. En escritorio usa composiciones equilibradas (imagen de tamaño generoso con `object-fit: contain` para las obras, texto resumido junto a ella y desarrollo completo en un panel inferior); en móvil apila imagen, datos y control. Evita estrechas columnas de texto justificadas junto a imágenes enormes.
4. Revisa encuadre de todas las fotografías de las obras: **no recortar pinturas ni cartelas**. Si una foto incluye marco o composición completa, debe apreciarse. Proporciona apertura ampliada por lightbox existente. Evita `object-fit: cover` en reproducciones de obras que mutila la imagen.
5. En **Alexandre de Riquer**, **no** muestres un bloque de texto corrido que funda la explicación con las tres obras. Separa en párrafos la valoración personal y la aplicación docente e introduce una lista clara con **tres elementos independientes**: «A la dreta: Figura femenina amb una fiola a la mà», «A l’esquerra: Composició amb motius vegetals japonitzats», «Al centre: Composició amb una nimfa alada davant la sortida del sol». Conserva el contenido completo y los nombres tal como figuran en el PDF; no corrijas nombres de las obras por intuición.
6. Para **Proposta 2 — Diàleg amb el jardí**, conserva el collage y las **diez fotos individuales**, sin mezclar su correspondencia con las especies ya confirmadas. Cada planta debe tener ficha foto + nombre + fragmento inicial legible; la observación larga puede expandirse individualmente. Evita diez bloques gigantes abiertos por defecto.
7. El contenido debe permitir recorrer la actividad con una primera lectura rápida sin perder el desarrollo íntegro de Ariadna. En conclusiones, mantiene accesibles **todas las tres reflexiones completas** según el acuerdo anterior; no las conviertas en desplegables obligatorios si eso obliga a leerlas a trozos.

## 6. Bloc II · Part 3 «Descripció del jardí» — narración audiovisual del proceso

1. **No acumules al final todas las fotos de «Observació i recollida» ni de las demás fases.** Distribuye fotografías a lo largo de la lectura, insertadas **en el punto correspondiente**: observación y recogida → experimentación con materiales y técnicas → visor y selección de fragmentos → montaje/encuadernación → libro de artista terminado.
2. Mantén íntegros los textos sobre el libro **«Natura viva»**, su justificación de las tiras a doble cara, la reflexión final, la metodología y los materiales. Fragmenta su presentación con subtítulos de proceso sin atribuir experiencias no escritas.
3. Revisa específicamente la imagen cuya leyenda actual es «Papers amb impressions i dibuixos de formes vegetals»: **incluye la función del visor** en el pie, por ejemplo: **«Visor utilitzat per seleccionar fragments de les composicions i construir el llibre d’artista “Natura viva”.»**. Verifica que el elemento señalado aparezca efectivamente en esa imagen. Si no aparece, corrige el pie de manera fiel al contenido visible en lugar de inventar.
4. Añade **pies de foto breves y descriptivos** a las imágenes que documentan el proceso; usa el material visible, no supuestas fechas ni fases no acreditadas.
5. Los dos vídeos verticales del libro terminado deben mostrarse **uno al lado del otro en escritorio** (dentro de una composición horizontal) y **apilados en móvil**, manteniendo **su relación de aspecto vertical natural**. No gires ni estires sus fotogramas.
6. Evita imágenes tan grandes que interrumpan el sentido de los párrafos; alterna tamaños y alineaciones con un patrón intencionado y sin galerías monótonas.

## 7. Bloc II · Part 4 «Experimentem amb tintes vives»

1. Aplica el mismo criterio narrativo: reparte fotos y vídeos **durante** cada fase en lugar de agruparlos todos en una única galería.
2. Respeta el PDF: preparación de tintes de remolatxa y col llombarda, experimentación con sustancias, aplicación al papel y leporellos, comparación de los dos pigmentos, estrategias y materiales.
3. Usa composiciones fotográficas alternas y pies de imagen de una frase. Evita repetir la misma imagen o usar una foto de resultado final bajo una fase inicial si no corresponde.
4. Destaca conceptos originales como «remolatxa», «col llombarda», «canvis de tonalitat», «experimentació» y «leporello», en **negrita verde selectiva** donde estén presentes en el texto, sin introducir afirmaciones nuevas.
5. Mantén esta parte como **completa**, sin avisos «Pendent d'incorporar».

## 8. Bloc III: títulos menos invasivos

- Respeta literalmente el encabezado: **«BLOC III. LA FORMACIÓ EN LA PRÀCTICA DE L’ART. MODA, ARTIVISME I PERFORMATIVITAT EN LES ARTS I L’EDUCACIÓ.»**.
- **Reduce su tamaño y reequilibra su jerarquía visual**; usa una etiqueta pequeña «BLOC III» y divide las dos frases en líneas apropiadas sin alterar su redacción, si eso mejora la composición. Aplica lo mismo a otros títulos largos de la web.
- Mantén los marcadores «Pendent d'incorporar» ya acordados de forma discreta y sin referencias documentales técnicas.

## 9. Implementación técnica y límites

1. Audita la estructura actual antes de editar. Prioriza los componentes/renderers y CSS de la web existente; no reescribas el sitio completo ni cambies el router innecesariamente.
2. Conserva fuentes de contenido actualizadas de 40 páginas, datos originales y procedimientos de build. Si hay HTML generado, modifica sus plantillas o transformaciones de origen, no solo el artefacto final.
3. Introduce clases utilitarias/editoriales reutilizables para párrafos justificados, realce selectivo, quote pequeño, separadores, medias intercaladas, fichas de museo y acordeones. Evita reglas CSS globales que rompan todas las páginas.
4. Los desplegables deben tener accesibilidad real: botón/summary operativo, `aria-expanded` donde corresponda, indicadores de apertura/cierre, navegación por teclado, foco visible y ESC si usan un modal; no destruyas el lightbox existente.
5. Elige las fotos entre los recursos locales verificados; **no uses imágenes arbitrarias de internet**. Conserva la correspondencia validada de las 10 obras y las 10 plantas.
6. Revisa imágenes `object-position`/`object-fit`, carga diferida y dimensiones para evitar cambios de layout. Mantén videos reproducibles y sus controles.
7. El HTML debe ser semántico y accesible. Las cabeceras académicas exactas pueden repartirse en elementos `span` solo a efectos de diseño, sin alterar su texto accesible.
8. No hagas commit, push ni despliegues sin autorización.

## 10. Criterios de aceptación y pruebas obligatorias

- Página de inicio: títulos renovados, separador de «Art i educació», alternancia cromática suave y logo tipográfico verde; logo universitario si el PNG correcto está disponible.
- Header/footer: identificación coherente, sin marca o nombre inventado y sin colapso de navegación.
- En todo el sitio: los **párrafos largos aparecen justificados** con buena legibilidad, las ideas clave resaltadas en **negrita verde**, destacados con comillas claramente **más pequeños**, guiones decorativos sustituidos y títulos largos reducidos.
- Bloc II: títulos exactos, subtítulo reducido, imágenes repartidas y «UN RECORREGUT EN QUATRE CAPÍTOLS» pequeño y en mayúsculas.
- Bloc II Part 2: pestañas existentes conservadas, **acordeones funcionales**, ficha + reflexión completa por obra, fotos sin recorte, párrafos de Alexandre de Riquer separados, diez plantas y collage disponibles; conclusiones completas y visibles.
- Bloc II Part 3: fotografías narradas entre párrafos, visor correctamente descrito, pies relevantes y dos vídeos en fila en escritorio sin deformación.
- Bloc II Part 4: fotos y vídeos repartidos por fases, texto completo, sin aviso de pendiente.
- Bloc III: título académico exacto, visualmente menos grande.
- Prueba las **17 rutas** (si siguen siendo 17) en **375, 390, 430, 768, 1024 y 1440 px** con navegador automatizado; comprueba menú, pestañas, acordeones, lightbox, acceso por teclado, contrastes, vídeo, imágenes, consola, enlaces y ausencia de desbordamientos horizontales.
- Obtén y revisa **capturas antes/después** al menos de: Inicio, Bloc II, Part 2 museo y jardín, Part 3, Part 4 y Bloc III; revisa 390 y 1440 px. No informes de verificación que no se hayan realizado.

## 11. Entregable del agente

**Implementa** los cambios, no presentes solo un plan. Al terminar, informa concisamente de:

1. Archivos y componentes modificados.
2. Cambios ejecutados por página y criterios visuales aplicados.
3. Recursos usados: ruta del PNG universitario, fotos intercaladas y pies nuevos.
4. Pruebas realmente efectuadas y ubicación de capturas.
5. Cualquier bloqueo verificable (por ejemplo, logo universitario no localizado o falta de correspondencia de una foto), sin detener el resto de cambios.

**Restricción final:** no borrar/refundir las reflexiones de Ariadna para conseguir una web más corta; conseguir una **lectura más ligera mediante diseño editorial y divulgación progresiva**, conservando el contenido integral.
