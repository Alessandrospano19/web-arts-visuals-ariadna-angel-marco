/* Editorial contract: source fidelity, scoped strategy labels, typography and bibliography. */
const {chromium}=require(process.env.ARI_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const output=path.resolve('docs/verification/ajustes-editoriales-finales');
const base=process.env.ARI_PREVIEW_URL||'http://127.0.0.1:8000';
const baseline=JSON.parse(fs.readFileSync(path.join(output,'baseline.json'),'utf8'));
const flat=s=>s.replace(/\s+/g,' ').trim();
(async()=>{const browser=await chromium.launch({channel:'msedge'});try{
 const page=await browser.newPage({reducedMotion:'reduce'}),report={widths:[390,1440],routes:[],bibliography:[],strategies:[],errors:[],failedRequests:[],captures:[]};
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
 page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.failedRequests.push([r.status(),r.url()]);});
 async function go(r){await page.goto(base+'/#/'+r,{waitUntil:'networkidle'});}
 async function capture(selector,name){
  const el=page.locator(selector);
  for(const img of await el.locator('img:visible').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(x=>x.decode());}
  await page.evaluate(()=>document.fonts.ready);await el.screenshot({path:path.join(output,name+'.png')});report.captures.push(name+'.png');
 }
 await go('inici');assert.deepEqual(await page.evaluate(()=>PORTFOLIO),baseline.portfolio,'Academic data changed');
 const routes=await page.evaluate(()=>ROUTES.map(r=>r[0]));
 for(const width of report.widths){
  await page.setViewportSize({width,height:950});
  for(const route of routes){
   await go(route);
   for(const panel of route.includes('/p2-visita')?['obres','jardi','conclusions']:[null]){
    if(panel)await page.locator('#tab-'+panel).click();
    await page.locator('main details').evaluateAll(xs=>xs.forEach(x=>x.open=true));
    const stats=await page.locator('main').evaluate(el=>{
     const selector='.prose p,.prose li,.editorial-summary,.idea-row p,.chapter-lead,.visit-heading > p,.artwork-preview,.observation-preview,.exploration-content > p';
     const paragraphs=[...el.querySelectorAll(selector)].filter(x=>x.checkVisibility()&&x.textContent.trim());
     return {paragraphs:paragraphs.length,highlights:el.querySelectorAll('strong').length,overflow:document.documentElement.scrollWidth>innerWidth,
      unjustified:paragraphs.filter(x=>getComputedStyle(x).textAlign!=='justify').map(x=>x.textContent.slice(0,80)),
      wrongHyphens:paragraphs.filter(x=>getComputedStyle(x).hyphens!=='auto'||x.closest('[lang]')?.lang!=='ca').map(x=>x.textContent.slice(0,50)),
      wronglyJustified:[...el.querySelectorAll('h1,h2,h3,summary,button,figcaption,th')].filter(x=>x.checkVisibility()&&getComputedStyle(x).textAlign==='justify').map(x=>x.tagName+':'+x.textContent.slice(0,40))};
    });
    assert.equal(stats.overflow,false,route);assert.deepEqual(stats.unjustified,[],route);assert.deepEqual(stats.wrongHyphens,[],route);assert.deepEqual(stats.wronglyJustified,[],route);
    report.routes.push({route,panel,width,...stats});
   }
   if(route==='bloc-ii'){
    assert.equal(await page.locator('.chapter-link h3').nth(1).innerText(),'VISITA AL MNAC I PASSEJADA PELS JARDINS DE MONTJUÏC');
    assert.equal(await page.locator('.chapter-link').nth(1).getAttribute('href'),'#/bloc-ii/p2-visita-museu-i-jardi');
    await capture('.chapter-list','indice-'+width);
   }
   if(route==='referencies-bibliografiques'){
    const titles=await page.evaluate(()=>WEB['bibliografia-formato']);
    const rows=await page.locator('.bibliography li').evaluateAll(xs=>xs.map(x=>({text:x.textContent.replace(/ \(s’obre en una pestanya nova\)/g,''),style:getComputedStyle(x).fontStyle,title:x.querySelector('em')?.textContent,titleStyle:getComputedStyle(x.querySelector('em')).fontStyle,emCount:x.querySelectorAll('em').length,links:[...x.querySelectorAll('a')].map(a=>({url:a.href,style:getComputedStyle(a).fontStyle})),nestedItalicOutsideTitle:[...x.querySelectorAll('*:not(.bibliography-title)')].filter(a=>getComputedStyle(a).fontStyle!=='normal').length})));
    assert.deepEqual(rows.map(r=>r.text),[...baseline.portfolio.bibliography,...baseline.portfolio.recommended]);
    assert.deepEqual(rows.map(r=>r.title),[...titles.utilitzades,...titles.recomanades]);
    rows.forEach(r=>{assert.equal(r.style,'normal');assert.equal(r.titleStyle,'italic');assert.equal(r.emCount,1);assert.equal(r.nestedItalicOutsideTitle,0);r.links.forEach(a=>assert.equal(a.style,'normal'));});
    report.bibliography.push({width,rows});await capture('main','bibliografia-'+width);
   }
  }
  for(const [route,selector,count,name] of [
   ['bloc-ii/p2-visita-museu-i-jardi','#museu-metodologia',6,'museu-estrategies'],
   ['bloc-ii/p3-descripcio-del-jardi','.methodology-prose',5,'llibre-estrategies'],
   ['bloc-ii/p3-bis-taller-de-tintes-naturals','.methodology-prose',6,'tintes-estrategies']]){
    await go(route);if(route.includes('/p2-visita')){await page.locator('#tab-obres').click();await page.locator(selector).evaluate(x=>x.open=true);}
    const labels=await page.locator(selector+' li').evaluateAll(xs=>xs.map(x=>({prefix:x.textContent.slice(0,x.textContent.indexOf(':')+1),bold:x.querySelector(':scope > strong.methodology-term')?.textContent,weight:getComputedStyle(x.querySelector('strong.methodology-term')).fontWeight,color:getComputedStyle(x.querySelector('strong.methodology-term')).color})));
    assert.equal(labels.length,count);labels.forEach(x=>{assert.equal(x.prefix,x.bold);assert.equal(x.weight,'700');assert.equal(x.color,'rgb(55, 74, 60)');});
    assert.equal(await page.locator('.methodology-term:not(.methodology-prose .methodology-term)').count(),0);
    report.strategies.push({route,width,labels});await capture(selector,name+'-'+width);
  }
  await go('bloc-ii/p2-visita-museu-i-jardi');await page.locator('#tab-jardi').click();await page.locator('#jardi-metodologia').evaluate(x=>x.open=true);
  assert.equal(await page.locator('#jardi-metodologia .methodology-term').count(),0,'Narrative has no label before a colon');await capture('#jardi-metodologia','jardi-metodologia-'+width);
  await page.locator('#tab-obres').click();await page.locator('#obra-reflexio-4').evaluate(x=>x.open=true);assert.equal(await page.locator('#obra-reflexio-4 .methodology-term').count(),0,'Artwork directions are not methodology labels');
  for(const route of ['introduccio','bloc-i','per-saber-ne-mes']){
   await go(route);await page.locator('main details').evaluateAll(xs=>xs.forEach(x=>x.open=true));
   const selector=route==='per-saber-ne-mes'?'.further-artist:nth-of-type(2)':'#reflexio-completa';
   await page.locator(selector).evaluate(x=>x.scrollIntoView());await page.screenshot({path:path.join(output,route+'-lectura-'+width+'.png')});report.captures.push(route+'-lectura-'+width+'.png');
   if(route==='introduccio')await capture('.tone-forest','destacados-fondo-verde-'+width);
  }
 }
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.failedRequests,[]);
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({routePanels:report.routes.length,strategyLabels:report.strategies.reduce((n,x)=>n+x.labels.length,0),bibliographyEntries:report.bibliography.reduce((n,x)=>n+x.rows.length,0),errors:report.errors,captures:report.captures.length}));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
