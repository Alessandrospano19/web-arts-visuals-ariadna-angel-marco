'use strict';

// Reading layouts use editorial summaries; full source text stays in PORTFOLIO.
function fullReading(label, text, id = '', cls = '') {
  return `<details class="document-details full-reading ${cls}" ${id ? `id="${id}"` : ''}><summary>${esc(label)}<span class="disclosure-mark" aria-hidden="true">+</span></summary>${prose(text,'original-reflection')}</details>`;
}
function readingSection(kicker,title,body,tone = '',cls = '') {
  return `<section class="section-pad editorial-section ${tone ? 'tone-'+tone : ''} ${cls}"><div class="container"><span class="chapter-label">${esc(kicker)}</span><h2 class="chapter-heading">${esc(title)}</h2>${body}</div></section>`;
}
function quote(text) { return `<blockquote class="reading-quote"><p>${esc(text)}</p></blockquote>`; }
function editorialImage(stem) { return PORTFOLIO.media.find(m=>m.output.endsWith('/'+stem+'.webp')); }
function chapter(item,i,tone = '') {
  const image = item.image ? photoFigure(editorialImage(item.image),item.caption) : '';
  return `<section class="editorial-chapter ${tone ? 'tone-'+tone : ''}"><div class="container chapter-composition ${image ? 'with-image' : ''} ${i%2 ? 'image-first' : ''}"><div class="chapter-copy"><span class="chapter-label">${formatIndex(i+1)} · Idees de la reflexió</span><h2 class="chapter-heading">${esc(item.title)}</h2><p class="editorial-summary">${esc(item.summary)}</p>${item.quote ? quote(item.quote) : ''}</div>${image ? `<div class="chapter-photo">${image}</div>` : `<span class="chapter-ornament" aria-hidden="true">${formatIndex(i+1)}</span>`}</div></section>`;
}
function intro() {
  const d = PORTFOLIO.intro;
  return page('introduccio','01 · Inici del recorregut','Art i natura a l’Educació Infantil','Reflexió sobre la conferència «Un árbol pinta una nube».',
    readingSection('El punt de partida','Una invitació a mirar',`<div class="brief-layout"><div><h3>Proposta</h3>${prose(d.proposal)}<h3>Objectiu</h3>${prose(d.objective)}</div><div class="conference-poster">${photoFigure(group('introduccio')[0])}</div></div>`)+
    EDITORIAL.intro.map((item,i)=>chapter(item,i,['sage','','sand','clay','forest','','sage'][i])).join('')+
    readingSection('Per continuar llegint','La reflexió, de principi a fi',fullReading('Llegir la reflexió completa',d.reflection,'reflexio-completa')));
}
function blocI() {
  const d = PORTFOLIO.reading;
  return page('bloc-i','Bloc I · Fonaments','Bloc I — Art i educació','Rachel Carson i Heike Freire: observació, creació artística i natura.',
    readingSection('Dues lectures, una mirada','El sentit de la descoberta',`<div class="split-editorial"><div><p class="chapter-lead">La curiositat, els sentits i l’experiència directa com a punt de partida de l’aprenentatge.</p><div class="reading-authors"><span>Rachel Carson<br><em>El sentido del asombro</em></span><span>Heike Freire<br><em>La escuela es el bosque</em></span></div>${fullReading('Proposta i objectius',d.proposal+'\n\n'+d.objectives,'lectures-proposta')}</div>${readingVisual()}</div>`,'sage')+
    `<section class="section-pad"><div class="container idea-sequence">${EDITORIAL.reading.slice(0,4).map((item,i)=>`<article class="idea-row"><span class="idea-number">${formatIndex(i+1)}</span><div><span class="micro-kicker">Idees de la reflexió</span><h2>${esc(item.title)}</h2><p>${esc(item.summary)}</p></div></article>`).join('')}</div></section>`+
    chapter(EDITORIAL.reading[4],4,'forest')+
    readingSection('Quadern de lectura','La reflexió completa',fullReading('Llegir la reflexió completa',d.reflection,'reflexio-completa')));
}
function blocII() {
  return page('bloc-ii','Bloc II · Art i natura','La formació en la pràctica de l’art','El jardí com a agent pedagògic.',
    section('00 · Presentació','Un recorregut en quatre capítols',prose(PORTFOLIO.block.framing)+chapterLinks(B2))+
    readingSection('Entre el museu i el jardí','Observar, experimentar i crear',`<div class="split-editorial"><div>${photoFigure(group('jardi')[0])}</div><div><p class="chapter-lead">La mirada artística comença en les formes, les textures i les relacions del nostre entorn.</p><a href="${pathFor(B2[0].path)}" class="editorial-cta">Formes d’apropar-se a la natura →</a></div></div>`,'sage'));
}
function b2p1() {
  return page(B2[0].path,'Bloc II · Proposta 01',"Formes d'apropar-se a la natura",'Art, natura i educació.',
    EDITORIAL.block.map((item,i)=>chapter(item,i,['sage','','clay','forest'][i])).join('')+
    readingSection('Quadern de la primera sessió','Una mirada que continua',fullReading('Llegir la reflexió completa',PORTFOLIO.block.reflection,'reflexio-completa')));
}
function artworkCard(art,i) {
  const id = `obra-${i+1}`;
  MEDIA[id] = {src:art.src,title:art.title,subtitle:art.artist,meta:art.technique,desc:art.reflection};
  return `<article class="catalog-card archive-card artwork-card" id="${id}"><button class="catalog-img-box" type="button" data-lightbox="${id}" aria-label="Amplia l’obra: ${esc(art.title)}">${picture({output:art.src,dimensions:art.dimensions},`${art.title} — ${art.artist}`)}<span class="zoom-pill">Amplia ↗</span></button><div class="catalog-body"><span class="catalog-index">${formatIndex(i+1)} / Referent artístic</span><h3 class="catalog-title">${esc(art.title)}</h3><p class="catalog-subtitle">${esc(art.artist)}</p><p class="artwork-technique">${esc(art.technique)}</p><button type="button" class="text-link" data-lightbox="${id}">Veure l’obra i la proposta educativa <span aria-hidden="true">↗</span></button></div></article>`;
}
const VISIT_PANELS = [
  ['obres','Obres i museus'], ['jardi','Diàleg amb el jardí'],
  ['arts','Educar a través de les arts'], ['conclusions','Conclusions de la sortida']
];
function visitPanel(id,body,i) {
  return `<div role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}" tabindex="0" ${i ? 'hidden' : ''}>${body}</div>`;
}
function visitHeading(kicker,title,text) {
  return `<div class="visit-heading"><div><span class="chapter-label">${esc(kicker)}</span><h2 class="chapter-heading">${esc(title)}</h2></div><p>${esc(text)}</p></div>`;
}
function museumPanel() {
  const d = PORTFOLIO.museum;
  return visitHeading('01 · MNAC i Museu Mater','Deu mirades sobre les obres','Color, matèria, paisatge i llum. Deu referents per imaginar possibilitats educatives a partir de l’art.')+
    `<div class="catalog-grid cols-3 artworks-grid">${PORTFOLIO.artworks.map(artworkCard).join('')}</div><div class="visit-notebook"><h3 class="reading-subtitle">El quadern de visita</h3><p class="editorial-summary">Mirar una mateixa obra des de perspectives diferents i descobrir les possibilitats dels materials quotidians i naturals.</p>${fullReading('Proposta i objectius',d.introduction+'\n\n'+d.proposal+'\n\n'+d.objectives,'museu-proposta')}${fullReading('Estratègies metodològiques',d.methodology,'museu-metodologia')}${fullReading('Materials',d.materials,'museu-materials')}${fullReading('Llegir la conclusió de la proposta',d.conclusion,'conclusio-museu')}</div><div class="visit-architecture"><h3 class="reading-subtitle">Espais de la visita</h3><div class="museum-gallery">${group('mnac').map((m,i)=>photoFigure(m,['Interior del MNAC','Vista des de Montjuïc','El MNAC al capvespre'][i])).join('')}</div></div>`;
}
function collageFigure() {
  const c = PORTFOLIO.collage, id = 'collage-jardi';
  MEDIA[id] = {src:c.web_asset,title:'Deu espècies, moltes mirades',subtitle:'',meta:'',desc:''};
  return `<figure class="collage-figure"><button class="local-photo" data-lightbox="${id}" type="button" aria-label="Amplia la composició vegetal">${picture(group('jardi')[0],'Composició fotogràfica de la passejada')}<span class="zoom-pill">Amplia ↗</span></button><figcaption class="figure-label">Colors i formes de Montjuïc</figcaption></figure>`;
}
function firstSentence(text) { return text.split(/(?<=[.!?])\s/)[0]; }
function gardenPanel() {
  const d = PORTFOLIO.garden;
  return visitHeading('02 · L’art de caminar','Diàleg amb el jardí','Aturar-se en els detalls: formes, colors, olors i textures que conviden a mirar d’una altra manera.')+
    `<div class="garden-visuals">${collageFigure()}<div class="garden-pair">${group('jardi').slice(1).map(m=>photoFigure(m)).join('')}</div></div><div class="species-list">${PORTFOLIO.species.map((s,i)=>`<article class="species-entry"><span class="catalog-index">${formatIndex(i+1)}</span><div><h3 class="catalog-title">${esc(s.name)}</h3><p class="observation-preview">${esc(firstSentence(s.observation))}</p>${fullReading('Llegir l’observació completa',s.observation,'especie-'+(i+1))}</div></article>`).join('')}</div><div class="visit-notebook"><h3 class="reading-subtitle">El quadern de la passejada</h3><p class="editorial-summary">La manera de documentar també forma part de la creació: l’enquadrament, la perspectiva i els detalls escollits construeixen una mirada pròpia.</p>${fullReading('Proposta i objectius',d.proposal+'\n\n'+d.objectives,'jardi-proposta')}${fullReading('Desenvolupament i resultats',d.development,'jardi-desenvolupament')}${fullReading('Estratègies metodològiques i materials',d.methodology+'\n\n'+d.materials,'jardi-metodologia')}${fullReading('Llegir la reflexió completa',d.reflection,'reflexio-jardi')}</div>`;
}
function artsPanel() {
  return visitHeading('03 · Possibilitats educatives','Educar a través de les arts','Observar, imaginar i experimentar: les obres com a punt de partida per crear a l’educació infantil.')+
    `<div class="arts-connections"><span>Art</span><span>Natura</span><span>Ciències</span><span>Infància</span></div><div class="arts-invitation"><p class="chapter-lead">Deu obres, deu punts de partida.</p><p>Les propostes educatives es poden llegir obrint cada obra.</p><div class="art-proposal-links">${PORTFOLIO.artworks.map((a,i)=>`<button type="button" data-art-proposal="${i+1}"><span>${formatIndex(i+1)}</span>${esc(a.title)}<span aria-hidden="true">↗</span></button>`).join('')}</div><h3 class="reading-subtitle">Una proposta pròpia</h3>${note()}</div>`;
}
function outingParts() {
  const paragraphs = PORTFOLIO.outing.split(/\n\s*\n/), parts = [[],[],[]];
  let current = 0;
  for (const p of paragraphs) {
    const heading = p.match(/^([123])\. Què penso/);
    if (heading) current = Number(heading[1])-1;
    parts[current].push(p);
  }
  return parts.map(p=>p.join('\n\n'));
}
function conclusionsPanel() {
  const parts = outingParts();
  return visitHeading('04 · Aprenentatges','Conclusions de la sortida','Tres perspectives que connecten la passejada, l’experiència artística i la futura pràctica docent.')+
    `<div class="conclusion-themes">${EDITORIAL.outing.map((item,i)=>`<article class="conclusion-theme tone-${['sage','clay','sand'][i]}"><span class="section-number">${formatIndex(i+1)}</span><div><span class="micro-kicker">Idees de la reflexió</span><h3>${esc(item.title)}</h3><p class="editorial-summary">${esc(item.summary)}</p>${fullReading('Llegir la reflexió completa',parts[i],'conclusio-'+(i+1))}</div></article>`).join('')}</div>`;
}
function b2p2() {
  const bodies = [museumPanel(),gardenPanel(),artsPanel(),conclusionsPanel()];
  return page(B2[1].path,'Bloc II · Proposta 02','Visita museu i jardí','De les obres a les formes de la natura. Un recorregut per mirar, imaginar i aprendre.',
    `<section class="section-pad visit-section"><div class="container"><div class="visit-tabs" role="tablist" aria-label="Apartats de la sortida">${VISIT_PANELS.map(([id,label],i)=>`<button id="tab-${id}" type="button" role="tab" aria-selected="${i===0}" aria-controls="panel-${id}" tabindex="${i===0?0:-1}" data-visit-tab="${id}">${esc(label)}</button>`).join('')}</div>${VISIT_PANELS.map(([id],i)=>visitPanel(id,bodies[i],i)).join('')}</div></section>`);
}
function b2p3() {
  const all = group('descripcio').filter(m=>m.type==='image');
  const stems = ['img_4784','img_4790','28e874c3-6344-401c-be7a-a2aaf73cd671','5ce71397-3e74-443c-8313-fc2ce5eb1355','img_5100','img_5103','img_5107','img_5125'];
  const selected = stems.map(editorialImage), other = all.filter(m=>!selected.includes(m));
  return page(B2[2].path,'Bloc II · Proposta 03','Què és un jardí?','Descripció visual i llibre d’artista.',
    readingSection('Del jardí al paper','Un espai, moltes empremtes',prose(PORTFOLIO.book.proposal)+fullReading('Objectius de la proposta',PORTFOLIO.book.objectives))+
    readingSection('Quadern visual','Mirar, explorar, compondre',`<div class="process-gallery">${[['Observar',selected.slice(0,2)],['Explorar i crear',selected.slice(2,6)],['Llibre d’artista',selected.slice(6)]].map(([title,items])=>`<div class="process-group"><h3 class="reading-subtitle">${title}</h3>${gallery('descripcio',items)}</div>`).join('')}</div><button type="button" class="editorial-cta gallery-toggle" aria-expanded="false" aria-controls="galeria-completa" data-gallery-toggle>Veure tota la galeria <span aria-hidden="true">+</span></button><div id="galeria-completa" hidden>${gallery('descripcio',other)}</div>`,'sage')+
    readingSection('El llibre en moviment','Desplegar el jardí',videos('descripcio'),'sand')+
    readingSection('Quadern de procés','Desenvolupament i reflexió',`<p class="micro-foot">Desenvolupament · Metodologia · Materials · Reflexió personal</p>${note()}`));
}
function b2p4() {
  return page(B2[3].path,'Bloc II · Proposta 04','Experimentem amb tintes vives','Matèria, color i experimentació.',
    readingSection('El taller','Del pigment al paper',gallery('tintes',group('tintes'),'tintes-gallery'),'clay')+
    readingSection('El procés en moviment','Explorar les tintes',videos('tintes'),'sand')+
    readingSection('Quadern de procés','La reflexió',note()));
}
function blocIII() {
  return page('bloc-iii','Bloc III · Cos, teixit i artivisme','Moda, artivisme i performativitat en les arts i l’educació','La formació en la pràctica de l’art.',
    readingSection('El cos i la matèria','Quatre espais de creació',chapterLinks(B3)+note(),'sand'));
}
function b3proposal(item) {
  return page(item.path,'Bloc III · Quadern de procés',item.title,'Cos, teixit i creació.',
    readingSection('El quadern obert','Procés i reflexió',`<div class="empty-chapter"><span class="empty-chapter-line" aria-hidden="true"></span>${note()}</div>`,'sand'));
}
function conclusions() {
  return page('conclusions','Tancament · Aprenentatges','Conclusions generals de l’assignatura','Una mirada al camí recorregut.',
    readingSection('Aprenentatges','Què m’emporto del recorregut?',prose("Ressaltar aquells aprenentatges (coneixements) que s'han realitzat durant l'assignatura.")+note()+`<a href="${pathFor(B2[1].path)}" class="editorial-cta">Visita museu i jardí →</a>`,'sage'));
}
function reflexio() {
  return page('reflexio-personal','Apunts finals · Quadern íntim','Reflexió personal','Una mirada al propi procés.',
    readingSection('Mirada interior','Punts forts i punts febles',`<div class="reflection-headings"><h3>Punts forts</h3><h3>Punts febles</h3></div>${note()}`,'sand'));
}
function saberMes() {
  return page('per-saber-ne-mes','Arxiu obert · Continuar investigant','Per saber-ne més...','Recursos per ampliar el recorregut.',
    readingSection('Arxiu de consulta','Recursos per explorar',note()));
}
function bibliografia() {
  return page('referencies-bibliografiques','Documentació acadèmica · Fonts','Referències bibliogràfiques','Lectures que acompanyen el recorregut.',
    section('01 · Lectures','Bibliografia',`<ol class="bibliography">${PORTFOLIO.bibliography.map(ref=>`<li>${esc(ref).replace(/(https:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener noreferrer">$1<span class="sr-only"> (s’obre en una pestanya nova)</span></a>')}</li>`).join('')}</ol>`));
}

function activateVisitTab(id,focus = false) {
  const tab = document.querySelector(`[data-visit-tab="${id}"]`);
  if (!tab) return;
  document.querySelectorAll('[data-visit-tab]').forEach(t=>{
    const selected = t===tab;
    t.setAttribute('aria-selected',String(selected)); t.tabIndex=selected?0:-1;
    document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;
  });
  if (focus) tab.focus({preventScroll:true});
}
document.addEventListener('click',event=>{
  const t = event.target;
  if (!(t instanceof Element)) return;
  const tab = t.closest('[data-visit-tab]');
  if (tab) activateVisitTab(tab.dataset.visitTab);
  const proposal = t.closest('[data-art-proposal]');
  if (proposal) openLightbox('obra-'+proposal.dataset.artProposal,proposal);
  const toggle = t.closest('[data-gallery-toggle]');
  if (toggle) {
    const open = toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(open));
    document.getElementById(toggle.getAttribute('aria-controls')).hidden=!open;
    toggle.innerHTML = open ? 'Mostrar només la selecció <span aria-hidden="true">−</span>' : 'Veure tota la galeria <span aria-hidden="true">+</span>';
  }
});
document.addEventListener('keydown',event=>{
  if (!(event.target instanceof Element)) return;
  const tab=event.target.closest('[data-visit-tab]');
  if (!tab || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  const tabs=[...document.querySelectorAll('[data-visit-tab]')], i=tabs.indexOf(tab);
  const index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  event.preventDefault();activateVisitTab(tabs[index].dataset.visitTab,true);
});
