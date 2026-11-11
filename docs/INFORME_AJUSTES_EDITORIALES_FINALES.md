# Ajustes editoriales finales

Aplicados sobre `a584826` (v2 final). No se ha hecho commit, push ni despliegue.

## Cuatro correcciones

1. **Destacados y estrategias:** selección ampliada de conceptos pedagógicos, ideas y conclusiones mediante el formateador común `academicInline`, también en los resúmenes. Citas de Carson y Freire conservadas en negrita verde y cursiva. Se comprueban **17 etiquetas completas hasta los dos puntos**: seis del museo, cinco del libro y seis del taller de tintas. La clase `methodology-term` y el contexto explícito `methodology` impiden aplicar esta regla a cualquier frase con dos puntos. La metodología del jardín es un párrafo narrativo sin etiquetas: se conserva y recibe destacados conceptuales, sin inventar una lista. En las secciones de fondo verde oscuro, el texto destacado sigue siendo verde oscuro sobre un pequeño fondo claro de la paleta existente para conservar el contraste.
2. **Justificación:** párrafos de propuestas, objetivos, procesos, reflexiones, conclusiones, ampliación, obras y listas académicas justificados; `lang=ca`, partición silábica automática y última línea alineada al inicio. Se preservan títulos, botones, pies, etiquetas y encabezados de tablas. En móvil, las etiquetas metodológicas se presentan alineadas al inicio, en una línea/bloque previo a la explicación, para no estirar sus palabras; la explicación sigue justificada. Se ha reducido el espacio lateral de las listas y la lectura desplegada, con composición cuidada y sin cambiar las fuentes ni la estructura.
3. **Índice del Bloc II:** la segunda entrada muestra exactamente **VISITA AL MNAC I PASSEJADA PELS JARDINS DE MONTJUÏC**. La configuración `titulos.indice_capitulos` afecta solo al índice visual. Número de parte, hash, enlaces, menús y título académico de la página conservados.
4. **Bibliografía:** las once entradas tienen un único título en cursiva. Autor/año, revistas, editoriales, volúmenes, números, páginas y enlaces están en letra normal. Los títulos se declaran como fragmentos literales en `content/editables/bibliografia-formato.json`; el generador valida cantidades y coincidencia única. `bibliografia.json` no se ha modificado, y los títulos se han cotejado con la bibliografía del documento de 60 páginas revisado en esta conversación. La puntuación original se conserva; en Iwai el punto final pertenece al fragmento en cursiva solicitado.

## Verificación

- `python scripts/build_content.py` ejecutado tres veces en total, las dos últimas consecutivas; todos los cambios de formato persisten.
- `python scripts/verify_content.py`: pasa; 91 recursos locales, 10 obras, 10 especies, 6+5 referencias y ocho entradas de glosario. El CSS original de `index.html` permanece intacto.
- `node scripts/verify_editorial_final.cjs`: pasa después de regenerar. **38 estados de ruta/panel, 446 párrafos/listas revisados**, a 390 y 1440 px. Se verifican justificación, guionado/idioma, exclusión de elementos breves y encabezados, ausencia de overflow, 17 etiquetas y once referencias individualmente en cada ancho. Veinte capturas nuevas.
- `node scripts/verify_browser.cjs`, con salida separada: pasa. **102 comprobaciones de rutas** a 375, 390, 430, 768, 1024 y 1440 px; 18 paneles, cinco vídeos, teclado/foco, lightbox, menús, protocolo `file://`, contraste muestreado y recursos locales. Sin errores de consola ni solicitudes locales fallidas.
- Baseline SHA-256 de **39 archivos protegidos**: todos conservan exactamente sus bytes, incluidos los 33 Markdown académicos, fichas de obras/especies, transcripción de 60 páginas, bibliografía, resúmenes editoriales e `index.html`. El objeto académico completo `PORTFOLIO` es idéntico al anterior, incluidas reflexiones, objetivos y referencias.
- `node --check` de los tres archivos de componentes modificados y `git diff --check`: pasan.

Registros y capturas: [prueba editorial](verification/ajustes-editoriales-finales/report.json), [regresión](verification/ajustes-editoriales-finales/regresion/report.json), [bibliografía móvil](verification/ajustes-editoriales-finales/bibliografia-390.png), [bibliografía escritorio](verification/ajustes-editoriales-finales/bibliografia-1440.png), [estrategias móvil](verification/ajustes-editoriales-finales/tintes-estrategies-390.png), [índice](verification/ajustes-editoriales-finales/indice-1440.png).

## Referencias comprobadas individualmente

| Grupo | Entrada | Único título en cursiva | Resto normal |
| --- | --- | --- | --- |
| Utilizadas | Arte informado | Lucia Loren. | Sí |
| Utilizadas | Carson | El sentido del asombro | Sí, incluido el intervalo de páginas |
| Utilizadas | Freire 2010 | La escuela es el bosque. | Sí |
| Utilizadas | Iwai | La contribución de la educación artística a la vida de los niños. | Sí |
| Utilizadas | RTVE | "Ríos y Mareas" - Andy Goldsworthy trabajando con El Tiempo (REE). | Sí |
| Utilizadas | Zona Libre | Martin Hill. El círculo de la vida. | Sí |
| Recomendadas | Álvarez-Valdivia y Morón-Velasco | Educar por medio del arte en una escuela multicultural. | Sí, incluido magis |
| Recomendadas | Eisner | Educar la visión artística. | Sí |
| Recomendadas | Freire 2026 | Educar en verde. Cómo superar el déficit de naturaleza y cultivar el amor a la tierra. | Sí |
| Recomendadas | González | Dibujar con la naturaleza: Apuntes sobre educación artística. | Sí |
| Recomendadas | Hoyuelos | Les imatges fotogràfiques com a documentació narrativa. | Sí |

## Excepciones y límites

**Ningún ajuste editorial solicitado queda pendiente.** Las rutas y enlaces locales funcionan y las cinco URLs bibliográficas permanecen idénticas y enlazadas correctamente.

La disponibilidad externa no puede certificarse por completo: el acceso HTTP desde el proceso local fue bloqueado por la red del entorno (`EACCES`). La comprobación web alternativa pudo abrir [el PDF de Carson](https://biblioteca.empresainteligente.com/resources/biblioteca/archivos/el_sentido_del_asombro.pdf) y [el artículo de magis](https://revistas.javeriana.edu.co/index.php/MAGIS/article/view/32731). ARTEINFORMADO respondió 403, Blogspot redirigió a un control de acceso automatizado y RTVE no fue accesible mediante esa herramienta. **No se concluye que esos tres enlaces estén rotos ni se cambian por otros distintos del PDF.** Su apertura manual queda pendiente; las limitaciones de consulta están registradas en `verification/ajustes-editoriales-finales/external-links.json` y en esta nota.

Las cuestiones académicas de la auditoría anterior —por ejemplo, asistencia o discrepancias de fuente— no forman parte de estas cuatro correcciones y no se han alterado ni rellenado con textos nuevos.
