# Quinta iteración editorial

Intervención centrada en la lectura académica, conservando portada, rutas, navegación, paleta, tamaños generales, fotografías y componentes de la cuarta iteración. Sin commit, push ni despliegue.

## Cambios

- Los destacados académicos se seleccionan por párrafo, en lugar de agotarse después de dos coincidencias en toda la reflexión. Se priorizan autores, conceptos pedagógicos y afirmaciones literales. Habitualmente se muestran uno o dos; no se fuerza un destacado donde no hay selección pertinente.
- Seis citas revisadas expresamente reciben negrita, cursiva y verde oscuro con una escala ligeramente menor. Cuatro corresponden a las lecturas de Carson/Freire. Se mantienen comillas, palabras y referencias; títulos y actividades entre comillas no se convierten automáticamente en citas.
- Las listas HTML conservan su semántica y sustituyen el guion visual por puntos oliva, con mayor separación vertical. Riquer mantiene sus tres elementos independientes.
- Los desplegables abiertos tienen más margen interior, una regla lateral discreta, párrafos separados, justificación, interlineado cómodo y anchura controlada. Las conclusiones de la salida permanecen completas y visibles.

## Archivos

`content/editables/lectura-academica.json` contiene las selecciones literales, separadas de los textos originales. `scripts/app.js` aplica intervalos sobre texto plano, escapa su contenido y evita superposiciones y coincidencias dentro de otras palabras. No se aplican sustituciones generales de textos entre comillas.

Los estilos se incorporan en `styles/integration.css`; `scripts/web-editables.js` se regenera mediante el generador existente. La guía `COMO_EDITAR_LA_WEB.md` explica la nueva configuración. Ningún Markdown académico ni documento original ha sido modificado.

## Pruebas efectuadas

- Build y verificación documental correctos; textos completos y CSS original conservados, 72 recursos locales existentes.
- Revisión automatizada de todas las rutas y sus paneles con los desplegables abiertos a 390 y 1440 px: 34 combinaciones de ruta/ancho, sin desbordamientos ni errores JavaScript. Se comprueba la tipografía de las citas y los marcadores de lista.
- Prueba de edición manual: cambios visibles tras dos regeneraciones; entradas originales restauradas al terminar. La prueba utiliza ahora la configuración académica para el destacado verde.
- Suite funcional: 102 combinaciones de ruta/ancho (375, 390, 430, 768, 1024 y 1440 px), menús, teclado, pestañas, lightbox, diez obras, diez especies, textos completos, cinco vídeos y apertura directa del HTML. Sin errores de consola ni recursos locales fallidos. Contrastes de lectura medidos superiores a 4,5:1.
- Ocho capturas específicas revisadas visualmente: reflexión completa, detalle de cita, ficha de Riquer abierta y objetivos, tanto a 390 como a 1440 px. Otras 24 capturas pertenecen a la suite funcional.
- `git diff --check` sin errores.

Evidencias: `docs/verification/quinta-iteracio/reading-report.json`, capturas de esa carpeta y `regression/report.json`. Prueba específica reproducible: `scripts/verify_academic_reading.cjs`, con Playwright y Edge.

No se han necesitado recursos multimedia nuevos ni se han añadido dudas documentales.
