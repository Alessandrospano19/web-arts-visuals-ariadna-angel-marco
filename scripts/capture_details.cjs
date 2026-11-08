/* Readable detail captures complement the long before/after page images. */
const {chromium}=require(process.env.ARI_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path');
const output=path.resolve(__dirname,'../docs/verification/quarta-iteracio/details');fs.mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge'});try{
 const page=await browser.newPage({reducedMotion:'reduce'});
 async function go(route){await page.goto('http://127.0.0.1:8000/#/'+route,{waitUntil:'networkidle'});await page.waitForFunction(route=>document.title.startsWith(ROUTES.find(r=>r[0]===route)[1]),route);}
 async function shot(selector,name){const el=page.locator(selector);for(const img of await el.locator('img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}for(const video of await el.locator('video').all())await video.evaluate(async el=>{el.muted=true;await el.play();await new Promise(resolve=>el.requestVideoFrameCallback(resolve));el.pause();});await page.evaluate(()=>document.fonts.ready);await el.screenshot({path:path.join(output,name+'.png')});}
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});await go('inici');
  await page.locator('.hero-img-wrapper img').evaluate(el=>el.decode());await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:path.join(output,'header-'+width+'.png')});
  await shot('.home-welcome','benvinguda-'+width);await shot('.site-footer','footer-'+width);
  await go('bloc-ii/p2-visita-museu-i-jardi');await shot('#obra-1','obra-resum-'+width);
  await page.locator('#obra-reflexio-4 summary').click();await shot('#obra-4','riquer-obert-'+width);
  await go('bloc-ii/p3-descripcio-del-jardi');await shot('.story-unit:nth-child(3)','visor-'+width);await shot('.video-gallery','videos-llibre-'+width);
  await go('bloc-ii/p4-experimentem-amb-tintes-vives');await shot('.editorial-section:nth-of-type(5)','experimentacio-'+width);
 }
 await page.setViewportSize({width:390,height:844});await go('inici');await page.locator('#mobile-menu-toggle').click();
 await page.screenshot({path:path.join(output,'menu-mobil.png')});
 console.log('17 detail screenshots captured.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
