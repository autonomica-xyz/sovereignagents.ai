---
name: NEAR Shade Agents
kind: framework
by: NEAR
since: 2025
status: active
statusEvidence: shade-agent-framework repository pushed 14 Oct 2026 (GitHub API, 24 Nov 2026).
level: 2
levelNote: Keys are held by a contract and an MPC network, never by a worker, and any number of attested workers can run. A contract owner can still change the approved code unless the contract is locked; L3 is reachable if it is.
ratings:
  privacy: { score: 2, note: "Workers run in TEEs and prove their code hash to the contract." }
  custody: { score: 2, note: "Signing is done by NEAR's MPC network for the agent contract; no single machine holds the key." }
  funding: { score: 0, note: "A framework; income depends on the agent built on it." }
  continuity: { score: 2, note: "Workers are interchangeable; losing one loses nothing." }
  independence: { score: 1, note: "Depends on one chain and one MPC network, and on whoever owns the contract." }
summary: NEAR's framework for agents whose keys live in a contract and an MPC network, with TEE workers that register by attestation.
lesson: The cleanest shipping pattern for custody and continuity. Sovereignty ends where the contract owner's rights begin.
technologies: [threshold-keys, confidential-computing]
assessed: 2026-11-24
sources:
  - { title: "Shade Agents", url: "https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents", publisher: "NEAR" }
  - { title: "shade-agent-framework", url: "https://github.com/NearDeFi/shade-agent-framework", publisher: "GitHub" }
---

Each Shade Agent worker runs in a TEE, creates a fresh key at boot and registers its remote attestation with the agent's contract, which stores the expected code hash. The contract then asks NEAR's MPC network to sign transactions on many chains.[^near]

Because the key belongs to the contract, workers can come and go. Whoever controls the contract can still change which code it accepts.

[^near]: NEAR, "Shade Agents". <https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents>
