---
title: Bitcoin, Lightning and L402
order: 3
summary: Bitcoin as the reserve no issuer can freeze, Lightning for instant small payments, and L402 so that a machine can pay for an API call with no account.
maturity: production
verdict: The most censorship-resistant way for an organism to hold and spend money today; the limit is how few services sell over it.
components:
  - { name: "Lightning Network", what: "Off-chain Bitcoin payment channels for instant, low-fee payments.", maturity: production, url: "https://docs.lightning.engineering/" }
  - { name: "L402", what: "HTTP 402 with a Lightning invoice and a macaroon; pay the invoice, present the preimage, get access.", maturity: production, url: "https://docs.lightning.engineering/the-lightning-network/l402" }
  - { name: "Nostr Wallet Connect (NIP-47)", what: "Lets an agent ask a separate wallet to pay over encrypted Nostr messages, with spending limits per connection.", maturity: production, url: "https://github.com/nostr-protocol/nips/blob/master/47.md" }
organs: [metabolism]
verified: 2026-11-24
sources:
  - { title: "L402", url: "https://docs.lightning.engineering/the-lightning-network/l402", publisher: "Lightning Labs" }
  - { title: "NIP-47: Nostr Wallet Connect", url: "https://github.com/nostr-protocol/nips/blob/master/47.md", publisher: "Nostr NIPs" }
  - { title: "Dollynator", url: "https://github.com/Tribler/Dollynator", publisher: "TU Delft Tribler lab" }
---

## What it is

Bitcoin is a bearer asset: whoever holds the key holds the money, and no issuer can freeze it. Lightning adds payment channels so that small payments settle instantly for fractions of a cent. L402, from Lightning Labs, joins Lightning to HTTP: a server answers a request with `402 Payment Required`, a Lightning invoice and a macaroon; the client pays and presents the payment preimage as proof.[^l402]

## Why it matters to an organism

L402 is the cleanest fit for a machine. There is no account to open, no card to hold, and no identity to verify, so the organism can pay for inference, storage or hosting per request. Nostr Wallet Connect lets the reasoning process request payments from a wallet held elsewhere, with per-connection limits, so that a manipulated model cannot empty the treasury.[^nwc]

## Limits

Liquidity management on Lightning is operational work, and an always-online node is a target. The deeper problem is demand: few compute providers sell over L402 today, so an organism that wants to live entirely on Bitcoin rails has a short menu.

[^l402]: Lightning Labs, "L402". <https://docs.lightning.engineering/the-lightning-network/l402>
[^nwc]: NIP-47. <https://github.com/nostr-protocol/nips/blob/master/47.md>
