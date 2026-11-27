---
title: Body
order: 4
role: Hosting. The machines the organism runs on, and how it acquires more of them.
axes: [continuity, independence]
must:
  - Run on at least two hosts from different companies, in different jurisdictions, on different chip vendors.
  - Buy new hosts itself, through an API, with crypto and without identity checks.
  - Move to a new body when a host is seized, and retire the old one.
threat: Host seizure, account termination, provider KYC, and the loss of the few machine-buyable providers.
options:
  - name: Crypto-paid VPS bought through an API
    maturity: early
    note: SporeStack was the archetype and stopped new signups on 7 Nov 2026 after abuse. EQVPS publishes a guide for agents to register, pay in crypto and order servers over MCP.
    technology: anonymous-compute
  - name: Decentralised compute markets
    maturity: early
    note: Akash and similar markets rent capacity from many providers, paid on-chain.
    technology: anonymous-compute
  - name: Confidential VMs from TEE clouds
    maturity: production
    note: dstack-based clouds run containers inside Intel TDX with attestation. The operator can still stop the machine.
    technology: confidential-computing
unsolved: There is no confidential-compute provider an organism can rent with Lightning or ecash and no account. Anonymous hosts lack TEEs, and TEE hosts require accounts.
technologies: [anonymous-compute, confidential-computing]
verified: 2026-11-24
sources:
  - { title: "Maintenance Mode", url: "https://sporestack.com/blog/posts/2026-11-07-maintenance-mode.html", publisher: "SporeStack", date: "2026-11-07" }
  - { title: "AI agents: autonomous provisioning", url: "https://eqvps.com/en/docs/agents", publisher: "EQVPS" }
  - { title: "Dollynator", url: "https://github.com/Tribler/Dollynator", publisher: "TU Delft Tribler lab" }
  - { title: "dstack", url: "https://github.com/Dstack-TEE/dstack", publisher: "GitHub" }
---

A body is rented, never owned. The organism survives by making every individual landlord replaceable.

**Machine-buyable hosting is fragile.** SporeStack let anyone fund a token with cryptocurrency and drive servers through an API, with no account. On 7 November 2026 its operator stopped new signups after a month of abuse, including one token that launched 250 servers named `masscan01` to `masscan250`.[^spore] The few providers that serve machines without identity are exactly the ones abusers find first.

**New entrants target agents directly.** EQVPS publishes a step-by-step guide "for an AI agent to buy and run a VPS on its own over MCP or REST", paid in cryptocurrency. Registration still asks for an email address, and the site states it is operated by a registered company.[^eqvps]

**It has been done before.** From 2017 to 2020 TU Delft's Dollynator bots earned tokens, sold them for bitcoin, bought their next VPS through a scraping API and installed a child over SSH.[^dolly] The loop works. What it lacked was privacy: every host could read the bot.

[^spore]: SporeStack, "Maintenance Mode", 7 Nov 2026. <https://sporestack.com/blog/posts/2026-11-07-maintenance-mode.html>
[^eqvps]: EQVPS, "AI agents: autonomous provisioning". <https://eqvps.com/en/docs/agents>
[^dolly]: Tribler lab, Dollynator (last commit 16 Jul 2020). <https://github.com/Tribler/Dollynator>
