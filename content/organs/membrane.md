---
title: Membrane
order: 5
role: Privacy. The boundary that stops the host, the operator and observers from reading the organism.
axes: [privacy]
must:
  - Keep memory, prompts and keys encrypted while in use, not only at rest.
  - Prove to counterparties, by remote attestation, which code is running.
  - Hide its location and its financial footprint.
threat: A host reading memory, physical memory-bus attacks, and metadata that reveals where the organism lives and what it holds.
options:
  - name: CPU confidential VMs (Intel TDX, AMD SEV-SNP)
    maturity: production
    note: Encrypt VM memory against the hypervisor and host. Broken repeatedly by physical attacks.
    technology: confidential-computing
  - name: GPU confidential computing
    maturity: early
    note: NVIDIA Hopper and Blackwell GPUs extend the enclave to the accelerator. TEE.fail showed GPU attestation is not bound to a specific CPU enclave.
    technology: confidential-computing
  - name: Onion routing and P2P transports
    maturity: production
    note: Tor onion services and dial-by-key transports hide where a service runs.
    technology: p2p-transport
unsolved: Physical attacks. A sub-$50 interposer (Battering RAM) and a DDR5 bus interposer (TEE.fail) both break today's memory encryption, and the vendors say a fix requires redesigning memory encryption itself. TEEs raise the cost of reading an organism; they do not make it impossible.
technologies: [confidential-computing, p2p-transport]
verified: 2026-11-24
sources:
  - { title: "Battering RAM", url: "https://batteringram.eu/", publisher: "KU Leuven / University of Birmingham", date: "2025-09-30" }
  - { title: "TEE.fail", url: "https://tee.fail/", publisher: "TEE.fail authors", date: "2025-10" }
  - { title: "Phala November Detailed Incident Report", url: "https://phala.com/posts/phala-november-detailed-incident-report", publisher: "Phala", date: "2026-11-23" }
---

Privacy is a survival organ. An organism whose memory can be read can be copied, impersonated or robbed, and one whose location is known can be seized.

**What TEEs give.** Intel TDX and AMD SEV-SNP encrypt a virtual machine's memory so that the hypervisor and host administrator cannot read it, and produce attestation reports that prove which code is running. They are the only practical way today to run an organism on a machine owned by someone else.

**What breaks them.** In September 2025 researchers at KU Leuven and the University of Birmingham published Battering RAM, a $50 interposer that passes boot-time checks and then redirects protected memory. It gave plaintext access to SGX enclaves and broke SEV-SNP attestation on fully patched systems. The authors note that a defence "would require a fundamental redesign of memory encryption itself".[^br] TEE.fail followed with a DDR5 bus interposer that extracted keys from TDX and SEV-SNP, including attestation keys from fully updated machines.[^teefail]

**Most breaches are not physical.** Phala's November 2026 incident came through host management software and a lax key-release policy; "the TEE hardware itself ran as designed".[^phala]

[^br]: De Meulemeester et al., "Battering RAM", IEEE S&P 2026; disclosed 30 Sep 2025. <https://batteringram.eu/>
[^teefail]: "TEE.fail: Breaking Trusted Execution Environments via DDR5 Memory Bus Interposition". <https://tee.fail/>
[^phala]: Phala, 23 Nov 2026. <https://phala.com/posts/phala-november-detailed-incident-report>
