import { withBase } from '../lib/site-path';
import { loadArticles,renderArticle } from '../lib/content';
import { categories } from '../lib/catalog';
export async function GET(){
  const articles=loadArticles();const documents=await Promise.all(articles.map(async a=>({id:a.id,url:withBase(a.route),title:a.title,description:a.description,category:categories.find(c=>c.id===a.category)!.name,text:(await renderArticle(a,articles)).searchText})));
  return new Response(JSON.stringify({version:1,documents}),{headers:{'Content-Type':'application/json; charset=utf-8'}});
}
