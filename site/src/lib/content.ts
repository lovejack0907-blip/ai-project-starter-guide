import { withBase } from './site-path.ts';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
import { createHighlighter } from 'shiki';
import { categories } from './catalog.ts';
import { articleId } from './identity.ts';

// Astro bundles this module into dist during SSG; import.meta.url then changes.
// All documented commands run from site/, so resolve the sibling vault from cwd.
export const projectRoot = path.resolve(process.cwd(), '..');
const wikiRoot = path.join(projectRoot, 'wiki');
export interface Source { id: string; title: string; url?: string; published?: string; accessed?: string }
export interface Article { id: string; file: string; slug: string; route: string; title: string; description: string; category: string; updated: string; tags: string[]; sources: Source[]; license?: string; body: string }
export interface Heading { depth: number; id: string; text: string }
export interface Asset { file: string; name: string; type: string }
const imageTypes: Record<string, string> = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif' };
function walk(dir: string): string[] { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(x => x.isSymbolicLink() ? [] : x.isDirectory() ? walk(path.join(dir, x.name)) : [path.join(dir, x.name)]); }
function withinWiki(file: string) { const rel = path.relative(wikiRoot, file); return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel); }
export function loadArticles(): Article[] {
  const articles = walk(wikiRoot).filter(f => /\.(md|markdown)$/i.test(f)).map(file => {
    const { data, content } = matter(fs.readFileSync(file, 'utf8'));
    const category = path.relative(wikiRoot, file).split(path.sep)[0];
    for (const key of ['title', 'description', 'category', 'created', 'updated']) if (typeof data[key] !== 'string' || !data[key].trim()) throw new Error(`Missing/invalid ${key}: ${file}`);
    if (!categories.some(c => c.id === category) || data.category !== category || !Array.isArray(data.sources) || !Array.isArray(data.tags)) throw new Error(`Invalid category or metadata: ${file}`);
    const slug = path.relative(wikiRoot, file).replace(/\.(md|markdown)$/i, '').split(path.sep).join('/');
    return { id: articleId(slug), file, slug, route: `/articles/${slug}/`, title: data.title, description: data.description, category, updated: data.updated, tags: data.tags.map(String), sources: data.sources.map((s: Source) => ({ id: s.id, title: s.title, url: s.url, published: s.published, accessed: s.accessed })), license: data.license, body: content };
  });
  if (new Set(articles.map(a => a.route)).size !== articles.length) throw new Error('Duplicate article route');
  if (new Set(articles.map(a => a.id)).size !== articles.length) throw new Error('Duplicate stable article ID');
  return articles;
}
export function loadAssets(): Asset[] {
  return walk(wikiRoot).filter(f => imageTypes[path.extname(f).toLowerCase()] && withinWiki(fs.realpathSync(f))).map(file => ({ file, name: crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 20) + path.extname(file).toLowerCase(), type: imageTypes[path.extname(file).toLowerCase()] }));
}
let highlighter: ReturnType<typeof createHighlighter> | undefined;
function getHighlighter() { return highlighter ??= createHighlighter({ themes: ['github-light', 'github-dark'], langs: ['javascript','typescript','html','css','json','yaml','bash','python','markdown'] }); }
const plainText = (node: any): string => node.value ?? (node.children ?? []).map(plainText).join('');
export async function renderArticle(article: Article, articles = loadArticles(), assets = loadAssets()) {
  const headings: Heading[] = []; const slugger = new GithubSlugger();
  const links = new Set<string>(); let searchText = '';
  const sourceUrls = new Map<string, string>();
  // Only explicitly cited raw paths can be converted to a public reference URL.
  const metadata = matter(fs.readFileSync(article.file, 'utf8')).data;
  for (const s of metadata.sources ?? []) if (s.raw && /^https?:\/\//.test(s.url ?? '')) sourceUrls.set(path.resolve(projectRoot, s.raw), s.url);
  function resolveLink(url: string, image = false): { url?: string; internal?: boolean; blocked?: string } {
    if (/^https?:\/\//i.test(url)) return { url };
    if (!image && /^mailto:/i.test(url)) return { url };
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//')) return { blocked: '不支援的連結' };
    if (!image && url.startsWith('#')) return { url };
    const [rawPath, anchor] = url.split('#');
    let decoded: string; try { decoded = decodeURIComponent(rawPath); } catch { return { blocked: '無法辨識的連結' }; }
    let dest = path.resolve(path.dirname(article.file), decoded);
    if (!path.extname(dest)) {
      const matches = articles.filter(a => a.file === dest + '.md' || a.slug === decoded || path.basename(a.file, path.extname(a.file)) === decoded);
      if (matches.length === 1) dest = matches[0].file;
    }
    if (image) { const asset = assets.find(a => a.file === dest); return asset ? { url: `/media/${asset.name}` } : { blocked: '圖片未公開或找不到' }; }
    const target = articles.find(a => a.file === dest);
    if (target) return { url: target.route + (anchor ? '#' + anchor : ''), internal: true };
    if (dest === path.join(projectRoot, 'index.md') || dest === path.join(projectRoot, 'README.md')) return { url: '/knowledge/', internal: true };
    if (dest === path.join(projectRoot, 'sources.md') || dest === path.join(projectRoot, 'REFERENCES.md')) return { url: '#article-sources', internal: true };
    if (sourceUrls.has(dest)) return { url: sourceUrls.get(dest) };
    return { blocked: '內部資料未公開' };
  }
  const processor = unified().use(remarkParse).use(remarkGfm)
    .use(() => (tree: any) => {
      // Obsidian [[note|label]], [[note#heading]], ![[image.png|label]]. Code nodes are untouched.
      visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
        if (index === undefined || !parent || parent.type === 'link') return;
        const regex = /(!?)\[\[([^\]]+)\]\]/g; let match; let start = 0; const nodes: any[] = [];
        while ((match = regex.exec(node.value))) {
          if (match.index > start) nodes.push({ type: 'text', value: node.value.slice(start, match.index) });
          const [url, label] = match[2].split('|');
          const hash = url.indexOf('#');
          const target = hash >= 0 ? url.slice(0,hash) + '#' + new GithubSlugger().slug(url.slice(hash+1)) : url;
          nodes.push(match[1] ? { type: 'image', url: target, alt: label ?? url } : { type: 'link', url: target, children: [{ type: 'text', value: label ?? url }] });
          start = regex.lastIndex;
        }
        if (nodes.length) { if (start < node.value.length) nodes.push({ type: 'text', value: node.value.slice(start) }); parent.children.splice(index, 1, ...nodes); return index + nodes.length; }
      });
      // The page supplies its own H1. Remove only the matching leading article title.
      const first = tree.children[0];
      if (first?.type === 'heading' && first.depth === 1 && plainText(first) === article.title) tree.children.shift();
    })
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(() => async (tree: any) => {
      const codeNodes: any[] = [];
      visit(tree, 'element', (node: any) => {
        if (/^h[1-6]$/.test(node.tagName)) {
          const text = plainText(node); const id = slugger.slug(text); node.properties.id = id;
          if (node.tagName !== 'h1') headings.push({ depth: Number(node.tagName[1]), id, text });
        }
        if (node.tagName === 'a') {
          const originalHref = String(node.properties.href ?? '');
          const resolved = resolveLink(originalHref);
          if (resolved.blocked) { node.tagName = 'span'; node.properties = { className: ['private-reference'], title: resolved.blocked }; node.children = [{ type: 'text', value: `〔${resolved.blocked}〕` }]; }
          else { node.properties.href = resolved.internal && resolved.url ? withBase(resolved.url) : resolved.url; if (resolved.url?.startsWith('/articles/')) links.add(resolved.url.split('#')[0]); if (/^https?:/.test(resolved.url ?? '')) { node.properties.target = '_blank'; node.properties.rel = ['noopener','noreferrer']; if (!/^https?:/.test(originalHref)) { node.properties.title = '原始資料不公開，改閱官方來源'; node.children = [{ type: 'text', value: '原始來源（官方頁面）' }]; } } }
        }
        if (node.tagName === 'img') {
          const resolved = resolveLink(String(node.properties.src ?? ''), true);
          if (resolved.blocked) { const alt = node.properties.alt ?? ''; node.tagName = 'span'; node.properties = { className: ['image-unavailable'] }; node.children = [{ type: 'text', value: `圖片：${alt}（${resolved.blocked}）` }]; }
          else { node.properties.src = resolved.url ? withBase(resolved.url) : resolved.url; node.properties.loading = 'lazy'; node.properties.decoding = 'async'; }
        }
        if (node.tagName === 'table') node.properties.tabIndex = 0;
        if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') codeNodes.push(node);
      });
      const textParts: string[] = [];
      visit(tree, 'text', (node: any) => { textParts.push(node.value); });
      searchText = textParts.join(' ').replace(/\s+/g, ' ').trim();
      if (codeNodes.length) {
        const high = await getHighlighter();
        for (const pre of codeNodes) {
          const code = pre.children[0]; const text = plainText(code);
          let lang = (code.properties.className ?? []).find((x: string) => x.startsWith('language-'))?.slice(9) ?? 'text';
          if (!high.getLoadedLanguages().includes(lang)) lang = 'text';
          pre.type = 'raw'; pre.value = high.codeToHtml(text.replace(/\n$/, ''), { lang, themes: { light: 'github-light', dark: 'github-dark' } }); delete pre.children; delete pre.tagName; delete pre.properties;
        }
      }
    }).use(rehypeStringify, { allowDangerousHtml: true }); // raw is generated only by Shiki after sanitization.
  const html = String(await processor.process(article.body));
  return { html, headings, searchText, links: [...links] };
}
