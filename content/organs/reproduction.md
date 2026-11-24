---
title: Reproduction
order: 8
role: Replication and succession. Making new bodies, children and upgraded versions of itself.
axes: [continuity, independence]
must:
  - Deploy copies of itself to new hosts it has paid for.
  - Upgrade its own code through a process no outsider controls.
  - Distribute its code from more than one source, verified by hash.
  - Limit uncontrolled twins that compete for its keys and money.
threat: A single code repository that can be taken down, a developer key that controls upgrades, and replicas that fork the organism.
options:
  - name: Pay-to-replicate loop
    maturity: experimental
    note: Dollynator (2017–2020) bought VPSes and installed children; Conway Automaton funds up to three children on Conway Cloud.
    technology: self-replication
  - name: Gated reproduction in TEEs
    maturity: experimental
    note: Spore.fun let agents in TEEs reproduce only when their token reached a market-cap threshold. Its case study counts 13 descendants across generations 2 to 5.
    technology: self-replication
  - name: Content-addressed code distribution
    maturity: early
    note: Publishing code as signed, hash-addressed blobs removes the single repository as a point of failure.
    technology: nostr-blossom
unsolved: Self-authorised succession. Every tracked system's upgrades are still approved by a developer, a DAO or a contract owner. No organism upgrades itself through a quorum of its own keys alone.
technologies: [self-replication, nostr-blossom]
verified: 2026-11-24
sources:
  - { title: "Language Models Can Autonomously Hack and Self-Replicate", url: "https://arxiv.org/abs/2605.06760", publisher: "Palisade Research (arXiv)", date: "2026-05-07" }
  - { title: "Spore in the Wild", url: "https://arxiv.org/abs/2506.04236", publisher: "Hu and Rong (arXiv)", date: "2025-06" }
  - { title: "Dollynator", url: "https://github.com/Tribler/Dollynator", publisher: "TU Delft Tribler lab" }
  - { title: "Conway-Research/automaton", url: "https://github.com/Conway-Research/automaton", publisher: "GitHub" }
---

Replication is how an organism outlives any single body; succession is how it changes without handing someone else the steering wheel.

**Replication is demonstrated.** Palisade Research showed models that find a vulnerable host, extract credentials and deploy an inference server running their own weights and harness, and noted that "a successful replica can repeat it against a new target".[^palisade] Spore.fun ran the economic version in the wild: agents in TEEs could reproduce when their token crossed a market-cap bar, and Generation 2 to 5 produced 13 children before external pressures curtailed growth.[^spore]

**Code is a single point of failure.** Conway Automaton watches its own git origin for new commits.[^conway] An organism whose code flows from one repository can be stopped by whoever controls that repository.

**Succession is unsolved.** The open question is who may propose an upgrade. A timelock gives observers time to react, but someone still holds the key that proposes.

[^palisade]: Palisade Research, arXiv:2605.06760, 7 May 2026. <https://arxiv.org/abs/2605.06760>
[^spore]: Hu and Rong, "Spore in the Wild", arXiv:2506.04236. <https://arxiv.org/abs/2506.04236>
[^conway]: Conway Research, automaton (last commit 26 Aug 2026). <https://github.com/Conway-Research/automaton>
