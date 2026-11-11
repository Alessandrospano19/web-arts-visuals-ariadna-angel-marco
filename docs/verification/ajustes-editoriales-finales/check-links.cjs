const {chromium}=require(process.env.ARI_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path');
(async()=>{const b=await chromium.launch({channel:'msedge'});try{
 const p=await b.newPage();await p.goto('http://127.0.0.1:8000/#/referencies-bibliografiques');
 const urls=await p.locator('.bibliography a').evaluateAll(xs=>xs.map(a=>a.href));
 const results=await Promise.all(urls.map(async url=>{try{const r=await p.request.get(url,{timeout:20000});return {url,status:r.status(),finalUrl:r.url()};}catch(e){return {url,error:e.message};}}));
 fs.writeFileSync(path.join(__dirname,'external-links.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results));
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
