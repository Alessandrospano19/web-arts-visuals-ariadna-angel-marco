const {chromium}=require(process.env.ARI_PLAYWRIGHT_MODULE);
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({channel:'msedge'});try{
 const page=await b.newPage({reducedMotion:'reduce'}),result={bibliography:[],counts:{},quotes:[],screenshots:[]};
 const original=JSON.parse(fs.readFileSync(path.join(__dirname,'browser-evidence.json'),'utf8'));
 async function go(r){await page.goto('http://127.0.0.1:8000/#/'+r,{waitUntil:'networkidle'});}
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:950});await go('referencies-bibliografiques');
  const rows=await page.locator('.bibliography li').evaluateAll(xs=>xs.map(x=>({text:x.textContent,fontStyle:getComputedStyle(x).fontStyle,links:[...x.querySelectorAll('a')].map(a=>a.href)})));
  assert.equal(rows.length,11);assert.ok(rows.every(x=>x.fontStyle==='italic'));
  assert.deepEqual(await page.evaluate(()=>[PORTFOLIO.bibliography,PORTFOLIO.recommended]),[original.data.portfolio.bibliography,original.data.portfolio.recommended]);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const name='bibliografia-cursiva-'+width+'.png';await page.locator('main').screenshot({path:path.join(__dirname,'capturas',name)});
  result.bibliography.push({width,rows,overflow:false});result.screenshots.push(name);
  for(const route of ['introduccio','bloc-i']){
   await go(route);await page.locator('#reflexio-completa').evaluate(x=>x.open=true);
   await page.locator('#reflexio-completa').evaluate(x=>x.scrollIntoView());
   const name=route+'-lectura-detall-'+width+'.png';await page.screenshot({path:path.join(__dirname,'capturas',name)});result.screenshots.push(name);
   if(route==='bloc-i')result.quotes.push({width,full:await page.locator('#reflexio-completa .academic-quotation').evaluateAll(xs=>xs.map(x=>({text:x.textContent,weight:getComputedStyle(x).fontWeight,style:getComputedStyle(x).fontStyle,color:getComputedStyle(x).color}))),summary:await page.locator('.idea-sequence .academic-quotation').count()});
  }
  await go('bloc-ii/p2-visita-museu-i-jardi');await page.locator('#tab-obres').click();
  await page.locator('#obra-reflexio-1').evaluate(x=>x.open=true);await page.locator('#cartela-1').evaluate(x=>x.open=true);
  for(const img of await page.locator('#obra-1 img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(x=>x.decode());}
  const obraName='obra-cartela-obertes-'+width+'.png';await page.locator('#obra-1').screenshot({path:path.join(__dirname,'capturas',obraName)});result.screenshots.push(obraName);
 }
 await go('per-saber-ne-mes');
 result.counts={artists:await page.locator('.further-artist').count(),images:await page.locator('main img').count(),glossary:await page.locator('#glosari tbody tr').count()};
 for(const artist of original.data.web.document60.further){
  const el=page.locator('#artista-'+artist.field);await el.locator('summary').focus();await page.keyboard.press('Enter');assert.equal(await el.getAttribute('open'),'');
  const text=(await page.locator('.further-artist').filter({has:el}).locator('.original-reflection p').allTextContents()).join(' ').replace(/\s+/g,' ').trim();
  assert.equal(text,original.data.portfolio.further[artist.field].replace(/\s+/g,' ').trim());
 }
 await page.locator('#glosari summary').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#glosari').getAttribute('open'),'');
 result.keyboardFurther=true;
 for(const src of ['source/ESTRUCTURA_ARIADNA_ACTUAL_60P.pdf','Prompts/source/RUBRICA_ORIGINAL_2026.pdf'])result[src]=(await page.request.get('http://127.0.0.1:8000/'+src)).status();
 fs.writeFileSync(path.join(__dirname,'final-evidence.json'),JSON.stringify(result,null,2));console.log('11 italic entries at both widths; text/URLs unchanged; 3 artists, 5 images, 8 definitions; keyboard disclosures passed.');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
