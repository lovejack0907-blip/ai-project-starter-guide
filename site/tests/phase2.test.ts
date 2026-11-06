import test from 'node:test';
import assert from 'node:assert/strict';
import {loadArticles,renderArticle} from '../src/lib/content.ts';
import {categories} from '../src/lib/catalog.ts';
import {learningData,routeOrder,progress,adjacentArticles,relatedArticles,readingPercent} from '../src/lib/learning.ts';
import {createLearningStore,normalizeState,STORAGE_KEY,type StorageLike} from '../src/lib/state.ts';
import {searchDocuments,type SearchDocument} from '../src/lib/search.ts';
const articles=loadArticles(),data=learningData(articles);
let docsPromise:Promise<SearchDocument[]>|undefined;
const docs=()=>docsPromise??=Promise.all(articles.map(async a=>({id:a.id,url:a.route,title:a.title,description:a.description,category:categories.find(c=>c.id===a.category)!.name,text:(await renderArticle(a,articles)).searchText})));
test('Chinese title, full body, category and multi-keyword queries work on real Wiki',async()=>{
  const index=await docs();
  assert.ok(searchDocuments(index,'儲存庫')[0].document.title.includes('儲存庫'));
  assert.ok(searchDocuments(index,'readme').some(x=>x.document.id==='github-first-repository'));
  assert.deepEqual(searchDocuments(index,'README'),searchDocuments(index,'readme'));
  assert.ok(searchDocuments(index,'專案快照').some(x=>x.document.id==='github-first-repository'));
  assert.ok(searchDocuments(index,'程式碼').length);
  assert.ok(searchDocuments(index,'分支 README').some(x=>x.document.id==='github-first-repository'));
  assert.ok(searchDocuments(index,'開發環境與專案管理').some(x=>x.document.id==='github-first-repository'));
  assert.deepEqual(searchDocuments(index,'不存在的火星料理機器'),[]);
  assert.deepEqual(searchDocuments(index,'   '),[]);
});
test('title match ranks above a body-only hit, and duplicate terms do not distort rank',()=>{
  const d={id:'one',url:'/articles/one/',title:'一般主題',description:'摘要',category:'分類',text:'分支 README'};
  const results=searchDocuments([d,{...d,id:'two',url:'/articles/two/',title:'分支指南'}],'分支');
  assert.equal(results[0].document.id,'two');
  assert.deepEqual(searchDocuments([d],'README README'),searchDocuments([d],'readme'));
  assert.ok(searchDocuments([d],'ＲＥＡＤＭＥ').length);
});
test('public search data has no raw paths, server files or private metadata',async()=>{
  for(const doc of await docs()){
    assert.deepEqual(Object.keys(doc).sort(),['category','description','id','text','title','url']);
    assert.ok(!JSON.stringify(doc).includes('raw/2026-'));
    assert.ok(!JSON.stringify(doc).includes('C:\\Users'));
    assert.ok(articles.some(a=>a.route===doc.url));
  }
});
test('route mapping uses valid stable IDs, keeps empty stages empty and deduplicates article totals',()=>{
  assert.equal(data.stages.length,5);
  assert.deepEqual(data.stages[3].articleIds,['test-and-accept-website-features','debug-with-ai-step-by-step']);
  const withoutStageFour = articles.filter(a => !data.stages[3].articleIds.includes(a.id));
  assert.deepEqual(learningData(withoutStageFour).stages[3].articleIds,[]);
  assert.equal(progress([],[]).percent,null);
  assert.equal(routeOrder(data).length,new Set(data.stages.flatMap(s=>s.articleIds)).size);
  assert.equal(progress(['a','a','b'],['a','a','ghost']).percent,50);
  const order=routeOrder(data);
  assert.equal(progress(order,[order[0]]).percent,Math.round(100/order.length));
  const modified={...data,stages:[...data.stages,{...data.stages[0],id:'duplicate',articleIds:[order[0]]}]};
  assert.equal(routeOrder(modified).length,order.length);
  assert.ok(!learningData(articles.filter(a=>a.id!=='website-planning')).stages[1].articleIds.includes('website-planning'));
});
test('progress recalculates for new included articles without copying old denominators',()=>{
  const old=progress(['a','b'],['a']);const added=progress(['a','b','c'],['a']);
  assert.equal(old.percent,50);assert.equal(added.percent,33);
  assert.equal(progress(['a'],['a','b']).percent,100);
});
function memoryStorage():StorageLike{const values=new Map<string,string>();return {getItem:key=>values.get(key)??null,setItem:(key,value)=>{values.set(key,value);}};}
test('completion, undo and last read survive new stores and ignore changed titles',()=>{
  const storage=memoryStorage();const ids=articles.map(a=>a.id),store=createLearningStore(storage,ids);
  store.toggle(ids[0]);store.visit(ids[1]);
  const reloaded=createLearningStore(storage,ids);
  assert.deepEqual(reloaded.get().completed,[ids[0]]);assert.equal(reloaded.get().lastRead,ids[1]);
  const renamed=articles.map(a=>({...a,title:'新標題'}));
  assert.deepEqual(createLearningStore(storage,renamed.map(a=>a.id)).get().completed,[ids[0]]);
  reloaded.toggle(ids[0]);assert.deepEqual(reloaded.get().completed,[]);
});
test('removed articles, corrupt records and blocked storage cannot produce invalid navigation',()=>{
  assert.deepEqual(normalizeState({version:1,completed:['a','a','ghost',12],lastRead:'ghost'},['a']),{version:1,completed:['a'],lastRead:null});
  assert.deepEqual(normalizeState({version:8,completed:['a']},['a']),{version:1,completed:[],lastRead:null});
  const corrupt=memoryStorage();corrupt.setItem(STORAGE_KEY,'{');const recovered=createLearningStore(corrupt,['a']);
  assert.equal(recovered.status(),'recovered');assert.equal(recovered.get().lastRead,null);recovered.toggle('a');
  assert.deepEqual(createLearningStore(corrupt,['a']).get().completed,['a']);
  const blocked={getItem:()=>{throw new Error('blocked');},setItem:()=>{throw new Error('blocked');}};
  const fallback=createLearningStore(blocked,['a']);fallback.toggle('a');fallback.visit('ghost');
  assert.equal(fallback.status(),'memory');assert.deepEqual(fallback.get().completed,['a']);assert.equal(fallback.get().lastRead,null);
  const quota={getItem:()=>null,setItem:()=>{throw new Error('quota');}};const quotaStore=createLearningStore(quota,['a']);quotaStore.toggle('a');assert.equal(quotaStore.status(),'memory');assert.deepEqual(quotaStore.get().completed,['a']);
});
test('refresh synchronizes independent local views and ignores stale completed IDs',()=>{
  const storage=memoryStorage(),one=createLearningStore(storage,['a','b']),two=createLearningStore(storage,['a','b']);
  one.toggle('a');two.refresh();assert.deepEqual(two.get().completed,['a']);two.toggle('b');one.refresh();assert.deepEqual(one.get().completed,['a','b']);
  const removed=createLearningStore(storage,['b']);assert.deepEqual(removed.get().completed,['b']);
});
test('previous/next and related recommendations always point to real different articles',async()=>{
  const graph=new Map(await Promise.all(articles.map(async a=>[a.id,(await renderArticle(a,articles)).links] as const)));
  for(const a of articles){
    const nav=adjacentArticles(a,articles);for(const target of [nav.previous,nav.next])if(target){assert.notEqual(target.id,a.id);assert.ok(articles.some(x=>x.id===target.id));}
    const related=relatedArticles(a,articles,graph);assert.ok(related.length<=3);assert.equal(new Set(related.map(x=>x.id)).size,related.length);assert.ok(related.every(x=>x.id!==a.id));
  }
  const a=articles[0],standalone={...a,id:'outside-route',slug:'standalone'};
  const fallback=adjacentArticles(standalone,[standalone],{articles:[standalone],stages:[]});assert.equal(fallback.previous,undefined);assert.equal(fallback.next,undefined);
  assert.deepEqual(relatedArticles(standalone,[standalone],new Map()),[]);
});
test('reading progress clamps correctly for top, bottom and short content',()=>{
  assert.equal(readingPercent(0,500,4000,900,140),0);
  assert.equal(readingPercent(4000,500,4000,900,140),100);
  assert.equal(readingPercent(1000,300,200,900,140),100);
  assert.equal(readingPercent(0,1500,200,900,140),0);
  assert.equal(readingPercent(NaN,0,0,0,0),0);
});
