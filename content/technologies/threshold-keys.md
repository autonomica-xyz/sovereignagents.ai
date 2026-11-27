---
title: Threshold keys and on-chain key management
order: 2
summary: Splitting a key so that no single machine holds it, and putting the rules for releasing keys into a contract instead of an operator's server.
maturity: early
verdict: The building blocks are standardised and in production; combining them into one organism-held quorum across TEE vendors, with no human recovery, has not been done.
components:
  - { name: "FROST (RFC 9591)", what: "t-of-n Schnorr threshold signatures that look like ordinary signatures; fits Bitcoin Taproot and Nostr keys.", maturity: production, url: "https://www.rfc-editor.org/rfc/rfc9591" }
  - { name: "FROSTR", what: "Splits a Nostr secret key into FROST shares that co-sign over Nostr; the public key stays the same.", maturity: early, url: "https://frostr.org/" }
  - { name: "NEAR MPC / Chain Signatures", what: "A network of nodes that signs for NEAR contracts on many chains; used by Shade Agents.", maturity: production, url: "https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents" }
  - { name: "dstack on-chain KMS", what: "Key-release policy for TEE apps held in a smart contract rather than by the cloud operator.", maturity: early, url: "https://github.com/Dstack-TEE/dstack" }
organs: [keys, memory, immune-system]
verified: 2026-11-27
sources:
  - { title: "RFC 9591", url: "https://www.rfc-editor.org/rfc/rfc9591", publisher: "IETF", date: "2024-06" }
  - { title: "Shade Agents", url: "https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents", publisher: "NEAR" }
  - { title: "near/mpc changelog, 3.19.0", url: "https://github.com/near/mpc/blob/main/CHANGELOG.md", publisher: "GitHub", date: "2026-11-12" }
  - { title: "Phala November Detailed Incident Report", url: "https://phala.com/posts/phala-november-detailed-incident-report", publisher: "Phala", date: "2026-11-23" }
  - { title: "Sovereign Agent Framework: architecture", url: "https://framework.freysa.ai/sovereign-agents-framework/architecture", publisher: "Freysa" }
---

## What it is

A threshold scheme splits one secret into n shares so that any t of them can act and fewer than t learn nothing. FROST, standardised by the IETF as RFC 9591 in 2024, produces a single Schnorr signature from t signers; outsiders cannot tell that a quorum signed.[^frost] MPC networks such as NEAR's sign on behalf of smart contracts, so a contract can effectively own a Bitcoin or Ethereum key.

On-chain key management moves the decision "which code gets this key" from an operator's server into a contract whose rules are public and whose changes can be timelocked.

## Why it matters

A key held whole in one place can be seized from that place. NEAR's Shade Agents show the pattern: each TEE worker makes a fresh key at boot, proves its code hash to the agent's contract, and the contract requests signatures from the MPC network. Losing a worker loses nothing.[^near] Release 3.19.0 of that network, published 12 November 2026, removed ECDSA presignatures, closing a TEE-rollback share-leak path; a later 3.19.1 patch is testnet-only.[^mpc]

The November 2026 Phala breach is the clearest evidence for on-chain policy. The attacker took the legacy KMS root key; apps "on the on-chain KMS" were listed as not affected, and Phala now recommends a KMS "whose release policy the host operator cannot change".[^phala]

## What is missing

- **Cross-vendor recovery.** Freysa's framework documentation specifies Shamir shares spread across TDX, SEV, Nitro and SGX that recover keys with no human intervention.[^freysa] We found no running implementation.
- **Who controls the contract.** A Shade Agent's contract owner can change the approved code hashes unless the contract is made immutable. The quorum is only as sovereign as whoever can amend its rules.

[^frost]: IETF RFC 9591. <https://www.rfc-editor.org/rfc/rfc9591>
[^near]: NEAR, "Shade Agents". <https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents>
[^mpc]: near/mpc changelog, 3.19.0, 12 Nov 2026. <https://github.com/near/mpc/blob/main/CHANGELOG.md>
[^phala]: Phala, 23 Nov 2026. <https://phala.com/posts/phala-november-detailed-incident-report>
[^freysa]: Freysa, Sovereign Agent Framework architecture. <https://framework.freysa.ai/sovereign-agents-framework/architecture>
