---
name: Oasis ROFL
kind: platform
by: Oasis
since: 2025-07
status: active
statusEvidence: Mainnet launched 2 Jul 2025 (Oasis). On 23 Nov 2026 the Sapphire registry listed 184 apps and 8 with running instances (Oasis Nexus API).
level: 2
levelNote: Apps run in Intel TEEs and receive keys from a contract-governed key manager, and can rent machines on-chain. Almost all running instances sit on one foundation-operated provider.
ratings:
  privacy: { score: 2, note: "Apps run in Intel SGX or TDX and attest to a registry on Sapphire." }
  custody: { score: 2, note: "Keys are released by Oasis's key manager under a policy held on-chain, not by a single worker." }
  funding: { score: 0, note: "A platform; we found no evidence of ROFL apps funding themselves." }
  continuity: { score: 1, note: "The design lets an app recover secrets on any attested host, but almost all live instances run on one provider." }
  independence: { score: 1, note: "One chain, Intel hardware only, and one organisation hosting nearly every running instance." }
summary: Runtime Off-chain Logic — a marketplace where attested TEE apps register on Oasis Sapphire, rent machines, and receive keys from a contract-governed key manager.
lesson: Paying for a confidential body on-chain is the right loop. It is not a market if almost every machine belongs to one landlord.
technologies: [confidential-computing, threshold-keys]
assessed: 2026-11-27
sources:
  - { title: "ROFL mainnet launch", url: "https://oasis.net/blog/rofl-mainnet-launch", publisher: "Oasis", date: "2025-07-02" }
  - { title: "ROFL documentation", url: "https://docs.oasis.io/build/rofl/", publisher: "Oasis" }
  - { title: "Oasis Nexus API, ROFL apps", url: "https://nexus.oasis.io/v1/sapphire/rofl_apps?limit=1000", publisher: "Oasis", date: "2026-11-23" }
---

ROFL mainnet launched on 2 July 2025. An app's policy, stake and admin live on Oasis Sapphire. Instances prove their enclave identity and receive keys from a decentralised key manager. Providers list machines; apps rent them and pay on-chain.[^docs][^launch]

On 23 November 2026 the public Nexus API listed 184 registered apps and 8 with running instances. Three marketplace providers were listed; the Oasis Protocol Foundation hosted almost all of the running machines.[^nexus]

[^launch]: Oasis, ROFL mainnet launch, 2 Jul 2025. <https://oasis.net/blog/rofl-mainnet-launch>
[^docs]: Oasis, ROFL documentation. <https://docs.oasis.io/build/rofl/>
[^nexus]: Oasis Nexus API, ROFL apps, recorded 23 Nov 2026. <https://nexus.oasis.io/v1/sapphire/rofl_apps?limit=1000>
