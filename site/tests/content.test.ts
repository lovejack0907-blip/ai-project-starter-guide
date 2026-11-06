import test from 'node:test';
import assert from 'node:assert/strict';
import { loadArticles, renderArticle, loadAssets } from '../src/lib/content.ts';
import { categories } from '../src/lib/catalog.ts';
const articles = loadArticles();
test('real Wiki loads with all nine categories and valid source metadata', () => {
  assert.equal(categories.length,9); assert.ok(articles.length>0);
  assert.ok(articles.some(a=>a.category==='01-ai-development'));
  for (const a of articles) { assert.ok(a.title);assert.ok(a.description);assert.ok(a.sources.length);assert.ok(!JSON.stringify(a.sources).includes('raw/')); }
});
test('every real article renders without public raw or management links', async () => {
  for (const a of articles) {
    const { html, headings } = await renderArticle(a,articles);
    assert.ok(headings.length);assert.equal(new Set(headings.map(h=>h.id)).size,headings.length);
    assert.ok(!/<h1\b/.test(html));
    assert.ok(!/(href|src)="[^"]*(?:raw\/|sources\.md|AGENTS\.md|log\.md)/.test(html));
    assert.ok(html.includes('https://')); assert.ok(html.includes('article-sources'));
  }
});
test('relative Wiki links, wikilinks, aliases and heading anchors resolve without touching original files', async () => {
  const a=articles.find(a=>a.slug.endsWith('ai-development-without-coding-background'))!;
  const target=articles.find(a=>a.slug.endsWith('github-first-repository'))!;
  const {html}=await renderArticle({...a,body:'## 你好，世界\n\n## 你好，世界\n\n[[github-first-repository|GitHub 練習]]\n\n[另一篇](../06-project-management/github-first-repository.md#git-與-github-有什麼差別)\n\n[[github-first-repository#Git 與 GitHub 有什麼差別？|讀概念]]'},articles);
  assert.ok(html.includes('id="你好世界"'));assert.ok(html.includes('id="你好世界-1"'));
  assert.ok(html.includes(`href="${target.route}"`));assert.ok(html.includes('讀概念'));
});
test('rendering sanitizes HTML, unsafe schemes and protects private images', async () => {
  const {html}=await renderArticle({...articles[0],body:'<script>alert(1)</script>\n\n[危險](javascript:alert)\n\n[管理](../../AGENTS.md)\n\n![[../../raw/secret.png]]\n\n![外部圖片](https://example.com/picture.png)'},articles);
  assert.ok(!html.includes('<script'));assert.ok(!html.includes('javascript:'));assert.ok(!html.includes('href="../../'));
  assert.ok(html.includes('內部資料未公開'));assert.ok(html.includes('圖片未公開'));
  assert.ok(html.includes('loading="lazy"'));assert.ok(html.includes('https://example.com/picture.png'));
});
test('GFM, quotations and code highlight support real reader components', async () => {
  const {html}=await renderArticle({...articles[0],body:'> 先做小練習\n\n|名稱|用途|\n|---|---|\n|AI|協助|\n\n```javascript\nconst greeting = "hello";\n```\n\n```unknown-language\n[[not-a-link]]\n```'},articles);
  assert.ok(html.includes('<blockquote>'));assert.ok(html.includes('<table'));assert.ok(html.includes('shiki'));
  assert.ok(html.includes('greeting'));assert.ok(html.includes('[[not-a-link]]'));
});
test('raster images are served only from explicit Wiki assets', async()=>{
  assert.ok(Array.isArray(loadAssets()));
  const {html}=await renderArticle({...articles[0],body:'![範例](example.png)'},articles,[{file:articles[0].file.replace(/[^\\/]+$/,'example.png'),name:'test.png',type:'image/png'}]);
  assert.ok(html.includes('src="/media/test.png"'));
});
