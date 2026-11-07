/* Run against a local static server. ARI_PLAYWRIGHT_MODULE may locate a bundled installation. */
const {chromium} = require(process.env.ARI_PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const base = process.env.ARI_PREVIEW_URL || 'http://127.0.0.1:8000';
const output = path.resolve(__dirname,'../docs/verification');
fs.mkdirSync(output,{recursive:true});
const flat = text => text.replace(/\s+/g,' ').trim();

(async()=>{
  const browser = await chromium.launch(process.platform === 'win32' ? {channel:'msedge'} : {});
  const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const errors = [], failedRequests = [], routeChecks = [], assetPaths = new Set();
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error') errors.push({text:m.text(),location:m.location()});});
  page.on('response',r=>{if(r.url().startsWith(base) && r.status()>=400) failedRequests.push([r.status(),r.url()]);});
  await page.goto(base,{waitUntil:'networkidle'});
  const routes = await page.evaluate(()=>ROUTES);
  assert.equal(routes.length,17);
  const data = await page.evaluate(()=>PORTFOLIO);
  for (const width of [375,390,430,768,1024,1440]) {
    await page.setViewportSize({width,height:1000});
    for (const [route] of routes) {
      await page.evaluate(route=>{location.hash='#/'+route;},route);
      await page.waitForFunction(route=>document.title.startsWith(ROUTES.find(r=>r[0]===route)[1]),route);
      const state = await page.evaluate(()=>({
        h1:document.querySelectorAll('main h1').length,
        width:document.documentElement.scrollWidth,
        bodyWidth:document.body.scrollWidth,
        mainInert:document.querySelector('main').inert,
        overflow:[...document.querySelectorAll('main *')].filter(el=>{
          const s=getComputedStyle(el), r=el.getBoundingClientRect();
          return s.visibility !== 'hidden' && r.width > 0 && r.right > innerWidth+1;
        }).map(el=>el.tagName+'.'+el.className),
        sources:[...document.querySelectorAll('main img')].map(el=>el.getAttribute('src')),
        links:[...document.querySelectorAll('a[href^="#/"]')].map(el=>el.getAttribute('href').slice(2))
      }));
      assert.equal(state.h1,1,`${width} ${route}: heading`);
      assert.equal(state.mainInert,false);
      assert.ok(state.width<=width && state.bodyWidth<=width,`${width} ${route}: scroll overflow`);
      assert.deepEqual(state.overflow,[],`${width} ${route}: element overflow`);
      state.links.forEach(link=>assert.ok(routes.some(r=>r[0]===link),`Invalid local route ${link}`));
      state.sources.forEach(src=>{assert.ok(src.startsWith('assets/'),src);assetPaths.add(src);});
      routeChecks.push({width,route,overflow:false});
    }
    console.log(`Verified ${routes.length} routes at ${width}px`);
  }
  // Check every image/video/poster on the wire, including lazy images off screen.
  data.media.forEach(m=>{assetPaths.add(m.output);if(m.poster)assetPaths.add(m.poster);});
  data.artworks.forEach(a=>assetPaths.add(a.src)); assetPaths.add(data.collage.web_asset);
  for (const src of assetPaths) {
    const res = await page.request.get(base+'/'+src);
    assert.equal(res.status(),200,src);
  }
  async function go(route) {
    await page.goto(base+'/#/'+route,{waitUntil:'networkidle'});
  }
  async function paragraphs(selector) {
    return flat((await page.locator(selector).allTextContents()).join(' '));
  }
  await go('introduccio');
  assert.equal(await paragraphs('.original-reflection p'),flat(data.intro.reflection));
  await go('bloc-i');
  assert.equal(await paragraphs('.original-reflection p'),flat(data.reading.reflection));
  await go('bloc-ii/p1-formes-dapropar-se-a-la-natura');
  assert.equal(await paragraphs('.original-reflection p'),flat(data.block.reflection));
  await go('bloc-ii/p2-visita-museu-i-jardi');
  assert.equal(await page.locator('.artwork-card').count(),10);
  assert.equal(await page.locator('.species-grid article').count(),10);
  for (let i=0;i<10;i++) {
    const text = await page.locator('.species-grid article').nth(i).locator('.prose p').allTextContents();
    assert.equal(flat(text.join(' ')),flat(data.species[i].observation));
  }
  assert.equal(await paragraphs('#conclusions-sortida .original-reflection p'),flat(data.outing));
  for (let i=0;i<10;i++) {
    const card = page.locator('.artwork-card').nth(i);
    assert.equal(await card.locator('img').getAttribute('src'),data.artworks[i].src);
    assert.equal(await paragraphs(`#obra-${i+1} .original-reflection p`),flat(data.artworks[i].reflection));
    await card.locator('summary').click();
    assert.equal(await card.locator('details').getAttribute('open'),'');
    await card.locator('summary').click();
  }
  // Modal: full source text, keyboard containment, Escape, scroll lock and return focus.
  const opener = page.locator('[data-lightbox="obra-1"]');
  await opener.click();
  assert.equal(await page.locator('#lightbox-modal').getAttribute('aria-hidden'),'false');
  assert.equal(await paragraphs('#lightbox-desc p'),flat(data.artworks[0].reflection));
  assert.ok(await page.locator('body').evaluate(el=>el.classList.contains('modal-open')));
  await page.keyboard.press('Tab');
  assert.ok(await page.locator('#lightbox-modal').evaluate(el=>el.contains(document.activeElement)));
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#lightbox-modal').getAttribute('aria-hidden'),'true');
  assert.ok(await opener.evaluate(el=>el===document.activeElement));
  await opener.click();
  await page.locator('#lightbox-close-btn').click();
  assert.ok(await opener.evaluate(el=>el===document.activeElement));
  // All five MP4 files decode and play using native controls.
  let videos = 0;
  for (const route of ['bloc-ii/p3-descripcio-del-jardi','bloc-ii/p4-experimentem-amb-tintes-vives']) {
    await go(route);
    for (const video of await page.locator('video').all()) {
      assert.ok(await video.getAttribute('poster'));
      assert.equal(await video.getAttribute('preload'),'metadata');
      assert.notEqual(await video.getAttribute('controls'),null);
      assert.notEqual(await video.getAttribute('playsinline'),null);
      await video.evaluate(async el=>{el.muted=true;await el.play();el.pause();});
      assert.ok(await video.evaluate(el=>el.videoWidth>0 && !el.error));
      videos++;
    }
  }
  assert.equal(videos,5);
  // Mobile drawer, both submenus, keyboard loop, navigation and same-route closure.
  await page.setViewportSize({width:390,height:844});
  await go('inici');
  await page.locator('#mobile-menu-toggle').click();
  for (const id of ['b2','b3']) {
    const btn=page.locator(`[data-submenu-target="mob-sub-${id}"]`);
    await btn.click(); assert.equal(await btn.getAttribute('aria-expanded'),'true');
    assert.equal(await page.locator('#mob-sub-'+id).evaluate(el=>el.inert),false);
  }
  await page.locator('#mobile-drawer a').last().focus();
  await page.keyboard.press('Tab');
  assert.ok(await page.locator('header').evaluate(el=>el.contains(document.activeElement)));
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#mobile-menu-toggle').getAttribute('aria-expanded'),'false');
  assert.ok(await page.locator('#mobile-menu-toggle').evaluate(el=>el===document.activeElement));
  await page.locator('#mobile-menu-toggle').click();
  await page.locator('#mobile-drawer a[data-route="bloc-ii/p4-experimentem-amb-tintes-vives"]').click();
  await page.waitForFunction(()=>location.hash.includes('/p4-experimentem'));
  assert.equal(await page.locator('#mobile-menu-toggle').getAttribute('aria-expanded'),'false');
  // Desktop disclosure states and unknown/prototype/malformed routes.
  await page.setViewportSize({width:1440,height:1000});
  const desktopButton=page.locator('[aria-controls="desktop-sub-b2"]');
  await desktopButton.click(); assert.equal(await desktopButton.getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape'); assert.equal(await desktopButton.getAttribute('aria-expanded'),'false');
  for (const invalid of ['ruta-inexistent','toString','%E0%A4%A']) {
    await page.goto(base+'/#/'+invalid);
    await page.waitForFunction(()=>document.title.startsWith('Pàgina no trobada'));
    assert.equal(await page.locator('main h1').count(),1);
  }
  // file:// requires neither a fetch nor a backend.
  await page.goto('file:///'+path.resolve(__dirname,'../index.html').replace(/\\/g,'/')+'#/introduccio');
  await page.waitForFunction(()=>document.querySelector('main h1')?.textContent.includes('Art i natura'));
  assert.equal(await paragraphs('.original-reflection p'),flat(data.intro.reflection));
  // Capture original and integrated cover with the same browser and fonts.
  const original = execFileSync('git',['show','81ff424:index.html'],{cwd:path.resolve(__dirname,'..'),encoding:'utf8'});
  const originalPage = await browser.newPage({viewport:{width:1440,height:1000}});
  await originalPage.setContent(original,{waitUntil:'domcontentloaded'});
  await originalPage.screenshot({path:path.join(output,'original-1440.png')});
  await originalPage.close();
  await go('inici'); await page.screenshot({path:path.join(output,'portada-1440.png')});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:path.join(output,'portada-390.png')});
  await go('bloc-ii/p2-visita-museu-i-jardi');
  await page.locator('.artwork-card').first().scrollIntoViewIfNeeded();
  await page.locator('.artwork-card img').first().evaluate(el=>el.decode());
  await page.screenshot({path:path.join(output,'galeria-390.png')});
  await page.locator('[data-lightbox="obra-1"]').click();
  await page.screenshot({path:path.join(output,'lightbox-390.png')});
  await page.keyboard.press('Escape');
  await page.setViewportSize({width:1440,height:1000});
  for (const img of await page.locator('.artwork-card img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(el=>el.decode());
  }
  await page.locator('main').focus();
  await page.locator('#proposta-mnac > .container > .catalog-grid').first().screenshot({path:path.join(output,'deu-obres-1440.png')});
  assert.deepEqual(errors,[],'Browser console errors');
  assert.deepEqual(failedRequests,[],'Missing network assets');
  const report = {routes:routes.length,viewports:[375,390,430,768,1024,1440],routeChecks:routeChecks.length,localAssets:assetPaths.size,artworks:10,species:10,videosPlayed:videos,documentaryText:true,keyboardAndFocus:true,fileProtocol:true,consoleErrors:errors,failedRequests,screenshots:fs.readdirSync(output).filter(x=>x.endsWith('.png'))};
  fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
