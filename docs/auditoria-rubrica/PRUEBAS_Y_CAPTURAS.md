# Pruebas y capturas del diagnóstico

Fecha: 11 de noviembre de 2026. Servidor local `http://127.0.0.1:8000`, desde este checkout. Navegador Microsoft Edge automatizado con Playwright del runtime incluido en Codex. No se instalaron frameworks ni dependencias en el proyecto. PDF leído con pypdfium2 del Python incluido, con renders inspeccionados visualmente.

## Alcance y reproducibilidad

Se usó `python -m http.server 8000 --bind 127.0.0.1`, que no regenera contenidos. No se ejecutaron `build_content.py`, `dev.py` ni `verify_editing.cjs`: regeneran o modifican fuentes durante la prueba. Se preservó el checkout del usuario.

Para reproducir los scripts de navegador, definir `ARI_PLAYWRIGHT_MODULE` con la instalación disponible de Playwright. En esta sesión:

```powershell
$env:ARI_PLAYWRIGHT_MODULE='C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1110-778-0_26.1110.778.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright'
$env:ARI_VERIFICATION_OUTPUT='docs/auditoria-rubrica/capturas/regresion'
node scripts/verify_browser.cjs
node docs/auditoria-rubrica/audit-browser.cjs
node docs/auditoria-rubrica/audit-final.cjs
python scripts/verify_content.py
```

`compare-pdf.py` requiere el Python incluido con pypdfium2, no el Python del sistema que carece de ese paquete. Su ruta en esta sesión termina en `dependencies/python/python.exe` del mismo runtime. El script solo lee el PDF y escribe el cotejo dentro de la auditoría.

## Resultados ejecutados

| Prueba | Resultado comprobado | Registro |
| --- | --- | --- |
| `git status --short`, rama y commit | Estado inicial sin cambios versionados; cuatro archivos nuevos de Prompts aportados por el usuario | Estado transcrito en el informe; estado final en `estado-final.txt` |
| Número de páginas y render de rúbrica | PDF original 2; documento académico 60; cuatro tablas leídas en imagen | `capturas/rubrica-original-p1.png`, `rubrica-original-p2.png` |
| `python scripts/verify_content.py` | Pasa. Fuentes y datos cotejados; 91 recursos locales, 10 obras, 10 especies, 6+5 referencias, 8 conceptos; bloque CSS original preservado | [verify-content.log](verify-content.log); repetido después de la cursiva con el mismo resultado |
| `node scripts/verify_browser.cjs` | Pasa. **102 comprobaciones** (17 rutas × 6 anchos), 18 paneles, 91 recursos, 10 obras y especies, 5 vídeos; reflexión íntegra, teclado, foco, Esc, menú móvil, protocolo `file://`, 404 y contraste muestreado; 0 errores/solicitudes fallidas | [log](verify-browser.log), [JSON](capturas/regresion/report.json), 24 capturas nuevas en `capturas/regresion/` |
| `node docs/auditoria-rubrica/audit-browser.cjs` | Pasa. 34 estados de ruta a 390/1440 con desplegables abiertos; 37 capturas, 10 cartelas ampliadas con retorno del foco, 5 vídeos con fotograma decodificado; 0 errores/solicitudes locales fallidas; sin overflow en las 34 vistas | [log](audit-browser.log), [browser-evidence.json](browser-evidence.json) |
| Comparación independiente con PDF real | 72 unidades: 70 coincidencias continuas tras normalizar formato; 2 casos de columnas intercaladas resueltos visualmente, no omisiones. Los 52 bloques principales/CDAN/ampliación/glosario/referencias coinciden todos | [pdf-comparison.json](pdf-comparison.json); [p.17](capturas/pdf60-p17.png), [p.18](capturas/pdf60-p18.png) |
| `node docs/auditoria-rubrica/audit-final.cjs` | Pasa. 11 entradas con `font-style:italic` a 390/1440, mismos datos y URLs que la línea base; 4 citas completas con peso 700, cursiva y verde; 3 artistas/5 imágenes/8 filas; desplegables de artistas y glosario por Enter | [log](audit-final.log), [final-evidence.json](final-evidence.json), 8 capturas finales |
| `node docs/auditoria-rubrica/verify_document60-audit.cjs` | Pasa después de la cursiva. 17 rutas canónicas + 1 alias, alias en 6 anchos; 10 cartelas, 3 obras/4 imágenes CDAN, 3 artistas/5 imágenes, 8 filas, 6+5 referencias; texto completo y teclado; 0 errores; 16 capturas | [log](verify-document60.log), [JSON](capturas/document60/report.json) |
| Inspección visual | Tablas de rúbrica, bibliografía de D p.54, citas de D p.9, tabla D p.44, Riquer/Vidal D p.17–18, cartelas 01–10; capturas de lectura móvil, técnicas, libro terminado, preparación/reflexión de tintas, glosario, ampliación y bibliografía final | Enlaces de la matriz del informe y catálogo inferior |
| `git diff --check` | Pasa tras el cambio CSS | Único cambio versionado de producto: `.bibliography li`, una propiedad |

El verificador especializado de 60 páginas se ejecutó con éxito como `verify_document60-audit.cjs`, copia del original con **solo la carpeta de salida de capturas cambiada** para no escribir fuera de esta auditoría. Su resultado está en los enlaces de la tabla. No reemplaza la lectura de la rúbrica ni la evaluación de profundidad.

### Incidencias de los instrumentos

La primera pasada del capturador adicional encontró un estado de pestaña distinto al esperado en P2: intentó abrir una ficha dentro de un panel oculto. Se corrigió el instrumento para activar «obres» explícitamente y se repitió completo con éxito. La primera invocación del script final tuvo una declaración duplicada de variable en el instrumento; se corrigió antes de la ejecución final. Ninguna incidencia requirió tocar el producto. Los logs enlazados son de las ejecuciones finales.

## Capturas principales y estados

Todas las siguientes capturas son nuevas. En los nombres, 390 y 1440 son **anchos del viewport CSS**, no la anchura de un elemento recortado. Altura de viewport del capturador adicional: 950 px. Las capturas de elemento pueden ser mucho más altas que el viewport; para leerlas sin reducción automática, abrir el archivo y ampliar. Los recortes `*-lectura-detall-*` son capturas de viewport con el desplegable abierto.

| Ruta exacta | Estado y elemento | 390 px | 1440 px |
| --- | --- | --- | --- |
| `#/introduccio` | Página con reflexión abierta | [página](capturas/introduccio-oberta-390.png) | [página](capturas/introduccio-oberta-1440.png) |
| `#/introduccio` | Inicio legible de `#reflexio-completa`, abierto | [detalle](capturas/introduccio-lectura-detall-390.png) | [detalle](capturas/introduccio-lectura-detall-1440.png) |
| `#/bloc-i` | Página con propuesta y reflexión abiertas | [página](capturas/bloc-i-obert-390.png) | [página](capturas/bloc-i-obert-1440.png) |
| `#/bloc-i` | Cuatro citas de las unidades editoriales | [citas](capturas/cites-390.png) | [citas](capturas/cites-1440.png) |
| `#/bloc-i` | Reflexión completa abierta, comienzo | [detalle](capturas/bloc-i-lectura-detall-390.png) | [detalle](capturas/bloc-i-lectura-detall-1440.png) |
| `#/bloc-ii/p3-descripcio-del-jardi` | Proceso del libro; desplegables abiertos | [página](capturas/llibre-proces-390.png) | [página](capturas/llibre-proces-1440.png) |
| `#/bloc-ii/p3-descripcio-del-jardi` | Segunda unidad, experimentación y técnicas | [técnicas](capturas/llibre-tecniques-390.png) | [técnicas](capturas/llibre-tecniques-1440.png) |
| `#/bloc-ii/p3-descripcio-del-jardi` | Quinta unidad, doble cara y libro terminado | [resultado](capturas/llibre-resultat-390.png) | [resultado](capturas/llibre-resultat-1440.png) |
| `#/bloc-ii/p3-bis-taller-de-tintes-naturals` | Taller completo con fases y tabla | [página](capturas/tintes-proces-390.png) | [página](capturas/tintes-proces-1440.png) |
| `#/bloc-ii/p3-bis-taller-de-tintes-naturals` | Primera fase; foto lateral señalada | [preparación](capturas/tintes-preparacio-390.png) | [preparación](capturas/tintes-preparacio-1440.png) |
| `#/bloc-ii/p3-bis-taller-de-tintes-naturals` | Reflexión nueva completa | [reflexión](capturas/tintes-reflexio-390.png) | [reflexión](capturas/tintes-reflexio-1440.png) |
| `#/per-saber-ne-mes` | Tres reflexiones y glosario abiertos | [página](capturas/saber-mes-obert-390.png) | [página](capturas/saber-mes-obert-1440.png) |
| `#/per-saber-ne-mes` | `#glosari` abierto; tabla de 8 entradas | [glosario](capturas/glosari-390.png) | [glosario](capturas/glosari-1440.png) |
| `#/referencies-bibliografiques` | Línea base antes del cambio | [antes](capturas/bibliografia-abans-390.png) | [antes](capturas/bibliografia-abans-1440.png) |
| `#/referencies-bibliografiques` | Estado final, 6 + 5 entradas en cursiva | [después](capturas/bibliografia-cursiva-390.png) | [después](capturas/bibliografia-cursiva-1440.png) |
| `#/bloc-ii/p2-visita-museu-i-jardi` | Pestaña obras, ficha 1 con reflexión y cartela abiertas | [obra/cartela](capturas/obra-cartela-obertes-390.png) | [obra/cartela](capturas/obra-cartela-obertes-1440.png) |
| `#/bloc-ii/p2-visita-museu-i-jardi` | `#referents-cdan`, párrafo de no asistencia visible | [CDAN](capturas/cdan-390.png) | [CDAN](capturas/cdan-1440.png) |
| `#/bloc-ii/p2-visita-museu-i-jardi` | Pestaña jardín, observaciones abiertas | [Montjuïc](capturas/montjuic-390.png) | [Montjuïc](capturas/montjuic-1440.png) |
| `#/bloc-ii/p2-visita-museu-i-jardi` | Pestaña conclusiones, tres desplegables abiertos | [conclusiones](capturas/conclusions-sortida-390.png) | [conclusiones](capturas/conclusions-sortida-1440.png) |

Para la primera cartela se conserva además [lightbox abierto a 1440 px](capturas/cartela-lightbox-1440.png). Las diez ampliaciones y el retorno de foco están en `browser-evidence.json`, `lightboxes`. Las capturas `obra-cartela-*` de la primera pasada no garantizan la reflexión abierta; usar las `obra-cartela-obertes-*`, cuyo estado se fijó explícitamente.

Las imágenes de referencia [cartelas 01–04](capturas/cartelas-contacto-1.jpg), [05–08](capturas/cartelas-contacto-2.jpg) y [09–10](capturas/cartelas-contacto-3.jpg) son hojas de contacto de los assets originales, **no capturas de navegador**. Se distinguen de las pruebas de funcionamiento del lightbox.

## Integridad de los recursos

- **Museo:** diez imágenes principales y diez cartelas independientes. La primera corresponde a Solé Duc, seguida de Urgell, Vayreda, Riquer, Vidal, Casals, Furriols, Raurich, Lacoma y Mir. No se sustituyó la obra por su cartela. La reflexión de Riquer conserva tres elementos en lista. Conflicto real: técnica de Riquer «paper» en la ficha y «tela» en la cartela.
- **CDAN:** cartel y tres obras en `assets/document-60p/cdan/`; dos reflexiones completas y ficha de Blackwell sin reflexión inventada. La no asistencia presencial permanece explícita.
- **Montjuïc:** diez fotografías individuales, diez observaciones completas y collage. El cotejo con el PDF no equivale a autenticar especies por visión; se conserva el mapeo previamente confirmado.
- **Libro:** fotos de observación, materiales/técnicas, visor, montaje y resultado; `img_5125.webp` e `img_5127.webp` son los archivos horizontales aprobados. Dos vídeos locales, de 960×1706.
- **Tintas:** `img_5189`/`img_5192` muestran preparación; `img_5187`, el soporte plegado en blanco; `img_5194`, las pruebas cromáticas finales. Tres vídeos de preparación/experimentación, dos horizontales de 960×540 y uno vertical de 960×1706. No se confunde el soporte en blanco con el resultado acabado.
- **Vídeos:** los cinco tienen poster, controles, `playsinline`, `preload=metadata` y sin autoplay. Se llamó a `play`, se decodificó un fotograma y se pausó. No se ha visto la duración completa de cada vídeo ni evaluado su audio.
- **Ampliación:** cinco imágenes en `assets/document-60p/per-saber-ne-mes/`, distribuidas 2+1+2; atribución Hill/Philippa Jones conservada. Glosario con ocho definiciones completas.
- **Bibliografía:** once entradas de D p.54 en dos grupos; cinco URLs presentes. No se ha sustituido una referencia a partir de conocimientos externos ni se ha comprobado la disponibilidad remota de esas URLs.

## Pruebas no realizadas y límites

- No se ha verificado un despliegue remoto ni su configuración, ni se ha desplegado nada. En local los PDFs internos se pueden solicitar por URL porque se sirve la raíz; esto no demuestra que actualmente sean públicos en un alojamiento remoto.
- No se ha certificado asistencia, participación, iniciativa o autoría por medios externos, ni se ha inspeccionado el libro físicamente.
- No se ha verificado la literalidad de la conferencia frente a una grabación, ni las citas frente a ediciones externas de Carson/Freire. Sí frente al PDF académico entregado y su representación en la web.
- No se ha hecho una auditoría con lector de pantalla ni una certificación WCAG completa. Las pruebas de teclado, foco y contraste cubren los casos descritos, no todos los estados posibles de todas las tecnologías asistivas.
- No se han repetido pruebas de regeneración para probar un cambio de una propiedad CSS. Tampoco se ejecutó `verify_editing.cjs`, que modifica/restaura archivos para probar la edición.
- Los 102 casos responsive prueban funcionalidad/maquetación; no prueban profundidad crítica ni bastan para otorgar nivel 4.

La evaluación y las prioridades se basan en evidencias de esta ejecución, no en capturas históricas de `docs/verification/`.
