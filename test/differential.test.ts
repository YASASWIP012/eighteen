import assert from "node:assert/strict";
import { test } from "node:test";
import { assess } from "../src/rules/index.ts";
import { type PrivatePeriod, witnessHolds } from "../src/prove.ts";

// The circuit and the rule engine are two statements of the same law. They
// must agree on the exact cent where a deposit stops being enough.
const grosses = [0n, 99_999n, 124_999n, 125_000n, 2_000_000n, 3_333_333n, 123_456_789n];
const shares = [0, 1, 2999, 3000, 3001, 3333, 5000, 9999, 10_000];
const minors = [1, 2, 3, 7];
const ages = [5, 13, 14, 15, 17];

test("circuit and engine agree on the boundary", { timeout: 240_000 }, async () => {
  let checked = 0;
  for (const jurisdiction of ["MN", "CA"] as const) {
    for (const grossCents of grosses) {
      for (const contentBps of shares) {
        for (const minorsInSegment of minors) {
          for (const ageYears of ages) {
            if ((checked++ + Number(grossCents) + contentBps) % 37 !== 0) continue;
            const facts = { jurisdiction, grossCents, contentBps, minorsInSegment, ageYears };
            const { owedCents } = assess(facts);
            const period: PrivatePeriod = { ...facts, depositedCents: owedCents, salt: 7n };

            assert.equal(await witnessHolds(period), true, `exact deposit fails: ${owedCents} ${JSON.stringify({ ...facts, grossCents: `${grossCents}` })}`);
            if (owedCents > 0n) {
              const short = { ...period, depositedCents: owedCents - 1n };
              assert.equal(await witnessHolds(short), false, `shortfall passes: ${JSON.stringify({ ...facts, grossCents: `${grossCents}` })}`);
            }
          }
        }
      }
    }
  }
});
