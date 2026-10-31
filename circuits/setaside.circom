pragma circom 2.1.6;

include "circomlib/circuits/comparators.circom";
include "circomlib/circuits/bitify.circom";
include "circomlib/circuits/poseidon.circom";

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

// Proves the deposit covers the amount owed for one period under the selected
// statute, without revealing earnings, content share, age or the deposit.
// jurisdiction: 0 Minnesota, 1 California.
template SetAside() {
    signal input grossCents;
    signal input contentBps;
    signal input minors;
    signal input age;
    signal input depositedCents;
    signal input salt;
    signal input setAsideBps;
    signal input owedShareCents;

    signal input commitment;
    signal input dealId;
    signal input periodId;
    signal input jurisdiction;

    jurisdiction * (jurisdiction - 1) === 0;

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

    component hash = Poseidon(6);
    hash.inputs[0] <== grossCents;
    hash.inputs[1] <== contentBps;
    hash.inputs[2] <== minors;
    hash.inputs[3] <== age;
    hash.inputs[4] <== depositedCents;
    hash.inputs[5] <== salt;
    hash.out === commitment;

    component atThreshold = GreaterEqThan(16);
    atThreshold.in[0] <== contentBps;
    atThreshold.in[1] <== 3000;

    component overFloor = GreaterEqThan(64);
    overFloor.in[0] <== grossCents;
    overFloor.in[1] <== 125000;

    component under14 = LessThan(16);
    under14.in[0] <== age;
    under14.in[1] <== 14;

    component noShare = IsZero();
    noShare.in <== contentBps;
    signal featured <== 1 - noShare.out;
    signal minnesotaAllOwed <== under14.out * featured;

    // Same floors as src/rules/index.ts.
    signal numerator <== contentBps * (64 * jurisdiction + 1);
    signal denominator <== (jurisdiction * 98 + 2) * minors;

    component shareDiv = FloorDiv(40);
    shareDiv.numerator <== numerator;
    shareDiv.denominator <== denominator;
    shareDiv.quotient <== setAsideBps;

    component owedDiv = FloorDiv(40);
    owedDiv.numerator <== grossCents * setAsideBps;
    owedDiv.denominator <== 10000;
    owedDiv.quotient <== owedShareCents;

    // California alone applies the monthly floor.
    signal floorBlocks <== jurisdiction * (1 - overFloor.out);
    signal covered <== atThreshold.out * (1 - floorBlocks);
    signal coveredOwed <== covered * owedShareCents;
    signal minnesotaAll <== (1 - jurisdiction) * minnesotaAllOwed;
    signal owed <== coveredOwed + minnesotaAll * (grossCents - coveredOwed);

    component paid = GreaterEqThan(64);
    paid.in[0] <== depositedCents;
    paid.in[1] <== owed;
    paid.out === 1;

    // Binds the proof to one deal and period so it can't be replayed.
    signal binding <== dealId * periodId;
}

component main { public [commitment, dealId, periodId, jurisdiction] } = SetAside();
