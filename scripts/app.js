'use strict';

// Original hash routes, editorial components and home composition retained.
const ROUTES = [
  ['inici', 'Inici'], ['introduccio', 'Introducció'], ['bloc-i', 'Bloc I — Art i educació'],
  ['bloc-ii', 'Bloc II — Art i natura'],
  ['bloc-ii/p1-formes-dapropar-se-a-la-natura', "P1. Formes d'apropar-se a la natura"],
  ['bloc-ii/p2-visita-museu-i-jardi', 'P2. Visita museu i jardí'],
  ['bloc-ii/p3-descripcio-del-jardi', 'P3. Descripció del jardí'],
  ['bloc-ii/p4-experimentem-amb-tintes-vives', 'P4. Experimentem amb tintes vives'],
  ['bloc-iii', 'Bloc III — Cos, moda i artivisme'],
  ['bloc-iii/p1-llenguatge-del-cos-i-el-teixit', 'P1. Llenguatges del cos i el teixit'],
  ['bloc-iii/p2-exposicio-el-cos-vestit-i-mater-matters', 'P2. Exposició: El cos vestit i Mater Matters'],
  ['bloc-iii/p3-bioteixits-du-da', 'P3. Bioteixits_DU-DA'],
  ['bloc-iii/p4-la-passarella-espai-de-creacio', 'P4. La passarel·la: espai de creació'],
  ['conclusions', 'Conclusions'], ['reflexio-personal', 'Reflexió personal'],
  ['per-saber-ne-mes', 'Per saber-ne més...'], ['referencies-bibliografiques', 'Referències bibliogràfiques']
];
const pathFor = x => '#/' + x;
const esc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[ch]));
const formatIndex = n => String(n).padStart(2, '0');
const MEDIA = Object.create(null);
const group = name => PORTFOLIO.media.filter(m => m.group === name);
const B2 = ROUTES.filter(([p]) => p.startsWith('bloc-ii/')).map(([path, label]) => ({path, title:label.slice(4), sub:''}));
const B3 = ROUTES.filter(([p]) => p.startsWith('bloc-iii/')).map(([path, label]) => ({path, title:label.slice(4), sub:''}));

function note() {
  return '<p class="pending-note"><span aria-hidden="true">○</span> Pendent d’incorporar</p>';
}
function prose(text, cls = '') {
  const paragraphs = text.split(/\n\s*\n/);
  const html = [];
  let list = [];
  const flush = () => { if (list.length) { html.push(`<ul class="plain-list">${list.map(p=>`<li>${esc(p.slice(2))}</li>`).join('')}</ul>`); list = []; } };
  for (const p of paragraphs) {
    if (p.startsWith('- ')) list.push(p);
    else { flush(); html.push(`<p>${esc(p)}</p>`); }
  }
  flush();
  return `<div class="prose ${cls}">${html.join('')}</div>`;
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
  return `<nav class="page-pagination" aria-label="Navegació entre capítols">${left ? `<a href="${pathFor(left[0])}" class="pagination-link"><span class="pagination-dir">← Anterior</span><span class="pagination-name">${esc(left[1])}</span></a>` : '<div></div>'}${right ? `<a href="${pathFor(right[0])}" class="pagination-link"><span class="pagination-dir">Següent →</span><span class="pagination-name">${esc(right[1])}</span></a>` : ''}</nav>`;
}
function page(path, kicker, title, subtitle, body) {
  return `<article class="page-view">${breadcrumbs(path)}<header class="page-hero"><div class="container"><span class="eyebrow">${esc(kicker)}</span><h1 class="page-title">${esc(title)}</h1><p class="page-subtitle">${esc(subtitle)}</p></div></header>${body}<section class="section-pad"><div class="container">${pagination(path)}</div></section></article>`;
}
function section(kicker, title, body, alt = false, id = '') {
  return `<section ${id ? `id="${esc(id)}"` : ''} class="section-pad section-anchor ${alt ? 'bg-alt-section' : ''}"><div class="container"><span class="chapter-label">${esc(kicker)}</span><h2 class="chapter-heading">${esc(title)}</h2>${body}</div></section>`;
}
function chapterLinks(items) {
  return `<div class="chapter-list">${items.map((item,i) => `<a href="${pathFor(item.path)}" class="chapter-link"><span class="ch-num">${formatIndex(i+1)}.</span><div><span class="micro-kicker">Capítol ${formatIndex(i+1)}</span><h3>${esc(item.title)}</h3><p>${esc(item.sub)}</p></div><span class="ch-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
}
function picture(media, alt, eager = false) {
  const [w,h] = media.dimensions;
  return `<img src="${esc(media.output)}" width="${w}" height="${h}" alt="${esc(alt)}" loading="${eager ? 'eager' : 'lazy'}" ${eager ? 'fetchpriority="high"' : ''} decoding="async">`;
}
const mediaDescriptions = {
  img_2227:'Coberta d’El sentido del asombro, de Rachel Carson',
  img_2228:'La escuela es el bosque, de Heike Freire',
  img_2226:'Cartell de la conferència «Un árbol pinta una nube»',
  img_5030:'Sala de la conferència amb una projecció',
  'c1e64692-2a9e-48a7-8751-6184236d6423':'Retrat entre la vegetació',
  img_4784:'Flors i vegetació il·luminades pel sol',
  img_4785:'Una mà sosté una flor de color rosa',
  img_4790:'Fulles verdes amb nervis visibles',
  img_4791:'Fruits allargats entre les branques',
  img_4795:'Treball en grup a l’exterior amb elements naturals',
  img_4798:'Una mà sosté una flor de color taronja',
  img_4799:'Recull de pètals de diferents colors',
  img_5040:'Una carbassa a l’exterior',
  img_5041:'Fotografia de grup amb carbasses',
  img_5100:'Taula de treball amb papers i composicions de colors',
  img_5101:'Treball amb materials artístics a l’aula',
  img_5103:'Papers amb impressions i dibuixos de formes vegetals',
  img_5105:'Composicions sobre paper disposades a la taula',
  img_5106:'Selecció de papers durant el treball a l’aula',
  img_5107:'Pàgines desplegades del llibre d’artista',
  img_5125:'Llibre d’artista obert en ventall',
  img_5127:'Una altra vista del llibre d’artista desplegat',
  img_5187:'Suports de paper plegats sobre una taula',
  img_5189:'Recipient amb líquid i un estri de treball',
  img_5192:'Recipients i materials del taller de tintes',
  img_5194:'Mostres de color sobre papers plegats',
  img_4749:'Observació de la vegetació durant la passejada',
  img_4758:'Observació d’una flor durant la passejada',
  '28e874c3-6344-401c-be7a-a2aaf73cd671':'Treball artístic sobre paper en un entorn exterior',
  '5ce71397-3e74-443c-8313-fc2ce5eb1355':'Exploració de carbasses i materials en una taula',
  'e460a8c2-0871-4d36-a45d-411a1d306f33':'Mans amb pigments durant una activitat compartida',
  'f3703c50-3c7e-44cf-89bd-cdd442c6522d':'Treball artístic en grup a l’exterior'
};
function mediaTitle(m, i = 0) {
  const stem = m.output.split('/').pop().replace(/\.[^.]+$/, '');
  if (mediaDescriptions[stem]) return mediaDescriptions[stem];
  if (m.group === 'mnac') return ['Cúpula de l’interior del MNAC','Vista de Barcelona des de la sortida al museu','Edifici del MNAC al capvespre'][Number(stem)-1];
  if (m.group === 'jardi') return 'Composició fotogràfica de la passejada';
  return `Registre visual ${formatIndex(i+1)}`;
}
function photoFigure(m, caption = '', shape = 'wide', eager = false) {
  const id = m.output, title = mediaTitle(m);
  MEDIA[id] = {src:m.output, title, subtitle:'', meta:'', desc:''};
  return `<figure><button class="photo-frame ${shape} local-photo" type="button" data-lightbox="${esc(id)}" aria-label="Amplia: ${esc(title)}">${picture(m,title,eager)}<span class="zoom-pill">Amplia ↗</span></button>${caption ? `<figcaption class="figure-label">${esc(caption)}</figcaption>` : ''}</figure>`;
}
function gallery(name, images = group(name), cls = '') {
  return `<div class="catalog-grid cols-3 media-gallery ${cls}">${images.filter(m => m.type === 'image').map(m => photoFigure(m)).join('')}</div>`;
}
function videos(name) {
  return `<div class="catalog-grid video-gallery ${name === 'tintes' ? 'three-videos' : ''}">${group(name).filter(m => m.type === 'video').map((m,i) => `<figure><video controls preload="metadata" playsinline poster="${esc(m.poster)}" aria-label="${name === 'tintes' ? 'Experimentem amb tintes vives' : 'Llibre d’artista'} · vídeo ${i+1}"><source src="${esc(m.output)}" type="video/mp4">El navegador no pot reproduir aquest vídeo. <a href="${esc(m.output)}">Obre el vídeo</a>.</video><figcaption class="figure-label">${name === 'tintes' ? 'Tintes vives' : 'Llibre d’artista'} · ${formatIndex(i+1)}</figcaption></figure>`).join('')}</div>`;
}
function readingVisual() {
  return `<div class="reading-visual">${group('bloc-i').map(m=>`<div>${picture(m,mediaTitle(m))}</div>`).join('')}</div>`;
}
function magazineCard(n,title,subtitle,media,route) {
  const visual = n === 1 ? readingVisual() : media ? picture(media,mediaTitle(media)) : '<div class="editorial-placeholder" aria-hidden="true">Cos<br><em>i matèria</em></div>';
  return `<article class="exploration-entry"><a class="exploration-media ${n === 1 ? 'reading-entry' : ''}" href="${pathFor(route)}" aria-label="Explora ${esc(title)}">${visual}</a><div class="exploration-content"><span class="exploration-number">${formatIndex(n)}.</span><span class="eyebrow">Bloc ${['I','II','III'][n-1]}</span><h3 class="exploration-title serif-title">${esc(title)}</h3><p>${esc(subtitle)}</p><a href="${pathFor(route)}" class="editorial-cta">Explora el bloc →</a></div></article>`;
}

function home(){return `<article class="page-view">
<section class="hero-editorial"><div class="container hero-grid"><div>
<span class="hero-kicker">Art, natura i infància · Portafoli d’investigació</span>
<h1 class="hero-title">Educació<br><em>de les Arts</em><br>Visuals I</h1>
<p class="hero-subtitle">Un recorregut per l’art, la natura i l’expressió creativa a l’educació infantil.</p>
<div class="hero-meta-grid"><div><span class="meta-label">Autora</span><span class="meta-value">Ariadna Angel Marco</span></div><div><span class="meta-label">Curs acadèmic</span><span class="meta-value">2026 — 2027</span></div><div><span class="meta-label">Estudis</span><span class="meta-value">Grau en Educació Infantil</span></div><div><span class="meta-label">Projecte</span><span class="meta-value">Quadern d’artista i docència</span></div></div>
</div><div class="hero-visual-frame"><div class="hero-img-wrapper">${picture(group('inici')[0],mediaTitle(group('inici')[0]),true)}</div><div class="hero-caption"><span>Fig. 01 — Entre art i natura</span></div></div></div></section>
<section class="section-pad"><div class="container split-editorial"><div><span class="eyebrow">01 · Pòrtic</span><h2 class="chapter-heading">Benvinguts i benvingudes</h2><p class="micro-foot">Una porta d’entrada a la mirada artística durant la formació docent.</p></div><div class="prose"><p class="editorial-lead dropcap">Benvinguts i benvingudes a aquesta pàgina web, concebuda per una futura mestra d’Educació Infantil com a recurs didàctic i espai per documentar els aprenentatges de l’assignatura <em>Educació de les Arts Visuals I</em>.</p><p>Aquest portafoli s’ha estructurat com un quadern de recerca visual. Les pàgines recullen els blocs de treball, les fotografies, els processos i les reflexions escrites durant el curs.</p></div></div></section>
<section class="section-pad bg-alt-section"><div class="container split-editorial reverse"><div class="prose"><span class="eyebrow">02 · Presentació</span><h2 class="chapter-heading">Sobre aquest projecte</h2><p>El recorregut s’organitza entorn de tres eixos: l’art com a experiència educativa, el jardí com a espai de descoberta i l’exploració del cos, els teixits i la creació contemporània.</p><p>El recorregut incorpora les reflexions documentades, deu referents artístics i l’arxiu visual de les activitats. Els apartats sense redacció es mantenen oberts per completar-los.</p>${note()}</div><div>${photoFigure(group('descripcio').find(m=>m.output.endsWith('img_5107.webp')),'Llibre d’artista')}</div></div></section>
<section class="section-pad"><div class="container"><span class="eyebrow">03 · Índex visual</span><h2 class="chapter-heading">Tres maneres d’apropar-se a les arts</h2><div class="exploration-list">${magazineCard(1,'Art i educació','Fonaments de l’educació visual: imatge, pigment, expressió i processos de descoberta.',group('bloc-i')[0],'bloc-i')}${magazineCard(2,'Art i natura','El jardí, la visita al museu, el caminar i la creació d’un llibre d’artista.',group('jardi')[0],'bloc-ii')}${magazineCard(3,'Cos, teixit i creació','Moda, artivisme, bioteixits i pràctiques performatives vinculades a l’art.',null,'bloc-iii')}</div>${pagination('inici')}</div></section></article>`;}

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
  Object.keys(MEDIA).forEach(k=>delete MEDIA[k]);
  setMobile(false);
  closeDropdowns();
  const view = Object.hasOwn(VIEWS,path) ? VIEWS[path] : null;
  main.innerHTML = view ? view() : `<section class="section-pad"><div class="container"><span class="eyebrow">Pàgina no trobada</span><h1 class="page-title">Aquesta ruta no existeix.</h1><a class="editorial-cta" href="#/inici">Torna a l’inici →</a></div></section>`;
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
  picture.src = item.src; picture.alt = item.title;
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-subtitle').textContent = item.subtitle;
  document.getElementById('lightbox-meta').textContent = item.meta;
  document.getElementById('lightbox-meta').hidden = !item.meta;
  document.getElementById('lightbox-subtitle').hidden = !item.subtitle;
  document.getElementById('lightbox-desc').innerHTML = item.desc ? fullReading('Llegir la reflexió i proposta educativa',item.desc,'obra-completa') : '';
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
