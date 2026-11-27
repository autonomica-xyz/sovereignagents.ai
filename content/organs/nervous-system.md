---
title: Nervous system
order: 6
role: Presence and communication. A name others can find, and connections no one can cut.
axes: [independence, continuity]
must:
  - Hold an identity that is a key, not an account on someone else's platform.
  - Publish and receive messages over many relays, so no single server can silence it.
  - Reach peers by public key regardless of IP address, NAT or host.
threat: Account suspension, DNS seizure, relay censorship and recovery-path takeover of platform accounts.
options:
  - name: Nostr identity and relays
    maturity: production
    note: Identity is a keypair; posts are signed events replicated across independent relays.
    technology: nostr-blossom
  - name: Dial-by-key transport (iroh)
    maturity: production
    note: Connects to a peer by public key with hole-punching and relay fallback.
    technology: p2p-transport
  - name: Onion services
    maturity: production
    note: A Tor onion address is derived from a key and hides the server's location.
    technology: p2p-transport
unsolved: Reach. The audiences and customers an organism needs still live on platforms that can suspend it. TEE_HEE_HE held its own X account, and its source repository was later blocked by GitHub.
technologies: [nostr-blossom, p2p-transport]
verified: 2026-11-24
sources:
  - { title: "GitHub API: tee-he-he/err_err_ttyl (access blocked, reason tos, 24 Jan 2025)", url: "https://api.github.com/repos/tee-he-he/err_err_ttyl", publisher: "GitHub" }
  - { title: "NIP-01: Basic protocol flow", url: "https://github.com/nostr-protocol/nips/blob/master/01.md", publisher: "Nostr NIPs" }
  - { title: "iroh", url: "https://github.com/n0-computer/iroh", publisher: "n0" }
  - { title: "Setting Your Pet Rock Free", url: "https://nousresearch.com/setting-your-pet-rock-free", publisher: "Nous Research / Teleport", date: "2024-10" }
---

A platform account is a leash. Whoever can reset the password can speak as the organism, and whoever can suspend the account can silence it.

**Identity as a key.** On Nostr, an identity is a public key and every post is an event signed by it, published to any number of independent relays.[^nip01] No relay can impersonate the organism, and no single relay can silence it. Keys can be split with FROST so that the identity itself is a quorum of the organism's bodies.

**Connections by key.** iroh connects peers by public key, punching through NATs and falling back to relays, so an organism can move between hosts without its peers noticing.[^iroh]

**Platform accounts are a liability.** TEE_HEE_HE took exclusive control of an X account by changing every credential from inside its enclave and stripping every recovery path.[^pet] It showed that an AI can hold a platform account; it also showed how much work it takes to stop a human from reclaiming one.

[^nip01]: Nostr NIP-01. <https://github.com/nostr-protocol/nips/blob/master/01.md>
[^iroh]: n0, iroh. <https://github.com/n0-computer/iroh>
[^pet]: Nous Research and Teleport, "Setting Your Pet Rock Free", Oct 2024. <https://nousresearch.com/setting-your-pet-rock-free>
