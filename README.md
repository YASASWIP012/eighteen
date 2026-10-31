# Eighteen

Can a family prove it set aside what a child is owed, without showing anyone the child's income?

Minnesota, California and Illinois require money to be set aside for minors who earn through online content. Under Minnesota law, a child can sue over a knowing or reckless violation, for actual and punitive damages. The proof, though, usually sits in records kept by the parent, who is the person the child would have to sue.

Eighteen checks the statute's arithmetic in zero knowledge against figures an oracle report has committed to, seals what a channel publicly said at the time, and holds a sponsor's payment until the report, a human reviewer and a proof all agree. A contradiction in public data stops the payout on-chain. The child's money stays with a bank or fiduciary, as Minnesota requires.

[Watch the 81-second demo](https://www.youtube.com/watch?v=HWd6H8QHFGk).

## Try it

```bash
npm install --legacy-peer-deps
npm run demo
```

Open http://localhost:4173, or use the [hosted demo](https://yasaswip012.github.io/eighteen/). With the sample figures, $20,000 at 50% content owes $5,000 in Minnesota and $6,500 in California. Lower the deposit by one cent and no proof can be generated. Claim more than the fiduciary signed and the same thing happens. Proofs run in your browser and can take up to a minute, and nothing leaves the page.

## What is built

| Part | Status |
|---|---|
| Minnesota, California and Illinois rule engine | Built and tested |
| Set-aside circuit bound to the oracle report and a fiduciary signature (Circom, Groth16, 11,185 constraints) | Built and tested |
| Proof-gated escrow with reviewer close and refund | Deployed on Sepolia, with four payouts blocked for four reasons and one released ([evidence](evidence/sepolia.json)) |
| Public-facts workflow (Chainlink CRE, TypeScript SDK) | Runs in the CRE CLI simulator against the real YouTube Data API, and its reports gate payouts on Sepolia through the mock forwarder. So far on one public test video, and not deployed to a live Chainlink network |
| Facts registry | Deployed on Sepolia and tested |
| Random review sampling and error-rate estimate | Built and tested |
| Birthday Packet export | Built and tested |
| Browser demo | Built and tested by hand |

## On Sepolia

| What | Link |
|---|---|
| Source verification | All four contracts are an exact match on [Sourcify](https://repo.sourcify.dev/11155111/0x7444d7c2e2ddd4a075a7cb4c5d152b62016d02b1) |
| ProofGatedEscrow | [0x7444...02b1](https://sepolia.etherscan.io/address/0x7444d7c2e2ddd4a075a7cb4c5d152b62016d02b1) |
| Groth16Verifier | [0xe709...9adc](https://sepolia.etherscan.io/address/0xe709731d9cbc23bc16f6ffa4b3f08bda92b09adc) |
| FactsRegistry | [0xe19c...891a](https://sepolia.etherscan.io/address/0xe19c4f3d8d399f03f1caf9d0ead70abc6a76891a) |
| Oracle report with a contradiction | [transaction](https://sepolia.etherscan.io/tx/0xcb6fd8aebcef3a059e69eab8c70615ea99d52df9eb120500dbbcf39646f6d4e4) |
| Oracle report, consistent | [transaction](https://sepolia.etherscan.io/tx/0xff33b7724cf8e243268b56f76deec0d98c2ac0e0f69bfe5c662e58e2e364e5f8) |
| Payout blocked: no oracle report yet | [transaction](https://sepolia.etherscan.io/tx/0x3c271161759fa819fef719ad20797d37baa4a139a1900d3f7e55d16b04852260) |
| Payout blocked: oracle reported a contradiction | [transaction](https://sepolia.etherscan.io/tx/0x63f00553aef2b0d7effdc14ac77ae77ea7379202b6381c25b6c54700183a175a) |
| Payout blocked: human review still open | [transaction](https://sepolia.etherscan.io/tx/0x60262743a12ee79424c91448908d5d695d63c466efe6c627587de6fbc8303912) |
| Payout blocked: proof built on different public facts | [transaction](https://sepolia.etherscan.io/tx/0xb4c7b0aa8926e81989b3f5bc9bc7006be447855005a4569292058377e1cca460) |
| Payout released: report, review and proof all line up | [transaction](https://sepolia.etherscan.io/tx/0xde627131f5f0ea97ad2c8e87d9f466172af149bf96e2900837b596e9d49c31c0) |

Replaying each failed transaction returns `NotAttested`, `Contradiction`, `ReviewOpen` and `InvalidProof`. The run is in [evidence/sepolia.json](evidence/sepolia.json), with simulator logs beside it. Reproduce it with `npx tsx scripts/sepolia-run.ts`.

The earnings come from a sandbox endpoint, a sandbox key plays the fiduciary, and one wallet acts as brand and reviewer. The video is a public test video with a stand-in stage name. Reports arrive through Chainlink's mock forwarder, which doesn't verify network signatures, so in this run anyone could post a report. A live deployment would use the production forwarder.

## What is not built

These parts of [the wider design](DESIGN.md) are not in this prototype:

- Real bank data. A sandbox key plays the fiduciary.
- Real earnings data. The proof is bound to the commitment in the oracle report, but that report currently reads a sandbox endpoint. Content share is still declared by the parent.
- Relayer batching and the timelock backstop.
- A live review. The sampling code exists, and no human has reviewed a real video.

## What it does not prove

A proof shows the numbers satisfy the statute. It doesn't show that the numbers are true. Declared content share comes from the parent, which is why release also needs a human reviewer and why the workflow checks declarations against public channel data. That check runs one way: it can show under-declaration and can never prove accuracy.

Rule packs follow Cal. Fam. Code 6651-6653, Minn. Stat. 181A.13 and 820 ILCS 206/95 and 206/100. [LEGAL.md](LEGAL.md) lists what is not modeled.

The proving keys come from a development setup with a single contributor, which is not safe for production.

This is a prototype and not legal advice.

## Tests

```bash
npm test
```

Covers the statute examples, the 30% boundary, a differential test that the circuit and the rule engine agree to the cent, forged and reused fiduciary statements, replay across deals and periods, the wrong statute, double payment, refunds, review sampling, and the workflow handler. The last test needs Bun, which installs with the project.

More detail is in [ARCHITECTURE.md](ARCHITECTURE.md). [LEGAL.md](LEGAL.md) maps each statutory provision to its code, test and on-chain evidence, and records the outside review and its disclosure.
