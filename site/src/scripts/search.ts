import { withBase } from '../lib/site-path';
import {searchDocuments,queryTerms,type SearchDocument,type SearchResult} from '../lib/search';
const dialog=document.querySelector<HTMLDialogElement>('#search-dialog');
const input=document.querySelector<HTMLInputElement>('#wiki-search');
const list=document.querySelector<HTMLUListElement>('#search-results');
const status=document.querySelector<HTMLElement>('[data-search-status]');
const retry=document.querySelector<HTMLButtonElement>('[data-search-retry]');
let indexPromise:Promise<SearchDocument[]>|null=null,results:SearchResult[]=[],selected=0,request=0;
let opener:HTMLElement|null=null;
async function loadIndex(){
  return indexPromise??=fetch(withBase('/search-index.json')).then(async response=>{
    if(!response.ok)throw new Error('Search index unavailable');
    const value=await response.json();
    if(value.version!==1||!Array.isArray(value.documents))throw new Error('Invalid index');
    return value.documents.filter((d:SearchDocument)=>typeof d.id==='string'&&typeof d.title==='string'&&typeof d.text==='string'&&typeof d.description==='string'&&typeof d.category==='string'&&typeof d.url==='string'&&/^\/articles\/[a-z0-9/-]+\/$/.test(d.url.slice(withBase('/').length - 1))&&d.url.startsWith(withBase('/articles/')));
  }).catch(error=>{indexPromise=null;throw error;});
}
function highlight(element:HTMLElement,text:string,terms:string[]){
  // Use text nodes, never insert query text as HTML.
  const escaped=terms.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).sort((a,b)=>b.length-a.length);
  if(!escaped.length){element.textContent=text;return;}
  const regex=new RegExp(escaped.join('|'),'gi');let start=0,match;
  while((match=regex.exec(text))){element.append(document.createTextNode(text.slice(start,match.index)));const mark=document.createElement('mark');mark.textContent=match[0];element.append(mark);start=regex.lastIndex;}
  element.append(document.createTextNode(text.slice(start)));
}
function select(index:number,scroll=false){
  if(!input||!list)return;
  selected=results.length?(index+results.length)%results.length:0;
  [...list.children].forEach((li,i)=>li.setAttribute('aria-selected',String(i===selected)));
  if(results.length){input.setAttribute('aria-activedescendant',`search-option-${selected}`);if(scroll)list.children[selected]?.scrollIntoView({block:'nearest'});}else input.removeAttribute('aria-activedescendant');
}
async function search(){
  if(!input||!list||!status)return;
  const current=++request,query=input.value.trim();results=[];list.replaceChildren();input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');retry!.hidden=true;
  if(!query){status.textContent='輸入關鍵字，找到下一個想讀的主題。';return;}
  status.textContent='正在尋找相關文章…';
  try{
    const documents=await loadIndex();if(current!==request)return;
    results=searchDocuments(documents,query);status.textContent=results.length?`找到 ${results.length} 篇文章`:'暫時找不到相關文章，試試較短的詞，或換個說法。';
    for(const [i,result] of results.entries()){
      const li=document.createElement('li');li.id=`search-option-${i}`;li.setAttribute('role','option');
      const a=document.createElement('a');a.href=result.document.url;a.tabIndex=-1;
      const category=document.createElement('span');category.className='search-result-category';category.textContent=result.document.category;
      const title=document.createElement('strong');highlight(title,result.document.title,queryTerms(query));
      const snippet=document.createElement('p');highlight(snippet,result.snippet,queryTerms(query));
      a.append(category,title,snippet);li.append(a);li.addEventListener('pointermove',()=>select(i));list.append(li);
    }
    input.setAttribute('aria-expanded',String(Boolean(results.length)));select(0);
  }catch{if(current===request){status.textContent='搜尋暫時無法載入，你仍可從知識分類閱讀文章。';retry!.hidden=false;}}
}
function open(){
  if(!dialog||!input)return;
  opener=document.activeElement as HTMLElement;document.dispatchEvent(new Event('guide:search-opening'));
  if(!dialog.open)dialog.showModal();input.focus();input.select();void search();
}
document.querySelector('[data-open-search]')?.addEventListener('click',open);
document.querySelector('[data-close-search]')?.addEventListener('click',()=>dialog?.close());
dialog?.addEventListener('close',()=>{++request;opener?.focus();});
dialog?.addEventListener('keydown',event=>{if(event.key==='Escape'&&!event.isComposing){event.preventDefault();dialog.close();}});
dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
input?.addEventListener('input',()=>{void search();});retry?.addEventListener('click',()=>{void search();input?.focus();});
input?.addEventListener('keydown',event=>{
  if(event.isComposing)return;
  if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();select(selected+(event.key==='ArrowDown'?1:-1),true);}
  if(event.key==='Enter'&&results[selected]){event.preventDefault();window.location.assign(results[selected].document.url);}
});
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'&&!event.altKey){event.preventDefault();if(dialog?.open)dialog.close();else open();}});
if(/Macintosh|Mac OS|iPhone|iPad/.test(navigator.userAgent))document.querySelectorAll('.search-shortcut').forEach(x=>x.textContent='⌘ K');
