# sovereignagents.ai

A reference on sovereign agents: software that holds its own keys, pays for its own compute and runs where no single party can read or stop it. The site has three pillars:

- **Blueprint**: the nine organs an organism needs (`/blueprint/anatomy/`), the L0–L5 levels and five axes (`/blueprint/framework/`), and a reference build path (`/blueprint/build-path/`).
- **Ecosystem**: the tracker of existing attempts with levels and per-axis ratings (`/ecosystem/tracker/`), the methodology, builders, and a dated log of developments.
- **Technology**: sourced explainers with maturity assessments (`/technology/`).

Organs link to technologies, technologies to the tracked systems and builders using them, and developments to all three.

## Modes

The site has two modes over the same content and routes:

- **Organism** (default, at `/`): a bioluminescent field guide. The agent is drawn as an SVG cell whose nine organelles are the organs; each tracked system is a specimen plate generated from its scores.
- **Nerd** (at `/nerd/`): a terminal. Boot log, a clickable ASCII organism, `tail -f` of developments and grep-style search.

The `organism / nerd` switch in the header (or Shift+N) opens the same page in the other mode and remembers the choice in `localStorage`. The remembered choice only applies when someone enters at `/`: an inline script in `<head>` sends them to `/nerd/` before the page paints. Every other URL is honoured as written, so a shared `/nerd/…` link always opens in nerd mode.

The output is fully static and needs no server rules. Old v3 preview paths are static redirect pages (meta refresh plus script, with a canonical link): `/a/*` and `/d/*` go to `/*`, and `/c/*` goes to `/nerd/*`. A single root `404.html` sends unknown `/a/`, `/c/` or `/d/` paths to their new home and shows the nerd 404 for missing pages under `/nerd/`.

Pages in `src/pages/` and components in `src/components/` are shared. Each mode lives in `src/themes/<mode>/` and supplies `config.ts`, `Shell.astro` (header and footer), `Home.astro`, four figure components (`AnatomyFigure`, `OrganFigure`, `TrackerFigure`, `SpecimenFigure`) and `theme.css`, which sets the design tokens used by `src/styles/structure.css`. The build resolves `@theme` to the chosen mode; nerd pages get their internal links prefixed with `/nerd`.

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
npm run dev             # organism mode at http://localhost:4321/
MODE=nerd npm run dev   # nerd mode at http://localhost:4321/nerd/
npm run build           # both modes into dist/ (nerd in dist/nerd/)
npm run check           # every internal link and #anchor in dist/
```

## Deploy

| Environment | Where | Deploys from | How |
|---|---|---|---|
| Production | GitHub Pages, https://sovereignagents.ai | `main` | `.github/workflows/pages.yml` on every push to `main`, or run it by hand (workflow_dispatch) |
| Development | exe.dev preview, https://sovereignagents.exe.xyz | any branch | `deploy/deploy-exe.py` |

Both run the same `npm run build`. Canonical URLs always point at https://sovereignagents.ai. Preview builds (`DEPLOY_ENV=preview`, set by `deploy/rebuild.sh`) add a "preview" badge and `noindex`, write a `robots.txt` that disallows crawling, and drop the `CNAME` file. Production builds never do any of these.

### Production: GitHub Pages

The repository's Pages source is GitHub Actions. The workflow (`.github/workflows/pages.yml`) builds the site, checks every internal link, and publishes `dist/` with `actions/upload-pages-artifact` and `actions/deploy-pages`.

The build assumes it is served from the root of a domain (`base: '/'`), which is right for the custom domain `sovereignagents.ai` (`public/CNAME`). The default project URL, `autonomica-xyz.github.io/sovereignagents.ai/`, serves the site under `/sovereignagents.ai/` instead, so root-relative links and assets would break there. Use the custom domain. If the project URL is ever needed before DNS is set up, the build would need `base: '/sovereignagents.ai'` and a matching prefix for internal links.

With an Actions workflow, GitHub ignores the `CNAME` file. The custom domain is set in the repository's Settings → Pages. The file is kept as a record of the intended domain.

### Development: exe.dev preview

The preview runs on an exe.dev VM (`sovereignagents`) behind nginx and can be deployed from any branch:

```sh
EXE_TOKEN_SIGNER=/path/to/exe-token.py python3 deploy/deploy-exe.py --vm sovereignagents --public
```

`deploy/deploy-exe.py` uploads the checked-out source, `deploy/vm-setup.sh` installs Node and nginx, and `deploy/rebuild.sh` builds a preview into a new release directory, checks links, and switches the live symlink atomically. nginx only serves files and the root `404.html`, like Pages, so the preview behaves the same as production.

## Licence

MIT
