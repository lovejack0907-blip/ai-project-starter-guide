import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { loadArticles } from '../src/lib/content.ts';
import { categories } from '../src/lib/catalog.ts';
const dist=path.resolve('dist');
const base=(process.env.PAGES_BASE_PATH || '/').replace(/\/+$/, '');
function walk(dir:string):string[]{return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]);}
const files=walk(dist); const htmlFiles=files.filter(f=>f.endsWith('.html'));let checked=0;
for(const file of htmlFiles){
 const html=fs.readFileSync(file,'utf8');
 assert.ok(html.includes('lang="zh-Hant"'));
 assert.equal((html.match(/<h1(?:\s|>)/g)??[]).length,1,`${file}: one H1`);
 for(const [,target] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)){
  if(!target.startsWith('/'))continue;
  assert.ok(target.startsWith(base+'/'), 'URL outside site base: '+target);
  const localTarget=target.slice(base.length);
  assert.ok(!/^\/(raw|wiki|work|plans|sources\.md|AGENTS\.md|WORKFLOWS\.md|log\.md|index\.md)(?:\/|$)/i.test(localTarget),`private URL ${target}`);
  const [url,anchor]=localTarget.split('#');const disk=path.join(dist,decodeURI(url));const dest=fs.existsSync(disk)&&fs.statSync(disk).isDirectory()?path.join(disk,'index.html'):disk;
  assert.ok(fs.existsSync(dest),`${file}: ${target}`);
  if(anchor&&dest.endsWith('.html'))assert.ok(fs.readFileSync(dest,'utf8').includes(`id="${decodeURIComponent(anchor)}"`),`missing anchor ${target}`);
  checked++;
 }
 for(const [,anchor] of html.matchAll(/href="#([^"<>]+)"/g))assert.ok(html.includes(`id="${decodeURIComponent(anchor)}"`),`local anchor ${anchor}`);
}
for(const a of loadArticles())assert.ok(fs.existsSync(path.join(dist,a.route,'index.html')));
for(const c of categories)assert.ok(fs.existsSync(path.join(dist,'knowledge',c.id,'index.html')));
assert.ok(htmlFiles.some(f=>fs.readFileSync(f,'utf8').includes(base+'/_astro/')),'Missing built client assets');
assert.ok(!files.some(f=>/\.md$/i.test(f)||/[/\\](raw|work|plans)[/\\]/.test('/'+path.relative(dist,f).split(path.sep).join('/'))));
const search=JSON.parse(fs.readFileSync(path.join(dist,'search-index.json'),'utf8'));
assert.equal(search.documents.length,loadArticles().length);
assert.equal(new Set(search.documents.map((d:any)=>d.id)).size,search.documents.length);
for(const d of search.documents){assert.ok(loadArticles().some(a=>a.id===d.id&&base+a.route===d.url));assert.ok(!JSON.stringify(d).includes('raw/2026-'));assert.ok(!('file' in d)&&!('body' in d)&&!('sources' in d));}
console.log(`PASS: ${htmlFiles.length} HTML pages, ${loadArticles().length} real articles, 9 categories, ${checked} local paths; no private files exported.`);
