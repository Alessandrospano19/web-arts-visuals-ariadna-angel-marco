/* Local static server + Playwright; no application runtime dependencies. */
const {chromium} = require(process.env.ARI_PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.ARI_PREVIEW_URL || 'http://127.0.0.1:8000';
const output = path.resolve(process.env.ARI_VERIFICATION_OUTPUT||path.join(__dirname,'../docs/verification/quarta-iteracio/final'));
fs.mkdirSync(output,{recursive:true});
const flat = text => text.replace(/\s+/g,' ').trim();
const sourceFlat = text => flat(text.replace(/^\s*[-●] /gm,'').replace(/●\s*/g,'').replace(/\*\*/g,''));
const forbidden = /Fotografia (?:pròpia|aportada) d[’']Ariadna|(?:Imatge|Obres?) extret[ae]s? del document|Text original d[’']Ariadna|segons el document|document,? p\.|Secció provisional|Composició del document original|les dades es transcriuen|correspondències.*pendents de confirmar/i;
let browser;
(async()=>{
  browser = await chromium.launch(process.platform === 'win32' ? {channel:'msedge'} : {});
  const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const errors=[],failedRequests=[],metrics=[],checks=[],assets=new Set(),contrast=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push({text:m.text(),location:m.location()});});
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failedRequests.push([r.status(),r.url()]);});
  async function go(route) { await page.goto(base+'/#/'+route,{waitUntil:'networkidle'}); }
  async function original(selector) { return flat((await page.locator(selector+' .original-reflection').locator('p,li').allTextContents()).join(' ')); }
  async function clean() { assert.ok(!forbidden.test(await page.locator('body').innerText()),'Technical provenance in visible UI'); }
  async function geometry(label) {
    const s=await page.evaluate(()=>({width:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,viewport:innerWidth,
      overflow:[...document.querySelectorAll('main *')].filter(el=>{
        const style=getComputedStyle(el),r=el.getBoundingClientRect();
        return style.visibility!=='hidden'&&r.width>0&&(r.right>innerWidth+1||r.left < -1);
      }).map(el=>el.tagName+'.'+el.className)}));
    assert.ok(s.width<=s.viewport&&s.bodyWidth<=s.viewport,label+' scroll width');
    assert.deepEqual(s.overflow,[],label+' element overflow');await clean();
  }
  async function readingContrast(route) {
    const values=await page.evaluate(()=>{
      const rgb=s=>s.match(/[\d.]+/g).map(Number);
      const lum=c=>c.slice(0,3).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);
      return [...document.querySelectorAll('main .prose p, main .prose strong, main .editorial-summary, main .chapter-label, main .figure-label, main .exploration-content p')].filter(el=>el.checkVisibility()).map(el=>{
        let bg=[255,255,255],node=el;
        while(node){const c=rgb(getComputedStyle(node).backgroundColor);if(c.length===3||c[3]===1){bg=c;break;}node=node.parentElement;}
        const fg=rgb(getComputedStyle(el).color),alpha=fg[3]??1;
        const color=fg.slice(0,3).map((x,i)=>x*alpha+bg[i]*(1-alpha));
        const a=lum(color),b=lum(bg);return {element:el.tagName+'.'+el.className,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
      });
    });
    values.forEach(v=>assert.ok(v.ratio>=4.5,`${route} ${v.element} contrast ${v.ratio.toFixed(2)}`));
    contrast.push({route,samples:values.length,minimum:Math.min(...values.map(v=>v.ratio))});
  }
  await go('inici');
  const routes=await page.evaluate(()=>ROUTES),data=await page.evaluate(()=>PORTFOLIO);
  assert.equal(routes.length,17);
  const p2='bloc-ii/p2-visita-museu-i-jardi';
  for(const width of [375,390,430,768,1024,1440]){
    await page.setViewportSize({width,height:1000});
    for(const [route] of routes){
      await page.evaluate(route=>{location.hash='#/'+route;},route);
      await page.waitForFunction(route=>document.title.startsWith(ROUTES.find(r=>r[0]===route)[1]),route);
      assert.equal(await page.locator('main h1').count(),1);
      assert.equal(await page.locator('main').evaluate(el=>el.inert),false);
      await geometry(`${width} ${route}`);
      if(width===1440)await readingContrast(route);
      const links=await page.locator('a[href^="#/"]').evaluateAll(els=>els.map(el=>el.getAttribute('href').slice(2)));
      links.forEach(link=>assert.ok(routes.some(r=>r[0]===link),link));
      if(['inici','introduccio','bloc-i','bloc-ii/p1-formes-dapropar-se-a-la-natura',p2,'bloc-ii/p3-descripcio-del-jardi','bloc-ii/p4-experimentem-amb-tintes-vives','bloc-iii'].includes(route)&&[390,1440].includes(width)){
        metrics.push({width,route,...await page.locator('main').evaluate(el=>({height:Math.round(el.getBoundingClientRect().height),visibleWords:el.innerText.split(/\s+/).length}))});
      }
      checks.push({width,route});
      if(route===p2){
        for(const id of ['obres','jardi','conclusions']){
          await page.locator('#tab-'+id).click();
          assert.equal(await page.locator('[role=tabpanel]:visible').count(),1);
          assert.equal(await page.locator('#panel-'+id).isVisible(),true);
          assert.equal(await page.locator('[role=tab][aria-selected=true]').count(),1);
          assert.equal(await page.locator('[role=tab][tabindex="0"]').count(),1);
          await geometry(`${width} panel ${id}`);assert.equal(new URL(page.url()).hash,'#/'+p2);
          if(width===1440)await readingContrast(p2+' · '+id);
        }
      }
      if(route==='bloc-ii/p3-descripcio-del-jardi'){
        assert.ok(await page.locator('main img').count() >= 20);
        assert.equal(await page.locator('.pending-note').count(),0);
        assert.ok((await page.locator('main').innerText()).includes('Natura viva'));
      }

    }
    console.log(`Verified 17 routes, three panels and developed parts at ${width}px`);
  }
  data.media.forEach(m=>{assets.add(m.output);if(m.poster)assets.add(m.poster);});
  data.artworks.forEach(a=>assets.add(a.src));assets.add(data.collage.web_asset);
  for(const src of assets)assert.equal((await page.request.get(base+'/'+src)).status(),200,src);
  for(const [route,key] of [['introduccio','intro'],['bloc-i','reading'],['bloc-ii/p1-formes-dapropar-se-a-la-natura','block']]){
    await go(route);const disclosure=page.locator('#reflexio-completa');
    assert.equal(await disclosure.getAttribute('open'),null);
    assert.equal(await original('#reflexio-completa'),flat(data[key].reflection));
    await disclosure.locator('summary').focus();await page.keyboard.press('Enter');
    assert.equal(await disclosure.getAttribute('open'),'');await clean();
    await page.keyboard.press('Space');assert.equal(await disclosure.getAttribute('open'),null);
  }
  await go(p2);assert.equal(await page.locator('.artwork-card').count(),10);
  assert.equal(await page.locator('.artwork-card .original-reflection').count(),10);
  for(let i=0;i<10;i++){
    const detail=page.locator('#obra-reflexio-'+(i+1));
    assert.equal(await detail.getAttribute('open'),null);
    assert.equal(await original('#obra-reflexio-'+(i+1)),sourceFlat(data.artworks[i].reflection));
    await detail.locator('summary').focus();await page.keyboard.press('Enter');
    assert.equal(await detail.getAttribute('open'),'');
    await geometry('expanded artwork '+(i+1));await readingContrast('artwork '+(i+1));
    await page.keyboard.press('Space');assert.equal(await detail.getAttribute('open'),null);
  }
  assert.equal(await page.locator('#obra-reflexio-4 li').count(),3);
  assert.ok(await page.locator('#obra-reflexio-4 p').count()>=3);
  for(const [id,text]of [['museu-proposta',data.museum.introduction+'\n\n'+data.museum.proposal+'\n\n'+data.museum.objectives],['museu-metodologia',data.museum.methodology],['museu-materials',data.museum.materials],['conclusio-museu',data.museum.conclusion]])assert.equal(await original('#'+id),sourceFlat(text));
  assert.equal(await page.locator('#museu-metodologia ul').count(),1);assert.equal(await page.locator('#museu-metodologia li').count(),6);
  for(let i=0;i<10;i++){
    const opener=page.locator(`#obra-${i+1} .catalog-img-box`);
    assert.equal(await opener.locator('img').getAttribute('src'),data.artworks[i].src);await opener.click();
    assert.equal(await page.locator('#lightbox-title').innerText(),data.artworks[i].title);
    assert.equal(await page.locator('#lightbox-subtitle').innerText(),data.artworks[i].artist);
    assert.equal(await page.locator('#lightbox-meta').innerText(),data.artworks[i].technique);
    assert.equal(await original('#obra-completa'),sourceFlat(data.artworks[i].reflection));
    assert.equal(await page.locator('#obra-completa').getAttribute('open'),null);
    await page.locator('#obra-completa summary').click();await clean();
    await page.keyboard.press('Tab');assert.ok(await page.locator('#lightbox-modal').evaluate(el=>el.contains(document.activeElement)));
    await page.keyboard.press('Shift+Tab');await page.keyboard.press('Escape');
    assert.ok(await opener.evaluate(el=>el===document.activeElement));
    assert.equal(await page.locator('main').evaluate(el=>el.inert),false);
    assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('modal-open')),false);
  }
  await page.locator('#tab-obres').focus();await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#tab-jardi').getAttribute('aria-selected'),'true');
  await page.keyboard.press('End');assert.equal(await page.locator('#tab-conclusions').getAttribute('aria-selected'),'true');
  await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#tab-obres').getAttribute('aria-selected'),'true');
  await page.keyboard.press('Home');await page.keyboard.press('Tab');assert.ok(await page.locator('#panel-obres').evaluate(el=>el===document.activeElement));
  await page.locator('#tab-jardi').click();assert.equal(await page.locator('.species-entry').count(),10);
  for(let i=0;i<10;i++){
    assert.equal(await original('#especie-'+(i+1)),flat(data.species[i].observation));
    assert.equal(await page.locator('.species-entry').nth(i).locator('img').count(),1);
    await page.locator(`#especie-${i+1} summary`).click();await clean();await page.locator(`#especie-${i+1} summary`).click();
  }
  for(const [id,text]of [['jardi-proposta',data.garden.proposal+'\n\n'+data.garden.objectives],['jardi-desenvolupament',data.garden.development],['jardi-metodologia',data.garden.methodology+'\n\n'+data.garden.materials],['reflexio-jardi',data.garden.reflection]])assert.equal(await original('#'+id),sourceFlat(text));
  await page.locator('#tab-conclusions').click();assert.equal(await original('#panel-conclusions'),flat(data.outing));
  assert.ok((await page.locator('#panel-conclusions .original-reflection').allTextContents()).every(t=>t.length>1000));assert.equal(await page.locator('#panel-conclusions details').count(),0);assert.equal(await page.locator('#panel-conclusions img').count(),3);await clean();
  let played=0;
  for(const route of ['bloc-ii/p3-descripcio-del-jardi','bloc-ii/p4-experimentem-amb-tintes-vives']){
    await go(route);
    for(const video of await page.locator('video').all()){
      assert.ok(await video.getAttribute('poster'));assert.equal(await video.getAttribute('preload'),'metadata');
      for(const attr of ['controls','playsinline'])assert.notEqual(await video.getAttribute(attr),null);
      assert.equal(await video.getAttribute('autoplay'),null);await video.evaluate(async el=>{el.muted=true;await el.play();el.pause();});
      assert.ok(await video.evaluate(el=>el.videoWidth>0&&!el.error));played++;
    }
    assert.equal(await page.locator('.pending-note:visible').count(),0);
  }
  assert.equal(played,5);
  await go('bloc-ii/p3-descripcio-del-jardi');
  assert.equal(await original('.book-development'),sourceFlat(data.book.development));
  await page.waitForFunction(()=>[...document.querySelectorAll('video')].every(el=>el.videoHeight>0));
  const videoBounds=await page.locator('video').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {top:r.top,left:r.left,width:r.width,height:r.height,fit:getComputedStyle(el).objectFit,ratio:el.videoWidth/el.videoHeight};}));
  assert.ok(Math.abs(videoBounds[0].top-videoBounds[1].top)<1);assert.ok(videoBounds[1].left>videoBounds[0].left);
  videoBounds.forEach(v=>{assert.equal(v.fit,'contain');assert.ok(v.ratio<1);assert.ok(Math.abs(v.width/v.height-v.ratio)<.01);});
  await go('bloc-ii/p4-experimentem-amb-tintes-vives');
  const dyeHeadings=await page.evaluate(()=>WEB.narrativa.tintes_apartats);
  for(let i=0;i<dyeHeadings.length;i++){
    const source=data.dyes.slice(data.dyes.indexOf(dyeHeadings[i])+dyeHeadings[i].length,i+1<dyeHeadings.length?data.dyes.indexOf(dyeHeadings[i+1]):data.dyes.length).trim();
    const section=page.locator('.editorial-section').nth(i);
    const text=i===10?await section.locator('table').innerText():(await section.locator('.original-reflection p,.original-reflection li').allTextContents()).join(' ');
    assert.equal(flat(text),sourceFlat(source),'Complete dyes phase '+i);
  }
  await page.setViewportSize({width:390,height:844});await go('inici');await page.locator('#mobile-menu-toggle').click();
  for(const id of ['b2','b3']){const btn=page.locator(`[data-submenu-target="mob-sub-${id}"]`);await btn.click();assert.equal(await btn.getAttribute('aria-expanded'),'true');}
  await page.locator('#mobile-drawer a').last().focus();await page.keyboard.press('Tab');assert.ok(await page.locator('header').evaluate(el=>el.contains(document.activeElement)));
  await page.keyboard.press('Escape');assert.ok(await page.locator('#mobile-menu-toggle').evaluate(el=>el===document.activeElement));
  await page.locator('#mobile-menu-toggle').click();await page.locator('#mobile-drawer [data-route="bloc-ii/p4-experimentem-amb-tintes-vives"]').click();
  await page.waitForFunction(()=>location.hash.includes('/p4-experimentem'));assert.equal(await page.locator('#mobile-menu-toggle').getAttribute('aria-expanded'),'false');
  await page.setViewportSize({width:1440,height:1000});const desktop=page.locator('[aria-controls="desktop-sub-b2"]');
  await desktop.click();assert.equal(await desktop.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await desktop.getAttribute('aria-expanded'),'false');
  for(const bad of ['ruta-inexistent','toString','%E0%A4%A']){await go(bad);await page.waitForFunction(()=>document.title.startsWith('Pàgina no trobada'));}
  await page.goto('file:///'+path.resolve(__dirname,'../index.html').replace(/\\/g,'/')+'#/introduccio');
  await page.waitForSelector('#reflexio-completa');assert.equal(await original('#reflexio-completa'),flat(data.intro.reflection));
  async function loadVisible(){
    for(const img of await page.locator('main img:visible').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
    for(const video of await page.locator('video:visible').all())await video.evaluate(async el=>{el.muted=true;await el.play();await new Promise(resolve=>el.requestVideoFrameCallback(resolve));el.pause();});
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.evaluate(()=>document.fonts.ready);
  }
  const shots=[];
  for(const width of [390,1440]){
    await page.setViewportSize({width,height:width===390?844:1000});
    for(const [route,label]of [['inici','inici'],['introduccio','introduccio'],['bloc-i','bloc-i'],['bloc-ii','bloc-ii'],['bloc-ii/p1-formes-dapropar-se-a-la-natura','bloc-ii-p1'],[p2,'visita'],['bloc-iii','bloc-iii'],['bloc-ii/p3-descripcio-del-jardi','bloc-ii-p3'],['bloc-ii/p4-experimentem-amb-tintes-vives','bloc-ii-p4']]){
      await go(route);
      if(route===p2){
        for(const id of ['obres','jardi','conclusions']){
          await page.locator('#tab-'+id).click();await loadVisible();
          const name=`visita-${id}-${width}.png`;await page.locator('main').screenshot({path:path.join(output,name)});shots.push(name);await geometry('capture '+name);
        }
      }else{
        await loadVisible();const name=`${label}-${width}.png`;await page.locator('main').screenshot({path:path.join(output,name)});shots.push(name);
        if(route==='inici'){
          const frame=page.locator('.exploration-entry').first();const name=`inici-lectures-${width}.png`;
          await frame.screenshot({path:path.join(output,name)});shots.push(name);
          const bounds=await frame.locator('.reading-visual').evaluate(el=>{const r=el.getBoundingClientRect();return [...el.querySelectorAll('img')].map(img=>{const i=img.getBoundingClientRect();return {within:i.top>=r.top&&i.bottom<=r.bottom+1&&i.left>=r.left&&i.right<=r.right+1,fit:getComputedStyle(img).objectFit};});});
          bounds.forEach(b=>{assert.equal(b.within,true);assert.equal(b.fit,'contain');});
        }
      }
    }
    console.log('Captured all requested views at '+width+'px');
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failedRequests,[]);
  const report={routes:17,viewports:[375,390,430,768,1024,1440],routeChecks:checks.length,panelChecks:18,localAssets:assets.size,artworks:10,species:10,videosPlayed:played,fullOriginalText:true,technicalLabelsRemoved:true,keyboardAndFocus:true,developedParts:true,fileProtocol:true,readingContrast:contrast,consoleErrors:errors,failedRequests,metrics,screenshots:shots};
  fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({...report,metrics:undefined,screenshots:shots.length},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();});
