# Plan de correcciones para revisión

11 de noviembre de 2026. Este documento propone actuaciones; **no se han aplicado**, salvo la cursiva bibliográfica solicitada expresamente. La evidencia y la puntuación orientativa están en [INFORME_EVALUACION.md](INFORME_EVALUACION.md).

No hay incidencias P0: están presentes las fuentes de dos y 60 páginas, las vistas evaluadas se abren y no se ha detectado bloqueo de recursos. No hace falta regenerar ni rediseñar el proyecto para revisar el diagnóstico.

## Cinco prioridades de mayor retorno

| Orden | Incidencia | Impacto principal | Responsable |
| --- | --- | --- | --- |
| **1** | **C01. Acreditar una cita literal de Fernando** | Requisito explícito de R1 nivel 4 aún no acreditado | Ariadna + confirmación docente; después Codex |
| **2** | **C02. Resolver soporte papel/tela de Riquer** | Coherencia de datos académicos y cartela | Ariadna/docente; después Codex |
| **3** | **C03. Completar los textos de Bloc III y cierres** | Integridad del portafolio final; no falta de importación | Ariadna; después Codex |
| **4** | **C04. Orientar la fotografía img_5192** | Claridad de la documentación visual de R3/R4 | Codex, cuando se autoricen las correcciones |
| **5** | **C05. Recolocar la cita de Carson en el resumen** | Coherencia de lectura y distinción entre autoras de R2 | Codex, cuando se autoricen las correcciones |

Las prioridades 2 y 3 no significan que falten elementos de la rúbrica específica de Bloc I o de jardín: son problemas reales de fidelidad/integridad del conjunto. La participación humana, C06, es además una condición de cierre de R1/R3/R4; ninguna modificación visual puede sustituirla.

## P1 — Acreditación y contenido

### C01. Cita del conferenciante sin atribución comprobable — prioridad 1

- **Archivos:** `content/academic/intro-reflection.md`, eventualmente `content/EDITORIAL.json`; no editar directamente las salidas JS.
- **Ruta:** `#/introduccio`, reflexión completa y selección editorial.
- **Problema:** la fuente identifica a Fernando González Claveira y desarrolla sus ideas, pero las frases entrecomilladas no permiten acreditar de forma inequívoca una cita literal suya. «El contrari del joc és la depressió» no identifica hablante. Las frases destacadas en los capítulos son palabras de la reflexión; su diseño de cita no prueba autoría del ponente.
- **Motivo:** R1 nivel 4 exige citas del conferenciante. Es la brecha más directa entre el contenido actual y ese descriptor.
- **Corrección mínima:** localizar en apuntes o grabación una frase efectivamente pronunciada por él, confirmar literalidad y autoría e integrarla con atribución explícita aprobada por Ariadna. Si no existe evidencia, mantener el diagnóstico parcial. No atribuir automáticamente a Fernando la frase del juego ni una frase de otro pensador.
- **Riesgo de regresión:** académico alto si se inventa la cita; técnico bajo. Mantener íntegra la reflexión y evitar sustituciones globales.
- **Aceptación:** una cita literal verificable con nombre del ponente, accesible en el desplegable y coherente con la fuente aportada; registro interno de procedencia. No basta marcar una paráfrasis en cursiva.
- **Responsable:** Ariadna y confirmación personal/docente; Codex solo integra el texto autorizado.

### C02. Conflicto de técnica en Riquer — prioridad 2

- **Archivos:** `content/OBRES_I_REFLEXIONS.md` (obra 4), cartela `assets/document-60p/cartelas/04_alexandre_de_riquer_cartella.webp`; fuente de referencia PDF 60P p.17.
- **Ruta:** `#/bloc-ii/p2-visita-museu-i-jardi`, obra 4 y cartel·la.
- **Problema:** la ficha escrita del PDF y de la web usa **«Tremp sobre paper»**; la cartela fotografiada usa **«Tremp sobre tela»**. Véase [p.17](capturas/pdf60-p17.png) y [cartelas 1–4](capturas/cartelas-contacto-1.jpg). La web reproduce una discrepancia de la fuente; no hay base para corregirla silenciosamente.
- **Motivo:** precisión del contenido que las imágenes deben aportar a R4; control transversal de integridad de las obras. No es una quinta rúbrica ni una rebaja automática de R2/R3.
- **Corrección mínima:** que Ariadna/docente confirme el dato; después cambiar solo la técnica pertinente y actualizar su fuente estructurada. Conservar las tres composiciones y la cartela original.
- **Riesgo de regresión:** medio en fidelidad documental; bajo en navegación. No reemplazar las imágenes ni reinterpretar títulos.
- **Aceptación:** dato confirmado, trazabilidad de la decisión y coincidencia de ficha, detalle y lightbox; si se mantienen dos versiones, explicar la discrepancia con texto aprobado.
- **Responsable:** Ariadna/docente; Codex integra tras la decisión.

### C03. Bloc III y cierres sin desarrollo en la fuente — prioridad 3

- **Archivos:** nueva redacción de Ariadna; después capa `content/academic/`, configuración editable y las vistas que correspondan. Hoy `scripts/views.js` presenta honestamente el estado pendiente.
- **Rutas:** `#/bloc-iii`, sus cuatro partes, `#/conclusions`, `#/reflexio-personal`.
- **Problema:** siete vistas con «Pendent d’incorporar». El PDF p.45–46 contiene títulos, objetivo de conclusiones y «Punts forts/Punts febles», no la redacción. No hay párrafos omitidos accidentalmente por el generador.
- **Motivo:** terminar el portafolio y evitar que su evaluación global dependa de secciones vacías. Las dos páginas de rúbrica no permiten calcular el peso de estas actividades ni una penalización exacta.
- **Corrección mínima:** confirmar si su entrega ya corresponde y si hay una fuente posterior; incorporar únicamente el texto y los recursos reales que Ariadna aporte. No rellenar con reflexiones en primera persona generadas por Codex.
- **Riesgo de regresión:** académico alto si se inventa; técnico moderado al conectar nuevas vistas. Preservar orden y denominaciones PART de Bloc III.
- **Aceptación:** cada actividad que deba entregarse tiene desarrollo auténtico, proceso, resultados y reflexión cuando proceda; los cierres expresan los aprendizajes y autoevaluación de Ariadna. Si aún no corresponde, mantener pendiente sin fingir finalización.
- **Responsable:** Ariadna; Codex integra después.

### C06. Asistencia y participación no comprobadas — condición de cierre

- **Archivos:** ninguno del producto necesario; constancia interna o confirmación personal/docente.
- **Ámbito:** R1 conferencia, R3 todas las sesiones y participación activa, R4 actitud participativa en clase.
- **Problema:** relato autobiográfico y fotografías no verifican asistencia, constancia ni iniciativa. No se declara que no asistiera.
- **Motivo:** condiciones expresas de los niveles originales. R1 incluso contempla ausencia como nivel 0; sería incorrecto usarlo por falta de prueba informática.
- **Corrección mínima:** obtener confirmación humana, indicando sesiones y la participación que se puede acreditar. CDAN es un caso distinto: la no asistencia ya está explícita y debe preservarse.
- **Riesgo:** una afirmación falsa invalidaría la evaluación; no crear insignias automáticas de asistencia.
- **Aceptación:** respuesta explícita de Ariadna y, si procede, verificación docente. Hasta entonces, niveles orientativos condicionados.
- **Responsable:** confirmación personal/docente.

## P2 — Presentación, lectura y mantenimiento

### C04. Fotografía de preparación de tintas de lado — prioridad 4

- **Archivos:** `content/editables/imagenes.json`, entrada `tintes_img_5192`; comprobar el sistema de rotación que ya utiliza la web. El archivo físico es `assets/actualizacion-2026-11-08/bloc-ii/part-4-tintes/img_5192.webp`.
- **Ruta:** `#/bloc-ii/p3-bis-taller-de-tintes-naturals`, primera fase.
- **Problema:** la segunda foto muestra las ollas con la escena de lado, aunque carga íntegra. Evidencia [1440](capturas/tintes-preparacio-1440.png) y [390](capturas/tintes-preparacio-390.png).
- **Motivo:** documentación visual cuidada de R3 y buenas imágenes informativas de R4. No falta la preparación ni un vídeo.
- **Corrección mínima:** corregir únicamente la orientación de esta imagen con el mecanismo editable existente y preservar la composición completa. Revisar orientación en ampliación. No tocar las fotos horizontales aprobadas `img_5125`/`img_5127`.
- **Riesgo:** recorte o doble rotación en lightbox; medio si se cambia la regla global.
- **Aceptación:** escena orientada coherentemente a 390/1440 px, sin recorte, proporciones correctas y misma orientación al ampliar.
- **Responsable:** Codex, pendiente de autorización del plan.

### C05. Cita de Carson bajo resumen sobre Freire — prioridad 5

- **Archivos:** `content/EDITORIAL.json`, `reading[2]` y las otras unidades de Carson si es necesario redistribuir la cita. No cambiar `reading-reflection.md` por este motivo.
- **Ruta:** `#/bloc-i`, «El bosc com a espai educatiu».
- **Problema:** la unidad habla de las experiencias de Heike Freire y termina con «la tierra fértil en la cual la semilla debe crecer», atribuida correctamente a **Carson**. El dato de autoría no está falseado, pero la proximidad semántica confunde; [captura](capturas/cites-390.png).
- **Motivo:** coherencia de las dos lecturas de R2 y redacción/localización de R4. No son citas ausentes: las cuatro están en el resumen y en el texto completo.
- **Corrección mínima:** trasladar esa cita a una unidad de Carson; utilizar para Freire su cita ya documentada, sin duplicaciones innecesarias ni reescribir la reflexión.
- **Riesgo:** perder una de las citas o su página al redistribuir; bajo si se edita la fuente editorial y se cotejan ambas vistas.
- **Aceptación:** cada cita aparece junto a una idea de la misma autora, atribución y páginas intactas; reflexión completa inalterada.
- **Responsable:** Codex, pendiente de autorización del plan.

### C07. Huecos de justificación en móvil

- **Archivos:** `styles/integration.css`; si se revisan cortes semánticos, `content/academic/` únicamente con preservación literal.
- **Rutas:** introducción, Bloc I y textos largos de P3.
- **Problema:** a 390 px hay espacios amplios entre palabras; no hay overflow ni letras recortadas. [Ejemplo de lectura](capturas/introduccio-lectura-detall-390.png).
- **Motivo:** legibilidad de R4 y acceso a la argumentación de R1/R2.
- **Corrección mínima:** ajustar la alineación/guionado en los párrafos estrechos o restaurar cortes semánticos, sin suprimir palabras. No alterar toda la tipografía ni el CSS original.
- **Riesgo:** cambiar inadvertidamente el escritorio; bajo con una regla móvil acotada.
- **Aceptación:** lectura natural a 390 px y conservación del diseño a 1440; comparación del texto plano antes/después sin pérdida.
- **Responsable:** Codex.

### C08. Acceso indirecto a recursos de ampliación

- **Archivos:** `content/editables/document60.json` o capa equivalente de enlaces; `scripts/document60.js` si se aprueba añadirlos.
- **Ruta:** `#/per-saber-ne-mes`.
- **Problema:** el documental se comenta, pero el acceso a su referencia está en bibliografía. Se comprueba el destino del enlace en el DOM; no su disponibilidad en Internet.
- **Motivo:** facilitar que los recursos de R4 se usen al leer al artista.
- **Corrección mínima:** añadir junto al artista un acceso al recurso ya citado, con título claro y destino documental existente; no añadir fuentes o vídeos inventados.
- **Riesgo:** enlace externo roto; verificarlo antes de incorporarlo.
- **Aceptación:** acceso localizable junto al artista y referencia conservada, sin duplicar la bibliografía entera.
- **Responsable:** Codex.

### C09. Documentación de desarrollo desactualizada

- **Archivos:** `README.md`.
- **Problema:** aún señala 40 páginas y P4 como vigentes; la implementación ya usa 60 páginas y PART 3_bis.
- **Motivo:** evitar regresiones de contenido en futuras ediciones. No afecta por sí solo a la nota visible.
- **Corrección mínima:** actualizar fuente vigente, actividad canónica y ubicación de informes actuales; conservar la historia identificada como tal.
- **Riesgo:** bajo.
- **Aceptación:** lectura inequívoca de qué fuentes y rutas son actuales.
- **Responsable:** Codex.

### C10. Separar material interno de una futura salida pública

- **Archivos:** futura configuración/paquete de publicación, no las vistas académicas.
- **Problema comprobado:** el servidor estático de raíz responde 200 a `source/ESTRUCTURA_ARIADNA_ACTUAL_60P.pdf` (incluye rúbricas p.55–60) y `Prompts/source/RUBRICA_ORIGINAL_2026.pdf`. `README.md` propone publicar la raíz. Las vistas no muestran la rúbrica. No se ha inspeccionado ni cambiado ningún alojamiento remoto.
- **Motivo:** cumplir la instrucción concreta de no publicar rúbricas ni informes internos.
- **Corrección mínima:** cuando se autorice una publicación, generar/seleccionar un directorio con solo `index.html`, estilos, scripts y assets necesarios, excluyendo `source/`, `Prompts/` y `docs/` (incluida esta auditoría).
- **Riesgo:** omitir un recurso del sitio al preparar la salida; moderado.
- **Aceptación:** todas las rutas y assets funcionan desde la salida seleccionada, y las URLs de PDFs e informes internos no son servidas desde ella. No requiere desplegar para comprobarlo localmente.
- **Responsable:** Codex cuando se autorice ese trabajo; sin cambio en esta auditoría.

## P3 — Acabado opcional

No se propone una lista de mejoras decorativas sin evidencia ni se añaden referencias bibliográficas por intuición. La puntuación depende más de la autenticidad, atribución y claridad de lo que ya existe que de añadir efectos o tarjetas.

## Único cambio ya realizado

**C11, solicitado directamente:** las 11 entradas bibliográficas se muestran en cursiva, en ambos grupos, mediante una propiedad CSS en `styles/integration.css:36`. Comprobado a 390 y 1440 px: contenido y URLs idénticos al estado inicial, sin desbordamiento. Evidencia en [final-evidence.json](final-evidence.json), [móvil](capturas/bibliografia-cursiva-390.png) y [escritorio](capturas/bibliografia-cursiva-1440.png).

No se ha implementado ninguna de las otras correcciones propuestas.
