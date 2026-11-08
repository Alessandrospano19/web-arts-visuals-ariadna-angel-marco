Quiero realizar una quinta iteración de ajustes editoriales sobre la web actual de Ariadna.

**La cuarta iteración está bien conseguida. No quiero rediseñar la web ni modificar su estructura.** Conserva la portada, la navegación, los colores, la distribución de imágenes, los tamaños generales y los componentes que ya funcionan.

Esta intervención debe centrarse especialmente en el contenido que aparece al abrir los desplegables de **«Llegir la reflexió completa»**, «Proposta completa» y otros apartados académicos.

### 1. DESTACAR LOS CONCEPTOS IMPORTANTES DENTRO DE LAS REFLEXIONES COMPLETAS

Actualmente, las reflexiones resumidas están bien maquetadas, pero muchos textos completos siguen apareciendo como grandes bloques de lectura uniforme.

Quiero introducir una jerarquía visual dentro de esos textos.

Analiza el contenido de cada reflexión y destaca selectivamente:

- Nombres de autores o pensadores relevantes, como Rachel Carson, Heike Freire, Arno Stern o Fina Miralles.
- Conceptos pedagógicos importantes: creatividad infantil, pensamiento divergente, exploración sensorial, contacto con la naturaleza, libertad de expresión, proceso creativo, observación, etc.
- Afirmaciones especialmente significativas formuladas por Ariadna.
- Ideas centrales que resumen el aprendizaje de un párrafo.
- Conclusiones relevantes para su futura práctica docente.

**Formato de los destacados: negrita con el color verde oscuro que ya utiliza la web.**

No quiero que todos los sustantivos aparezcan en negrita.

Selecciona fragmentos con criterio editorial, normalmente uno o dos por párrafo cuando exista una idea especialmente relevante.

Evita convertir toda la reflexión en un texto lleno de colores y negritas. El destacado debe tener valor porque es selectivo.

### 2. FORMATO ESPECIAL PARA LAS CITAS

Cuando Ariadna incluya una cita textual entre comillas, especialmente de un autor, quiero diferenciarla visualmente.

Utiliza:

- Negrita.
- Cursiva.
- Color verde oscuro, cuando resulte adecuado.
- Un tamaño ligeramente inferior para las citas largas, sin comprometer la legibilidad.

Ejemplo conceptual:

Una frase citada de Rachel Carson debe distinguirse claramente de la explicación personal que la acompaña.

Para las citas extensas puedes utilizar un bloque editorial con una línea lateral verde y un fondo beige muy suave.

No conviertas automáticamente en citas destacadas los títulos de obras, los nombres de actividades ni todas las expresiones entre comillas. Diferencia las citas reales de los títulos y otros usos tipográficos.

**No modifiques ni una palabra del texto citado ni de sus referencias.**

### 3. MEJORAR EL FORMATO DE PROPUESTAS, OBJETIVOS Y METODOLOGÍAS

Hay un problema visual recurrente con los guiones utilizados en:

- Proposta.
- Objectius.
- Estratègies metodològiques.
- Materials.
- Listas presentes dentro de las reflexiones y actividades.

Los guiones simples al comienzo de cada elemento no me parecen elegantes.

Quiero sustituir su representación visual por un sistema editorial más cuidado.

Puedes utilizar pequeños puntos circulares en verde oliva, numeraciones discretas cuando exista una secuencia o una línea lateral suave para agrupar elementos.

Aumenta la separación vertical entre los elementos de las listas.

Quiero que cada objetivo tenga su propio espacio de lectura, sin que los elementos aparezcan demasiado pegados.

Mantén la estructura semántica de listas HTML cuando corresponda, pero personaliza su presentación mediante CSS.

No sustituyas todas las listas por tarjetas grandes: eso también recargaría la página.

La presentación debe ser minimalista, elegante y consistente en todos los bloques.

### 4. REVISAR TODOS LOS DESPLEGABLES

Este es el punto más importante de la iteración.

Los cambios no deben aplicarse únicamente a las reflexiones visibles inicialmente.

Debes revisar también el contenido completo que se muestra al abrir los desplegables de:

- Introducció.
- Bloc I.
- Bloc II, Parts 1, 2, 3 y 4.
- Las diez obras del museo.
- Las reflexiones sobre especies vegetales.
- Conclusions de la sortida.
- Cualquier otra sección donde se muestre contenido académico completo.

Dentro de esos desplegables quiero:

1. Párrafos correctamente separados y justificados.
2. Conceptos importantes destacados en negrita verde.
3. Citas textuales diferenciadas con negrita y cursiva.
4. Listas sin guiones visualmente poco elegantes.
5. Márgenes interiores suficientes.
6. Interlineado cómodo.
7. Buena separación entre párrafos.
8. Una anchura de lectura controlada para evitar líneas demasiado largas.

Conserva el comportamiento responsive existente. Si la justificación genera huecos excesivos en alguna anchura, corrígelo sin provocar desbordamientos.

### 5. CONSERVAR ÍNTEGRAMENTE LOS TEXTOS DE ARIADNA

Esta condición es obligatoria.

**No resumas, elimines, reformules ni reescribas las reflexiones originales.**

Aunque algunos textos sean largos o contengan repeticiones, Ariadna quiere conservarlos.

Tu tarea es mejorar su presentación, no cambiar su redacción.

Los destacados deben aplicarse sobre fragmentos literales ya existentes.

No inventes citas ni introduzcas frases nuevas dentro de las reflexiones.

Conserva los títulos académicos tal como aparecen en el documento.

### 6. IMPLEMENTACIÓN TÉCNICA

El proyecto ya dispone de una separación entre contenidos editables, Markdown académico, componentes y CSS.

Reutiliza esa arquitectura.

Prioriza los cambios en los archivos de contenido editables y en los componentes de lectura existentes.

No modifiques directamente archivos generados si los cambios pueden perderse al ejecutar `build_content.py`.

No añadas sustituciones masivas mediante expresiones regulares que puedan romper las citas, el Markdown, los nombres de autores o los textos originales.

Si necesitas ampliar el sistema de destacados, hazlo de forma segura y reutilizable.

Evita duplicar las reflexiones o crear dos versiones distintas del mismo texto.

### 7. COMPROBACIONES FINALES

Una vez implementados los cambios:

- Abre varias reflexiones completas de diferentes bloques.
- Comprueba que las negritas verdes aparecen realmente dentro de los desplegables.
- Verifica el formato de las citas textuales.
- Verifica las listas de objetivos y metodologías.
- Comprueba que los textos originales no se han alterado.
- Regenera el contenido y confirma que los cambios persisten.
- Revisa visualmente las páginas a 390 px y 1440 px.
- Comprueba que los desplegables, las galerías y los menús siguen funcionando.

Genera capturas de al menos una reflexión completa, una ficha del museo abierta y una sección de objetivos, tanto en móvil como en escritorio.

**No quiero una nueva transformación visual general. Quiero un refinamiento tipográfico y editorial de los textos completos que ya tenemos.**

No hagas commit, push ni despliegue. Al finalizar, informa brevemente de los cambios y las pruebas realizadas.