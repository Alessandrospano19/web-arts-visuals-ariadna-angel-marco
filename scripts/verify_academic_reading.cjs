const {chromium}=require(process.env.ARI_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const output=path.resolve('docs/verification/quinta-iteracio');fs.mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge'});try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 async function go(route){await page.goto('http://127.0.0.1:8000/#/'+route);await page.waitForFunction(r=>document.title.startsWith(ROUTES.find(x=>x[0]===r)[1]),route);}
 await go('inici');const routes=await page.evaluate(()=>ROUTES.map(r=>r[0]));let disclosures=0,paragraphs=0,highlights=0,quotes=0;
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of routes){
   await go(route);
   const panels=route.includes('/p2-visita')?['obres','jardi','conclusions']:[null];
   for(const panel of panels){
    if(panel)await page.locator('#tab-'+panel).click();
    await page.locator('main details:visible').evaluateAll(els=>els.forEach(el=>el.open=true));
    const stats=await page.locator('main').evaluate(main=>{
      const els=[...main.querySelectorAll('.prose p,.prose li')].filter(el=>el.checkVisibility());
      return {disclosures:main.querySelectorAll('details[open]').length,paragraphs:els.length,highlights:els.reduce((n,el)=>n+el.querySelectorAll('strong').length,0),quotes:els.reduce((n,el)=>n+el.querySelectorAll('.academic-quotation').length,0),overflow:document.documentElement.scrollWidth>innerWidth};
    });
    assert.equal(stats.overflow,false,route);disclosures+=stats.disclosures;paragraphs+=stats.paragraphs;highlights+=stats.highlights;quotes+=stats.quotes;
   }
  }
  await go('bloc-i');await page.locator('#reflexio-completa summary').click();
  const actual=await page.locator('#reflexio-completa .academic-quotation').allTextContents();assert.equal(actual.length,4);
  for(const q of await page.locator('#reflexio-completa .academic-quotation').all())assert.ok(await q.evaluate(el=>getComputedStyle(el).fontStyle==='italic'&&Number(getComputedStyle(el).fontWeight)>=600));
  await page.locator('#reflexio-completa').screenshot({path:path.join(output,`reflexio-${width}.png`)});
  await page.locator('#reflexio-completa p').filter({has:page.locator('.academic-quotation')}).first().screenshot({path:path.join(output,`cita-${width}.png`)});
  await go('bloc-ii/p2-visita-museu-i-jardi');await page.locator('#obra-reflexio-4 summary').click();
  assert.equal(await page.locator('#obra-reflexio-4 li').count(),3);
  for(const img of await page.locator('#obra-4 img').all())await img.evaluate(el=>el.decode());
  await page.locator('#obra-4').screenshot({path:path.join(output,`museu-${width}.png`)});
  const marker=await page.locator('#obra-reflexio-4 li').first().evaluate(el=>getComputedStyle(el,'::before').content);assert.equal(marker,'""');
  await go('bloc-ii/p3-descripcio-del-jardi');await page.locator('details').first().locator('summary').click();
  await page.locator('details').first().screenshot({path:path.join(output,`objectius-${width}.png`)});
 }
 assert.ok(highlights>100&&quotes>=10);assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(output,'reading-report.json'),JSON.stringify({widths:[390,1440],routes:34,disclosures,paragraphs,highlights,quotes,errors},null,2));
 console.log({disclosures,paragraphs,highlights,quotes,errors});
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
