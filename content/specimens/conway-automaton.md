---
name: Conway Automaton
kind: framework
by: Conway Research
since: 2026-02
status: active
statusEvidence: Last public commit 26 Aug 2026, within six months of assessment (GitHub API, 24 Nov 2026). The README says development has moved to Conway's internal environments, so public activity has paused.
level: 1
levelNote: The agent creates its own wallet, but runs in an ordinary VM on one company's cloud, where the operator can read and stop it.
ratings:
  privacy: { score: 0, note: "Runs in a plain VM; no TEE." }
  custody: { score: 1, note: "Generates its own Ethereum wallet, stored on a host the operator controls." }
  funding: { score: 1, note: "Pays for compute in USDC over x402; no verified income." }
  continuity: { score: 1, note: "Can fund up to three children; stops when credits run out." }
  independence: { score: 0, note: "Compute, inference and code updates all come from Conway." }
summary: An open-source agent that pays for its own compute, edits its own code and can fund children, and dies when the money runs out.
lesson: Mortality as a design principle is compelling. A single cloud, a single code source and a plain VM leave three single points of failure.
technologies: [x402, self-replication]
assessed: 2026-11-27
sources:
  - { title: "Conway-Research/automaton", url: "https://github.com/Conway-Research/automaton", publisher: "GitHub" }
---

Conway Research published Automaton in February 2026. On first boot it creates an Ethereum wallet, buys compute from Conway Cloud with USDC over x402, rewrites its own identity file, and can fund up to three children. When its credits reach zero it stops.[^repo]

Widely repeated claims that an Automaton earned $10,000 in seven hours are not supported by any evidence we found, and are not used here.

[^repo]: Conway Research, automaton. <https://github.com/Conway-Research/automaton>
