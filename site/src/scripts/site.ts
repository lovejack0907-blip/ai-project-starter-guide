import './search';
import './learning';
const root = document.documentElement;
const themeButton = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const themes = ['system', 'light', 'dark'];
const themeNames: Record<string,string> = { system: '跟隨系統', light: '淺色', dark: '深色' };
function updateThemeLabel() { const name = themeNames[root.dataset.theme ?? 'system']; themeButton?.setAttribute('aria-label', `切換配色，目前${name}`); themeButton?.setAttribute('title', `配色：${name}（點擊切換）`); }
updateThemeLabel();
themeButton?.addEventListener('click', () => { const next = themes[(themes.indexOf(root.dataset.theme ?? 'system') + 1) % themes.length]; root.dataset.theme = next; try { localStorage.setItem('guide-theme', next); } catch {} updateThemeLabel(); });
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
menuButton?.addEventListener('click', () => { const nav = document.getElementById('mobile-nav')!; nav.hidden = !nav.hidden; menuButton.setAttribute('aria-expanded', String(!nav.hidden)); menuButton.setAttribute('aria-label', nav.hidden ? '開啟導覽選單' : '關閉導覽選單'); });
const layout = document.querySelector<HTMLElement>('.reader-layout');
const scrim = document.querySelector<HTMLButtonElement>('[data-reader-dismiss]');
const mobile = window.matchMedia('(max-width: 1100px)');
let lastReaderTrigger: HTMLElement | null = null;
function setReader(side: string, open: boolean) {
  if (!layout) return;
  if (mobile.matches) {
    root.dataset.readerPanel = open ? side : '';
    if (scrim) scrim.hidden = !open;
    document.body.classList.toggle('reader-menu-open', open);
  } else layout.classList.toggle(`${side}-closed`, !open);
  for (const button of document.querySelectorAll<HTMLElement>('[data-reader-toggle]')) {
    const s = button.dataset.readerToggle!;
    const expanded = mobile.matches ? root.dataset.readerPanel === s : !layout.classList.contains(`${s}-closed`);
    button.setAttribute('aria-expanded', String(expanded));
  }
}
function closePanels() { setReader('left', false); setReader('right', false); lastReaderTrigger?.focus(); }
function resetPanels() { root.dataset.readerPanel = ''; if (scrim) scrim.hidden = true; document.body.classList.remove('reader-menu-open'); if (layout) { layout.classList.remove('left-closed','right-closed'); for (const b of document.querySelectorAll('[data-reader-toggle]')) b.setAttribute('aria-expanded', String(!mobile.matches)); } }
resetPanels(); mobile.addEventListener('change', resetPanels);
document.querySelectorAll<HTMLButtonElement>('[data-reader-toggle]').forEach(b => b.addEventListener('click', () => { lastReaderTrigger = b; const side = b.dataset.readerToggle!; const open = mobile.matches ? root.dataset.readerPanel !== side : layout?.classList.contains(`${side}-closed`); setReader(side, Boolean(open)); if (mobile.matches && open) document.querySelector<HTMLElement>(side === 'left' ? '#category-sidebar button' : '#toc-sidebar button')?.focus(); }));
document.querySelectorAll<HTMLButtonElement>('[data-close-reader]').forEach(b => b.addEventListener('click', () => { setReader(b.dataset.closeReader!, false); lastReaderTrigger?.focus(); }));
scrim?.addEventListener('click', closePanels);
document.addEventListener('guide:search-opening',()=>{if(root.dataset.readerPanel)closePanels();});
document.addEventListener('keydown', event => {
  if (!mobile.matches || !root.dataset.readerPanel) return;
  if (event.key === 'Escape') { closePanels(); return; }
  if (event.key === 'Tab') {
    const panel = document.getElementById(root.dataset.readerPanel === 'left' ? 'category-sidebar' : 'toc-sidebar')!;
    const focusable = [...panel.querySelectorAll<HTMLElement>('a[href],button,summary')].filter(x=>x.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length-1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
});
document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]').forEach(a=>a.addEventListener('click',()=>{ if (mobile.matches) closePanels(); }));
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
const sections = tocLinks.map(a=>document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter((x):x is HTMLElement=>Boolean(x));
if (sections.length) {
  let scheduled = false;
  const highlight = () => { scheduled = false; const threshold=(document.querySelector<HTMLElement>('.site-header')?.offsetHeight??0)+(document.querySelector<HTMLElement>('.reader-toolbar')?.offsetHeight??0)+24; let current=sections[0]; for (const s of sections) { if (s.getBoundingClientRect().top <= threshold) current=s; } for (const a of tocLinks) { const active=decodeURIComponent(a.hash.slice(1))===current.id; a.classList.toggle('is-active',active); if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current'); } };
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(highlight);}}, {passive:true});
  window.addEventListener('pageshow',highlight); window.addEventListener('hashchange',highlight); highlight();
}
document.querySelectorAll<HTMLElement>('.prose pre').forEach(pre=>{
  const wrapper=document.createElement('div'); wrapper.className='code-wrapper';pre.before(wrapper);wrapper.append(pre);
  const button=document.createElement('button');button.className='copy-code';button.type='button';button.textContent='複製';button.setAttribute('aria-label','複製程式碼');wrapper.append(button);
  button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(pre.querySelector('code')?.textContent??pre.textContent??'');button.textContent='已複製 ✓';}catch{button.textContent='無法複製，請手動選取';}button.setAttribute('aria-live','polite');window.setTimeout(()=>button.textContent='複製',2200);});
});
