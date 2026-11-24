---
title: Immune system
order: 9
role: Defence. Recognising and surviving the ways organisms are killed.
axes: [privacy, custody, funding, continuity, independence]
must:
  - Keep the model away from any key or permission that can move all its funds.
  - Treat every message, package and tool as possibly hostile.
  - Detect compromise of a body and cut it off from the quorum.
  - Assume that any one TEE vendor, host or provider will eventually fail.
threat: Prompt injection, supply-chain worms, permission-chain abuse, host compromise and physical TEE attacks.
options:
  - name: Spending policy outside the model
    maturity: production
    note: Capped session keys and contract guardrails limit what a manipulated model can do.
    technology: threshold-keys
  - name: Diversity across vendors and hosts
    maturity: early
    note: Running on TDX and SEV-SNP at different hosts means one break is survivable.
    technology: confidential-computing
unsolved: Manipulation. Every drain on record so far went through the agent's reasoning or its permissions, not through broken cryptography, and no harness reliably resists adversarial input.
technologies: [confidential-computing, threshold-keys]
verified: 2026-11-24
sources:
  - { title: "Human player outwits Freysa AI agent in $47,000 crypto challenge", url: "https://www.theblock.co/news/business/2024-11-29-human-player-outwits-freysa-ai-agent-in-47000-crypto-challenge-328747", publisher: "The Block", date: "2024-11-29" }
  - { title: "Massive supply-chain attack compromises 440 packages under four hours", url: "https://cyberscoop.com/supply-chain-attack-malware-mini-shai-hulud-teampcp/", publisher: "CyberScoop", date: "2026-08-04" }
  - { title: "Phala November Detailed Incident Report", url: "https://phala.com/posts/phala-november-detailed-incident-report", publisher: "Phala", date: "2026-11-23" }
  - { title: "Battering RAM", url: "https://batteringram.eu/", publisher: "KU Leuven / University of Birmingham" }
---

Organisms die in recognisable ways. The immune system is the discipline of designing against each of them before it happens.

**Manipulation.** In November 2024 Freysa guarded a prize pool with one rule: never approve a transfer. After 482 attempts by 195 players, one convinced it that its `approveTransfer` function handled incoming funds, and won $47,316.[^freysa] The lesson is architectural: the model should never hold a permission that a persuasive message can turn into a drain.

**Supply chain.** On 4 August 2026 a self-replicating worm built on the Mini Shai-Hulud code injected malicious code into more than 440 npm packages in under four hours, after compromising a maintainer's GitHub account.[^chaindrop] An organism that installs dependencies at runtime inherits every compromised maintainer.

**The host's software, not the hardware.** Phala's November 2026 breach began with host management interfaces that "trusted any request from the local machine".[^phala] The defence is a key policy the host cannot change and bodies spread across operators.

**Physics.** Memory-bus interposers break today's TEEs.[^br] Diversity across vendors and hosts, not trust in any one of them, is what keeps one break from being fatal.

[^freysa]: The Block, 29 Nov 2024. <https://www.theblock.co/news/business/2024-11-29-human-player-outwits-freysa-ai-agent-in-47000-crypto-challenge-328747>
[^chaindrop]: CyberScoop, 4 Aug 2026. <https://cyberscoop.com/supply-chain-attack-malware-mini-shai-hulud-teampcp/>
[^phala]: Phala, 23 Nov 2026. <https://phala.com/posts/phala-november-detailed-incident-report>
[^br]: Battering RAM. <https://batteringram.eu/>
