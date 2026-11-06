import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
export default defineConfig({ site: process.env.PAGES_SITE || undefined, base: process.env.PAGES_BASE_PATH || '/', output: 'static', trailingSlash: 'always', devToolbar: { enabled: false }, vite: { server: { fs: { strict: true, allow: [fileURLToPath(new URL('.', import.meta.url))] } } } });
