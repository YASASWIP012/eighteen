# Legal map

This maps each statutory provision to the code that applies it, the test that checks it, and the on-chain evidence where there is any. It is not legal advice.

Minnesota and California text was read from the official sites ([Minn. Stat. 181A.13](https://www.revisor.mn.gov/statutes/cite/181A.13), [Cal. Fam. Code 6650-6656](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=6651.&lawCode=FAM)). Illinois was read through [FindLaw](https://codes.findlaw.com/il/chapter-820-employment/il-st-sect-820-206-100/), because the General Assembly's site wasn't reachable, so check it against the official text before relying on it.

## Who is owed money, and how much

| Rule | Minnesota | California | Illinois | Code |
|---|---|---|---|---|
| Content test: at least 30% of compensated content features the minor | 181A.13 subd. 1(a)(1), in a 30-day period within the previous 12 months | Fam. Code 6651(a)(1), in a given month | 820 ILCS 206/95, in a 30-day period within the previous 12 months | `COVERAGE_BPS` in `src/rules/index.ts` |
| How the share is measured | Subd. 1(a)(1): likeness, name or photo, or oral narrative | 6651(a)(2): time the minor appears or is the subject of oral narrative, against segment length | 206/95: screen time or narrative, against segment length | Input `contentBps`, declared by the parent |
| Views or pay test | Subd. 1(a)(2): platform threshold or $0.01 per view | 6651(b): platform threshold or $0.10 per view | 206/95: platform threshold or $0.10 per view | Input `viewTestMet` |
| Monthly floor | None | 6651(c): $1,250 in the month | None | `CA_MONTHLY_FLOOR_CENTS` |
| Age limit | Under 18 | 6650(d): under 18 | 206/95: under 16 | `assessIL` |
| Set-aside formula | Subd. 3(a)(1): at least half the content percentage | 6652(f): content percentage × compensation × 0.65 | 206/100(a): at least half the content percentage | `assessMN`, `assessCA`, `assessIL` |
| Several minors in one segment | Subd. 3(a)(2): divided equally | 6653(a)(2): divided equally | 206/100(a)(2): divided equally | `minorsInSegment` |
| Under 14 | Subd. 1(b): barred, and a featured minor receives 100% | No equivalent | No equivalent | `UNDER_14_BARRED` flag |

The worked example comes from these rules: $20,000 at 50% content owes $5,000 in Minnesota and Illinois, and $6,500 in California.

Each rule is restated in `circuits/setaside.circom`. `test/rules.test.ts` covers the statute examples and boundaries, and `test/differential.test.ts` checks that circuit and engine agree on sampled boundary cases.

## Where the money must be

| Rule | Minnesota | California | Illinois | What Eighteen does |
|---|---|---|---|---|
| Who holds it | Subd. 3(b): bank, corporate fiduciary or trust company, and compliant with chapter 527 | 6653(b)(2): federally insured institution, or a company registered under the Investment Company Act of 1940 | 206/100(b): bank, corporate fiduciary or trust company, compliant with the state's Uniform Transfers to Minors Act | Never holds the trust. The proof requires a deposit signed by the fiduciary |
| When it is released | Subd. 3(b): age 18 or emancipation | 6653(b)(5): age of majority or emancipation | 206/100(b): age 18 or emancipation | Not enforced here. This stays with the fiduciary |
| How often deposits are due | Not stated | 6653(b)(4): at least every three months | Not stated | Not modeled |
| Setting up the trust | Not stated | 6653(b)(1): within 60 business days | Not stated | Not modeled |

## Records and remedies

| Rule | Minnesota | California | Illinois | What Eighteen does |
|---|---|---|---|---|
| Records to keep | Subd. 2: until the minor turns 21, readily accessible to the minor | 6652: available to the minor on request | 206/95: given to the minor on an ongoing basis | Birthday Packet in `src/packet.ts` |
| Who can sue, and the standard | Subd. 3(c): knowingly or recklessly | 6654: knowingly, or should have known | 206/100(c): knowingly or recklessly | Packet states that it doesn't prove this standard |
| Remedies | Subd. 3(c): actual and punitive damages, costs and fees. Subd. 4(a): also injunctive relief | 6654: actual and punitive damages, costs and fees | 206/100(c): actual and punitive damages, costs and fees | Packet shows the shortfall only |
| Third parties | Subd. 3(e): no effect on anyone but creator and minor | Not read | 206/100(e): no effect on anyone but vlogger and minor | The brand gate is a contract clause, not a statutory duty |
| Deletion on request | Subd. 5 | Not read | Not read | Not built |

## Evidence for each control

All on Sepolia, with sample figures. Replaying each failed transaction returns the named error.

| Control | Why it matters | Result | Evidence |
|---|---|---|---|
| No payout without an oracle report | Earnings can't be chosen by the prover | `NotAttested` | [transaction](https://sepolia.etherscan.io/tx/0x3c271161759fa819fef719ad20797d37baa4a139a1900d3f7e55d16b04852260) |
| A reported contradiction stops payment | Public text named the child on a video declared as zero participation, and name counts under all three statutes | `Contradiction`, after this [report](https://sepolia.etherscan.io/tx/0xcb6fd8aebcef3a059e69eab8c70615ea99d52df9eb120500dbbcf39646f6d4e4) | [transaction](https://sepolia.etherscan.io/tx/0x63f00553aef2b0d7effdc14ac77ae77ea7379202b6381c25b6c54700183a175a) |
| A human review must close first | The parent declares content share, so a proof alone can't show it is true | `ReviewOpen` | [transaction](https://sepolia.etherscan.io/tx/0x60262743a12ee79424c91448908d5d695d63c466efe6c627587de6fbc8303912) |
| Proof must match the sealed public facts | Stops a proof built on a different record | `InvalidProof` | [transaction](https://sepolia.etherscan.io/tx/0xb4c7b0aa8926e81989b3f5bc9bc7006be447855005a4569292058377e1cca460) |
| All controls satisfied | The creator is paid | Success, after this [report](https://sepolia.etherscan.io/tx/0xff33b7724cf8e243268b56f76deec0d98c2ac0e0f69bfe5c662e58e2e364e5f8) | [transaction](https://sepolia.etherscan.io/tx/0xde627131f5f0ea97ad2c8e87d9f466172af149bf96e2900837b596e9d49c31c0) |

## Not modeled

- Minnesota subd. 1(c), a minor aged 13 to 17 producing their own content, and subd. 1(d), incidental appearances at public events.
- The Minnesota deduction for amounts owed to another minor under subd. 1(b).
- The other California provisions in 6655 and 6656, which have not been read.
- California's Coogan rule for minors under contract with third parties (AB 1880), known only from secondary sources.
- Utah and Tennessee.
- Whether holding USDC under a sponsorship clause counts as escrow, or falls under California's Digital Financial Assets Law.

## Review

Reviewed by Adv. sasank paruchuri, Practicing Advocate at prasad Legal Associates, who provided feedback on the legal accuracy, clarity, and supporting provisions of the submission. Disclosure: he is the brother of a team member, so this was not an independent review.

He found the content clear and well structured, and suggested improving the explanation of the legal provisions, adding the relevant sections of the applicable laws, and making the supporting evidence more specific. This document is the response to those suggestions. His feedback is not a formal sign-off on the rule engine.
