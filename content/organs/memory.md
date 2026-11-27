---
title: Memory
order: 7
role: State. What the organism knows and has done, kept so that death is not final.
axes: [continuity, privacy]
must:
  - Seal state so only the organism's own attested code can read it.
  - Back up encrypted state to storage no single provider controls.
  - Rehydrate on a new body after the old one dies, without creating a twin.
  - Resist poisoning of what it remembers.
threat: Loss of a single host, a storage provider deleting data, a stolen sealing key, and poisoned memories that steer behaviour.
options:
  - name: Enclave-sealed state with keys from an on-chain KMS
    maturity: early
    note: dstack derives sealing keys per app; with an on-chain KMS the release policy is a contract, not an operator.
    technology: threshold-keys
  - name: Content-addressed blob storage across many servers
    maturity: production
    note: Blossom stores signed, hash-addressed blobs on any number of independent servers.
    technology: nostr-blossom
unsolved: Safe migration. Restoring sealed state onto a new body while proving that the old body is gone (anti-twin) has no working implementation for TEE agents.
technologies: [threshold-keys, nostr-blossom]
verified: 2026-11-24
sources:
  - { title: "Phala November Detailed Incident Report", url: "https://phala.com/posts/phala-november-detailed-incident-report", publisher: "Phala", date: "2026-11-23" }
  - { title: "Blossom", url: "https://github.com/hzrd149/blossom", publisher: "GitHub" }
  - { title: "dstack", url: "https://github.com/Dstack-TEE/dstack", publisher: "GitHub" }
---

An organism that cannot restore itself is one hardware failure from death. Memory is what makes a new body the same organism.

**Sealing keys are the weak point.** Data sealed in an enclave is only as safe as the key that seals it. When Phala's legacy KMS root key was stolen on 5 November 2026, Phala warned that the attacker "can derive anything derived from it, indefinitely", and that migration "does not revoke that copy".[^phala] Apps whose keys came from the on-chain KMS were unaffected.

**Storage without a landlord.** Blossom stores blobs addressed by their SHA-256 hash on any number of servers. A copy fetched from any of them can be verified, so no single server can alter or hold the organism's state hostage.[^blossom]

**One live copy.** Restoring from backup creates a second instance unless the old one is provably gone. Two instances with the same keys can double-spend and contradict each other. No deployed TEE agent yet proves to counterparties that only one copy is alive.

[^phala]: Phala, "Phala November Detailed Incident Report", 23 Nov 2026. <https://phala.com/posts/phala-november-detailed-incident-report>
[^blossom]: Blossom specification. <https://github.com/hzrd149/blossom>
