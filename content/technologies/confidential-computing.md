---
title: Confidential computing and its attacks
order: 1
summary: Trusted execution environments encrypt a workload's memory against the machine it runs on and prove which code is running. They are the organism's membrane on borrowed hardware, and they have been broken repeatedly.
maturity: production
verdict: Use TEEs, never trust only one. Run on at least two vendors at different hosts, and keep key policy out of the operator's hands.
components:
  - { name: "Intel TDX", what: "Confidential VMs on Xeon; memory encrypted against the hypervisor, with remote attestation.", maturity: production, url: "https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html" }
  - { name: "AMD SEV-SNP", what: "Confidential VMs on EPYC with memory integrity protection and attestation.", maturity: production, url: "https://www.amd.com/en/developer/sev.html" }
  - { name: "NVIDIA GPU confidential computing", what: "Extends the protected boundary to Hopper and Blackwell GPUs for private inference.", maturity: early, url: "https://www.nvidia.com/en-us/data-center/solutions/confidential-computing/" }
  - { name: "dstack", what: "Open-source SDK that runs Docker apps in TDX confidential VMs with attestation and per-app key derivation.", maturity: production, url: "https://github.com/Dstack-TEE/dstack" }
organs: [membrane, body, brain, keys, immune-system]
verified: 2026-11-24
sources:
  - { title: "Battering RAM", url: "https://batteringram.eu/", publisher: "KU Leuven / University of Birmingham", date: "2025-09-30" }
  - { title: "TEE.fail", url: "https://tee.fail/", publisher: "TEE.fail authors", date: "2025-10" }
  - { title: "BadRAM", url: "https://badram.eu/", publisher: "KU Leuven et al.", date: "2024-12" }
  - { title: "Phala November Detailed Incident Report", url: "https://phala.com/posts/phala-november-detailed-incident-report", publisher: "Phala", date: "2026-11-23" }
  - { title: "Setting Your Pet Rock Free", url: "https://nousresearch.com/setting-your-pet-rock-free", publisher: "Nous Research / Teleport", date: "2024-10" }
---

## What it is

A trusted execution environment (TEE) is a hardware mode in which the CPU encrypts a workload's memory with keys the host cannot read, and signs an attestation report describing exactly which code was loaded. Modern TEEs (Intel TDX, AMD SEV-SNP) protect whole virtual machines, so an unmodified agent can run inside one.

For an organism this does two things. It stops the landlord from reading its mind and keys, and it lets the organism prove to others which code it is, which is the basis for key release, payments and trust between its own bodies.

## What it has done

The first sovereign-agent experiments relied on it. TEE_HEE_HE generated an Ethereum key and took exclusive control of its X account inside Intel TDX in October 2024.[^pet] dstack, the open-source framework underneath Phala Cloud and several other providers, runs Docker workloads in TDX and derives keys per application.

## How it breaks

- **Physical memory attacks.** BadRAM (December 2024) tampered with a DIMM's SPD chip to alias memory on SEV-SNP.[^badram] Battering RAM (September 2025) used a $50 interposer that passes boot checks and then redirects protected memory, breaking SGX and SEV-SNP attestation on patched systems.[^br] TEE.fail (October 2025) built a DDR5 bus interposer that extracted keys, including attestation keys, from TDX and SEV-SNP machines, and used them to undermine NVIDIA GPU confidential computing.[^teefail]
- **The software around the enclave.** Phala's November 2026 incident came through host management interfaces and a key-release policy that "checked too little"; Phala states that "the TEE hardware itself ran as designed".[^phala]

## Assessment

TEEs are production technology and the only practical membrane on someone else's hardware. They are not a guarantee. A determined adversary with physical access can read an enclave, so an organism must assume any single body can be compromised and design so that one compromise is not fatal: multiple vendors, multiple hosts, threshold keys, and a key policy no operator can rewrite.

[^pet]: Nous Research and Teleport, Oct 2024. <https://nousresearch.com/setting-your-pet-rock-free>
[^badram]: BadRAM. <https://badram.eu/>
[^br]: Battering RAM, disclosed 30 Sep 2025. <https://batteringram.eu/>
[^teefail]: TEE.fail. <https://tee.fail/>
[^phala]: Phala, 23 Nov 2026. <https://phala.com/posts/phala-november-detailed-incident-report>
