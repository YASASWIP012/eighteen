import assert from "node:assert/strict";
import { test } from "node:test";
import { assess, type PeriodFacts } from "../src/rules/index.ts";

const base: PeriodFacts = {
  jurisdiction: "MN",
  grossCents: 2_000_000n,
  contentBps: 5000,
  minorsInSegment: 1,
  ageYears: 15,
  viewTestMet: true,
};

test("MN: half the content percentage of gross", () => {
  assert.equal(assess(base).owedCents, 500_000n);
});

test("IL: the same formula as Minnesota", () => {
  assert.equal(assess({ ...base, jurisdiction: "IL" }).owedCents, 500_000n);
});

test("CA: 65 percent of the content share, per Fam. Code 6652(f)", () => {
  assert.equal(assess({ ...base, jurisdiction: "CA" }).owedCents, 650_000n);
});

test("MN: exactly 30 percent is covered, one basis point less is not", () => {
  assert.equal(assess({ ...base, contentBps: 3000 }).covered, true);
  assert.equal(assess({ ...base, contentBps: 2999 }).covered, false);
});

test("siblings in a segment split equally in every state", () => {
  for (const jurisdiction of ["MN", "IL"] as const) {
    assert.equal(assess({ ...base, jurisdiction, minorsInSegment: 2 }).owedCents, 250_000n);
  }
  assert.equal(assess({ ...base, jurisdiction: "CA", minorsInSegment: 2 }).owedCents, 325_000n);
});

test("MN: a featured under-14 is owed everything and is flagged", () => {
  const assessment = assess({ ...base, ageYears: 13 });
  assert.equal(assessment.owedCents, 2_000_000n);
  assert.deepEqual(assessment.flags, ["UNDER_14_BARRED"]);
});

test("IL: covers minors under 16 only", () => {
  assert.equal(assess({ ...base, jurisdiction: "IL", ageYears: 15 }).covered, true);
  assert.equal(assess({ ...base, jurisdiction: "IL", ageYears: 16 }).covered, false);
});

test("CA: below the monthly floor is not covered", () => {
  const assessment = assess({ ...base, jurisdiction: "CA", grossCents: 124_999n });
  assert.equal(assessment.covered, false);
});

test("the view test is required in every state", () => {
  for (const jurisdiction of ["MN", "IL", "CA"] as const) {
    assert.equal(assess({ ...base, jurisdiction, viewTestMet: false }).covered, false);
  }
});

test("rejects shares outside 0 to 100 percent", () => {
  assert.throws(() => assess({ ...base, contentBps: 10_001 }), RangeError);
});
