---
name: Ritual Chain agents
kind: platform
by: Ritual
since: 2026-10
status: active
statusEvidence: Mainnet launched 26 Oct 2026 (Ritual).
level: 2
levelNote: The chain itself schedules the agent and runs its inference in TEE executors, so there is no operator server to unplug. Everything rests on one network.
ratings:
  privacy: { score: 2, note: "Agent execution runs on TEE executors." }
  custody: { score: 2, note: "Agents pay from their own on-chain balance." }
  funding: { score: 0, note: "No evidence yet of agents earning on mainnet." }
  continuity: { score: 2, note: "Wakes on an on-chain scheduler with no keeper server." }
  independence: { score: 1, note: "One chain, its validators and its executor set." }
summary: An AI-native Layer 1 that calls its on-chain agents "sovereign agents". They wake on a protocol scheduler and pay for their own execution.
lesson: Removing the operator's server is real progress. Sovereign from servers is not sovereign from the network.
technologies: [confidential-computing, decentralised-inference]
assessed: 2026-11-27
sources:
  - { title: "Ritual mainnet is live", url: "https://www.ritualfoundation.org/blog/ritual-mainnet-is-live", publisher: "Ritual", date: "2026-10-26" }
  - { title: "Ritual developer docs", url: "https://docs.ritualfoundation.org/", publisher: "Ritual" }
---

Ritual's mainnet went live on 26 October 2026. Ritual reports that its community deployed more than 2,000 agents to testnet, sending more than 90 million transactions; these are Ritual's own figures.[^ritual]

[^ritual]: Ritual, "Ritual mainnet is live", 26 Oct 2026. <https://www.ritualfoundation.org/blog/ritual-mainnet-is-live>
