import { withBase } from '../lib/site-path';
import {createLearningStore,STORAGE_KEY,type StorageLike} from '../lib/state';
import {progress,routeOrder,readingPercent,type LearningData} from '../lib/learning';
import {categories} from '../lib/catalog';
const payload=document.getElementById('learning-data');
if(payload){
  let data:LearningData|null=null;try{data=JSON.parse(payload.textContent??'');}catch{}
  if(data&&Array.isArray(data.articles)&&Array.isArray(data.stages))initialize(data);
}
function initialize(data:LearningData){
  const articles=new Map(data.articles.map(a=>[a.id,a]));
  let storage:StorageLike|null=null;try{storage=window.localStorage;}catch{}
  const store=createLearningStore(storage,articles.keys());
  const current=document.querySelector<HTMLElement>('[data-reading-article]')?.dataset.readingArticle;
  if(current)store.visit(current);
  function render(){
    const state=store.get(),done=new Set(state.completed);
    document.querySelectorAll<HTMLButtonElement>('[data-complete-article]').forEach(button=>{
      const id=button.dataset.completeArticle!,completed=done.has(id);button.setAttribute('aria-pressed',String(completed));button.classList.toggle('is-complete',completed);button.textContent=completed?'✓ 已完成':'標記為已完成';button.setAttribute('aria-label',`${completed?'取消完成':'標記為已完成'}：${articles.get(id)?.title??'文章'}`);button.title=completed?'再次點擊即可取消完成':'讀完後，手動留下記號';
    });
    document.querySelectorAll<HTMLElement>('[data-completion-badge]').forEach(b=>b.hidden=!done.has(b.dataset.completionBadge!));
    const order=routeOrder(data),overall=progress(order,done);
    document.querySelectorAll('[data-overall-percent]').forEach(x=>x.textContent=overall.percent===null?'—':`${overall.percent}%`);
    document.querySelectorAll('[data-overall-count]').forEach(x=>x.textContent=`已完成 ${overall.completed} / ${overall.total} 篇已收錄文章`);
    document.querySelectorAll<HTMLProgressElement>('[data-overall-progress]').forEach(x=>x.value=overall.percent??0);
    for(const stage of data.stages){
      const element=document.querySelector<HTMLElement>(`[data-learning-stage="${stage.id}"]`);if(!element)continue;
      const value=progress(stage.articleIds,done);
      element.querySelector('[data-stage-count]')?.replaceChildren(document.createTextNode(`${value.completed} / ${value.total} 篇已完成`));
      element.querySelector('[data-stage-percent]')?.replaceChildren(document.createTextNode(value.percent===null?'—':`${value.percent}%`));
      const bar=element.querySelector<HTMLProgressElement>('[data-stage-progress]');if(bar)bar.value=value.percent??0;
      const label=element.querySelector('[data-stage-status]');if(label)label.textContent=!value.total?'內容準備中':value.percent===100?'階段文章已完成':value.completed?'學習中':'尚未完成';
      element.classList.toggle('stage-complete',value.total>0&&value.percent===100);
    }
    const last=state.lastRead?articles.get(state.lastRead):undefined;
    for(const panel of document.querySelectorAll<HTMLElement>('[data-continue-panel]')){
      const title=panel.querySelector('[data-continue-title]')!,category=panel.querySelector('[data-continue-category]')!,label=panel.querySelector('[data-continue-label]')!,link=panel.querySelector<HTMLAnchorElement>('[data-continue-link]')!;
      if(last){title.textContent=last.title;category.textContent=categories.find(c=>c.id===last.category)?.name??'';label.textContent='接著上次的一小步';link.href=withBase(last.route);link.textContent='繼續閱讀 →';}
      else{title.textContent='準備好，開始自己的第一步';category.textContent='從入門路線開始，依照自己的步調閱讀。';label.textContent='YOUR NEXT SMALL STEP';link.href=panel.dataset.startHref??withBase('/learn/');link.textContent='開始學習 →';}
    }
    const nextId=order.find(id=>!done.has(id))??order[0],next=articles.get(nextId);
    document.querySelectorAll<HTMLAnchorElement>('[data-next-learning]').forEach(a=>{a.hidden=!next;if(next){a.href=withBase(next.route);a.textContent=overall.percent===100?'複習已學文章 →':overall.completed?'繼續學習 →':'開始學習 →';}});
    document.querySelectorAll<HTMLElement>('[data-storage-warning]').forEach(x=>{const mode=store.status();x.hidden=mode==='ok';x.textContent=mode==='memory'?'這個瀏覽器目前無法保存進度；本頁仍可標記，離開後可能不會保留。':'先前的進度紀錄無法讀取，已安全重設；你可以重新標記文章。';});
  }
  document.querySelectorAll<HTMLButtonElement>('[data-complete-article]').forEach(b=>b.addEventListener('click',()=>{store.toggle(b.dataset.completeArticle!);render();}));
  window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY||event.key===null){store.refresh();render();}});
  window.addEventListener('pageshow',()=>{store.refresh();if(current)store.visit(current);render();});
  render();
  const prose=document.querySelector<HTMLElement>('.prose'),bar=document.querySelector<HTMLElement>('[data-reading-progress]');
  if(prose&&bar){
    let scheduled=false;
    const update=()=>{scheduled=false;const offset=(document.querySelector<HTMLElement>('.site-header')?.offsetHeight??0)+(document.querySelector<HTMLElement>('.reader-toolbar')?.offsetHeight??0),rect=prose.getBoundingClientRect();const percent=readingPercent(window.scrollY,rect.top+window.scrollY,rect.height,window.innerHeight,offset);bar.style.width=`${percent}%`;bar.parentElement?.setAttribute('aria-valuenow',String(percent));};
    const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}};
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('pageshow',schedule);new ResizeObserver(schedule).observe(prose);update();
  }
}
