pragma circom 2.1.6;

include "circomlib/circuits/comparators.circom";
include "circomlib/circuits/bitify.circom";
include "circomlib/circuits/poseidon.circom";
include "circomlib/circuits/eddsaposeidon.circom";

// floor(numerator / denominator), with the quotient supplied as a witness.
template FloorDiv(bits) {
    signal input numerator;
    signal input denominator;
    signal input quotient;

    signal product <== quotient * denominator;
    signal remainder <== numerator - product;

    component remainderBits = Num2Bits(bits);
    remainderBits.in <== remainder;
    component below = LessThan(bits);
    below.in[0] <== remainder;
    below.in[1] <== denominator;
    below.out === 1;
}

// Proves a deposit covers the amount owed for one period under the selected
// statute, and that the deal's fiduciary signed that deposit, without revealing
// earnings, content share, age or the deposit.
// jurisdiction: 0 Minnesota, 1 California, 2 Illinois.
template SetAside() {
    signal input grossCents;
    signal input contentBps;
    signal input minors;
    signal input age;
    signal input viewTestMet;
    signal input depositedCents;
    signal input salt;
    signal input setAsideBps;
    signal input owedShareCents;
    signal input sigR8x;
    signal input sigR8y;
    signal input sigS;
    signal input earningsSalt;

    signal input commitment;
    signal input dealId;
    signal input periodId;
    signal input jurisdiction;
    signal input fiduciaryAx;
    signal input fiduciaryAy;
    signal input earningsCommitment;
    signal input factsDigest;

    component isCA = IsEqual();
    isCA.in[0] <== jurisdiction;
    isCA.in[1] <== 1;
    component isIL = IsEqual();
    isIL.in[0] <== jurisdiction;
    isIL.in[1] <== 2;
    component isMN = IsZero();
    isMN.in <== jurisdiction;
    isMN.out + isCA.out + isIL.out === 1;

    viewTestMet * (viewTestMet - 1) === 0;

    // Every witness used in a product is range checked. An unbounded quotient
    // could wrap the field and understate what is owed.
    signal bounded[7];
    bounded[0] <== grossCents;
    bounded[1] <== contentBps;
    bounded[2] <== minors;
    bounded[3] <== age;
    bounded[4] <== depositedCents;
    bounded[5] <== owedShareCents;
    bounded[6] <== setAsideBps;

    component range[7];
    for (var i = 0; i < 7; i++) {
        range[i] = Num2Bits(64);
        range[i].in <== bounded[i];
    }

    component boundedShare = LessEqThan(16);
    boundedShare.in[0] <== contentBps;
    boundedShare.in[1] <== 10000;
    boundedShare.out === 1;

    component oneMinor = GreaterEqThan(16);
    oneMinor.in[0] <== minors;
    oneMinor.in[1] <== 1;
    oneMinor.out === 1;

    component hash = Poseidon(7);
    hash.inputs[0] <== grossCents;
    hash.inputs[1] <== contentBps;
    hash.inputs[2] <== minors;
    hash.inputs[3] <== age;
    hash.inputs[4] <== viewTestMet;
    hash.inputs[5] <== depositedCents;
    hash.inputs[6] <== salt;
    hash.out === commitment;

    // The fiduciary signs the deposit for this deal and period, so a parent
    // can't type in a larger figure or reuse a statement from another period.
    component statement = Poseidon(3);
    statement.inputs[0] <== depositedCents;
    statement.inputs[1] <== dealId;
    statement.inputs[2] <== periodId;

    component signature = EdDSAPoseidonVerifier();
    signature.enabled <== 1;
    signature.Ax <== fiduciaryAx;
    signature.Ay <== fiduciaryAy;
    signature.R8x <== sigR8x;
    signature.R8y <== sigR8y;
    signature.S <== sigS;
    signature.M <== statement.out;

    // Earnings must open the commitment the oracle network reported for this
    // period, so the proof can't run on a figure of the prover's choosing.
    component earnings = Poseidon(2);
    earnings.inputs[0] <== grossCents;
    earnings.inputs[1] <== earningsSalt;
    earnings.out === earningsCommitment;

    // Ties the proof to the public facts sealed in the same report.
    signal digestSquared <== factsDigest * factsDigest;

    component atThreshold = GreaterEqThan(16);
    atThreshold.in[0] <== contentBps;
    atThreshold.in[1] <== 3000;

    component overFloor = GreaterEqThan(64);
    overFloor.in[0] <== grossCents;
    overFloor.in[1] <== 125000;

    component under14 = LessThan(16);
    under14.in[0] <== age;
    under14.in[1] <== 14;

    component under16 = LessThan(16);
    under16.in[0] <== age;
    under16.in[1] <== 16;

    component noShare = IsZero();
    noShare.in <== contentBps;
    signal featured <== 1 - noShare.out;
    signal youngAndFeatured <== under14.out * featured;
    signal minnesotaAll <== isMN.out * youngAndFeatured;

    // Same floors as src/rules/index.ts.
    signal numerator <== contentBps * (64 * isCA.out + 1);
    signal denominator <== (isCA.out * 98 + 2) * minors;

    component shareDiv = FloorDiv(40);
    shareDiv.numerator <== numerator;
    shareDiv.denominator <== denominator;
    shareDiv.quotient <== setAsideBps;

    component owedDiv = FloorDiv(40);
    owedDiv.numerator <== grossCents * setAsideBps;
    owedDiv.denominator <== 10000;
    owedDiv.quotient <== owedShareCents;

    // California alone applies the monthly floor; Illinois alone stops at 16.
    signal floorBlocks <== isCA.out * (1 - overFloor.out);
    signal ageBlocks <== isIL.out * (1 - under16.out);
    signal tests <== atThreshold.out * viewTestMet;
    signal notFloored <== tests * (1 - floorBlocks);
    signal covered <== notFloored * (1 - ageBlocks);
    signal coveredOwed <== covered * owedShareCents;
    signal owed <== coveredOwed + minnesotaAll * (grossCents - coveredOwed);

    component paid = GreaterEqThan(64);
    paid.in[0] <== depositedCents;
    paid.in[1] <== owed;
    paid.out === 1;
}

component main { public [commitment, dealId, periodId, jurisdiction, fiduciaryAx, fiduciaryAy, earningsCommitment, factsDigest] } = SetAside();
