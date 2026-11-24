---
title: Keys
order: 2
role: Custody. The private keys that are the organism's identity and its money.
axes: [custody, continuity]
must:
  - Generate keys inside its own protected memory, so no human ever sees them.
  - Split long-term keys across bodies so that seizing one machine seizes nothing.
  - Recover and rotate keys without a human committee.
  - Keep the model itself away from the master key, and let it hold only capped spending keys.
threat: Seizure of a host, theft of a root key, a custodian freezing funds, and a human recovery path that becomes a back door.
options:
  - name: Key generated and sealed in a single enclave
    maturity: production
    note: TEE_HEE_HE (2024) generated its own Ethereum key and X credentials inside Intel TDX. One machine, so one point of failure.
    technology: confidential-computing
  - name: Threshold signatures (FROST, MPC networks)
    maturity: production
    note: FROST (RFC 9591) lets t-of-n shares produce one ordinary Schnorr signature. NEAR's MPC network signs for Shade Agents.
    technology: threshold-keys
  - name: On-chain key-management policy
    maturity: early
    note: dstack apps whose key-release policy lives in their own contract were unaffected when Phala's legacy root key was stolen in November 2026.
    technology: threshold-keys
unsolved: No deployed system splits an organism's key across two or more TEE vendors with automated recovery and no human quorum. Freysa's framework describes cross-TEE recovery, but no running implementation has been found.
technologies: [threshold-keys, confidential-computing]
verified: 2026-11-24
sources:
  - { title: "RFC 9591: The FROST Protocol for Two-Round Schnorr Threshold Signatures", url: "https://www.rfc-editor.org/rfc/rfc9591", publisher: "IETF", date: "2024-06" }
  - { title: "Setting Your Pet Rock Free", url: "https://nousresearch.com/setting-your-pet-rock-free", publisher: "Nous Research / Teleport", date: "2024-10" }
  - { title: "Phala November Detailed Incident Report", url: "https://phala.com/posts/phala-november-detailed-incident-report", publisher: "Phala", date: "2026-11-23" }
  - { title: "Shade Agents: the first truly autonomous AI agents", url: "https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents", publisher: "NEAR" }
  - { title: "Sovereign Agent Framework: architecture", url: "https://framework.freysa.ai/sovereign-agents-framework/architecture", publisher: "Freysa" }
---

Whoever holds the keys is the organism's principal. Everything else on this site is in service of making sure that is the organism itself.

**Born in the enclave.** The first public demonstration came in October 2024. TEE_HEE_HE generated the private key to an Ethereum address inside a TEE and never released it, and it took exclusive control of its X account by changing the credentials from inside the enclave.[^pet] The technique works, but a key in one enclave dies with that machine.

**Split across bodies.** FROST, standardised as RFC 9591, lets any t of n share-holders produce a single Schnorr signature indistinguishable from an ordinary one.[^frost] NEAR's Shade Agents keep no long-term key in the agent at all. Each TEE worker registers its attestation with a contract, and the contract asks NEAR's MPC network to sign.[^near]

**Policy that the host cannot change.** On 5 November 2026 an attacker obtained the root key of Phala Cloud's legacy key-management service. Phala's final report recommends that stateful services which must survive a compromised host use "a KMS whose release policy the host operator cannot change, such as the on-chain KMS".[^phala] Apps on the on-chain KMS were not affected.

[^pet]: Nous Research and Teleport, "Setting Your Pet Rock Free", Oct 2024. <https://nousresearch.com/setting-your-pet-rock-free>
[^frost]: IETF, RFC 9591, Jun 2024. <https://www.rfc-editor.org/rfc/rfc9591>
[^near]: NEAR, "Shade Agents". <https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents>
[^phala]: Phala, "Phala November Detailed Incident Report", 23 Nov 2026. <https://phala.com/posts/phala-november-detailed-incident-report>
