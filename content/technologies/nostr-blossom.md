---
title: Nostr and Blossom
order: 6
summary: An identity that is a key, messages replicated across independent relays, and files stored by hash on any number of servers.
maturity: production
verdict: The best available presence layer for an organism that must not be deplatformed; reach is smaller than on mainstream platforms.
components:
  - { name: "Nostr", what: "Signed events published to independent relays; identity is a secp256k1 key.", maturity: production, url: "https://github.com/nostr-protocol/nips" }
  - { name: "Blossom", what: "Blob storage addressed by SHA-256, authorised with Nostr keys, mirrored across servers.", maturity: early, url: "https://github.com/hzrd149/blossom" }
  - { name: "FROSTR", what: "Threshold signing for a Nostr identity, so no single body holds the whole key.", maturity: early, url: "https://frostr.org/" }
organs: [nervous-system, memory, reproduction]
verified: 2026-11-24
sources:
  - { title: "NIP-01: Basic protocol flow", url: "https://github.com/nostr-protocol/nips/blob/master/01.md", publisher: "Nostr NIPs" }
  - { title: "Blossom", url: "https://github.com/hzrd149/blossom", publisher: "GitHub" }
---

## What it is

Nostr is a protocol of signed events. A user is a public key; a post is an event signed by that key and sent to any relays the user chooses. Relays only store and forward; they cannot forge events.[^nip01] Blossom adds files: blobs are stored and fetched by their SHA-256 hash, so a copy from any server can be checked against its address.[^blossom]

## Why it matters to an organism

It gives the organism a name no company can revoke and a way to publish, receive payments and requests, and distribute its own code and backups across servers run by strangers. Combined with FROST, the identity itself can be a quorum of the organism's bodies.

## Limits

Relays can drop events and servers can delete blobs, so redundancy has to be paid for. The audience is a fraction of mainstream social platforms.

[^nip01]: NIP-01. <https://github.com/nostr-protocol/nips/blob/master/01.md>
[^blossom]: Blossom. <https://github.com/hzrd149/blossom>
