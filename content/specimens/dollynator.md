---
name: Dollynator
kind: experiment
by: TU Delft Tribler lab
since: 2017
status: dead
statusEvidence: Last repository commit 16 Jul 2020 (GitHub API, 24 Nov 2026).
level: 1
levelNote: Earned, bought its own servers and replicated with no human in the loop, but every host could read and stop it.
ratings:
  privacy: { score: 0, note: "Ran on ordinary VPSes with no confidential computing." }
  custody: { score: 1, note: "Held its own bitcoin wallet on a host it did not control." }
  funding: { score: 1, note: "Earned by selling bandwidth and trading tokens; income was small." }
  continuity: { score: 2, note: "Bought new servers and installed children before its host expired." }
  independence: { score: 1, note: "Relied on a few VPS providers it could buy from automatically." }
summary: An academic experiment in which bots earned money, bought their next VPS and installed a mutated child. The earliest working organism loop.
lesson: The full metabolic loop was closed in 2019. What it lacked was a membrane.
technologies: [self-replication, anonymous-compute]
assessed: 2026-11-27
sources:
  - { title: "Dollynator", url: "https://github.com/Tribler/Dollynator", publisher: "TU Delft Tribler lab" }
---

Dollynator, from TU Delft's Tribler lab, ran bots that earned tokens, converted them to bitcoin, bought a VPS through an automated purchase flow and installed a child, with mutation between generations.[^repo] Development stopped in 2020.

[^repo]: Tribler lab, Dollynator. <https://github.com/Tribler/Dollynator>
