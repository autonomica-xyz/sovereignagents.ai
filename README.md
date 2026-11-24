# sovereignagents.ai — knowledge-base site

The public face of the [sovereign-agents-research](https://github.com/autonomica-xyz/sovereign-agents-research)
wiki: the latest developments in sovereign agents (digital organisms that no third party can
read, stop, steer or seize) and an easy way to explore everything the research has gathered.

This repo currently holds **three medium-fidelity design proposals** side by side, built from the
same live content:

| Route | Proposal | Idea |
|---|---|---|
| `/` | Chooser | Thumbnails and a two-line pitch for each direction |
| `/proposal-a` | **Field Journal** | Editorial/longform: a masthead, dated dispatches from each research pass, "The Wire" of wiki changes, the L0–L5 ladder, departments, drop-cap articles with margin TOC and "cited by" backlinks |
| `/proposal-b` | **Atlas** | Full-screen force graph of the wiki (every entry a node, every link an edge), an organism-anatomy explorer that maps building blocks to organs (brain, membrane, keys, metabolism, body, nervous system, memory, germline, immune system), signals feed, articles with a local ego-graph |
| `/proposal-c` | **Specimen Catalog** | Living dashboard: tracked agents as specimens with sovereignty level, five-axis radar (privacy, custody, funding, continuity, independence) and a pulse, filters, habitats (compute) and pathogens (attacks), a sortable full index, data-sheet articles |

Every proposal has a home page, a latest-developments feed, browsing by category, article pages
with backlinks and rendered Mermaid diagrams, and instant client-side search (press `/` or ⌘K).

## How content gets in

Content is **not** copied into this repo. At build time `scripts/sync-content.mjs` clones (or
fast-forwards) the research repo into `content-src/` and writes `content-src/.site-meta.json` with
the last 120 commits, which feed the "latest developments" views.

`src/lib/wiki.ts` then reads:

- `wiki/pages/*.md`: atomic entries (frontmatter `category`, `status`, `updated`; first `>`
  blockquote is the summary). Pages without a category are treated as hubs.
- `docs/*.md`: long reads.
- `wiki/log/*.md`: dated research dispatches.
- `wiki/pages/timeline.md`, `organism-comparison-matrix.md`: lineage and specimen data.
- `wiki/open-questions.md`, `INDEX.md`, `SCHEMA.md`, `sources.md`.

Relative `.md` links and `[[wikilinks]]` become site routes; backlinks are computed from them.
` ```mermaid ` blocks render client-side. The graph layout (`/graph.json`) and search index
(`/search-index.json`) are generated at build. New wiki pages show up on the next build with no
code change.

Environment overrides: `CONTENT_REPO`, `CONTENT_REF` (default `main`), `CONTENT_DIR` (use an
existing local checkout).

The organ map lives in `src/lib/organism.ts`. Specimen radar readings are derived mechanically from
the comparison-matrix columns (none / partial / strong), so the site never invents scores the wiki
doesn't contain.

## Build locally

Requires Node ≥ 22.23.4.

```bash
npm ci
npm run build      # sync content + astro build -> dist/
npm run preview    # serve dist/ on :4321
npm run dev        # dev server (run `npm run content` once first)
```

## Deploy to exe.dev

`deploy/deploy-exe.py` uses the exe.dev HTTPS API (no SSH needed). It uploads the source as a
tarball, then `deploy/vm-setup.sh` on the VM installs Node, builds from the live wiki, serves the
result with nginx on port 8000 and installs a systemd timer (`sa-refresh.timer`) that pulls the wiki
and rebuilds **every 30 minutes**. Each build goes into `releases/<timestamp>` and `current` is
swapped atomically, so a failed build never takes the site down.

```bash
# token: either a pre-minted one whose cmds include "ssh <vm>", "share port", "share set-public"…
export EXE_TOKEN=exe0....
# …or a local signer script that prints a token for a permissions JSON
# (see https://exe.dev/docs/https-api-local-key)
export EXE_TOKEN_SIGNER=/path/to/exe-token.py

python3 deploy/deploy-exe.py --vm sovereignagents --create --public   # first time
python3 deploy/deploy-exe.py --vm sovereignagents                     # ship code changes
python3 deploy/deploy-exe.py --vm sovereignagents --rebuild-only      # pull wiki + rebuild now
```

The preview lives at <https://sovereignagents.exe.xyz/>.

## Layout

```
scripts/sync-content.mjs   pull the wiki + commit history
src/lib/wiki.ts            markdown loader, link rewriting, backlinks, feeds
src/lib/organism.ts        anatomy (organs → pages), levels, specimens
src/lib/graph.ts           build-time force layout -> /graph.json
src/components/            Search, Mermaid, Anatomy, Vitals, SpecCard, IndexTable
src/layouts/               JournalLayout (A), AtlasLayout (B), CatalogLayout (C)
src/pages/proposal-{a,b,c} home, feed, browse, browse/[cat], wiki/[slug] (+ B anatomy, C specimens)
deploy/                    exe.dev deploy, VM setup, rebuild
```

Site code: MIT. Content: CC-BY-4.0, from the research repo.
