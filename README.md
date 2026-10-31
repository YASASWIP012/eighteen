# Eighteen

Can a family prove it set aside what a child is owed, without showing anyone the child's income?

Minnesota, California and Illinois require money to be set aside for minors who earn through online content. Under Minnesota law, a child can sue over a knowing or reckless violation, for actual and punitive damages. The proof, though, usually sits in records kept by the parent, who is the person the child would have to sue.

Eighteen checks the statute's arithmetic in zero knowledge, seals what a channel publicly said at the time, and holds a sponsor's payment until both a reviewer and a proof clear it. The child's money stays with a bank or fiduciary, as Minnesota requires.

## Try it

```bash
npm install --legacy-peer-deps
npm run demo
```

Open http://localhost:4173. With the sample figures, $20,000 at 50% content owes $5,000 in Minnesota and $6,500 in California. Lower the deposit by one cent and no proof can be generated. Claim more than the fiduciary signed and the same thing happens. Proofs run in your browser and can take up to a minute, and nothing leaves the page.

## What is built

| Part | Status |
|---|---|
| Minnesota, California and Illinois rule engine | Built and tested |
| Set-aside circuit with fiduciary signature (Circom, Groth16, 10,667 constraints) | Built and tested |
| Proof-gated escrow with reviewer close and refund | Built, tested with real proofs on a local chain |
| Public-facts workflow (Chainlink CRE, TypeScript SDK) | Compiles to WebAssembly with the SDK compiler; runs under the SDK test runtime with mocked network and chain; not yet simulated with the CRE CLI |
| Facts registry | Built and tested |
| Random review sampling and error-rate estimate | Built and tested |
| Birthday Packet export | Built and tested |
| Browser demo | Built and tested by hand |

## What is not built

These parts of [the wider design](DESIGN.md) are not in this prototype:

- Reading real revenue or bank data. Demo figures are typed in, and a sandbox key plays the fiduciary.
- Binding earnings and content share to fetched data. The deposit is signed by the fiduciary, but earnings and content share are still inputs.
- Relayer batching and the timelock backstop.
- A live review. The sampling code exists, and no human has reviewed a real video.

## What it does not prove

A proof shows the numbers satisfy the statute. It doesn't show that the numbers are true. Declared content share comes from the parent, which is why release also needs a human reviewer and why the workflow checks declarations against public channel data. That check runs one way: it can show under-declaration and can never prove accuracy.

Rule packs follow Cal. Fam. Code 6651-6653, Minn. Stat. 181A.13 and 820 ILCS 206/95 and 206/100. Illinois was read through a commercial code site, so check it against the General Assembly's text before relying on it. Utah is unsupported until its enrolled bill has been read. California's separate Coogan rule (AB 1880) is not modeled.

The proving keys come from a development setup with a single contributor, which is not safe for production.

This is a prototype and not legal advice.

## Tests

```bash
npm test
```

Covers the statute examples, the 30% boundary, a differential test that the circuit and the rule engine agree to the cent, forged and reused fiduciary statements, replay across deals and periods, the wrong statute, double payment, refunds, review sampling, and the workflow handler. The last test needs Bun, which installs with the project.

More detail is in [ARCHITECTURE.md](ARCHITECTURE.md).
