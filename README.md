# Eighteen

Can a family prove it set aside what a child is owed, without showing anyone the child's income?

Minnesota, Illinois and California require money to be set aside for minors who earn through online content. Under Minnesota law, a child can sue over a knowing or reckless violation, for actual and punitive damages. The proof, though, usually sits in records kept by the parent, who is the person the child would have to sue.

Eighteen checks the statute's arithmetic in zero knowledge, seals what a channel publicly said at the time, and holds a sponsor's payment until both a reviewer and a proof clear it. The child's money stays with a bank or fiduciary, as Minnesota requires.

## Try it

```bash
npm install --legacy-peer-deps
npm run demo
```

Open http://localhost:4173. With the sample figures, $20,000 at 50% content owes $5,000 in Minnesota and $6,500 in California. Lower the deposit by one cent and no proof can be generated. Proofs run in your browser, and nothing leaves the page.

## What is built

| Part | Status |
|---|---|
| Minnesota and California rule engine | Built and tested |
| Set-aside circuit (Circom, Groth16, 1,831 constraints) | Built and tested |
| Proof-gated escrow with reviewer close and refund | Built, tested with real proofs on a local chain |
| Public-facts workflow (Chainlink CRE, TypeScript SDK) | Logic tested, workflow type-checks, not yet simulated with the CLI |
| Facts registry | Built and tested |
| Browser demo | Built and tested by hand |

## What is not built

These parts of [the wider design](DESIGN.md) are not in this prototype:

- Reading revenue or bank deposits. All figures in the demo are typed in.
- Binding private inputs to fetched data. The circuit proves the arithmetic on committed inputs and doesn't yet prove where they came from.
- Reviewer selection by verifiable randomness, relayer batching, timelock backstop, Birthday Packet.
- Illinois. Its statute text has not been fully read, so it has no rule pack.

## What it does not prove

A proof shows the numbers satisfy the statute. It doesn't show that the numbers are true. Declared content share comes from the parent, which is why release also needs a human reviewer and why the workflow checks declarations against public channel data. That check runs one way: it can show under-declaration and can never prove accuracy.

California rules come from a [law-firm summary](https://nixonpeabody.com/insights/alerts/2024/12/04/how-coogans-law-and-the-child-content-creator-rights-act-affect-young-creators), since the code text hasn't been read yet. How California splits a set-aside among siblings isn't confirmed, and the engine flags that case.

The proving keys come from a development setup with a single contributor, which is not safe for production.

This is a prototype and not legal advice.

## Tests

```bash
npm test
```

Covers the statute examples, the 30% boundary, a differential test that the circuit and the rule engine agree to the cent, replay across deals and periods, the wrong statute, double payment, and refunds.

More detail is in [ARCHITECTURE.md](ARCHITECTURE.md).
