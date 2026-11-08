/* Exercise actual editable files, two builds and browser output; always restore inputs. */
const {chromium}=require(process.env.ARI_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),edit=path.join(root,'content/editables');
const files=['titulos.json','textos-generales.json','destacados.json','imagenes.json','pies-de-foto.json'].map(f=>path.join(edit,f));
files.push(path.join(root,'content/academic/book-proposal.md'));
const saved=new Map(files.map(f=>[f,fs.readFileSync(f)]));
const source=fs.readFileSync(path.join(root,'content/PDF_ACTUALITZAT_40P.md'));
function change(file,update){const p=path.join(edit,file);const d=JSON.parse(fs.readFileSync(p,'utf8'));update(d);fs.writeFileSync(p,JSON.stringify(d,null,2)+'\n');}
function build(){execFileSync('python',['scripts/build_content.py'],{cwd:root,stdio:'pipe'});}
let browser;
(async()=>{try{
 change('titulos.json',d=>d.portada_bloc_ii='Títol de prova editorial');
 change('textos-generales.json',d=>d.bloc_ii_entradilla='Frase de prova editorial del Bloc II.');
 change('destacados.json',d=>d.conceptos=['proposta']);
 change('imagenes.json',d=>d.bloc_ii_portada.imagen=d.descripcio_img_4795.imagen);
 change('pies-de-foto.json',d=>d.bloc_ii_portada='Peu de prova editorial.');
 fs.appendFileSync(files.at(-1),'\n\nText de prova acadèmica editable.\n');
 const modified=new Map(files.map(f=>[f,fs.readFileSync(f)]));
 browser=await chromium.launch({channel:'msedge'});const page=await browser.newPage({viewport:{width:1440,height:1000}});
 for(let generation=1;generation<=2;generation++){
  build();for(const [file,bytes]of modified)assert.deepEqual(fs.readFileSync(file),bytes,'Build changed an editable');
  await page.goto('http://127.0.0.1:8000/#/inici');
  assert.equal(await page.locator('.exploration-title').first().textContent(),'Títol de prova editorial');
  await page.goto('http://127.0.0.1:8000/#/bloc-ii');
  assert.equal(await page.locator('.chapter-lead').textContent(),'Frase de prova editorial del Bloc II.');
  assert.ok((await page.locator('.split-editorial img').getAttribute('src')).endsWith('/img_4795.webp'));
  assert.equal(await page.locator('.split-editorial figcaption').textContent(),'Peu de prova editorial.');
  await page.goto('http://127.0.0.1:8000/#/bloc-ii/p3-descripcio-del-jardi');
  assert.ok((await page.locator('main strong').allTextContents()).some(t=>t==='proposta'));
  assert.ok((await page.locator('main').innerText()).includes('Text de prova acadèmica editable.'));
  console.log('Manual title, phrase, green emphasis, photo, caption and academic text survive generation '+generation);
 }
 assert.deepEqual(fs.readFileSync(path.join(root,'content/PDF_ACTUALITZAT_40P.md')),source);
}finally{
 if(browser)await browser.close();
 for(const [file,bytes]of saved)fs.writeFileSync(file,bytes);
 build();for(const [file,bytes]of saved)assert.deepEqual(fs.readFileSync(file),bytes);
 console.log('All original inputs restored; final static data regenerated.');
}
const report={generations:2,title:true,phrase:true,greenEmphasis:true,photo:true,caption:true,academicText:true,originalSourceUntouched:true,originalInputsRestored:true};
fs.writeFileSync(path.join(root,'docs/verification/quarta-iteracio/editing-report.json'),JSON.stringify(report,null,2)+'\n');
})().catch(e=>{console.error(e);process.exitCode=1;});
