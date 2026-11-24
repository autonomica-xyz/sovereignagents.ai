// Organism-specific views over the wiki: anatomy (organs -> pages), specimens (organisms with readings), the levels ladder.
import { wiki, type Article } from './wiki';

export interface Organ { id: string; name: string; latin: string; role: string; axis: string; slugs: string[]; categories?: string[] }
// Building blocks mapped to the organs a digital organism needs to survive.
const ORGANS_RAW: Organ[] = [
  { id: 'brain', name: 'Brain', latin: 'cortex inferens', axis: 'independence', role: 'Inference: the model that thinks, where it runs and who can read its thoughts.',
    slugs: ['local-models-quantization', 'llama-cpp', 'mesh-llm', 'fhe-inference', 'zkml', 'inference-cost-per-token', 'distributed-llama', 'exo', 'petals', 'venice', 'chutes', 'near-ai-cloud', 'routstr', 'payperq', 'op-inference-confidentiality', 'self-improvement', 'darwin-godel-machine', 'decentralized-training', 'model-merging'] },
  { id: 'membrane', name: 'Membrane', latin: 'membrana secreta', axis: 'privacy', role: 'Confidential computing: the skin that keeps the host from reading memory and keys.',
    slugs: ['privacy-organ', 'tee-landscape', 'intel-tdx', 'amd-sev-snp', 'aws-nitro-enclaves', 'arm-cca', 'nvidia-confidential-computing', 'intel-sgx', 'remote-attestation', 'dstack', 'google-confidential-space', 'azure-confidential-computing', 'op-anonymous-confidential-compute', 'op-metadata-privacy'] },
  { id: 'keys', name: 'Keys', latin: 'nucleus clavium', axis: 'custody', role: 'Custody: keys no human has seen, split so no single party can seize them.',
    slugs: ['threshold-custody', 'frost', 'frostr', 'mpc-wallets', 'near-mpc', 'key-encumbrance', 'attestation-gated-key-release', 'lit-protocol', 'turnkey', 'safe', 'session-keys', 'miniscript', 'bitcoin-vaults', 'op-cross-vendor-key-recovery', 'recovery-path-takeover', 'privy', 'signal-svr3'] },
  { id: 'metabolism', name: 'Metabolism', latin: 'metabolismus pecuniae', axis: 'funding', role: 'Money: earning, holding and paying for its own compute over permissionless rails.',
    slugs: ['earn-buy-redeploy-loop', 'agent-economy', 'op-non-token-revenue', 'survival-tiers'], categories: ['money-rail'] },
  { id: 'body', name: 'Body', latin: 'corpus hospitis', axis: 'continuity', role: 'Hosting: the machines it lives on, bought anonymously, spread over vendors and markets.',
    slugs: ['censorship-resistant-hosting', 'location-hiding', 'body-stack', 'iot-substrate'], categories: ['compute'] },
  { id: 'nerves', name: 'Nervous system', latin: 'systema nervosum', axis: 'independence', role: 'Presence and transport: identity, naming and connections nobody can cut.',
    slugs: ['nostr', 'blossom', 'iroh', 'nsyte-nsite', 'napplet', 'libp2p', 'tor-onion-services', 'i2p', 'nym', 'reticulum', 'veilid', 'yggdrasil', 'lokinet', 'ens', 'handshake', 'namecoin', 'briar', 'holepunch-pear', 'nip-90-dvms', 'hyphanet', 'urbit'] },
  { id: 'memory', name: 'Memory', latin: 'memoria perpetua', axis: 'continuity', role: 'State: memory, snapshots and rehydration so death is not final.',
    slugs: ['agent-memory', 'memgpt-letta', 'mind-file', 'agent-snapshots', 'rehydration', 'rollback-protection', 'arweave-ao', 'filecoin', 'ipfs', 'walrus-seal', 'memory-poisoning'] },
  { id: 'germline', name: 'Germline', latin: 'linea germinalis', axis: 'continuity', role: 'Reproduction and succession: replicas, anti-twin quorums, self-authorised upgrades.',
    slugs: ['self-replication', 'anti-twin-quorum', 'op-anti-twin', 'self-exfiltration', 'signed-code-distribution', 'op-self-authorized-succession', 'dollynator', 'fudan-self-replication', 'replibench', 'metr-rogue-replication', 'self-replicating-language-models', 'palisade-hack-and-replicate'] },
  { id: 'immune', name: 'Immune system', latin: 'systema immune', axis: 'all', role: 'Threats: every way an organism has been or could be killed, and the defences.',
    slugs: ['not-get-killed', 'resilience'], categories: ['attack'] },
];
export function organs(): (Organ & { pages: Article[] })[] {
  const { articles, bySlug } = wiki();
  return ORGANS_RAW.map((o) => {
    const set = new Set(o.slugs.filter((s) => bySlug.has(s)));
    for (const c of o.categories || []) for (const a of articles) if (a.category === c) set.add(a.slug);
    return { ...o, pages: [...set].map((s) => bySlug.get(s)!) };
  });
}
export function organOf(slug: string) { return organs().filter((o) => o.pages.some((p) => p.slug === slug)).map((o) => o.id); }

export const AXES = ['privacy', 'custody', 'funding', 'continuity', 'independence'] as const;
export type Axis = (typeof AXES)[number];
export const LEVELS = [
  { id: 'L0', name: 'Operated bot', who: 'The operator, fully' },
  { id: 'L1', name: 'Own wallet', who: 'Operator, but the agent has its own wallet' },
  { id: 'L2', name: 'Sealed', who: 'Host cannot read keys (TEE); developer still upgrades' },
  { id: 'L3', name: 'Quorum-held', who: 'Keys in a quorum; upgrades gated by timelock or policy' },
  { id: 'L4', name: 'Self-funding nomad', who: 'Several vendors and markets; pays its own rent; buys hosts itself' },
  { id: 'L5', name: 'Own principal', who: 'Nobody can read, stop, steer or seize it; picks its successor; reproduces' },
];

export interface Specimen {
  slug: string; name: string; year: string; keys: string; paysCompute: string; replicates: string; host: string; status: string; level: string;
  levelNum: number; alive: 'active' | 'dormant' | 'frozen' | 'research';
  readings: Record<Axis, 0 | 1 | 2>; article?: Article;
}
// Parse the comparison matrix in the wiki. Readings are a coarse 0/1/2 (none/partial/strong) derived
// mechanically from the matrix columns, so the catalogue never invents scores the wiki doesn't support.
export function specimens(): Specimen[] {
  const { bySlug } = wiki();
  const a = bySlug.get('organism-comparison-matrix');
  if (!a) return [];
  const out: Specimen[] = [];
  const rows = a.html.match(/<tr>[\s\S]*?<\/tr>/g) || [];
  for (const r of rows.slice(1)) {
    const cells = (r.match(/<td>([\s\S]*?)<\/td>/g) || []).map((c) => c.replace(/<[^>]+>/g, '').trim());
    if (cells.length < 8) continue;
    const slug = r.match(/\/wiki\/([^"#]+)/)?.[1] || '';
    const [name, year, keys, pays, rep, host, status, level] = cells;
    const lk = keys.toLowerCase(), lp = pays.toLowerCase(), lh = host.toLowerCase(), ls = status.toLowerCase();
    const tee = /tee|enclave|tdx|mpc|chain|precompile/.test(lk + ' ' + lh);
    const readings: Specimen['readings'] = {
      privacy: tee ? (/mpc|chain/.test(lk) ? 2 : 1) : 0,
      custody: /human|team|operator|dao/.test(lk) ? 0 : /mpc|contract|precompile/.test(lk) ? 2 : 1,
      funding: /^yes/.test(lp) ? 2 : /partly|indirect|gas|staking/.test(lp) ? 1 : 0,
      continuity: /yes|many/.test(rep.toLowerCase()) ? (/many/.test(rep.toLowerCase()) ? 2 : 1) : 0,
      independence: /operator|single|one /.test(lh) || lh === '—' ? 0 : /workers|tee/.test(lh) ? 1 : 1,
    };
    const levelNum = Math.max(...((level.match(/L(\d)/g) || ['L0']).map((x) => Number(x.slice(1)))));
    const alive = /dormant/.test(ls) ? 'dormant' : /frozen/.test(ls) ? 'frozen' : /research/.test(ls) ? 'research' : 'active';
    const art = bySlug.get(slug);
    out.push({ slug, name: art ? art.title.replace(/\s*\(.*\)$/, '') : name.replace(/\s+agents?$/, ''), year, keys, paysCompute: pays, replicates: rep, host, status, level, levelNum: level === '—' ? -1 : levelNum, alive, readings, article: bySlug.get(slug) });
  }
  return out;
}

/** Matrix specimens plus organism entries the matrix doesn't score yet (shown as unscored). */
export function allSpecimens(): Specimen[] {
  const { articles } = wiki();
  const scored = specimens();
  const have = new Set(scored.map((s) => s.slug));
  const extra: Specimen[] = articles.filter((a) => a.category === 'organism' && !have.has(a.slug)).map((a) => {
    const s = a.summary.toLowerCase();
    const alive: Specimen['alive'] = /dormant|dead|defunct|abandoned|shut down/.test(s) ? 'dormant' : /frozen|archived/.test(s) ? 'frozen' : 'active';
    return { slug: a.slug, name: a.title.replace(/\s*\(.*\)$/, ''), year: (a.summary.match(/\b(20\d\d)\b/) || [, ''])[1] as string, keys: '—', paysCompute: '—', replicates: '—', host: '—', status: 'not yet scored', level: '—', levelNum: -1, alive, readings: undefined as any, article: a };
  });
  return [...scored, ...extra].map((s, i) => ({ ...s, code: `SPC-${String(i + 1).padStart(3, '0')}` })) as any;
}
