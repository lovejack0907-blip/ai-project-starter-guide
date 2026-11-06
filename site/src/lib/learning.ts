import type { Article } from './content.ts';
import { stages } from './catalog.ts';
export const stageArticleIds = [
  ['ai-development-intro','choose-an-ai-development-workflow','how-a-small-website-works'],
  ['website-planning','describe-and-split-ai-tasks'],
  ['first-website-path','github-first-repository','project-files-terminal-and-preview'],
  ['test-and-accept-website-features','debug-with-ai-step-by-step'],
  ['github-account-security','github-pages-intro','api-keys-and-environment-variables'],
] as const;
export type PublicArticle = Pick<Article,'id'|'route'|'title'|'description'|'category'>;
export interface LearningStage { id:string; title:string; description:string; note:string; category:string; articleIds:string[] }
export interface LearningData { articles:PublicArticle[]; stages:LearningStage[] }
export function learningData(articles:Article[]):LearningData {
  const ids=new Set(articles.map(a=>a.id));
  return {
    articles:articles.map(({id,route,title,description,category})=>({id,route,title,description,category})),
    stages:stages.map((s,i)=>({id:`stage-${i+1}`,title:s.title,description:s.description,category:s.category,
      note:i===2?'現有文章涵蓋網站起步、GitHub 網頁練習與本機預覽及 Git 本機同步，完整網站實作教學仍待補充。':i===4?'若專案會串接外部服務，可先選讀 API Key 與環境變數；文章仍列入路線進度。':'',
      articleIds:[...new Set<string>(stageArticleIds[i])].filter(id=>ids.has(id))})),
  };
}
export function routeOrder(data:LearningData) { const valid=new Set(data.articles.map(a=>a.id)); return [...new Set(data.stages.flatMap(s=>s.articleIds))].filter(id=>valid.has(id)); }
export function progress(ids:Iterable<string>, completed:Iterable<string>) {
  const unique=[...new Set(ids)], done=new Set(completed);const count=unique.filter(id=>done.has(id)).length;
  return {total:unique.length,completed:count,percent:unique.length?Math.round(count/unique.length*100):null};
}
export function adjacentArticles(article:Article,articles:Article[],data=learningData(articles)) {
  const ordered=routeOrder(data); const ids=ordered.includes(article.id)?ordered:articles.filter(a=>a.category===article.category).sort((a,b)=>a.slug.localeCompare(b.slug,'en')).map(a=>a.id);
  const index=ids.indexOf(article.id);const byId=new Map(articles.map(a=>[a.id,a]));
  return {previous:index>0?byId.get(ids[index-1]):undefined,next:index>=0?byId.get(ids[index+1]):undefined};
}
export function relatedArticles(article:Article,articles:Article[],links:Map<string,string[]>) {
  return articles.filter(a=>a.id!==article.id).map(a=>{
    const linked=(links.get(article.id)??[]).includes(a.route)||(links.get(a.id)??[]).includes(article.route);
    const sameCategory=a.category===article.category;
    const tags=a.tags.filter(t=>!['新手入門','知識'].includes(t)&&article.tags.includes(t)).length;
    return {article:a,score:linked?100+(sameCategory?10:0):sameCategory?40:tags*5};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.article.slug.localeCompare(b.article.slug,'en')).slice(0,3).map(x=>x.article);
}
export function readingPercent(scroll:number,top:number,height:number,viewport:number,offset:number) {
  if (![scroll,top,height,viewport,offset].every(Number.isFinite)) return 0;
  const start=top-offset,end=top+height-viewport;
  if(end<=start)return scroll+viewport>=top+height?100:0;
  return Math.max(0,Math.min(100,Math.round((scroll-start)/(end-start)*100)));
}
