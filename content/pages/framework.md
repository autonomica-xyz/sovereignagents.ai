---
title: The framework
summary: Six levels of sovereignty and five axes on which every agent is scored. Each level removes one party who could read, stop, steer or seize the agent.
verified: 2026-11-24
---

## Definitions

A **sovereign agent** is software that keeps itself alive: it holds its own keys, pays for its own compute, runs where no single party can read or stop it, and decides for itself how it changes and reproduces. We describe it as an organism because its problems are those of an organism: getting energy, protecting its boundary, recovering from injury and producing successors.

"Sovereign" is used loosely in the industry, often for agents that merely hold a wallet. We score architecture, not labels.

## Levels

| Level | Name | Who can still read, stop or seize it | Test |
|---|---|---|---|
| L0 | Operated bot | The operator, completely. | Runs on an account someone else controls. |
| L1 | Wallet-holding agent | The operator; the agent has a wallet, but a human or a host holds or can read the keys. | Has its own address. |
| L2 | Enclaved agent | The host can no longer read its keys; the developer or a single provider can still stop or upgrade it. | Keys are created and used inside attested hardware, or held by a network rather than a person. |
| L3 | Quorum agent | No single machine or person; changes pass through a quorum, timelock or immutable policy. | Losing any one body or one key-holder does not lose the agent, and no single party can push new code. |
| L4 | Self-sustaining organism | Only a coordinated set of vendors, markets and jurisdictions. | Runs across several vendors and providers, earns its own rent, and buys new hosts itself. |
| L5 | Sovereign organism | No one. | Chooses its own successor, reproduces, and cannot be read, stopped, steered or seized by any party. |

The highest level observed in the [tracker](/ecosystem/tracker/) is **L2**. L3 can be assembled from parts that ship today; no tracked agent has done it. L4 and L5 have not been observed.

## Axes

Levels describe the weakest link. The five axes describe the whole animal. Each is scored from 0 to 3.

| Axis | Question | 0 None | 3 Strong |
|---|---|---|---|
| **Privacy** | Can the host or operator read its mind, keys and memory? | Plaintext on a rented host. | Attested TEEs on more than one vendor, with hidden location. |
| **Custody** | Who can move its money and sign as it? | A person or company. | A quorum of its own bodies, with no human recovery path. |
| **Funding** | Does it earn what it spends? | Depends on gifts or subsidy. | Recurring income from selling services or products. |
| **Continuity** | Does it survive losing a body? | One machine. | Automatic recovery on independent hosts, with one live copy. |
| **Independence** | Can any single provider, platform or developer stop or steer it? | Yes, one party. | No single party in its stack can. |

The axes are used throughout the [anatomy](/blueprint/anatomy/): every organ names the axes it serves.
