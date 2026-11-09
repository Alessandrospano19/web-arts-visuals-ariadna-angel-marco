# Correcciones finales — 9 de noviembre de 2026

Se han aplicado el encargo y las correcciones adicionales sobre la web existente, sin rediseño, cambios de rutas ni alteraciones de las reflexiones originales.

## Implementado

- Tres desplegables nativos independientes en «CONCLUSIONS DE LA SORTIDA», inicialmente cerrados. Títulos breves solicitados: «El meu vincle amb la natura», «La meva pràctica artística» y «La meva futura pràctica docent». La introducción permanece visible; cada panel conserva su pregunta académica, respuesta íntegra y fotografía correspondiente.
- Vídeos del libro centrados como conjunto con título y pies; continúan verticales, juntos en escritorio y apilados en móvil.
- Fotografía final sustituida por `part-3-llibre/2.webp`, confirmada expresamente por el usuario como Ariadna haciendo frottage. Se conserva la fotografía completa, con pie y alt coherentes. Los pétalos siguen disponibles en la galería complementaria.
- `img_5125.webp` y `img_5127.webp`: rotación de 90° en sentido horario verificada visualmente, en página y lightbox. Presentación horizontal con todo el contenido visible; dos columnas en escritorio y una en móvil. Los archivos originales no se han modificado.
- Pie y descripción de `img_4791.webp`: «Carbasses allargades», sin cambiar otras fotografías.
- Rótulo de navegación de Part 2 en mayúsculas desde una única entrada editable. H1 académico y ruta conservados. Footer de Bloc III con el título académico completo.
- Subrayados verdes discretos sobre tres selecciones literales, sin cambiar citas ni palabras. Continúan los párrafos justificados y los márgenes de lectura.
- Riquer: lista HTML de tres elementos, uno por línea, con prefijos destacados y denominaciones originales. Confirmado después de regenerar; también funciona en el lightbox.

## Cotejo de fuentes y materiales no disponibles

La versión más reciente disponible en `source/` es `ESTRUCTURA_ARIADNA_ACTUAL_40P.pdf`, transcrita en `content/PDF_ACTUALITZAT_40P.md`.

- **Per saber-ne més…:** página 39, únicamente el encabezado. Se mantiene pendiente; no hay texto ni enlaces nuevos documentados para incorporar.
- **Bibliografía:** página 40, dos referencias: Heike Freire (2010), *La escuela es el bosque*, y Rachel Carson (2012), *El sentido del asombro*, con el enlace ya recogido. La web conserva ambas, sin duplicados. No aparecen nuevas referencias en esta versión.
- **Cartelas:** no se han localizado fotografías independientes identificables de cartelas entre los recursos e inventarios entregados. Las once imágenes extraídas del PDF corresponden a diez obras y un collage; se revisaron también las dos imágenes de la página 17, que son obras. Algunas fotografías principales incluyen cartelas pequeñas y siguen siendo ampliables, pero no se presentan como fotografías independientes ni se atribuyen textos ilegibles. Para completar ese añadido hacen falta las fotos de las cartelas vinculadas a cada obra.

Se han cerrado las antiguas dudas sobre Solé Duc y las tres asociaciones botánicas según la confirmación del encargo; no se han modificado esas fichas.

## Verificación y capturas

- Dos regeneraciones consecutivas y `verify_content.py`: contenido original íntegro, CSS original conservado y 72 recursos locales existentes.
- `verify_browser.cjs`: 17 rutas en seis anchos (102 comprobaciones), enlaces, menús, pestañas, diez obras, diez plantas, cinco vídeos, teclado, lightbox y apertura directa del HTML. Comparación del texto reconstruido de las tres conclusiones con la fuente íntegra. Sin errores de consola ni respuestas locales fallidas.
- `verify_09_nov.cjs`: centrado exacto del conjunto multimedia, orientación y encuadre completo a 390, 768 y 1440 px. Tres desplegables inicialmente cerrados, apertura con Enter, cierre con Espacio y apertura simultánea de los tres. Lightbox de las imágenes giradas comprobado.
- Capturas antes/después en `docs/verification/ajustes-09-nov/before/` y `after/`, revisadas visualmente. Incluyen conclusiones abiertas/cerradas, vídeos, reflexión final, pie de calabazas y footer. Las capturas `llibre-horitzontal-*` muestran la nueva orientación de las fotos. La serie de regresión adicional está en `regression/`.
- `git diff --check` sin errores.

Cambios en fuentes editables, componentes existentes, CSS adicional, generador para conservar la orientación y pruebas. Guía de edición actualizada. No se ha hecho commit, push ni despliegue.
