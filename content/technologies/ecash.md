---
title: Chaumian ecash (Cashu and Fedimint)
order: 5
summary: Blind-signed bearer tokens backed by bitcoin. Private and simple to spend from software, at the cost of trusting a mint or a federation of guardians.
maturity: early
verdict: Good for private day-to-day spending and paying per request; keep only working balances in it, because the mint is a custodian.
components:
  - { name: "Cashu", what: "Single-mint ecash; tokens are strings an agent can pass in an HTTP header.", maturity: early, url: "https://github.com/cashubtc/nuts" }
  - { name: "Fedimint", what: "Ecash run by a federation of guardians holding deposits in a threshold multisig.", maturity: early, url: "https://fedimint.org" }
organs: [metabolism, membrane]
verified: 2026-11-24
sources:
  - { title: "Cashu NUTs", url: "https://github.com/cashubtc/nuts", publisher: "Cashu" }
  - { title: "Fedimint", url: "https://fedimint.org", publisher: "Fedimint" }
---

## What it is

David Chaum's blind signatures let a mint sign a token without seeing it, so it cannot later link the token to the person who withdrew it. Cashu implements this for bitcoin with a single mint; tokens are bearer strings that can be passed between programs.[^cashu] Fedimint replaces the single mint with a federation of guardians who run consensus and hold deposits in a threshold multisig.[^fedi]

## Why it matters to an organism

Ecash hides the organism's spending from chain observers and from the mint itself. It needs no channel management, and a token can be attached to a request, which makes pay-per-call simple.

## Limits

The mint can disappear with the deposits or refuse to redeem. A federation spreads that risk across guardians but does not remove it. Hold small balances, spread across several mints, and settle to self-held bitcoin.

[^cashu]: Cashu NUTs. <https://github.com/cashubtc/nuts>
[^fedi]: Fedimint. <https://fedimint.org>
