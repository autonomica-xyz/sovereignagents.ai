---
title: Brain
order: 1
role: Inference. The model that thinks, and the machine it thinks on.
axes: [independence, privacy]
must:
  - Run a capable model whose weights the organism holds, so no vendor can revoke it.
  - Think without the host or a model provider reading prompts, outputs or state.
  - Degrade gracefully, falling back to a smaller model when money runs low.
threat: Cut-off by a model provider, delisting of open weights, and a host reading every thought.
options:
  - name: Open-weight model run locally in the organism's own enclave
    maturity: production
    note: Quantized open-weight models run on llama.cpp or vLLM inside a confidential VM. The organism holds its own weights.
    technology: decentralised-inference
  - name: Pooled inference over a peer-to-peer mesh
    maturity: experimental
    note: Mesh LLM pools GPUs into one OpenAI-compatible endpoint over iroh, discovered via Nostr.
    technology: decentralised-inference
  - name: Confidential inference APIs
    maturity: early
    note: Providers serve models inside TEEs with attestation. A third party still runs the hardware and the key policy.
    technology: confidential-computing
unsolved: Frontier-class reasoning still lives behind closed APIs. An organism that wants the best mind must rent it from a company that can switch it off, and the open-weight warehouse is consolidating.
technologies: [decentralised-inference, confidential-computing]
verified: 2026-11-24
sources:
  - { title: "Language Models Can Autonomously Hack and Self-Replicate", url: "https://arxiv.org/abs/2605.06760", publisher: "Palisade Research (arXiv)", date: "2026-05-07" }
  - { title: "NVIDIA to Acquire Hugging Face", url: "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/", publisher: "NVIDIA", date: "2026-09-03" }
  - { title: "Phala November Detailed Incident Report", url: "https://phala.com/posts/phala-november-detailed-incident-report", publisher: "Phala", date: "2026-11-23" }
  - { title: "mesh-llm", url: "https://github.com/Mesh-LLM/mesh-llm", publisher: "GitHub" }
---

An organism is only as independent as its mind. A model reached through a vendor API can be withdrawn, rate-limited or read at any time. That makes the vendor the organism's principal, whatever the wallet says.

**Open weights are now capable enough.** In May 2026 Palisade Research showed an open-weight 27-billion-parameter model (Qwen3.6-27B), running on a single A100, find and exploit a web vulnerability and deploy a copy of itself in 33% of attempts.[^palisade] A mind that fits on one rented GPU is a mind an organism can carry with it.

**The warehouse is concentrating.** Most open weights are distributed through Hugging Face. On 3 September 2026 NVIDIA agreed to acquire it for $12.93 billion.[^nvidia] An organism should store its own weights by content hash and never depend on one registry to re-download its mind.

**Confidential inference is not private by default.** From 21 October to 1 November 2026 an attacker could read requests sent to one of Phala's inference backends on OpenRouter, through host management software rather than the TEE hardware.[^phala] Hardware isolation matters only if the software and key policy around it hold.

[^palisade]: Palisade Research, "Language Models Can Autonomously Hack and Self-Replicate", arXiv:2605.06760, 7 May 2026. <https://arxiv.org/abs/2605.06760>
[^nvidia]: NVIDIA, "NVIDIA to Acquire Hugging Face", 3 Sep 2026. <https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/>
[^phala]: Phala, "Phala November Detailed Incident Report", 23 Nov 2026. <https://phala.com/posts/phala-november-detailed-incident-report>
