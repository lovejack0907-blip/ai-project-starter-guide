import fs from 'node:fs';
import { loadAssets } from '../../lib/content';
export function getStaticPaths() { return loadAssets().map(asset => ({ params: { asset: asset.name }, props: { asset } })); }
export function GET({ props }: any) { return new Response(new Uint8Array(fs.readFileSync(props.asset.file)), { headers: { 'Content-Type': props.asset.type, 'X-Content-Type-Options': 'nosniff' } }); }
