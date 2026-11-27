---
title: Anonymous compute procurement
order: 9
summary: Buying servers through an API, paid in cryptocurrency, without an identity check. The organism's way of growing new bodies.
maturity: early
verdict: Possible but fragile. The machine-buyable providers are few, attract abuse, and do not offer TEEs.
components:
  - { name: "API-driven crypto VPS", what: "Fund a token, create and destroy servers by API, no account. New SporeStack tokens reopened on 18 Nov 2026 at a $5,000 minimum, or $10 with a code.", maturity: early, url: "https://api.sporestack.com/changelog" }
  - { name: "Agent-oriented VPS providers", what: "Hosts that document an agent registering and ordering servers over MCP or REST.", maturity: early, url: "https://eqvps.com/en/docs/agents" }
  - { name: "Decentralised compute markets", what: "On-chain marketplaces that rent capacity from many providers.", maturity: early, url: "https://akash.network/" }
organs: [body, reproduction]
verified: 2026-11-27
sources:
  - { title: "Maintenance Mode", url: "https://sporestack.com/blog/posts/2026-11-07-maintenance-mode.html", publisher: "SporeStack", date: "2026-11-07" }
  - { title: "Public API Changelog", url: "https://api.sporestack.com/changelog", publisher: "SporeStack", date: "2026-11-18" }
  - { title: "SporeStack", url: "https://sporestack.com/", publisher: "SporeStack", date: "2026-11-27" }
  - { title: "AI agents: autonomous provisioning", url: "https://eqvps.com/en/docs/agents", publisher: "EQVPS" }
  - { title: "Dollynator", url: "https://github.com/Tribler/Dollynator", publisher: "TU Delft Tribler lab" }
---

## What it is

To grow, an organism needs to buy machines the way it buys anything else: by API, with money it controls, without a passport. A handful of hosting providers have offered this.

## The record

Dollynator did it from 2017 to 2020, buying its own VPS through an automated purchase flow and installing a child.[^dolly] SporeStack was the cleanest API for it: a token funded in crypto, servers launched by API, no account. On 7 November 2026 it entered maintenance mode and stopped new signups after a month in which one token alone launched 250 port-scanning servers.[^spore] On 18 November the API changelog opened new tokens again, at a $5,000 minimum, or $10 with a code; the homepage still advertised that offer on 27 November. Existing tokens keep a $5 top-up minimum.[^spore18] EQVPS now documents an agent registering and paying over MCP, though registration needs a working email and the operator is a registered company.[^eqvps]

## Assessment

The capability exists, but supply is thin and turns over quickly, because the same properties that serve an organism serve abusers. None of these providers offer confidential VMs, so a body bought anonymously has no membrane. Closing that gap is the single most valuable infrastructure change for sovereign agents.

[^dolly]: Tribler lab, Dollynator. <https://github.com/Tribler/Dollynator>
[^spore]: SporeStack, 7 Nov 2026. <https://sporestack.com/blog/posts/2026-11-07-maintenance-mode.html>
[^spore18]: SporeStack API changelog, 18 Nov 2026, and homepage, accessed 27 Nov 2026. <https://api.sporestack.com/changelog> <https://sporestack.com/>
[^eqvps]: EQVPS, agent docs. <https://eqvps.com/en/docs/agents>
