# Actualización de contenidos y fotografías — portafolio Ariadna

**Paquete complementario, NO repositorio nuevo.** Descomprime el contenido de este ZIP en la raíz del repositorio existente de la web. **No borres** `scripts/`, `styles/`, `assets/` ni el `index.html` original: este archivo ZIP solo añade la nueva fuente académica, recursos optimizados y documentación para Codex.

### Archivos principales

- `docs/PROMPT_CODEX_NOVIEMBRE_2026.md`: instrucciones para la tercera iteración.
- `docs/INFORME_FUENTES_Y_CAMBIOS.md`: estructura precisa, cambios y asignación de imágenes.
- `content/PDF_ACTUALITZAT_40P.md`: texto íntegro del PDF actualizado, por páginas.
- `source/ESTRUCTURA_ARIADNA_ACTUAL_40P.pdf`: documento primario, 40 páginas.
- `assets/actualizacion-2026-11-08/`: 60 fotos WebP y 5 vídeos MP4, más pósteres y 11 imágenes extraídas del PDF.
- `docs/INVENTARIO_ACTUALIZACION.json`: correspondencia origen-destino por archivo.
- `docs/CATALOGO_FOTOS_*.jpg`: hojas de contacto visual.

### Primer mensaje a Codex

> Revisa el proyecto actual. Lee íntegramente `docs/PROMPT_CODEX_NOVIEMBRE_2026.md` y `docs/INFORME_FUENTES_Y_CAMBIOS.md`, el nuevo PDF de 40 páginas y el inventario de imágenes. Implementa la tercera iteración conservando el diseño original. No hagas commit ni push ni despliegues.

Las imágenes nuevas se han optimizado y no necesitan la carpeta original de fotos HEIC. Si Git advierte por binarios grandes, confirma primero que estás usando este paquete y no `fotoswebart.zip` completo.
