export interface SearchDocument { id:string; url:string; title:string; description:string; category:string; text:string }
export interface SearchResult { document:SearchDocument; score:number; snippet:string }
export const normalize=(value:string)=>value.normalize('NFKC').toLocaleLowerCase('en').replace(/\s+/g,' ').trim();
export function queryTerms(query:string) { return [...new Set(normalize(query).split(/\s+/).filter(Boolean))]; }
export function searchDocuments(documents:SearchDocument[],query:string):SearchResult[] {
  const terms=queryTerms(query);if(!terms.length)return [];
  return documents.flatMap(document=>{
    const fields=[document.title,document.description,document.category,document.text].map(normalize);
    if(!terms.every(t=>fields.some(f=>f.includes(t))))return [];
    const score=terms.reduce((score,t)=>score+(fields[0].includes(t)?100:0)+(fields[1].includes(t)?25:0)+(fields[2].includes(t)?15:0)+(fields[3].includes(t)?3:0),0)+(fields[0].includes(normalize(query))?200:0);
    const pos=terms.map(t=>fields[3].indexOf(t)).filter(p=>p>=0).sort((a,b)=>a-b)[0]??0;
    const start=Math.max(0,pos-32),text=document.text||document.description;
    const snippet=(start?'…':'')+text.slice(start,start+145)+(start+145<text.length?'…':'');
    return [{document,score,snippet}];
  }).sort((a,b)=>b.score-a.score||a.document.url.localeCompare(b.document.url,'en')).slice(0,30);
}
