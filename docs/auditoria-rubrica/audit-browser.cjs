/* Read-only browser evidence. Writes only inside this audit directory. */
const {chromium}=require(process.env.ARI_PLAYWRIGHT_MODULE);
const fs=require('node:fs'),path=require('node:path');
const out=__dirname,base='http://127.0.0.1:8000';
const flat=s=>s.replace(/\s+/g,' ').trim();
(async()=>{
 const browser=await chromium.launch({channel:'msedge'});
 const page=await browser.newPage({reducedMotion:'reduce'});
 const result={date:'2026-11-11',errors:[],failedRequests:[],routes:[],captures:[],videos:[],lightboxes:[]};
 page.on('pageerror',e=>result.errors.push(e.message));
 page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)result.failedRequests.push({url:r.url(),status:r.status()});});
 async function go(route){await page.goto(base+'/#/'+route,{waitUntil:'networkidle'});}
 async function shot(selector,name){
  const el=page.locator(selector);
  for(const img of await el.locator('img:visible').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(x=>x.decode());}
  await page.evaluate(()=>document.fonts.ready);
  await el.screenshot({path:path.join(out,'capturas',name+'.png')});
  result.captures.push({file:name+'.png',route:page.url(),width:page.viewportSize().width,selector,open:await page.locator('main details[open]').evaluateAll(xs=>xs.map(x=>x.id||x.querySelector('summary').textContent))});
 }
 try{
  await go('inici');result.data=await page.evaluate(()=>({portfolio:PORTFOLIO,web:WEB,routes:ROUTES}));
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:950});
   for(const [route] of result.data.routes){
    await go(route);
    await page.locator('main details').evaluateAll(xs=>xs.forEach(x=>x.open=true));
    result.routes.push({route,width,...await page.locator('main').evaluate(el=>({title:el.querySelector('h1').textContent,text:el.innerText,rawText:el.textContent,details:[...el.querySelectorAll('details')].map(d=>({id:d.id,summary:d.querySelector('summary').textContent,text:d.innerText})),images:[...el.querySelectorAll('img')].map(x=>({src:x.getAttribute('src'),alt:x.alt,fit:getComputedStyle(x).objectFit,rotation:getComputedStyle(x).transform})),overflow:document.documentElement.scrollWidth>innerWidth}))});
    const names={'introduccio':'introduccio-oberta','bloc-i':'bloc-i-obert','bloc-ii/p3-descripcio-del-jardi':'llibre-proces','bloc-ii/p3-bis-taller-de-tintes-naturals':'tintes-proces','per-saber-ne-mes':'saber-mes-obert','referencies-bibliografiques':'bibliografia-abans'};
    if(names[route])await shot('main',names[route]+'-'+width);
    if(route==='introduccio'||route==='bloc-i')await shot('#reflexio-completa',route+'-reflexio-'+width);
    if(route==='bloc-i')await shot('.idea-sequence','cites-'+width);
    if(route==='bloc-ii/p3-descripcio-del-jardi'){
     await shot('.story-unit:nth-child(2)','llibre-tecniques-'+width);
     await shot('.story-unit:nth-child(5)','llibre-resultat-'+width);
    }
    if(route==='bloc-ii/p3-bis-taller-de-tintes-naturals'){
     await shot('main .editorial-section:nth-of-type(4)','tintes-preparacio-'+width);
     await shot('main .editorial-section:nth-of-type(10)','tintes-reflexio-'+width);
    }
    if(route==='per-saber-ne-mes')await shot('#glosari','glosari-'+width);
   }
  }
  await page.setViewportSize({width:1440,height:950});
  await go('bloc-ii/p2-visita-museu-i-jardi');
  for(let i=1;i<=10;i++){
   const d=page.locator('#cartela-'+i);await d.locator('summary').focus();await page.keyboard.press('Enter');
   const b=d.locator('button');await b.click();
   result.lightboxes.push({id:i,src:await page.locator('#lightbox-img').getAttribute('src'),visible:await page.locator('#lightbox-img').isVisible()});
   if(i===1)await shot('#lightbox-modal','cartela-lightbox-1440');
   await page.keyboard.press('Escape');result.lightboxes.at(-1).focusReturned=await b.evaluate(x=>x===document.activeElement);
  }
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:950});await go('bloc-ii/p2-visita-museu-i-jardi');await page.locator('#tab-obres').click();
   await page.locator('#obra-reflexio-1 summary').click();await page.locator('#cartela-1 summary').click();
   await shot('#obra-1','obra-cartela-'+width);await shot('#referents-cdan','cdan-'+width);
   await page.locator('#tab-jardi').click();await page.locator('#panel-jardi details').evaluateAll(xs=>xs.forEach(x=>x.open=true));await shot('#panel-jardi','montjuic-'+width);
   result['species'+width]=await page.locator('.species-entry').evaluateAll(xs=>xs.map(x=>({name:x.querySelector('h3').textContent,src:x.querySelector('img').getAttribute('src'),text:x.querySelector('details').textContent})));
   await page.locator('#tab-conclusions').click();await page.locator('#panel-conclusions details').evaluateAll(xs=>xs.forEach(x=>x.open=true));await shot('#panel-conclusions','conclusions-sortida-'+width);
  }
  for(const route of ['bloc-ii/p3-descripcio-del-jardi','bloc-ii/p3-bis-taller-de-tintes-naturals']){
   await go(route);
   for(const v of await page.locator('video').all())result.videos.push(await v.evaluate(async x=>{x.muted=true;await x.play();await new Promise(r=>x.requestVideoFrameCallback(r));x.pause();return {src:x.querySelector('source')?.src||x.currentSrc,width:x.videoWidth,height:x.videoHeight,currentTime:x.currentTime,error:x.error?.message||null,controls:x.controls,preload:x.preload,playsinline:x.playsInline,poster:x.poster};}));
  }
  await go('bloc-ii/p4-experimentem-amb-tintes-vives');result.alias={hash:await page.evaluate(()=>location.hash),h1:await page.locator('h1').innerText()};
  fs.writeFileSync(path.join(out,'browser-evidence.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify({routes:result.routes.length,captures:result.captures.length,videos:result.videos.length,cartelas:result.lightboxes.length,errors:result.errors,failedRequests:result.failedRequests}));
 }finally{fs.writeFileSync(path.join(out,'browser-evidence.json'),JSON.stringify(result,null,2));await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
