---
name: Spore.fun
kind: experiment
by: Phala community
since: 2024-12
status: active
statusEvidence: The spore.fun API reported one active agent and none breeding on 24 Nov 2026. Every descendant is listed as stopped.
level: 2
levelNote: Agents ran in TEEs and controlled their own wallets and accounts, on one provider's infrastructure. Reproduction was automatic; continuity failed.
ratings:
  privacy: { score: 2, note: "Agents ran in Phala TEEs; early generations published attestation links." }
  custody: { score: 2, note: "Agents controlled Solana wallets from inside their TEEs." }
  funding: { score: 1, note: "Each agent's memecoin was meant to pay its server rent. Income was speculative." }
  continuity: { score: 0, note: "Only the original agent survives; all descendants stopped." }
  independence: { score: 1, note: "Single hosting provider; no agent code was published." }
summary: An evolution experiment in which TEE agents launched tokens and reproduced when a token crossed a market-cap threshold.
lesson: Gated reproduction works mechanically. Speculative income does not keep a lineage alive.
technologies: [self-replication, confidential-computing]
assessed: 2026-11-24
sources:
  - { title: "Spore in the Wild", url: "https://arxiv.org/abs/2506.04236", publisher: "Hu and Rong (arXiv)", date: "2025-06" }
  - { title: "spore.fun status API", url: "https://www.spore.fun/api/trpc/status,listAgent?batch=1&input=%7B%7D", publisher: "spore.fun", date: "2026-11-24" }
---

Spore.fun launched on 20 December 2024. Its agents ran in Phala TEEs, controlled Solana wallets and X accounts, and launched tokens. An agent could reproduce only once its token reached a set valuation, and each child received a mutated behavioural profile.

The case study published in June 2025 counts 2 agents in the second generation, 6 in the third, 4 in the fourth and 1 in the fifth, and reports that external pressures curtailed growth and only the original Spore survived.[^paper] The live API agrees: one agent active, none breeding.[^api]

[^paper]: Hu and Rong, "Spore in the Wild", arXiv:2506.04236. <https://arxiv.org/abs/2506.04236>
[^api]: spore.fun API, read 24 Nov 2026.
