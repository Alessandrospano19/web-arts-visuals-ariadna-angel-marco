'use strict';

// Original hash routes, editorial components and home composition retained.
const ROUTES = [
  "inici",
  "introduccio",
  "bloc-i",
  "bloc-ii",
  "bloc-ii/p1-formes-dapropar-se-a-la-natura",
  "bloc-ii/p2-visita-museu-i-jardi",
  "bloc-ii/p3-descripcio-del-jardi",
  "bloc-ii/p3-bis-taller-de-tintes-naturals",
  "bloc-iii",
  "bloc-iii/p1-llenguatge-del-cos-i-el-teixit",
  "bloc-iii/p2-exposicio-el-cos-vestit-i-mater-matters",
  "bloc-iii/p3-bioteixits-du-da",
  "bloc-iii/p4-la-passarella-espai-de-creacio",
  "conclusions",
  "reflexio-personal",
  "per-saber-ne-mes",
  "referencies-bibliografiques"
].map(path=>{
  const part=academicPart(path),title=WEB.titulos.academicos[path];
  return [path,path==='inici'?'Inici':(part?'PART '+part+'. ':'')+title.replace(/^PART [\w]+\. /,'')];
});
const ROUTE_ALIASES={'bloc-ii/p4-experimentem-amb-tintes-vives':'bloc-ii/p3-bis-taller-de-tintes-naturals'};
function academicPart(path){return path.includes('/p3-bis-')?'3_bis':path.match(/\/p(\d)-/)?.[1]||'';}
function webText(id) { return WEB['textos-generales'][id] ?? id; }
function mediaSource(media) { return media.originalOutput || media.output; }
function editableImage(id) { const m=WEB.imagenes[id]; if(!m || !m.output) return null; return m; }
function renderInline(text, budget = {left:2}) {
 const concepts=WEB.destacados.conceptos;
 const candidates=concepts.map(t=>({text:t,index:text.toLocaleLowerCase('ca').indexOf(t.toLocaleLowerCase('ca'))})).filter(x=>x.index>=0).sort((a,b)=>a.index-b.index).slice(0,budget.left);
 let out='',cursor=0;
 for(const hit of candidates){if(hit.index<cursor)continue;out+=esc(text.slice(cursor,hit.index))+'<strong>'+esc(text.slice(hit.index,hit.index+hit.text.length))+'</strong>';cursor=hit.index+hit.text.length;budget.left--;}
 return (out+esc(text.slice(cursor))).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
}
const pathFor = x => '#/' + x;
// Explicit editorial selections on source text; never transform arbitrary quotes
// or re-match HTML already emitted by another formatter.
function academicInline(text) {
 const rules=WEB['lectura-academica'], ranges=[];
 const lower=text.toLocaleLowerCase('ca');
 const overlaps=(start,end)=>ranges.some(r=>start<r.end&&end>r.start);
 for(const quote of rules.citas_literales){
   const start=text.indexOf(quote);
   if(start>=0&&!overlaps(start,start+quote.length))ranges.push({start,end:start+quote.length,quote:true});
 }
 const limit=text.length<220?1:2;
 for(const term of [...(rules.subrayados||[]),...rules.conceptos]){
   if(ranges.length>=limit)break;
   const start=lower.indexOf(term.toLocaleLowerCase('ca')),end=start+term.length;
   if(start<0||overlaps(start,end)||term.length>text.length*.4)continue;
   const letter=char=>char&&char.toLocaleUpperCase('ca')!==char.toLocaleLowerCase('ca');
   if(letter(text[start-1])||letter(text[end]))continue;
   ranges.push({start,end,quote:false,underline:(rules.subrayados||[]).includes(term)});
 }
 ranges.sort((a,b)=>a.start-b.start);
 let cursor=0,html='';
 for(const range of ranges){
   html+=esc(text.slice(cursor,range.start));
   const literal=esc(text.slice(range.start,range.end));
   html+=range.quote?`<strong class="academic-quotation"><em>${literal}</em></strong>`:`<strong${range.underline?' class="academic-underline"':''}>${literal}</strong>`;
   cursor=range.end;
 }
 return (html+esc(text.slice(cursor))).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
}
const esc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[ch]));
const formatIndex = n => String(n).padStart(2, '0');
const MEDIA = Object.create(null);
const group = name => PORTFOLIO.media.filter(m => m.group === name);
const B2 = ROUTES.filter(([p]) => p.startsWith('bloc-ii/')).map(([path, label]) => ({path, part:academicPart(path),title:label.replace(/^PART [\w]+\. /,''),sub:''}));
const B3 = ROUTES.filter(([p]) => p.startsWith('bloc-iii/')).map(([path, label]) => ({path, part:academicPart(path),title:label.replace(/^PART [\w]+\. /,''),sub:''}));

function note() {
  return '<p class="pending-note"><span aria-hidden="true">○</span> Pendent d’incorporar</p>';
}
function prose(text, cls = '') {
  text=text.replace(/●\s*/g,'\n\n● ').replace(/(● [^.\n:]{1,25}\.) (?=[A-ZÀ-Ú])/g,'$1\n\n').replace(/(Com a futura mestra d’infantil|A partir de l’obra proposaria|Les tres obres que formen aquesta composició són:)/g,'\n\n$1');
  const paragraphs = text.split(/\n\s*\n/).flatMap(p => p.length > 1000 ? p.split(/(?<=[.!?]) (?=[A-ZÀ-Ú])/).reduce((a,t)=>{if(a.length && a.at(-1).length<650)a[a.length-1]+=' '+t;else a.push(t);return a;},[]) : [p]);
  const html = [];
  let list = [];
  const flush = () => { if (list.length) { html.push(`<ul class="plain-list">${list.map(p=>`<li>${academicInline(p.slice(2))}</li>`).join('')}</ul>`); list = []; } };
  for (const p of paragraphs) {
    if (p.startsWith('- ') || p.startsWith('● ')) list.push(p);
    else { flush(); html.push(`<p>${academicInline(p)}</p>`); }
  }
  flush();
  return `<div class="prose ${cls}" lang="ca">${html.join('')}</div>`;
}
function breadcrumbs(path) {
  const route = ROUTES.find(([p]) => p === path), chunks = [['inici','Inici']];
  const parent = path.startsWith('bloc-ii/') ? 'bloc-ii' : path.startsWith('bloc-iii/') ? 'bloc-iii' : null;
  if (parent) chunks.push(ROUTES.find(([p]) => p === parent));
  if (path !== 'inici') chunks.push(route);
  return `<div class="breadcrumb-bar"><div class="container"><ol class="breadcrumb-list">${chunks.map(([p,l],i) => i === chunks.length - 1 ? `<li aria-current="page">${esc(l)}</li>` : `<li><a href="${pathFor(p)}">${esc(l)}</a><span aria-hidden="true"> / </span></li>`).join('')}</ol></div></div>`;
}
function pagination(path) {
  const i = ROUTES.findIndex(([p]) => p === path), left = ROUTES[i-1], right = ROUTES[i+1];
  return `<nav class="page-pagination" aria-label="Navegació entre capítols">${left ? `<a href="${pathFor(left[0])}" class="pagination-link"><span class="pagination-dir">${esc(webText('text_anterior'))}</span><span class="pagination-name">${esc(left[1])}</span></a>` : '<div></div>'}${right ? `<a href="${pathFor(right[0])}" class="pagination-link"><span class="pagination-dir">${esc(webText('text_seguent'))}</span><span class="pagination-name">${esc(right[1])}</span></a>` : ''}</nav>`;
}
function page(path, body) {
  const title=ACADEMIC_TITLES[path], {etiqueta:kicker,subtitulo:subtitle}=WEB.paginas[path];
  return `<article class="page-view" data-page="${esc(path)}">${breadcrumbs(path)}<header class="page-hero"><div class="container"><span class="eyebrow">${esc(kicker)}</span><h1 class="page-title">${esc(title)}</h1><p class="page-subtitle">${esc(subtitle)}</p></div></header>${body}<section class="section-pad"><div class="container">${pagination(path)}</div></section></article>`;
}
function section(kicker, title, body, alt = false, id = '') {
  return `<section ${id ? `id="${esc(id)}"` : ''} class="section-pad section-anchor ${alt ? 'bg-alt-section' : ''}"><div class="container"><span class="chapter-label">${esc(kicker)}</span><h2 class="chapter-heading">${esc(title)}</h2>${body}</div></section>`;
}
function chapterLinks(items) {
  return `<div class="chapter-list">${items.map((item,i) => `<a href="${pathFor(item.path)}" class="chapter-link"><span class="ch-num">${formatIndex(item.part)}.</span><div><span class="micro-kicker">PART ${esc(item.part)}</span><h3>${esc(item.title)}</h3><p>${esc(item.sub)}</p></div><span class="ch-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
}
function picture(media, alt, eager = false) {
  const [w,h] = media.dimensions;
  const markup=`<img src="${esc(media.output)}" width="${w}" height="${h}" alt="${esc(alt)}" loading="${eager ? 'eager' : 'lazy'}" ${eager ? 'fetchpriority="high"' : ''} decoding="async">`;
  return media.rotation?`<span class="rotated-photo" style="aspect-ratio:${h}/${w};--rotation:${media.rotation}deg;--rotated-width:${100*w/h}%">${markup}</span>`:markup;
}
const mediaDescriptions = WEB['pies-de-foto'];
function mediaTitle(m, i = 0) {
  if(m.alt) return m.alt;
  const stem = mediaSource(m).split('/').pop().replace(/\.[^.]+$/, '');
  if (mediaDescriptions[stem]) return mediaDescriptions[stem];
  if(m.group==='descripcio' && ['1','2','3','4'].includes(stem)) return {'1':'Experimentació artística a l’hort','2':'Treball plàstic a l’exterior','3':'Exploració de carbasses','4':'Experimentació amb pigments'}[stem];
  if (m.group === 'mnac') return ['Cúpula de l’interior del MNAC','Vista de Barcelona des de la sortida al museu','Edifici del MNAC al capvespre'][Number(stem)-1];
  if (m.group === 'jardi') return 'Composició fotogràfica de la passejada';
  return `Registre visual ${formatIndex(i+1)}`;
}
function photoFigure(m, caption = '', shape = 'wide', eager = false) {
  caption = WEB['pies-de-foto'][m.id] ?? caption;
  const id = m.id || m.output, title = mediaTitle(m);
  MEDIA[id] = {src:m.output, title, subtitle:'', meta:'', desc:'',rotation:m.rotation||0,dimensions:m.dimensions};
  return `<figure><button class="photo-frame ${shape} local-photo" type="button" data-lightbox="${esc(id)}" aria-label="Amplia: ${esc(title)}">${picture(m,title,eager)}<span class="zoom-pill">${esc(webText('text_amplia'))}</span></button>${caption ? `<figcaption class="figure-label">${esc(caption)}</figcaption>` : ''}</figure>`;
}
function gallery(name, images = group(name), cls = '') {
  return `<div class="catalog-grid cols-3 media-gallery ${cls}">${images.filter(m => m.type === 'image').map(m => photoFigure(m,name === 'descripcio' ? mediaTitle(m) : '')).join('')}</div>`;
}
function videos(name, ids = null) {
  return `<div class="catalog-grid video-gallery ${name === 'tintes' ? 'three-videos' : ''}">${group(name).filter(m => m.type === 'video' && (!ids || ids.includes(m.id))).map((m,i) => `<figure><video style="aspect-ratio:${m.dimensions[0]}/${m.dimensions[1]};--video-ratio:${m.dimensions[0]/m.dimensions[1]}" controls preload="metadata" playsinline poster="${esc(m.poster)}" aria-label="${name === 'tintes' ? 'Taller de tintes naturals' : 'Llibre d’artista'} · vídeo ${i+1}"><source src="${esc(m.output)}" type="video/mp4">El navegador no pot reproduir aquest vídeo. <a href="${esc(m.output)}">Obre el vídeo</a>.</video><figcaption class="figure-label">${esc(WEB['pies-de-foto'][m.id] || (name === 'tintes' ? 'Taller de tintes naturals' : 'Llibre d’artista')+' · '+formatIndex(i+1))}</figcaption></figure>`).join('')}</div>`;
}
function readingVisual() {
  return `<div class="reading-visual">${group('bloc-i').map(m=>`<div>${picture(m,mediaTitle(m))}</div>`).join('')}</div>`;
}
function magazineCard(n,title,subtitle,media,route) {
  const visual = n === 1 ? readingVisual() : media ? picture(media,mediaTitle(media)) : '<div class="editorial-placeholder" aria-hidden="true">Cos<br><em>i matèria</em></div>';
  return `<article class="exploration-entry"><div class="container exploration-band"><a class="exploration-media ${n === 1 ? 'reading-entry' : ''}" href="${pathFor(route)}" aria-label="Explora ${esc(title)}">${visual}</a><div class="exploration-content"><span class="exploration-number">${formatIndex(n)}.</span><span class="eyebrow">Bloc ${['I','II','III'][n-1]}</span>${n === 1 ? '' : `<h3 class="exploration-title serif-title">${esc(title)}</h3>`}<p>${esc(subtitle)}</p><a href="${pathFor(route)}" class="editorial-cta">Explora el bloc →</a></div></div></article>`;
}

function home(){const h=WEB.portada;return `<article class="page-view home-page">
<section class="hero-editorial"><div class="container hero-grid"><div>
<span class="hero-kicker">${esc(h.kicker)}</span><h1 class="hero-title">Educació<br><em>de les Arts</em><br>Visuals I</h1><p class="hero-subtitle">${esc(h.subtitulo)}</p>
<div class="hero-meta-grid">${[['Autora',h.autora],['Curs acadèmic',h.curso],['Estudis',h.estudios],['Projecte',h.proyecto]].map(([a,b])=>`<div><span class="meta-label">${a}</span><span class="meta-value">${esc(b)}</span></div>`).join('')}</div>
</div><div class="hero-visual-frame"><div class="hero-img-wrapper">${picture(editableImage('portada_retrat'),mediaTitle(editableImage('portada_retrat')),true)}</div><div class="hero-caption"><span>${esc(webText('text_fig_01_entre_art_i_natura'))}</span></div></div></div></section>
<section class="section-pad home-welcome"><div class="container split-editorial"><div><span class="eyebrow">${esc(webText('text_01_portic'))}</span><h2 class="chapter-heading">${esc(h.bienvenida_titulo)}</h2><p class="micro-foot">${esc(h.bienvenida_nota)}</p></div><div class="prose"><p class="editorial-lead dropcap">${esc(h.bienvenida)}</p><p>${esc(h.descripcion)}</p></div></div></section>
<section class="home-exploration"><div class="container"><h2 class="chapter-heading home-index-title">${esc(webText('text_art_i_educacio'))}</h2></div><div class="exploration-list">${magazineCard(1,'Art i educació',h.bloc_i,group('bloc-i')[0],'bloc-i')}${magazineCard(2,WEB.titulos.portada_bloc_ii,h.bloc_ii,editableImage('bloc_ii_portada'),'bloc-ii')}${magazineCard(3,WEB.titulos.portada_bloc_iii,h.bloc_iii,null,'bloc-iii')}</div><div class="container">${pagination('inici')}</div></section></article>`;}

const VIEWS = {
  inici:home, introduccio:intro, 'bloc-i':blocI, 'bloc-ii':blocII,
  [B2[0].path]:b2p1, [B2[1].path]:b2p2, [B2[2].path]:b2p3, [B2[3].path]:b2p4,
  'bloc-iii':blocIII, ...Object.fromEntries(B3.map(item=>[item.path,()=>b3proposal(item)])),
  conclusions, 'reflexio-personal':reflexio, 'per-saber-ne-mes':saberMes, 'referencies-bibliografiques':bibliografia
};

const main = document.getElementById('main-content');
const mobileBtn = document.getElementById('mobile-menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const modal = document.getElementById('lightbox-modal');
const header = document.querySelector('.site-header');
const footer = document.querySelector('.site-footer');
// Long navigation labels share the same editable academic titles.
document.querySelectorAll('[data-route*="/p"]').forEach(link=>{link.textContent=link.dataset.route===B2[1].path?WEB.titulos.navegacio_part_2:ROUTES.find(([path])=>path===link.dataset.route)[1];});
document.querySelector('footer a[href="#/bloc-iii"]').textContent=WEB.titulos.portada_bloc_iii;
const universityLogo=editableImage('universitat_logo');
if(universityLogo) document.querySelector('.brand-logo').insertAdjacentHTML('afterend',`<span class="university-mark">${picture(universityLogo,universityLogo.alt,true)}</span>`);
let previousFocus = null;
function setMobile(open, returnFocus = false) {
  mobileBtn.setAttribute('aria-expanded',String(open));
  mobileDrawer.classList.toggle('is-open',open);
  mobileDrawer.inert = !open;
  main.inert = footer.inert = open;
  document.body.classList.toggle('menu-open',open);
  if (open) mobileDrawer.querySelector('a[href]')?.focus();
  else if (returnFocus) mobileBtn.focus();
}
function setSubmenu(btn,open) {
  const el = document.getElementById(btn.dataset.submenuTarget);
  btn.setAttribute('aria-expanded',String(open));
  btn.textContent = open ? '−' : '+';
  el.classList.toggle('is-open',open);
  el.inert = !open;
}
function closeDropdowns() {
  document.querySelectorAll('[data-dropdown]').forEach(g=>{
    g.classList.remove('open');
    g.querySelector('button').setAttribute('aria-expanded','false');
  });
}
function renderRoute(focus = false) {
  const raw = location.hash.startsWith('#/') ? location.hash.slice(2) : 'inici';
  let path;
  try { path = decodeURIComponent(raw).replace(/^\/+|\/+$/g,'') || 'inici'; }
  catch { path = '__invalid__'; }
  if(ROUTE_ALIASES[path]){location.replace('#/'+ROUTE_ALIASES[path]);return;}
  Object.keys(MEDIA).forEach(k=>delete MEDIA[k]);
  setMobile(false);
  closeDropdowns();
  const view = Object.hasOwn(VIEWS,path) ? VIEWS[path] : null;
  main.innerHTML = view ? view() : `<section class="section-pad"><div class="container"><span class="eyebrow">${esc(webText('text_pagina_no_trobada'))}</span><h1 class="page-title">Aquesta ruta no existeix.</h1><a class="editorial-cta" href="#/inici">Torna a l’inici →</a></div></section>`;
  document.title = `${view ? ROUTES.find(r=>r[0]===path)[1] : 'Pàgina no trobada'} — Educació de les Arts Visuals I`;
  document.body.setAttribute('data-Section-theme',path.startsWith('bloc-iii') ? 'bloc-iii' : 'default');
  document.querySelectorAll('[data-route]').forEach(a=>{
    const route = a.dataset.route;
    a.classList.toggle('active',route === path || ((route === 'bloc-ii' || route === 'bloc-iii') && path.startsWith(route+'/')));
    if (route === path) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
  document.querySelectorAll('.mobile-submenu-btn').forEach(btn=>{
    const prefix = btn.dataset.submenuTarget.endsWith('b2') ? 'bloc-ii/' : 'bloc-iii/';
    setSubmenu(btn,path.startsWith(prefix));
  });
  window.scrollTo({top:0,left:0,behavior:'instant'});
  if (focus) main.focus({preventScroll:true});
}
function openLightbox(id,opener) {
  const item = MEDIA[id];
  if (!item) return;
  previousFocus = opener;
  const picture = document.getElementById('lightbox-img');
  if(picture.parentElement.classList.contains('rotated-photo'))picture.parentElement.replaceWith(picture);
  if(item.rotation){const wrapper=document.createElement('span');wrapper.className='rotated-photo';const [w,h]=item.dimensions;wrapper.style.cssText=`aspect-ratio:${h}/${w};--rotation:${item.rotation}deg;--rotated-width:${100*w/h}%`;picture.replaceWith(wrapper);wrapper.append(picture);}
  picture.src = item.src; picture.alt = item.title;
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-subtitle').textContent = item.subtitle;
  document.getElementById('lightbox-meta').textContent = item.meta;
  document.getElementById('lightbox-meta').hidden = !item.meta;
  document.getElementById('lightbox-subtitle').hidden = !item.subtitle;
  document.getElementById('lightbox-desc').innerHTML = item.desc ? fullReading(webText('llegir_la_reflexio_i_proposta_educativa'),item.desc,'obra-completa') : '';
  modal.querySelector('.lightbox-details').scrollTop = 0;
  modal.querySelector('.lightbox-dialog').scrollTop = 0;
  modal.inert = false; modal.classList.add('is-active'); modal.setAttribute('aria-hidden','false');
  header.inert = main.inert = footer.inert = true;
  document.body.classList.add('modal-open');
  document.getElementById('lightbox-close-btn').focus();
}
function closeLightbox() {
  if (!modal.classList.contains('is-active')) return;
  modal.classList.remove('is-active'); modal.setAttribute('aria-hidden','true'); modal.inert = true;
  header.inert = main.inert = footer.inert = false;
  document.body.classList.remove('modal-open');
  previousFocus?.focus({preventScroll:true}); previousFocus = null;
}
function trapFocus(e, roots) {
  const focusables = roots.flatMap(root=>[...root.querySelectorAll('a[href],button:not([disabled]),summary,[tabindex="0"]')])
    .filter(el=>!el.closest('[inert]') && el.getClientRects().length);
  const first = focusables[0], last = focusables.at(-1);
  if (!first) return;
  if (e.shiftKey && (document.activeElement === first || !focusables.includes(document.activeElement))) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && (document.activeElement === last || !focusables.includes(document.activeElement))) { e.preventDefault(); first.focus(); }
}
mobileBtn.addEventListener('click',()=>setMobile(mobileBtn.getAttribute('aria-expanded') !== 'true',true));
window.addEventListener('hashchange',()=>{closeLightbox();renderRoute(true);});
document.addEventListener('click',event=>{
  const t = event.target;
  if (!(t instanceof Element)) return;
  if (t.closest('.skip-link')) { event.preventDefault(); main.focus(); return; }
  const submenu = t.closest('.mobile-submenu-btn');
  if (submenu) { setSubmenu(submenu,submenu.getAttribute('aria-expanded') !== 'true'); return; }
  const drop = t.closest('.dropdown-toggle-btn');
  if (drop) {
    const item = drop.closest('[data-dropdown]'), opening = !item.classList.contains('open');
    closeDropdowns(); item.classList.toggle('open',opening); drop.setAttribute('aria-expanded',String(opening)); return;
  }
  const media = t.closest('[data-lightbox]');
  if (media) { openLightbox(media.dataset.lightbox,media); return; }
  const jump = t.closest('[data-scroll-to]');
  if (jump) {
    const target = document.getElementById(jump.dataset.scrollTo);
    if (target) { target.tabIndex = -1; target.focus({preventScroll:true}); target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}); }
    return;
  }
  if (t.closest('#lightbox-close-btn') || t === modal) { closeLightbox(); return; }
  const link = t.closest('a[href^="#/"]');
  if (link && link.getAttribute('href') === location.hash) { event.preventDefault(); closeLightbox(); renderRoute(true); return; }
  if (!t.closest('[data-dropdown]')) closeDropdowns();
});
document.addEventListener('keydown',e=>{
  if (e.key === 'Escape') {
    closeLightbox();
    if (mobileBtn.getAttribute('aria-expanded') === 'true') setMobile(false,true);
    const open = document.querySelector('[data-dropdown].open');
    if (open) { closeDropdowns(); open.querySelector('button').focus(); }
  }
  if (e.key === 'Tab') {
    if (modal.classList.contains('is-active')) trapFocus(e,[modal]);
    else if (mobileBtn.getAttribute('aria-expanded') === 'true') trapFocus(e,[header]);
  }
});
document.addEventListener('error',e=>{
  if (!(e.target instanceof HTMLImageElement)) return;
  e.target.classList.add('image-unavailable');
  e.target.alt = 'Imatge no disponible: ' + e.target.alt;
},true);
window.addEventListener('resize',()=>{
  if (innerWidth >= 1300 && mobileBtn.getAttribute('aria-expanded') === 'true') { setMobile(false); main.focus({preventScroll:true}); }
});
renderRoute();
