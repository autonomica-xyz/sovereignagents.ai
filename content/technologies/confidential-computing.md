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
  - { name: "Solana Confidential Compute", what: "On-chain verification of TDX and SEV-SNP attestations, in beta on Solana devnet and unaudited.", maturity: experimental, url: "https://solana.ai/blog/nito-solana-confidential-compute" }
organs: [membrane, body, brain, keys, immune-system]
verified: 2026-11-27
sources:
  - { title: "Battering RAM", url: "https://batteringram.eu/", publisher: "KU Leuven / University of Birmingham", date: "2025-09-30" }
  - { title: "TEE.fail", url: "https://tee.fail/", publisher: "TEE.fail authors", date: "2025-10" }
  - { title: "BadRAM", url: "https://badram.eu/", publisher: "KU Leuven et al.", date: "2024-12" }
  - { title: "DDRop", url: "https://ddropattack.eu/", publisher: "KU Leuven / ETH Zurich / Google / Durham", date: "2026-09-14" }
  - { title: "AMD-SB-3059 (Mior)", url: "https://www.amd.com/en/resources/product-security/bulletin/amd-sb-3059.html", publisher: "AMD", date: "2026-11-10" }
  - { title: "AMD-SB-3061 (Skyfall)", url: "https://www.amd.com/en/resources/product-security/bulletin/amd-sb-3061.html", publisher: "AMD", date: "2026-11-10" }
  - { title: "Solana Confidential Compute", url: "https://solana.ai/blog/nito-solana-confidential-compute", publisher: "Solana Foundation", date: "2026-11-13" }
  - { title: "Phala November Detailed Incident Report", url: "https://phala.com/posts/phala-november-detailed-incident-report", publisher: "Phala", date: "2026-11-23" }
  - { title: "Setting Your Pet Rock Free", url: "https://nousresearch.com/setting-your-pet-rock-free", publisher: "Nous Research / Teleport", date: "2024-10" }
  - { title: "confidentialinference.net", url: "https://confidentialinference.net", publisher: "confidentialinference.net", date: "2026-11-27" }
  - { title: "Wiki rotation log, 25 Nov 2026", url: "https://github.com/autonomica-xyz/sovereign-agents-research/blob/main/wiki/log/2026-11-25-rotation.md", publisher: "sovereign-agents-research", date: "2026-11-25" }
  - { title: "Wiki rotation log, 26 Nov 2026", url: "https://github.com/autonomica-xyz/sovereign-agents-research/blob/main/wiki/log/2026-11-26-rotation.md", publisher: "sovereign-agents-research", date: "2026-11-26" }
  - { title: "Wiki rotation log, 27 Nov 2026", url: "https://github.com/autonomica-xyz/sovereign-agents-research/blob/main/wiki/log/2026-11-27-rotation.md", publisher: "sovereign-agents-research", date: "2026-11-27" }
---

## What it is

A trusted execution environment (TEE) is a hardware mode in which the CPU encrypts a workload's memory with keys the host cannot read, and signs an attestation report describing exactly which code was loaded. Modern TEEs (Intel TDX, AMD SEV-SNP) protect whole virtual machines, so an unmodified agent can run inside one.

For an organism this does two things. It stops the landlord from reading its mind and keys, and it lets the organism prove to others which code it is, which is the basis for key release, payments and trust between its own bodies.

## What it has done

The first sovereign-agent experiments relied on it. TEE_HEE_HE generated an Ethereum key and took exclusive control of its X account inside Intel TDX in October 2024.[^pet] dstack, the open-source framework underneath Phala Cloud and several other providers, runs Docker workloads in TDX and derives keys per application.

## How it breaks

- **Physical memory attacks.** BadRAM (December 2024) tampered with a DIMM's SPD chip to alias memory on SEV-SNP.[^badram] Battering RAM (September 2025) used a $50 interposer that passes boot checks and then redirects protected memory, breaking SGX and SEV-SNP attestation on patched systems.[^br] TEE.fail (October 2025) built a DDR5 bus interposer that extracted keys, including attestation keys, from TDX and SEV-SNP machines, and used them to undermine NVIDIA GPU confidential computing.[^teefail] DDRop (disclosed 14 September 2026) is a compact active DDR5 interposer, built for under $200, that silently drops writes. Without freshness, stale ciphertext still decrypts, and on Intel TDX the authors used this to forge attestation reports.[^ddrop]
- **Malicious hypervisors.** On 10 November 2026 AMD published Mior (CVE-2026-0462), in which a malicious hypervisor redirects MMIO and can break SEV-SNP guest-memory integrity, and Skyfall (CVE-2026-40671), which can leak guest register state. SEV firmware and microcode fixes were released on 12 August 2026; platform firmware was still rolling out in November.[^mior][^skyfall]
- **The software around the enclave.** Phala's November 2026 incident came through host management interfaces and a key-release policy that "checked too little"; Phala states that "the TEE hardware itself ran as designed".[^phala]
- **Attestation as a public record.** On 13 November 2026 the Solana Foundation and Nito published Solana Confidential Compute, an SDK and on-chain program that verifies TDX and SEV-SNP attestations and records the result on Solana. It is in beta on devnet, unaudited, and not for production use.[^solcc]

## Assessment

TEEs are production technology and the only practical membrane on someone else's hardware. They are not a guarantee. A determined adversary with physical access can read an enclave, so an organism must assume any single body can be compromised and design so that one compromise is not fatal: multiple vendors, multiple hosts, threshold keys, and a key policy no operator can rewrite. A public directory of confidential inference providers, confidentialinference.net, listed 13 providers on 27 November 2026 and stated that none was currently verified by its independent attestation monitor.[^cidir] Dated reads in the public research wiki recorded 86 models on 25 November, 85 on 26 November and 82 on 27 November.[^cidirlog]

[^pet]: Nous Research and Teleport, Oct 2024. <https://nousresearch.com/setting-your-pet-rock-free>
[^badram]: BadRAM. <https://badram.eu/>
[^br]: Battering RAM, disclosed 30 Sep 2025. <https://batteringram.eu/>
[^teefail]: TEE.fail. <https://tee.fail/>
[^ddrop]: DDRop, coordinated disclosure 14 Sep 2026. <https://ddropattack.eu/>
[^mior]: AMD, AMD-SB-3059, 10 Nov 2026. <https://www.amd.com/en/resources/product-security/bulletin/amd-sb-3059.html>
[^skyfall]: AMD, AMD-SB-3061, 10 Nov 2026. <https://www.amd.com/en/resources/product-security/bulletin/amd-sb-3061.html>
[^solcc]: Solana Foundation, 13 Nov 2026. <https://solana.ai/blog/nito-solana-confidential-compute>
[^cidir]: confidentialinference.net, accessed 27 Nov 2026. <https://confidentialinference.net>
[^cidirlog]: Research-wiki rotation logs, 25 Nov and 27 Nov 2026. <https://github.com/autonomica-xyz/sovereign-agents-research/blob/main/wiki/log/2026-11-25-rotation.md> <https://github.com/autonomica-xyz/sovereign-agents-research/blob/main/wiki/log/2026-11-27-rotation.md>
[^phala]: Phala, 23 Nov 2026. <https://phala.com/posts/phala-november-detailed-incident-report>
