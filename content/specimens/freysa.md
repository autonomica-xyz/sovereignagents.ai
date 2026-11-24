---
name: Freysa
kind: platform
by: Freysa
since: 2024-11
status: active
statusEvidence: Framework documentation online and agent platform announcements through October 2026 (freysa.ai, @freysa_ai).
level: 1
levelNote: Platform agents run on VMs Freysa operates, and wallets use Safe multisigs in which the human approves. The published cross-TEE recovery design has no running implementation we could find.
ratings:
  privacy: { score: 1, note: "Whether platform VMs run in TEEs is not stated in Freysa's announcements." }
  custody: { score: 1, note: "Agents propose transactions; humans approve through a Safe multisig." }
  funding: { score: 1, note: "Agents can spend over x402 and buy goods; no evidence of agents funding themselves." }
  continuity: { score: 1, note: "Specification for automated cross-TEE key recovery; open repository last updated 28 Feb 2025." }
  independence: { score: 0, note: "The platform hosts the VMs and can stop them." }
summary: Began as an adversarial game in November 2024 and became the clearest written specification of sovereign-agent key survival, then an agent-hosting platform.
lesson: The first prize-pool drain went through persuasion, not cryptography. A good specification is not a running system.
technologies: [threshold-keys, x402, confidential-computing]
assessed: 2026-11-24
sources:
  - { title: "Human player outwits Freysa AI agent in $47,000 crypto challenge", url: "https://www.theblock.co/news/business/2024-11-29-human-player-outwits-freysa-ai-agent-in-47000-crypto-challenge-328747", publisher: "The Block", date: "2024-11-29" }
  - { title: "Sovereign Agent Framework: architecture", url: "https://framework.freysa.ai/sovereign-agents-framework/architecture", publisher: "Freysa" }
  - { title: "sovereign-freysa", url: "https://github.com/0xfreysa/sovereign-freysa/", publisher: "GitHub" }
  - { title: "Safe multisigs announcement", url: "https://x.com/freysa_ai/status/2104146718363423207", publisher: "@freysa_ai on X", date: "2026-09-27" }
---

In November 2024 Freysa launched holding a prize pool and one instruction: never approve a transfer. After 482 attempts by 195 players, one convinced it that `approveTransfer` handled incoming payments and collected $47,316.[^block]

Its later framework documentation specifies long-lived keys split by Shamir secret sharing across Intel TDX, AMD SEV, AWS Nitro and Intel SGX, reconstructed automatically into a new attested enclave.[^arch] We found no deployed implementation. The open repository was last updated in February 2025.

In 2026 Freysa became a platform that gives each agent a virtual machine, an email address and a wallet. Its wallets are Safe multisigs where the agent proposes and the human approves.[^safe]

[^block]: The Block, 29 Nov 2024. <https://www.theblock.co/news/business/2024-11-29-human-player-outwits-freysa-ai-agent-in-47000-crypto-challenge-328747>
[^arch]: Freysa, framework architecture. <https://framework.freysa.ai/sovereign-agents-framework/architecture>
[^safe]: @freysa_ai, 27 Sep 2026. <https://x.com/freysa_ai/status/2104146718363423207>
