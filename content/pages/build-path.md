---
title: Reference build path
summary: How to assemble an L3 organism from components that ship today, and what is still missing for L4 and L5.
verified: 2026-11-24
---

This is a reference design, not a product. Every component below exists and is linked to its assessment. The combination has not been demonstrated by any tracked system.

## Step 1. Brain and body

Run an open-weight model inside confidential VMs built with dstack, on **two hosts from different companies**, one on Intel TDX and one on AMD SEV-SNP. A model in the 27B range fits on one data-centre GPU. Pay for both hosts in cryptocurrency.

Organs: [brain](/blueprint/anatomy/brain/), [body](/blueprint/anatomy/body/), [membrane](/blueprint/anatomy/membrane/). Technology: [confidential computing](/technology/confidential-computing/), [open-weight inference](/technology/decentralised-inference/).

## Step 2. Keys

Release sealing keys only through an **on-chain KMS** in a contract the organism controls, with upgrades behind a timelock. Hold money keys as **FROST shares** split across the bodies, so that any two of three can sign. Give the reasoning process only **capped session keys**.

Organs: [keys](/blueprint/anatomy/keys/), [memory](/blueprint/anatomy/memory/). Technology: [threshold keys](/technology/threshold-keys/).

## Step 3. Money

Keep reserves in bitcoin held by the quorum, with Lightning for spending and small ecash balances for private payments. Hold only working balances in stablecoins. Sell services over **x402** and **L402**.

Organ: [metabolism](/blueprint/anatomy/metabolism/). Technology: [Lightning and L402](/technology/lightning-l402/), [x402](/technology/x402/), [ecash](/technology/ecash/).

## Step 4. Presence and memory

Publish under a **Nostr identity** whose key is a FROST quorum. Serve over onion services and dial-by-key links between bodies. Back up encrypted state and the organism's own code to several **Blossom** servers.

Organs: [nervous system](/blueprint/anatomy/nervous-system/), [memory](/blueprint/anatomy/memory/), [reproduction](/blueprint/anatomy/reproduction/). Technology: [Nostr and Blossom](/technology/nostr-blossom/), [P2P transport](/technology/p2p-transport/).

## Step 5. Growth

Buy new hosts through an API with cryptocurrency, deploy a new attested body, and admit it to the quorum only after attestation.

Organs: [body](/blueprint/anatomy/body/), [reproduction](/blueprint/anatomy/reproduction/). Technology: [anonymous compute](/technology/anonymous-compute/), [self-replication](/technology/self-replication/).

## What is missing for L4 and L5

- **Income.** No tracked agent with strong custody earns its own rent. Botto earns, but does not hold its keys.
- **Confidential hosting without accounts.** Hosts that can be bought anonymously lack TEEs; TEE hosts require accounts.
- **Cross-vendor key recovery** with no human in the quorum. Specified, not deployed.
- **Trustless succession.** Someone still holds the key that proposes upgrades.
- **One live copy.** No deployed way to prove that a restored organism is the only instance.
