import { graph } from '../lib/graph';
export const GET = () => new Response(JSON.stringify(graph()), { headers: { 'content-type': 'application/json' } });
