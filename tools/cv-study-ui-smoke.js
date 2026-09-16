// Run with playwright installed or NODE_PATH set. Uses a disposable browser context.
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const assert = require("node:assert/strict");
const {pathToFileURL} = require("node:url");
const {chromium} = require("playwright");
const root = path.resolve(__dirname,"..");
const shots = path.join(root,"tmp","cv-study-qa");
fs.mkdirSync(shots,{recursive:true});
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml",".json":"application/json"};
const server=http.createServer((req,res)=>{
  let target;
  try { target=path.resolve(root,"."+decodeURIComponent(new URL(req.url,"http://localhost").pathname)); }
  catch {res.writeHead(400).end();return;}
  if(target===root)target=path.join(root,"index.html");
  if(!target.startsWith(root+path.sep)||!mime[path.extname(target)]||!fs.existsSync(target)){res.writeHead(404).end();return;}
  res.setHeader("Content-Type",mime[path.extname(target)]);
  fs.createReadStream(target).pipe(res);
});
async function main(){
  await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
  const base="http://127.0.0.1:"+server.address().port;
  let browser;
  try {
    const chrome=["C:/Program Files/Google/Chrome/Application/chrome.exe","C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(p=>fs.existsSync(p));
    browser=await chromium.launch({headless:true,...(chrome?{executablePath:chrome}:{})});
    const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:"light"});
    const page=await context.newPage();
    const errors=[],badLocal=[];
    page.on("pageerror",e=>errors.push(e.message));
    page.on("response",r=>{if(r.url().startsWith(base)&&r.status()>=400)badLocal.push(r.url());});
    page.setDefaultTimeout(12000);
    await page.goto(base+"/index.html#/cv");
    await page.locator("#cv-root").waitFor();
    assert.equal(await page.locator("#cv-module-nav a").count(),46);
    const count=await page.evaluate(()=>cvAllItems().length);
    assert(count>=200);
    assert((await page.locator("#cv-stats").textContent()).includes(count+" câu"));
    assert.equal(await page.locator(".cv-question-card").count(),5);
    assert.equal(await page.locator(".cv-tech-card").count(),9);
    assert(await page.locator(".cv-tech-card").first().evaluate(e=>e.open));
    await page.locator(".cv-question summary").first().click();
    assert(await page.locator(".cv-question").first().evaluate(e=>e.open));
    await page.locator('[data-cv-mark="known"]').first().click();
    assert.equal(await page.locator('[data-cv-mark="known"]').first().getAttribute("aria-pressed"),"true");
    assert(await page.locator(".cv-question").first().evaluate(e=>e.open),"Open answer lost after marking");
    await page.locator("#cv-personal-note").fill('Ghi chú thử <script>alert("x")</script> về transaction.');
    await page.reload();
    assert.equal(await page.locator('[data-cv-mark="known"]').first().getAttribute("aria-pressed"),"true");
    assert((await page.locator("#cv-personal-note").inputValue()).includes("<script>"));
    assert.equal(await page.locator("#cv-reader script").count(),0);
    await page.locator('[data-cv-mark="review"]').first().click();
    await page.locator("#cv-status").selectOption("review");
    assert.equal(await page.locator(".cv-question-card").count(),1);
    await page.locator("#cv-status").selectOption("all");
    await page.locator("#cv-search").fill("hoan tien");
    assert.equal(await page.locator("#cv-scope").inputValue(),"all");
    assert(await page.locator(".cv-question-card").count()>0);
    await page.locator("#cv-kind").selectOption("scenario");
    for(const label of await page.locator(".cv-kind").allTextContents())assert.equal(label,"Tình huống");
    await page.locator("#cv-search").fill("zzzz-no-match");
    assert.equal(await page.locator(".cv-empty").count(),1);
    await page.locator('[data-cv-action="reset"]').click();
    await page.locator("#cv-scope").selectOption("all");
    assert.equal(await page.locator(".cv-question-card").count(),30);
    await page.locator('[data-cv-action="more"]').click();
    assert.equal(await page.locator(".cv-question-card").count(),60);
    await page.locator('[data-cv-action="draw"]').click();
    assert.equal(await page.locator(".cv-question-card").count(),1);
    assert.equal(await page.locator(".cv-question").evaluate(e=>e.open),false);
    await page.locator('[data-cv-action="list"]').click();
    await page.locator("#cv-stage").selectOption("projects");
    assert.equal(await page.locator("#cv-module-nav a").count(),9);
    await page.locator('#cv-module-nav [data-cv-module="payflow-map"]').click();
    await page.waitForURL("**#/cv?module=payflow-map");
    assert((await page.locator("#cv-module-title").textContent()).includes("từng service"));
    await page.getByText("Bản đồ trách nhiệm 9 service",{exact:true}).click();
    assert.equal(await page.locator(".cv-table-scroll tbody tr").count(),9);
    await page.locator('[data-cv-action="expand"]').click();
    for(const isOpen of await page.locator(".cv-question").evaluateAll(ds=>ds.map(d=>d.open)))assert(isOpen);
    await page.locator('[data-cv-action="collapse"]').click();
    for(const isOpen of await page.locator(".cv-question").evaluateAll(ds=>ds.map(d=>d.open)))assert(!isOpen);
    // Every chapter renders with its expected number of questions and escaped content.
    const modules=await page.evaluate(()=>CV_STUDY.modules.map(m=>({id:m.id,count:m.items.length,tools:m.tools?.length||0})));
    for(const m of modules){
      await page.goto(base+"/index.html#/cv?module="+m.id);
      await page.waitForFunction(id=>cvStudyState.module===id,m.id);
      assert.equal(await page.locator(".cv-question-card").count(),m.count,m.id);
      assert.equal(await page.locator(".cv-tech-card").count(),m.tools,m.id+" tool cards");
    }
    console.log("PASS: all chapters, filters, search, practice, persistence and navigation");
    // Viewports, both themes, open long content and source paths.
    await page.goto(base+"/index.html#/cv?module=payflow-map");
    await page.locator('[data-cv-action="expand"]').click();
    await page.getByText("Bản đồ trách nhiệm 9 service",{exact:true}).click();
    for(const width of [390,768,1440,1920]){
      await page.setViewportSize({width,height:1000});
      await page.goto(base+"/index.html?viewport="+width+"#/cv?module=payflow-map");
      await page.locator("#cv-root").waitFor();
      if(width<=900)await page.waitForFunction(()=>document.getElementById("sidebar").getBoundingClientRect().right<=1);
      if(width<=1100)assert.equal(await page.locator("#cv-outline-panel").evaluate(e=>e.open),false,"Mobile outline should start collapsed at "+width);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
      assert(!overflow,"Document overflows at "+width);
      const outliers=await page.locator("#cv-root").evaluate(root=>[...root.querySelectorAll("input,select,textarea,.cv-question-card,.cv-module-intro")].filter(e=>{const r=e.getBoundingClientRect();return r.width&& (r.left<0||r.right>innerWidth+1);}).map(e=>e.className||e.id));
      assert.deepEqual(outliers,[],"Hidden clipped controls at "+width);
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:path.join(shots,"cv-"+width+".png"),fullPage:false});
      if(width===390){
        await page.locator("#cv-module-title").scrollIntoViewIfNeeded();
        await page.locator(".cv-question summary").first().click();
        await page.locator(".cv-question-card").first().scrollIntoViewIfNeeded();
        await page.screenshot({path:path.join(shots,"cv-mobile-answer.png"),fullPage:false});
        await page.locator("#nav-toggle").click();
        await page.waitForFunction(()=>document.getElementById("sidebar").getBoundingClientRect().left>=-1);
        await page.locator('.sidebar [data-route="cv"]').click();
        assert.equal(await page.locator("body").evaluate(e=>e.classList.contains("nav-open")),false);
      }
    }
    await page.setViewportSize({width:1440,height:1000});
    await page.evaluate(()=>applyTheme("dark"));
    await page.locator("#cv-reader").scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(shots,"cv-dark.png"),fullPage:false});
    // Existing routes still render, without changing their persisted progress.
    for(const route of ["home","theory","quiz","checklist","algo","notes","add"]){
      await page.goto(base+"/index.html#/"+route);
      assert(await page.locator("#content").innerText(),route+" empty");
    }
    assert.deepEqual(errors,[],"Browser exceptions");
    assert.deepEqual(badLocal,[],"Missing local resources");
    // file:// is an important deployment mode for this static project.
    const local=await context.newPage();
    await local.goto(pathToFileURL(path.join(root,"index.html")).href+"#/cv?module=exam-flow");
    await local.locator("#cv-root").waitFor();
    assert.equal(await local.locator(".cv-question-card").count(),6);
    await local.close();
    // No localStorage capability: reading and marking must still work and warn honestly.
    const blocked=await browser.newContext();
    await blocked.addInitScript(()=>{Storage.prototype.setItem=function(){throw new Error("blocked");};});
    const b=await blocked.newPage();
    await b.goto(base+"/index.html#/cv");
    await b.locator('[data-cv-mark="known"]').first().click();
    assert((await b.locator("#cv-storage-warning").innerText()).includes("không lưu được"));
    await blocked.close();
    console.log("PASS: 4 viewports, dark theme, existing routes, file:// and storage failure");
    console.log(JSON.stringify({modules:modules.length,questions:count,screenshots:shots,browserErrors:errors},null,2));
  } finally {
    if(browser)await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
