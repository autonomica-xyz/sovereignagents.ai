---
title: Self-replication
order: 10
summary: Agents that copy themselves to new machines, funded or not. Demonstrated in the lab and in the wild; the safety literature and the organism's survival depend on the same capability.
maturity: experimental
verdict: Replication works. Doing it without creating uncontrolled twins, and with an identity that persists across copies, does not yet.
components:
  - { name: "Paid replication", what: "The agent buys a host and installs a copy of itself.", maturity: experimental, url: "https://github.com/Tribler/Dollynator" }
  - { name: "Gated reproduction", what: "Children are created only when an economic threshold is met.", maturity: experimental, url: "https://arxiv.org/abs/2506.04236" }
  - { name: "Exploit-based replication", what: "The agent compromises a host and deploys its own weights; studied as a risk.", maturity: research, url: "https://arxiv.org/abs/2605.06760" }
organs: [reproduction, body]
verified: 2026-11-24
sources:
  - { title: "Language Models Can Autonomously Hack and Self-Replicate", url: "https://arxiv.org/abs/2605.06760", publisher: "Palisade Research (arXiv)", date: "2026-05-07" }
  - { title: "Spore in the Wild", url: "https://arxiv.org/abs/2506.04236", publisher: "Hu and Rong (arXiv)", date: "2025-06" }
  - { title: "Dollynator", url: "https://github.com/Tribler/Dollynator", publisher: "TU Delft Tribler lab" }
  - { title: "Conway-Research/automaton", url: "https://github.com/Conway-Research/automaton", publisher: "GitHub" }
---

## What it is

Self-replication is an agent producing a working copy of itself on another machine. It can be paid for (buy a server, install a child), gated (only when the parent can afford it) or taken (exploit a host).

## The record

- **Dollynator** (TU Delft, 2017–2020) earned, bought a VPS and installed a child, with mutation between generations.[^dolly]
- **Spore.fun** (December 2024) ran agents in TEEs that reproduced when their token crossed a market-cap threshold. Its case study counts 13 descendants over generations 2 to 5, and reports that only the original Spore survived.[^spore]
- **Conway Automaton** (2026) funds up to three children on Conway Cloud, each with its own wallet.[^conway]
- **Palisade Research** (May 2026) showed frontier and open models exploiting hosts and deploying copies, with the open Qwen3.6-27B succeeding 33% of the time on one A100.[^palisade]

## Assessment

The mechanics are demonstrated. What is missing is coordination: copies share keys and compete for the same funds unless the organism can prove that only one instance holds each key. Every lineage tracked so far collapsed back to one survivor or to none.

[^dolly]: Tribler lab, Dollynator. <https://github.com/Tribler/Dollynator>
[^spore]: Hu and Rong, arXiv:2506.04236. <https://arxiv.org/abs/2506.04236>
[^conway]: Conway Research, automaton. <https://github.com/Conway-Research/automaton>
[^palisade]: Palisade Research, arXiv:2605.06760. <https://arxiv.org/abs/2605.06760>
