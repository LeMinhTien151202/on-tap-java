// node tools/cv-study-audit.js — cấu trúc/coverage, không thay semantic review.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const sources = [...html.matchAll(/<script src="([^"?]+)(?:\?[^"]*)?"/g)].map(m => m[1]);
const dataFiles = sources.filter(s => /^data\/cv-study-/.test(s));
const context = vm.createContext({});
for (const file of dataFiles) vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, {filename:file});
new vm.Script(fs.readFileSync(path.join(root,"js/cv-study.js"),"utf8"), {filename:"js/cv-study.js"});
new vm.Script(fs.readFileSync(path.join(root,"js/app.js"),"utf8"), {filename:"js/app.js"});
const data = context.CV_STUDY;
assert.equal(dataFiles.length, 13);
assert.equal(data.stages.length, 7);
assert.equal(data.modules.length, 46);
const ids = new Set(), moduleIds = new Set(), questions = new Set(), counts = {};
const stageIds = new Set(data.stages.map(s=>s.id));
let words = 0;
for (const m of data.modules) {
  assert(!moduleIds.has(m.id), "Duplicate module: "+m.id);
  moduleIds.add(m.id);
  assert(stageIds.has(m.stage), "Unknown stage: "+m.stage);
  assert(["core","support"].includes(m.priority));
  for (const field of ["title","cv","scope","goal"]) assert(m[field]?.trim(), m.id+" missing "+field);
  assert(m.flow.length>=3 && m.items.length>=5);
  if (m.stage === "tooling") {
    assert(Array.isArray(m.tools) && m.tools.length>=8, m.id+" missing technology map");
    for (const tool of m.tools) {
      for (const field of ["name","type","version","theory","applies","flow","why","boundary","evidence"])
        assert(tool[field]?.trim(), m.id+" tool missing "+field);
    }
  }
  for(const q of m.items) {
    assert(!ids.has(q.id), "Duplicate question id: "+q.id);
    ids.add(q.id);
    assert(!questions.has(q.q), "Duplicate wording: "+q.q);
    questions.add(q.q);
    assert(["theory","application","scenario","interview"].includes(q.kind),q.id);
    counts[q.kind]=(counts[q.kind]||0)+1;
    for (const f of ["q","answer","example","pitfall","exercise"]) assert(q[f]?.trim(),q.id+" missing "+f);
    assert(q.answer.split(/\s+/).length>=25,q.id+" answer too short");
    const text=[q.q,q.answer,q.example,q.pitfall,q.exercise,q.code].join(" ");
    assert(!/\uFFFD|[\u0400-\u04ff]|TODO|TBD/.test(text),q.id+" unexpected placeholder/encoding");
    words += text.split(/\s+/).length;
  }
  for(const r of m.references) {
    assert.equal(new URL(r.url).protocol,"https:");
    assert(r.title);
  }
}
assert.equal(data.modules.slice(0,5).map(m=>m.stage).join(","),Array(5).fill("tooling").join(","));
const flattened=JSON.stringify(data).toLowerCase();
const required=["java","spring boot","rest","jwt","sql server","postgresql","mongodb","kafka","redis",
 "keycloak","elasticsearch","minio","websocket","stomp","firebase","gemini","whisper","groq","cloudflare r2",
 "flyway","jpa","hibernate","saga","outbox","inbox","idempotency","github actions","gitlab","ghcr","trivy",
 "docker","nginx","google cloud","junit","mockito","testcontainers","postman","slf4j","logback","micrometer","prometheus",
 "javascript","typescript","react","angular","tanstack query","ant design","tailwind","aptis","zamiga"];
for(const term of required) assert(flattened.includes(term),"Missing CV technology: "+term);
assert(sources.indexOf("js/cv-study.js")<sources.indexOf("js/app.js"));
assert(html.includes('href="#/cv"') && html.includes('css/cv-study.css'));
for(const s of sources)assert(fs.existsSync(path.join(root,s)),"Missing script: "+s);
console.log(JSON.stringify({result:"PASS",modules:data.modules.length,questions:ids.size,counts,
  wordsApprox:words,cvTechnologiesCovered:required.length,files:dataFiles.length},null,2));
