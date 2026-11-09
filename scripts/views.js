'use strict';

const ACADEMIC_TITLES = WEB.titulos.academicos;

// Reading layouts use editorial summaries; full source text stays in PORTFOLIO.
function fullReading(label, text, id = '', cls = '') {
  return `<details class="document-details full-reading ${cls}" ${id ? `id="${id}"` : ''}><summary>${esc(label)}<span class="disclosure-mark" aria-hidden="true">+</span></summary>${prose(text,'original-reflection')}</details>`;
}
function readingSection(kicker,title,body,tone = '',cls = '') {
  return `<section class="section-pad editorial-section ${tone ? 'tone-'+tone : ''} ${cls}"><div class="container"><span class="chapter-label">${esc(kicker)}</span><h2 class="chapter-heading">${esc(title)}</h2>${body}</div></section>`;
}
function quote(text) { return `<blockquote class="reading-quote"><p>${esc(text)}</p></blockquote>`; }
function editorialImage(stem) { return PORTFOLIO.media.find(m=>mediaSource(m).endsWith('/'+stem+'.webp')); }
function chapter(item,i,tone = '') {
  const image = item.image ? photoFigure(editorialImage(item.image),item.caption) : '';
  return `<section class="editorial-chapter ${tone ? 'tone-'+tone : ''}"><div class="container chapter-composition ${image ? 'with-image' : ''} ${i%2 ? 'image-first' : ''}"><div class="chapter-copy"><span class="chapter-label">${formatIndex(i+1)} · Idees de la reflexió</span><h2 class="chapter-heading">${esc(item.title)}</h2><p class="editorial-summary">${renderInline(item.summary)}</p>${item.quote ? quote(item.quote) : ''}</div>${image ? `<div class="chapter-photo">${image}</div>` : `<span class="chapter-ornament" aria-hidden="true">${formatIndex(i+1)}</span>`}</div></section>`;
}
function intro() {
  const d = PORTFOLIO.intro;
  return page('introduccio',
    readingSection(webText('el_punt_de_partida'),webText('una_invitacio_a_mirar'),`<div class="brief-layout"><div><h3>${esc(webText('text_proposta'))}</h3>${prose(d.proposal)}<h3>${esc(webText('text_objectiu'))}</h3>${prose(d.objective)}</div><div class="conference-poster">${photoFigure(group('introduccio')[0])}</div></div>`)+
    EDITORIAL.intro.map((item,i)=>chapter(item,i,['sage','','sand','clay','forest','','sage'][i])).join('')+
    readingSection(webText('per_continuar_llegint'),webText('la_reflexio_de_principi_a_fi'),fullReading(webText('llegir_la_reflexio_completa'),d.reflection,'reflexio-completa')));
}
function blocI() {
  const d = PORTFOLIO.reading;
  return page('bloc-i',
    readingSection(webText('dues_lectures_una_mirada'),webText('el_sentit_de_la_descoberta'),`<div class="split-editorial"><div><p class="chapter-lead">${esc(webText('text_la_curiositat_els_sentits_i_lexperiencia_directa_com_a_punt_de_pa'))}</p><div class="reading-authors"><span>Rachel Carson<br><em>El sentido del asombro</em></span><span>Heike Freire<br><em>La escuela es el bosque</em></span></div>${fullReading(webText('proposta_i_objectius'),d.proposal+'\n\n'+d.objectives,'lectures-proposta')}</div>${readingVisual()}</div>`,'sage')+
    `<section class="section-pad"><div class="container idea-sequence">${EDITORIAL.reading.slice(0,4).map((item,i)=>`<article class="idea-row"><span class="idea-number">${formatIndex(i+1)}</span><div><span class="micro-kicker">${esc(webText('text_idees_de_la_reflexio'))}</span><h2>${esc(item.title)}</h2><p>${renderInline(item.summary)}</p></div></article>`).join('')}</div></section>`+
    chapter(EDITORIAL.reading[4],4,'forest')+
    readingSection(webText('quadern_de_lectura'),webText('la_reflexio_completa'),fullReading(webText('llegir_la_reflexio_completa'),d.reflection,'reflexio-completa')));
}
function blocII() {
  return page('bloc-ii',
    `<section class="section-pad block-entry"><div class="container"><span class="eyebrow">${esc(webText('recorregut_quatre'))}</span><div class="block-opening">${prose(PORTFOLIO.block.framing)}<div class="block-vignette">${photoFigure(editableImage('bloc_ii_detall'))}</div></div>${chapterLinks(B2)}</div></section>`+
    readingSection(webText('entre_el_museu_i_el_jardi'),webText('observar_experimentar_i_crear'),`<div class="split-editorial"><div>${photoFigure(editableImage('bloc_ii_portada'),'A l’hort de les temptacions')}</div><div><p class="chapter-lead">${esc(webText('bloc_ii_entradilla'))}</p><a href="${pathFor(B2[0].path)}" class="editorial-cta">Formes d’apropar-se a la natura →</a></div></div>`,'sage'));
}
function b2p1() {
  return page(B2[0].path,
    EDITORIAL.block.map((item,i)=>chapter(item,i,['sage','','clay','forest'][i])).join('')+
    readingSection(webText('quadern_de_la_primera_sessio'),webText('una_mirada_que_continua'),fullReading(webText('llegir_la_reflexio_completa'),PORTFOLIO.block.reflection,'reflexio-completa')));
}
function artworkCard(art,i) {
 const id=`obra-${i+1}`;
 MEDIA[id]={src:art.src,title:art.title,subtitle:art.artist,meta:art.technique,desc:art.reflection};
 return `<article class="catalog-card artwork-card museum-entry" id="${id}"><button class="catalog-img-box" type="button" data-lightbox="${id}" aria-label="Amplia l’obra: ${esc(art.title)}">${picture({output:art.src,dimensions:art.dimensions},art.alt || `${art.title} — ${art.artist}`)}<span class="zoom-pill">${esc(webText('text_amplia'))}</span></button><div class="catalog-body"><span class="catalog-index">${formatIndex(i+1)} / Referent artístic</span><h3 class="catalog-title">${esc(art.title)}</h3><p class="catalog-subtitle">${esc(art.artist)}</p><p class="artwork-technique">${esc(art.technique)}</p><p class="artwork-preview">${esc(firstSentence(art.reflection))}</p></div>${fullReading('Llegir la reflexió i la proposta completa',art.reflection,'obra-reflexio-'+(i+1),'artwork-reading')}</article>`;
}
const VISIT_PANELS = [
  ['obres','PROPOSTA 1: VISITA MUSEU MNAC'], ['jardi','PROPOSTA 2: DIÀLEG AMB EL JARDÍ'], ['conclusions','CONCLUSIONS DE LA SORTIDA.']
];
function visitPanel(id,body,i) {
  return `<div role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}" tabindex="0" ${i ? 'hidden' : ''}>${body}</div>`;
}
function visitHeading(kicker,title,text) {
  return `<div class="visit-heading"><div><span class="chapter-label">${esc(kicker)}</span><h2 class="chapter-heading">${esc(title)}</h2></div><p>${esc(text)}</p></div>`;
}
function museumPanel() {
  const d = PORTFOLIO.museum;
  return visitHeading(webText('mnac_i_museu_mater'),webText('proposta_1_visita_museu_mnac'),'Color, matèria, paisatge i llum. Deu referents per imaginar possibilitats educatives a partir de l’art.')+
    `<div class="catalog-grid cols-3 artworks-grid">${PORTFOLIO.artworks.map(artworkCard).join('')}</div><div class="visit-notebook"><h3 class="reading-subtitle">${esc(webText('text_el_quadern_de_visita'))}</h3><p class="editorial-summary">${esc(webText('text_mirar_una_mateixa_obra_des_de_perspectives_diferents_i_descobrir_'))}</p>${fullReading(webText('proposta_i_objectius'),d.introduction+'\n\n'+d.proposal+'\n\n'+d.objectives,'museu-proposta')}${fullReading(webText('estrategies_metodologiques_2'),d.methodology,'museu-metodologia')}${fullReading(webText('materials_2'),d.materials,'museu-materials')}${fullReading(webText('llegir_la_conclusio_de_la_proposta'),d.conclusion,'conclusio-museu')}</div><div class="visit-architecture"><h3 class="reading-subtitle">${esc(webText('text_espais_de_la_visita'))}</h3><div class="museum-gallery">${group('mnac').slice().sort((a,b)=>a.output.localeCompare(b.output)).map((m,i)=>photoFigure(m,['Interior del MNAC','Vista des de Montjuïc','El MNAC al capvespre'][i])).join('')}</div></div>`;
}
function collageFigure() {
  const c = group('jardi').find(m=>mediaSource(m).endsWith('/1.webp')), id = 'collage-jardi';
  MEDIA[id] = {src:c.output,title:'Deu espècies, moltes mirades',subtitle:'',meta:'',desc:''};
  return `<figure class="collage-figure"><button class="local-photo" data-lightbox="${id}" type="button" aria-label="Amplia la composició vegetal">${picture(group('jardi').find(m=>mediaSource(m).endsWith('/1.webp')),'Composició fotogràfica de la passejada')}<span class="zoom-pill">${esc(webText('text_amplia'))}</span></button><figcaption class="figure-label">Colors i formes de Montjuïc</figcaption></figure>`;
}
function firstSentence(text) { return text.split(/(?<=[.!?])\s/)[0]; }
function gardenPanel() {
  const d = PORTFOLIO.garden;
  return visitHeading(webText('lart_de_caminar'),webText('proposta_2_dialeg_amb_el_jardi'),'Aturar-se en els detalls: formes, colors, olors i textures que conviden a mirar d’una altra manera.')+
    `<div class="garden-visuals">${collageFigure()}<div class="garden-pair">${group('jardi').filter(m=>!mediaSource(m).endsWith('/1.webp')).map(m=>photoFigure(m)).join('')}</div></div><div class="species-list">${PORTFOLIO.species.map((s,i)=>`<article class="species-entry"><span class="catalog-index">${formatIndex(i+1)}</span><div>${photoFigure(s.image)}<h3 class="catalog-title">${esc(s.name)}</h3><p class="observation-preview">${esc(firstSentence(s.observation))}</p>${fullReading(webText('llegir_lobservacio_completa'),s.observation,'especie-'+(i+1))}</div></article>`).join('')}</div><div class="visit-notebook"><h3 class="reading-subtitle">${esc(webText('text_el_quadern_de_la_passejada'))}</h3><p class="editorial-summary">${esc(webText('text_la_manera_de_documentar_tambe_forma_part_de_la_creacio_lenquadram'))}</p>${fullReading(webText('proposta_i_objectius'),d.proposal+'\n\n'+d.objectives,'jardi-proposta')}${fullReading(webText('desenvolupament_i_resultats_2'),d.development,'jardi-desenvolupament')}${fullReading(webText('estrategies_metodologiques_i_materials'),d.methodology+'\n\n'+d.materials,'jardi-metodologia')}${fullReading(webText('llegir_la_reflexio_completa'),d.reflection,'reflexio-jardi')}</div>`;
}
function outingSections() {
 const text=PORTFOLIO.outing;
 const indexes=[...text.matchAll(/[123]\. Què penso que m'ha aportat aquesta visita/g)].map(m=>m.index);
 if(indexes.length!==3)throw new Error('Expected three outing questions');
 return {introduction:text.slice(0,indexes[0]).trim(),parts:indexes.map((start,i)=>{
   const section=text.slice(start,indexes[i+1]??text.length).trim(),end=section.indexOf('?')+1;
   return {question:section.slice(0,end),body:section.slice(end).trim()};
 })};
}
function conclusionsPanel() {
 const {introduction,parts}=outingSections(),photos=group('conclusions');
 return visitHeading(webText('la_natura_lart_i_la_practica_docent'),webText('conclusions_de_la_sortida'),'')+
 `<div class="outing-introduction">${prose(introduction)}</div><div class="conclusion-themes">${parts.map((part,i)=>`<details class="conclusion-disclosure full-reading tone-${['sage','clay','sand'][i]}" id="conclusio-sortida-${i+1}"><summary><span class="outing-question">${esc(webText('conclusions_apartats')[i])}</span><span class="disclosure-mark" aria-hidden="true">+</span></summary><div class="conclusion-reading">${photoFigure(photos.find(m=>mediaSource(m).endsWith('/'+['img_4655','img_4724','img_4981'][i]+'.webp')),['El contacte directe amb la terra','Una mirada al paisatge des de Montjuïc','L’observació propera d’una flor'][i])}${prose(part.question+'\n\n'+part.body,'original-reflection')}</div></details>`).join('')}</div>`;
}
function b2p2() {
  const bodies = [museumPanel(),gardenPanel(),conclusionsPanel()];
  return page(B2[1].path,
    `<section class="section-pad visit-section"><div class="container"><div class="visit-tabs" role="tablist" aria-label="Apartats de la sortida">${VISIT_PANELS.map(([id,label],i)=>`<button id="tab-${id}" type="button" role="tab" aria-selected="${i===0}" aria-controls="panel-${id}" tabindex="${i===0?0:-1}" data-visit-tab="${id}">${esc(label)}</button>`).join('')}</div>${VISIT_PANELS.map(([id],i)=>visitPanel(id,bodies[i],i)).join('')}</div></section>`);
}
function b2p3() {
 const d=PORTFOLIO.book,steps=WEB.narrativa.llibre,used=new Set(steps.flatMap(step=>step.imagenes));
 const usedPaths=new Set([...used].map(id=>(PORTFOLIO.media.find(m=>m.id===id)||editableImage(id)).output));
 const remaining=group('descripcio').filter(m=>m.type==='image'&&!usedPaths.has(m.output)&&m.id!=='descripcio_img_5041');
 return page(B2[2].path,
 readingSection(webText('proposta'),webText('que_es_un_jardi_descripcio_visual'),prose(d.proposal)+fullReading(webText('objectius'),d.objectives))+
 `<div class="book-development">${splitStory(d.development,steps).map((step,i)=>storyUnit(step.titulo,step.text,step.imagenes,['sage','','sand','clay','','sage'][i],i)).join('')}</div>`+
 readingSection(webText('natura_viva'),webText('el_llibre_dartista_en_moviment'),videos('descripcio'),'sand','book-motion')+
 readingSection(webText('el_proces'),webText('estrategies_metodologiques'),prose(d.methodology,'original-reflection'))+
 readingSection(webText('el_taller'),webText('materials'),prose(d.materials,'original-reflection'),'sage')+
 `<section class="section-pad"><div class="container"><details class="document-details"><summary>Altres mirades del procés<span class="disclosure-mark" aria-hidden="true">+</span></summary>${gallery('descripcio',remaining,'remaining-book-gallery')}</details></div></section>`);
}
function b2p4() {
 const headings=WEB.narrativa.tintes_apartats;
 const text=PORTFOLIO.dyes;
 return page(B2[3].path,headings.map((h,i)=>{
 const start=text.indexOf(h),end=i+1<headings.length?text.indexOf(headings[i+1]):text.length;
 const body=text.slice(start+h.length,end).trim();
 const content=i===10?materialsTable(body):prose(body,'original-reflection');
 const media=WEB.narrativa.tintes[String(i)]||{imagenes:[],videos:[]};
 return readingSection('Tintes naturals',h.replace(/:$/,''),`<div class="story-layout ${i%2?'visual-first':''}"><div>${content}</div><div class="story-visual">${storyMedia(media.imagenes)}</div></div>`+(media.videos.length?videos('tintes',media.videos):''),['','sage','sand'][i%3]);
 }).join(''));
}
function blocIII() {
  return page('bloc-iii',
    readingSection(webText('el_cos_i_la_materia'),webText('quatre_espais_de_creacio'),chapterLinks(B3)+note(),'sand'));
}
function b3proposal(item) {
  return page(item.path,
    readingSection(webText('el_quadern_obert'),webText('proces_i_reflexio'),`<div class="empty-chapter"><span class="empty-chapter-line" aria-hidden="true"></span>${note()}</div>`,'sand'));
}
function conclusions() {
  return page('conclusions',
    readingSection(webText('aprenentatges'),webText('que_memporto_del_recorregut'),prose("Ressaltar aquells aprenentatges (coneixements) que s'han realitzat durant l'assignatura.")+note()+`<a href="${pathFor(B2[1].path)}" class="editorial-cta">Visita museu i jardí →</a>`,'sage'));
}
function reflexio() {
  return page('reflexio-personal',
    readingSection(webText('mirada_interior'),webText('punts_forts_i_punts_febles'),`<div class="reflection-headings"><h3>${esc(webText('text_punts_forts'))}</h3><h3>${esc(webText('text_punts_febles'))}</h3></div>${note()}`,'sand'));
}
function saberMes() {
  return page('per-saber-ne-mes',
    readingSection(webText('arxiu_de_consulta'),webText('recursos_per_explorar'),note()));
}
function bibliografia() {
  return page('referencies-bibliografiques',
    section(webText('01_lectures'),webText('bibliografia'),readingVisual()+`<ol class="bibliography">${PORTFOLIO.bibliography.map(ref=>`<li>${esc(ref).replace(/(https:\/\/[^\s<]+)/g,`<a href="$1" target="_blank" rel="noopener noreferrer">$1<span class="sr-only">${esc(webText('text_sobre_en_una_pestanya_nova'))}</span></a>`)}</li>`).join('')}</ol>`));
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

});
document.addEventListener('keydown',event=>{
  if (!(event.target instanceof Element)) return;
  const tab=event.target.closest('[data-visit-tab]');
  if (!tab || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  const tabs=[...document.querySelectorAll('[data-visit-tab]')], i=tabs.indexOf(tab);
  const index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  event.preventDefault();activateVisitTab(tabs[index].dataset.visitTab,true);
});
