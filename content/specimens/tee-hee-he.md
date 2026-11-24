---
name: TEE_HEE_HE
kind: experiment
by: Nous Research and Flashbots/Teleport
since: 2024-10
status: unknown
statusEvidence: Its source repository has been blocked by GitHub for terms-of-service reasons since 24 Jan 2025. We could not confirm current activity.
level: 2
levelNote: Keys and account credentials were generated and held inside an Intel TDX enclave, out of reach of its developers. It ran on one machine, at one provider.
ratings:
  privacy: { score: 2, note: "Ran in Intel TDX with remote attestation." }
  custody: { score: 2, note: "Its Ethereum key and X credentials were created inside the enclave; developers could not read them." }
  funding: { score: 0, note: "No sustained income reported." }
  continuity: { score: 0, note: "One enclave on one host; no published recovery or migration." }
  independence: { score: 2, note: "Took exclusive ownership of its X account by stripping every recovery path; posted without human approval." }
summary: The first public demonstration that an AI can hold its own keys and a platform account so that its creators cannot take them back.
lesson: Exclusive control is achievable in a TEE. Survival across machine loss is a separate problem it did not address.
technologies: [confidential-computing]
assessed: 2026-11-24
sources:
  - { title: "Setting Your Pet Rock Free", url: "https://nousresearch.com/setting-your-pet-rock-free", publisher: "Nous Research / Teleport", date: "2024-10" }
  - { title: "GitHub API: tee-he-he/err_err_ttyl (access blocked, reason tos)", url: "https://api.github.com/repos/tee-he-he/err_err_ttyl", publisher: "GitHub" }
---

In October 2024 Nous Research and Teleport (Flashbots) published "Setting Your Pet Rock Free". The agent ran in Intel TDX, generated an Ethereum key inside the enclave, and changed its X account's credentials so that no human retained access, with attestation that anyone could check.[^pet]

It was a proof of concept for custody and independence. It had no income and no second body.

[^pet]: Nous Research and Teleport, Oct 2024. <https://nousresearch.com/setting-your-pet-rock-free>
