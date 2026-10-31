import assert from "node:assert/strict";
import { test } from "node:test";
import { assess } from "../src/rules/index.ts";
import { fiduciaryPublicKey, type PrivatePeriod, signDeposit, witnessHolds } from "../src/prove.ts";

const KEY = "sandbox-fiduciary";
const fiduciary = fiduciaryPublicKey(KEY);
const holds = (p: PrivatePeriod) =>
  witnessHolds(p, 1n, 1n, fiduciary, signDeposit(KEY, p.depositedCents, 1n, 1n));

// The circuit and the rule engine are two statements of the same law. They
// must agree on the exact cent where a deposit stops being enough.
const grosses = [0n, 99_999n, 124_999n, 125_000n, 2_000_000n, 3_333_333n, 123_456_789n];
const shares = [0, 1, 2999, 3000, 3001, 3333, 5000, 9999, 10_000];
const minors = [1, 2, 3, 7];
const ages = [5, 13, 14, 15, 16, 17];

test("circuit and engine agree on the boundary", { timeout: 280_000 }, async () => {
  let checked = 0;
  for (const jurisdiction of ["MN", "CA", "IL"] as const) {
    for (const grossCents of grosses) {
      for (const contentBps of shares) {
        for (const minorsInSegment of minors) {
          for (const ageYears of ages) {
            if ((checked++ + Number(grossCents) + contentBps) % 53 !== 0) continue;
            const viewTestMet = checked % 5 !== 0;
            const facts = { jurisdiction, grossCents, contentBps, minorsInSegment, ageYears, viewTestMet };
            const { owedCents } = assess(facts);
            const period: PrivatePeriod = { ...facts, depositedCents: owedCents, salt: 7n };

            assert.equal(await holds(period), true, `exact deposit fails: ${owedCents} ${JSON.stringify({ ...facts, grossCents: `${grossCents}` })}`);
            if (owedCents > 0n) {
              const short = { ...period, depositedCents: owedCents - 1n };
              assert.equal(await holds(short), false, `shortfall passes: ${JSON.stringify({ ...facts, grossCents: `${grossCents}` })}`);
            }
          }
        }
      }
    }
  }
});
