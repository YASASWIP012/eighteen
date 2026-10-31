import assert from "node:assert/strict";
import { test } from "node:test";
import { assess, type PeriodFacts } from "../src/rules/index.ts";

const base: PeriodFacts = {
  jurisdiction: "MN",
  grossCents: 2_000_000n,
  contentBps: 5000,
  minorsInSegment: 1,
  ageYears: 15,
};

test("MN: half the content percentage of gross", () => {
  assert.equal(assess(base).owedCents, 500_000n);
});

test("CA: 65 percent of the content share", () => {
  assert.equal(assess({ ...base, jurisdiction: "CA" }).owedCents, 650_000n);
});

test("MN: exactly 30 percent is covered, one basis point less is not", () => {
  assert.equal(assess({ ...base, contentBps: 3000 }).covered, true);
  assert.equal(assess({ ...base, contentBps: 2999 }).covered, false);
});

test("MN: siblings in a segment split equally", () => {
  assert.equal(assess({ ...base, minorsInSegment: 2 }).owedCents, 250_000n);
});

test("MN: a featured under-14 is owed everything and is flagged", () => {
  const result = assess({ ...base, ageYears: 13 });
  assert.equal(result.owedCents, 2_000_000n);
  assert.deepEqual(result.flags, ["UNDER_14_BARRED"]);
});

test("CA: below the monthly floor is not covered", () => {
  const result = assess({ ...base, jurisdiction: "CA", grossCents: 124_999n });
  assert.equal(result.covered, false);
});

test("rejects shares outside 0 to 100 percent", () => {
  assert.throws(() => assess({ ...base, contentBps: 10_001 }), RangeError);
});
