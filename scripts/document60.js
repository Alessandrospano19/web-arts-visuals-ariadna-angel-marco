'use strict';

// New sections reuse the existing reading, figure, disclosure and lightbox components.
function documentaryPhoto(id,caption) {
 const image=editableImage(id);
 if(!image)throw new Error('Recurs documental absent: '+id);
 return photoFigure(image,caption||mediaTitle(image));
}
function cartelaDisclosure(index) {
 const id=WEB.document60.cartelas[index];
 return `<details class="document-details cartela-reading" id="cartela-${index+1}"><summary>${esc(WEB.document60.cartela_label)}<span class="disclosure-mark" aria-hidden="true">+</span></summary><div class="cartela-photo">${documentaryPhoto(id)}</div></details>`;
}
function cdanSection() {
 const config=WEB.document60;
 return `<section class="cdan-section" id="referents-cdan"><span class="chapter-label">CDAN</span><h2 class="chapter-heading">${esc(config.cdan_title)}</h2><div class="story-layout"><div>${prose(PORTFOLIO.cdan.introduction,'original-reflection')}</div><div class="story-visual">${documentaryPhoto(config.cdan_poster)}</div></div>${config.cdan_works.map(work=>`<article class="cdan-work"><h3 class="reading-subtitle">${esc(work.title)}</h3><p class="artwork-technique">${esc(work.artist)}</p><div class="${work.field?'story-layout':'documentary-standalone'}">${work.field?`<div>${prose(PORTFOLIO.cdan[work.field],'original-reflection')}</div>`:''}<div class="story-visual">${documentaryPhoto(work.image)}</div></div></article>`).join('')}</section>`;
}
function furtherReading() {
 return WEB.document60.further.map((artist,i)=>{
   const paragraphs=PORTFOLIO.further[artist.field].split(/\n\s*\n/);
   return readingSection('Art i natura',artist.title,`<div class="story-layout ${i%2?'visual-first':''}"><div>${prose(paragraphs[0],'original-reflection')}</div><div class="story-visual">${artist.images.map(id=>documentaryPhoto(id)).join('')}</div></div>${paragraphs.length>1?fullReading(webText('llegir_la_reflexio_completa'),paragraphs.slice(1).join('\n\n'),'artista-'+artist.field):''}`,['sage','','sand'][i],'further-artist');
 }).join('');
}
function glossarySection() {
 return `<section class="section-pad"><div class="container"><details class="document-details glossary-reading" id="glosari"><summary>${esc(WEB.document60.glossary_title)}</summary><table class="materials-table glossary-table" lang="ca"><thead><tr><th scope="col">Concepte</th><th scope="col">Explicació</th></tr></thead><tbody>${PORTFOLIO.glossary.map(row=>`<tr><th scope="row">${esc(row.concept)}</th><td>${esc(row.explanation)}</td></tr>`).join('')}</tbody></table></details></div></section>`;
}
function bibliographyList(references) {
 return `<ol class="bibliography">${references.map(ref=>`<li>${esc(ref).replace(/(https:\/\/[^\s<]+)/g,`<a href="$1" target="_blank" rel="noopener noreferrer">$1<span class="sr-only">${esc(webText('text_sobre_en_una_pestanya_nova'))}</span></a>`)}</li>`).join('')}</ol>`;
}
