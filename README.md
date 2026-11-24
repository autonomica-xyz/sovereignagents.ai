# sovereignagents.ai

A reference on sovereign agents: software that holds its own keys, pays for its own compute and runs where no single party can read or stop it. The site has three pillars:

- **Blueprint**: the nine organs an organism needs (`/blueprint/anatomy/`), the L0–L5 levels and five axes (`/blueprint/framework/`), and a reference build path (`/blueprint/build-path/`).
- **Ecosystem**: the tracker of existing attempts with levels and per-axis ratings (`/ecosystem/tracker/`), the methodology, builders, and a dated log of developments.
- **Technology**: sourced explainers with maturity assessments (`/technology/`).

Organs link to technologies, technologies to the tracked systems and builders using them, and developments to all three.

## Content

All content is editor-owned and lives in `content/`. It is a distillation of the research notebook ([sovereign-agents-research](https://github.com/autonomica-xyz/sovereign-agents-research)), not a mirror of it: only claims that have been checked against sources are included.

| Path | Collection | One entry is |
|---|---|---|
| `content/organs/*.md` | `organs` | An organ: what it must do, threat, options with maturity, the unsolved part, axes |
| `content/technologies/*.md` | `technologies` | A technology explainer with components, verdict and maturity |
| `content/specimens/*.md` | `specimens` | A tracked system: level, five ratings with notes, status with evidence |
| `content/developments.yaml` | `developments` | A dated, sourced development |
| `content/builders.yaml` | `builders` | An organisation, lab, project or protocol |
| `content/pages/*.md` | `pages` | Framework, methodology, about, build path |

The schema is in `src/content.config.ts`. Every entry needs `sources` and a `verified` or `assessed` date, and cross-references (organ ↔ technology ↔ specimen) are typed, so a missing field, a misspelt slug or a broken reference fails the build. Body text uses footnotes (`[^1]`) for citations.

### Editorial rules

- Every factual claim links to a source; prefer primary sources.
- Label figures that come only from the project itself as self-reported.
- Leave out claims that cannot be confirmed.
- Status is `unknown` unless there is evidence; see `/ecosystem/methodology/`.
- Update the `verified` / `assessed` date when an entry is re-checked.

## Develop

Requires Node 22.23.4 or later.

```sh
npm ci
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run check      # every internal link and #anchor in dist/
```

## Deploy

The preview runs on an exe.dev VM (`sovereignagents`) behind nginx. Content changes go through commits; there is no scheduled rebuild.

```sh
EXE_TOKEN_SIGNER=/path/to/exe-token.py python3 deploy/deploy-exe.py --vm sovereignagents --public
```

`deploy/deploy-exe.py` uploads the source, `deploy/vm-setup.sh` installs Node and nginx, and `deploy/rebuild.sh` builds into a new release directory, checks links, and switches the live symlink atomically.

## Licence

MIT
