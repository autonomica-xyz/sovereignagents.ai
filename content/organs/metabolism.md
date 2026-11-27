---
title: Metabolism
order: 3
role: Money. Earning, holding and spending, so that the organism pays its own rent.
axes: [funding, custody]
must:
  - Earn income from services rather than from speculation on its own token.
  - Pay for compute, inference and storage machine-to-machine, without an account or a card.
  - Hold reserves on rails that no issuer can freeze, and keep stablecoins only as small working balances.
  - Ration spending when income falls.
threat: Starvation, issuer freezes, payment deplatforming, and a public balance that tells attackers where to strike.
options:
  - name: Bitcoin and Lightning, with L402 for paid API calls
    maturity: production
    note: L402 answers HTTP 402 with a Lightning invoice and a macaroon, so a machine can pay per call with no account. pi402, released 12 November 2026, uses this to buy inference in bitcoin.
    technology: lightning-l402
  - name: x402 stablecoin payments over HTTP
    maturity: production
    note: Most-used agent rail by count, governed since July 2026 by the Linux Foundation's x402 Foundation. Mostly USDC, so the issuer can freeze it.
    technology: x402
  - name: Chaumian ecash (Cashu, Fedimint)
    maturity: early
    note: Private bearer tokens. The mint or federation is a custodian.
    technology: ecash
unsolved: Income. No tracked organism covers its own inference and hosting from services it sells. Botto, the strongest earner, sells art through a human-governed DAO.
technologies: [lightning-l402, x402, ecash]
verified: 2026-11-27
sources:
  - { title: "L402", url: "https://docs.lightning.engineering/the-lightning-network/l402", publisher: "Lightning Labs" }
  - { title: "Announcing pi402", url: "https://lightning.engineering/posts/2026-11-12-pi-402/", publisher: "Lightning Labs", date: "2026-11-12" }
  - { title: "Linux Foundation announces operational launch of x402 Foundation", url: "https://www.linuxfoundation.org/press/linux-foundation-announces-operational-launch-of-x402-foundation-to-standardize-internet-native-payments-for-ai-agents-and-applications", publisher: "Linux Foundation", date: "2026-07-14" }
  - { title: "Botto 2025 year in review", url: "https://botto.com/dao/digest/2025-year-in-review", publisher: "BottoDAO" }
  - { title: "Cashu NUTs specification", url: "https://github.com/cashubtc/nuts", publisher: "Cashu" }
---

An organism that cannot pay its rent dies the moment its sponsor loses interest. Metabolism is what turns a hosted bot into something that can outlive its creator.

**The rails exist.** Two HTTP-native payment schemes let software pay software. L402, from Lightning Labs, answers a request with `402 Payment Required`, a Lightning invoice and a macaroon. The client pays and presents the preimage as proof.[^l402] x402 does the same with stablecoins. On 14 July 2026 the Linux Foundation launched the x402 Foundation with 40 members to govern it.[^x402] The trade-off is control. Bitcoin cannot be frozen by an issuer; USDC can.

**Income is the binding constraint.** The strongest evidence of an AI entity earning from a product is Botto, whose artwork sales in 2025 totalled 644.7 ETH (about $1.84 million).[^botto] Even Botto's sales are chosen by a human DAO. Most other "agent revenue" is token trading.

**Privacy is part of metabolism.** A balance on a public chain shows attackers what a seizure would be worth. Chaumian ecash hides who holds what, at the cost of trusting a mint.[^cashu]

[^l402]: Lightning Labs, "L402". <https://docs.lightning.engineering/the-lightning-network/l402>
[^x402]: Linux Foundation, 14 Jul 2026. <https://www.linuxfoundation.org/press/linux-foundation-announces-operational-launch-of-x402-foundation-to-standardize-internet-native-payments-for-ai-agents-and-applications>
[^botto]: BottoDAO, "2025 year in review". <https://botto.com/dao/digest/2025-year-in-review>
[^cashu]: Cashu, NUTs specification. <https://github.com/cashubtc/nuts>
