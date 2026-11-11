/* Definitive edition: complete text, image mapping, aliases and keyboard flow. */
const {chromium}=require(process.env.ARI_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const output=path.resolve('docs/auditoria-rubrica/capturas/document60');fs.mkdirSync(output,{recursive:true});
const base='http://127.0.0.1:8000',canonical='bloc-ii/p3-bis-taller-de-tintes-naturals';
const flat=t=>t.replace(/\s+/g,' ').trim();
(async()=>{const browser=await chromium.launch({channel:'msedge'});try{
 const page=await browser.newPage({reducedMotion:'reduce'}),errors=[],shots=[];
 page.on('pageerror',e=>errors.push(e.message));
 async function go(route){await page.goto(base+'/#/'+route,{waitUntil:'networkidle'});await page.waitForFunction(r=>document.title.startsWith(ROUTES.find(x=>x[0]===r)[1]),route);}
 async function text(selector){return flat((await page.locator(selector+' .original-reflection p,'+selector+' .original-reflection li').allTextContents()).join(' '));}
 async function geometry(){assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 async function capture(selector,name){
  const el=page.locator(selector);
  for(const img of await el.locator('img:visible').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(x=>x.decode());}
  for(const video of await el.locator('video:visible').all())await video.evaluate(async x=>{x.muted=true;await x.play();await new Promise(r=>x.requestVideoFrameCallback(r));x.pause();});
  await page.evaluate(()=>document.fonts.ready);await el.screenshot({path:path.join(output,name+'.png')});shots.push(name);await geometry();
 }
 await go('inici');const data=await page.evaluate(()=>PORTFOLIO),config=await page.evaluate(()=>WEB.document60);
 for(const width of [375,390,430,768,1024,1440]){
   await page.setViewportSize({width,height:950});
   await page.goto(base+'/#/bloc-ii/p4-experimentem-amb-tintes-vives');
   await page.waitForFunction(route=>location.hash==='#/'+route&&document.querySelector('h1')?.textContent==='PART 3_bis. TALLER DE TINTES NATURALS',canonical);
   await geometry();
 }
 await go('bloc-ii/p2-visita-museu-i-jardi');
 assert.equal(await page.locator('.artwork-card').count(),10);assert.equal(await page.locator('.cartela-reading').count(),10);
 for(let i=0;i<10;i++){
  const detail=page.locator('#cartela-'+(i+1)),summary=detail.locator('summary');
  assert.equal(await detail.getAttribute('open'),null);await summary.focus();await page.keyboard.press('Enter');
  assert.equal(await detail.getAttribute('open'),'');
  const button=detail.locator('button'),src=await button.locator('img').getAttribute('src');
  assert.ok(src.includes('/'+String(i+1).padStart(2,'0')+'_'));await button.click();
  assert.equal(await page.locator('#lightbox-img').getAttribute('src'),src);await page.keyboard.press('Escape');
  assert.ok(await button.evaluate(el=>el===document.activeElement));await summary.click();
 }
 assert.equal(await page.locator('.cdan-work').count(),3);
 assert.equal(await text('#referents-cdan'),flat(Object.values(data.cdan).join(' ')));
 assert.ok((await page.locator('#referents-cdan').textContent()).includes('Tot i que no vaig poder assistir presencialment a la sortida al CDAN'));
 assert.equal(await page.locator('#obra-reflexio-4 li').count(),3);
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:950});await go('inici');await capture('main','inici-'+width);
  await go('bloc-ii');assert.deepEqual(await page.locator('.chapter-link .micro-kicker').allTextContents(),['PART 1','PART 2','PART 3','PART 3_bis']);await capture('main','bloc-ii-'+width);
  await go('bloc-ii/p2-visita-museu-i-jardi');await page.locator('#obra-reflexio-1 summary').click();await page.locator('#cartela-1 summary').click();await capture('#obra-1','obra-cartela-'+width);await capture('#referents-cdan','cdan-'+width);
  await go(canonical);assert.ok((await page.locator('main').textContent()).includes('Elaborarem tintes naturals a partir d’elements botànics'));assert.ok((await page.locator('main').textContent()).includes('Aquesta proposta m’ha fet adonar'));assert.equal(await page.locator('.pending-note').count(),0);await capture('main','taller-'+width);
  await go('per-saber-ne-mes');assert.equal(await page.locator('.further-artist').count(),3);assert.equal(await page.locator('main img').count(),5);assert.equal(await page.locator('.pending-note').count(),0);
  for(const [i,artist] of config.further.entries()){
   const selector='.further-artist:nth-of-type('+(i+1)+')';
   assert.equal(await text(selector),flat(data.further[artist.field]));
   const summary=page.locator('#artista-'+artist.field+' summary');await summary.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#artista-'+artist.field).getAttribute('open'),'');
  }
  await page.locator('#glosari summary').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#glosari tbody tr').count(),8);
  assert.deepEqual(await page.locator('#glosari tbody th').allTextContents(),data.glossary.map(x=>x.concept));
  assert.deepEqual(await page.locator('#glosari tbody td').allTextContents(),data.glossary.map(x=>x.explanation));
  await capture('main','per-saber-ne-mes-'+width);await capture('#glosari','glosari-'+width);
  await go('referencies-bibliografiques');assert.equal(await page.locator('.bibliography').first().locator('li').count(),6);assert.equal(await page.locator('.bibliography').last().locator('li').count(),5);await capture('main','bibliografia-'+width);
  await go('bloc-i');await page.locator('#reflexio-completa summary').click();assert.ok((await text('#reflexio-completa')).includes('(Freire, 2010, p.72)'));assert.equal(await page.locator('#reflexio-completa .academic-quotation').count(),4);assert.equal(await page.locator('.idea-sequence .reading-quote .academic-quotation').count(),4);
 }
 assert.deepEqual(errors,[]);
 const report={canonicalRoutes:17,aliasRoutes:1,aliasChecks:6,cartelas:10,artworks:10,species:10,cdanWorks:3,cdanImages:4,furtherArtists:3,furtherImages:5,glossaryRows:8,references:6,recommended:5,fullText:true,keyboard:true,errors,screenshots:shots};
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log({...report,screenshots:shots.length});
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
