# Eighteen: idea and features (design v4)

Working name. Design and visual direction come later.

## The problem

Minnesota (181A.13), Illinois (820 ILCS 206) and California (Fam. Code 6650-6655, plus AB 1880) require money to be set aside for minors who earn through online content. Today the proof usually sits in a parent's own records, and the parent is the person the child would have to sue.

Eighteen gives the child a record that nobody can quietly rewrite, without putting the child's identity or income on a public chain.

## Who it is for

- Primary user: the trust officer or corporate fiduciary holding the child's account, and family counsel.
- Compliant parents: a contemporaneous record of good-faith compliance.
- Non-adopters: a court, settlement or guardian ad litem can order it as a monitoring remedy.
- Brands: a compliance clause in the sponsorship contract, plus an attestation. The law does not put this duty on brands for family-channel deals, so the clause is contractual. AB 1880 applies where the minor is a party to the contract (15% set-aside).

## Core features (these four carry the demo)

### 1. Proof-gated payout: "no proof, no payout"

A brand pays a sponsorship in USDC into a contract, under a compliance clause both sides signed. The parent's share releases only after that period's sampled review has closed and a valid zero-knowledge proof is submitted. Without both, the call reverts on-chain. The proof reveals nothing about the child, but wallet addresses, amounts and timing are public, so releases go through a relayer in batches and this rail is never described as fully private. Fiat and the bank trust stay off-chain and are only attested. Open legal question: whether holding USDC this way counts as escrow or falls under California's DFAL.

### 2. Statute as a circuit

Rule packs for MN, IL and CA compile to zero-knowledge circuits, with statute examples as test vectors. Includes: MN under-14 prohibition and 100% rule; MN and IL half-of-content-percentage formula; siblings split equally; IL under-16 scope; CA 65% formula and reported $1,250 monthly floor. Each period uses the rule in force on the earning date. Utah stays unsupported until the enrolled text has been read. Same facts, $20,000 at 50% content: $5,000 under MN and IL, $6,500 under California.

### 3. Facts the parent does not author

- Public facts under multi-node consensus: video list, duration, date, paid-placement flag, title, description. Captured at publication, so later edits are detected.
- Contradiction check: a child's stage name in a title or description on a video declared as zero participation. One-way: it can show under-declaration and can never prove accuracy.
- Private facts: Confidential HTTP fetches revenue and deposit data with vaulted credentials. The workflow anchors the hash of the encrypted response on-chain before the fiduciary decrypts it, and the circuit proves decryption of that exact ciphertext, so inputs can't be swapped afterward.

### 4. Falsifiable declarations

The parent signs timecoded intervals per child, covering name, likeness and oral narrative, within a fixed window. Independent paid reviewers, chosen by verifiable randomness and weighted toward videos near the 30% line, check them and sign results. Output: an estimated error rate with a confidence interval. Evidence label: opposing-party statement, FRE 801(d)(2).

## The measured result: the Cliff Study

Preregistered. Blind-code a stratified sample of public family-channel videos, publish aggregates only, name no channel. Report how often the 30% test decides coverage, inter-coder agreement, and a seeded-error test showing how many planted under-declarations the system catches.

## Supporting features

- No public child status: signed credentials to authorized parties only, no plaintext sums on-chain.
- STALE state fails closed if the OAuth grant is revoked; a grace period covers month-end revenue adjustments.
- Estimated and finalized revenue are labelled, and gross and net are shown separately.
- Periodic parent-signed statements, held by the fiduciary, so the record survives revocation and API-data deletion.
- Birthday Packet: statute map, owed versus deposited by month, signed declarations, proofs, an offline verifier, and a section on what the record does not prove.
- Access: the fiduciary is the primary path. A drand timelock is a backstop, in batched quarterly rounds with verifiable encryption, so a parent or vendor can't block access at 18 or seal garbage.
- Deletion receipts for Minn. subd. 5, using an authorized read to tell private videos from deleted ones.
- Non-YouTube income: parent-signed statements, labelled unverified.

## What it does not claim

- It does not prove a declaration is accurate; it proves who said what, when, and where that conflicts with public facts.
- It does not hold the child's trust. A bank, corporate fiduciary or trust company does.
- It is not legal advice.
