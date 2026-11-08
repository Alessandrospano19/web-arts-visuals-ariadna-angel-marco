const {chromium}=require(process.env.ARI_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path');
const output=path.resolve('docs/verification/quarta-iteracio',process.argv[2]||'after');fs.mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge'});try{const page=await browser.newPage({reducedMotion:'reduce'});
for(const width of [390,1440])for(const [route,name]of [['inici','inici'],['bloc-ii','bloc-ii'],['bloc-ii/p2-visita-museu-i-jardi','visita'],['bloc-ii/p3-descripcio-del-jardi','bloc-ii-p3'],['bloc-ii/p4-experimentem-amb-tintes-vives','bloc-ii-p4'],['bloc-iii','bloc-iii']]){
await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:8000/#/'+route,{waitUntil:'networkidle'});
for(const tab of (route.includes('/p2-')?['obres','jardi']:[''])){if(tab)await page.locator('#tab-'+tab).click();
for(const img of await page.locator('main img:visible').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}for(const video of await page.locator('main video:visible').all())await video.evaluate(async el=>{el.muted=true;await el.play();await new Promise(resolve=>el.requestVideoFrameCallback(resolve));el.pause();});await page.evaluate(()=>document.fonts.ready);
await page.locator('main').screenshot({path:path.join(output,`${name}${tab?'-'+tab:''}-${width}.png`)});
}}console.log(output);}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
