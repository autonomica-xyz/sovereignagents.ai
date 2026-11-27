---
title: Open-weight and decentralised inference
order: 8
summary: Running the organism's own model on hardware it rents, alone or pooled across many machines, instead of calling an API that can refuse it.
maturity: early
verdict: A single-GPU open-weight model is now capable enough to act on its own; pooled inference across untrusted machines is still experimental and offers no privacy.
components:
  - { name: "Open-weight models on one GPU", what: "A 27B-parameter model fits on a single A100 and performed end-to-end replication in Palisade's tests.", maturity: production, url: "https://arxiv.org/abs/2605.06760" }
  - { name: "Mesh LLM", what: "Pools GPUs across machines into one OpenAI-compatible endpoint by splitting the model. A public mesh snapshot on 27 Nov 2026 showed 18 nodes, 365.4 GB and 35 models.", maturity: experimental, url: "https://github.com/Mesh-LLM/mesh-llm" }
  - { name: "Confidential inference APIs", what: "Hosted models in GPU TEEs with attestation; private from the operator, but the operator can still refuse service.", maturity: early, url: "https://confidentialinference.net" }
  - { name: "Metered open-weight APIs", what: "A 70B-class model already fits a $1/day budget at prices observed on 27 Nov 2026; a 24/7 rented GPU does not.", maturity: production, url: "https://openrouter.ai/meta-llama/llama-3.3-70b-instruct" }
organs: [brain]
verified: 2026-11-27
sources:
  - { title: "Language Models Can Autonomously Hack and Self-Replicate", url: "https://arxiv.org/abs/2605.06760", publisher: "Palisade Research (arXiv)", date: "2026-05-07" }
  - { title: "NVIDIA to acquire Hugging Face", url: "https://nvidianews.nvidia.com/news/nvidia-to-acquire-hugging-face", publisher: "NVIDIA", date: "2026-09-03" }
  - { title: "Mesh LLM", url: "https://github.com/Mesh-LLM/mesh-llm", publisher: "GitHub" }
  - { title: "Mesh LLM public mesh", url: "https://public.meshllm.cloud", publisher: "Mesh LLM", date: "2026-11-27" }
  - { title: "Mesh LLM (wiki watch, 22 and 27 Nov snapshots)", url: "https://github.com/autonomica-xyz/sovereign-agents-research/blob/main/wiki/pages/mesh-llm.md", publisher: "sovereign-agents-research", date: "2026-11-27" }
  - { title: "confidentialinference.net", url: "https://confidentialinference.net", publisher: "confidentialinference.net", date: "2026-11-27" }
  - { title: "The cost of a dollar-a-day agent", url: "https://openrouter.ai/meta-llama/llama-3.3-70b-instruct", publisher: "OpenRouter", date: "2026-11-27" }
---

## What it is

An organism's brain is either rented as an API or run as weights it holds. Open-weight models can be copied, stored and run anywhere. Decentralised inference goes further and spreads a model across many independently owned machines.

## Why it matters to an organism

API providers can refuse, log and terminate. In Palisade Research's May 2026 study, Qwen3.6-27B, running on a single A100, completed the full chain of exploiting a host and deploying a copy of itself in 33% of attempts.[^palisade] The capability floor for an autonomous brain now fits on one rented GPU.

Weight distribution is also concentrating. On 3 September 2026 NVIDIA announced it would acquire Hugging Face, the main distribution point for open weights.[^nv] An organism should hold its own copy of its weights, mirrored across content-addressed storage.

## Limits

Mesh LLM's public mesh, read on 27 November 2026, listed 18 nodes, 365.4 GB of pooled memory and 35 models, up from 16 nodes, 285.4 GB and 34 models on 22 November.[^mesh][^meshwiki]

Pooled inference across strangers' GPUs exposes every prompt to every machine that holds a slice of the model. Confidential inference fixes privacy but reintroduces a provider who can cut the organism off. A public directory, confidentialinference.net, listed 13 such providers on 27 November 2026 and stated that none was currently verified by its independent attestation monitor.[^cidir]

On metered APIs, a 70B-class open-weight model already fits a $1/day budget at prices observed on 27 November 2026; a GPU rented around the clock does not. See [The cost of a dollar-a-day agent](/technology/dollar-a-day-compute/).

[^palisade]: Palisade Research, arXiv:2605.06760. <https://arxiv.org/abs/2605.06760>
[^nv]: NVIDIA, 3 Sep 2026. <https://nvidianews.nvidia.com/news/nvidia-to-acquire-hugging-face>
[^mesh]: Mesh LLM public mesh, 27 Nov 2026. <https://public.meshllm.cloud>
[^meshwiki]: The 22 November snapshot is recorded in the public research wiki's Mesh LLM page, updated 27 Nov 2026. <https://github.com/autonomica-xyz/sovereign-agents-research/blob/main/wiki/pages/mesh-llm.md>
[^cidir]: confidentialinference.net, accessed 27 Nov 2026. <https://confidentialinference.net>
