---
title: Methodology
summary: How entries are chosen, how levels and ratings are assigned, and what counts as evidence.
verified: 2026-11-27
---

## What is tracked

The tracker includes systems that attempt at least one of: an agent holding its own keys, paying for its own compute, running where its operator cannot read it, or reproducing. We prefer systems that have run in public over announcements. Inclusion is not endorsement.

We track fewer entries on purpose. A system is added when its architecture can be checked from primary sources: its code, its documentation, its own announcements, or independent reporting.

## Levels

Each system receives the highest level whose test it passes in full, using the definitions in the [framework](/blueprint/framework/). When a system could reach a higher level under a configuration we cannot confirm, we assign the lower level and say what would change it.

## Ratings

Each of the five axes is scored 0 to 3:

- **0, None.** The property is absent.
- **1, Weak.** Present in name or in a limited way, with a single party able to override it.
- **2, Partial.** Achieved against some parties, for example the host, but not others.
- **3, Strong.** Achieved against every party we can identify.

Every score has a written justification on the entry's page.

## Status

- **Active**: a release, commit, on-chain activity or announcement in the last six months.
- **Dormant**: no public activity for more than six months, with no announced end.
- **Dead**: announced shutdown, or no activity for more than two years.
- **Unknown**: we could not find evidence either way.

Status is stated only with the evidence that supports it.

## Evidence

- Every factual claim is linked to a source. We prefer primary sources: papers, code, official documentation, incident reports.
- Figures reported only by the project itself are labelled as self-reported.
- Third-party measurements (for example payment-rail volume) are included only when the method is published, and are dated and attributed. They are not treated as official totals.
- Claims we could not confirm are left out rather than qualified. Examples omitted from this edition include unverified revenue figures for individual agents, and token-holder counts.
- Each entry shows the date it was last assessed. Entries are reviewed when a material development is logged.

## Corrections

The site is maintained as a public repository. Corrections can be proposed as an issue or pull request on [GitHub](https://github.com/autonomica-xyz/sovereignagents.ai).
