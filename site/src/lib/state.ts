export const STORAGE_KEY='ai-starter-learning-v1';
export interface LearningState { version:1; completed:string[]; lastRead:string|null }
export interface StorageLike { getItem(key:string):string|null; setItem(key:string,value:string):void }
export function normalizeState(value:unknown,validIds:Iterable<string>):LearningState {
  const valid=new Set(validIds); const object=value&&typeof value==='object'?value as Record<string,unknown>:{};
  if(object.version!==1)return {version:1,completed:[],lastRead:null};
  return {version:1,completed:Array.isArray(object.completed)?[...new Set(object.completed.filter((id):id is string=>typeof id==='string'&&valid.has(id)))]:[],lastRead:typeof object.lastRead==='string'&&valid.has(object.lastRead)?object.lastRead:null};
}
export function createLearningStore(storage:StorageLike|null,validIds:Iterable<string>) {
  const ids=[...validIds];let state:LearningState={version:1,completed:[],lastRead:null};let status:'ok'|'memory'|'recovered'=storage?'ok':'memory';
  function read(){if(!storage)return;try{const raw=storage.getItem(STORAGE_KEY);state=normalizeState(raw?JSON.parse(raw):null,ids);}catch(error){if(error instanceof SyntaxError){status='recovered';state=normalizeState(null,ids);}else{status='memory';storage=null;}}}
  function save(){if(storage)try{storage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{status='memory';storage=null;}}
  read();
  return {
    get:()=>({...state,completed:[...state.completed]}),status:()=>status,
    toggle(id:string){if(!ids.includes(id))return;state.completed=state.completed.includes(id)?state.completed.filter(x=>x!==id):[...state.completed,id];save();},
    visit(id:string){if(ids.includes(id)){state.lastRead=id;save();}},
    refresh(){read();},
  };
}
