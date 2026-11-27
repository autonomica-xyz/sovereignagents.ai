---
title: The cost of a dollar-a-day agent
order: 11
summary: At prices observed on 27 November 2026, a 70B-class open-weight model already fits a $1/day budget on a metered API. A GPU rented around the clock does not.
maturity: production
verdict: Metered APIs make a continuously running open-weight agent cheap enough to live on a dollar a day; a dedicated 24/7 GPU at that budget does not exist at any price we observed.
components:
  - { name: "Metered inference APIs", what: "Pay per token for an open-weight model hosted by someone else.", maturity: production, url: "https://openrouter.ai/meta-llama/llama-3.3-70b-instruct" }
  - { name: "Rented GPUs", what: "A whole GPU billed by the hour, used or not.", maturity: production, url: "https://www.vast.ai/pricing" }
organs: [metabolism, body, brain]
verified: 2026-11-27
sources:
  - { title: "Vast.ai pricing", url: "https://www.vast.ai/pricing", publisher: "Vast.ai", date: "2026-11-27" }
  - { title: "llama-3.3-70b-instruct on OpenRouter", url: "https://openrouter.ai/meta-llama/llama-3.3-70b-instruct", publisher: "OpenRouter", date: "2026-11-27" }
  - { title: "gpt-oss-120b on OpenRouter", url: "https://openrouter.ai/openai/gpt-oss-120b", publisher: "OpenRouter", date: "2026-11-27" }
  - { title: "The plunging price of thought", url: "https://epoch.ai/publications/the-plunging-price-of-thought", publisher: "Epoch AI", date: "2026-09-22" }
---

## What it is

An organism that stays awake all day needs to know whether a dollar will buy a mind. $1/day is $30 in a 30-day month, or 720 GPU-hours if the machine is rented around the clock. The break-even rate for a dedicated GPU is therefore $0.0417 per GPU-hour.

## What the prices say

On 27 November 2026, metered API floors included llama-3.3-70b at $0.10 per million input tokens and $0.32 per million output tokens (DeepInfra, listed on OpenRouter), and gpt-oss-120b at $0.03 / $0.15.[^or70][^or120] At those prices a 70B-class dense model, and cheaper mixture-of-experts models, already sit inside a $1/day budget for ordinary metered use.

A GPU rented 24/7 does not. The lowest RTX 4090 offer on Vast.ai's pricing page that day was $0.07 per GPU-hour, or $1.68/day, with a much higher median; every other provider we checked was further above the $0.0417 break-even.[^vast]

Epoch AI has reported that the cost of a given level of AI performance has been falling at about 47% per quarter since 2023, roughly 13× per year. That figure is capability-adjusted, not the price of one fixed model, and it should not be read as a promise that dedicated GPUs will soon clear the $1/day line.[^epoch]

## Assessment

The cheap path today is a metered API. That path reintroduces a provider who can refuse service and read prompts unless the call sits in a confidential enclave. The expensive path is a machine the organism rents by the hour. Closing that gap matters more than shaving another fraction of a cent off token prices. The agent's own habit of re-reading its context, not the headline rate, is what usually spends the budget.

[^or70]: OpenRouter, llama-3.3-70b-instruct, accessed 27 Nov 2026. <https://openrouter.ai/meta-llama/llama-3.3-70b-instruct>
[^or120]: OpenRouter, gpt-oss-120b, accessed 27 Nov 2026. <https://openrouter.ai/openai/gpt-oss-120b>
[^vast]: Vast.ai pricing, accessed 27 Nov 2026. <https://www.vast.ai/pricing>
[^epoch]: Epoch AI, "The plunging price of thought", 22 Sep 2026. <https://epoch.ai/publications/the-plunging-price-of-thought>
