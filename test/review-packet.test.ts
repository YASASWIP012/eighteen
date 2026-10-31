import assert from "node:assert/strict";
import { test } from "node:test";
import { renderPacket, buildRows, type PacketPeriod } from "../src/packet.ts";
import { crossesCliff, selectForReview, underDeclarationRate } from "../src/review.ts";

const videos = Array.from({ length: 40 }, (_, i) => ({
  id: `v${i}`,
  declaredBps: i < 10 ? 2800 + i * 20 : 1000 + i * 100,
}));

test("the same seed always picks the same videos", () => {
  assert.deepEqual(selectForReview(videos, "seed-a", 8), selectForReview(videos, "seed-a", 8));
});

test("a different seed picks a different sample", () => {
  assert.notDeepEqual(selectForReview(videos, "seed-a", 8), selectForReview(videos, "seed-b", 8));
});

test("at least half the sample sits near the 30% line", () => {
  const picked = selectForReview(videos, "seed-a", 8);
  const near = picked.filter((id) => {
    const video = videos.find((v) => v.id === id)!;
    return Math.abs(video.declaredBps - 3000) <= 500;
  });
  assert.equal(picked.length, 8);
  assert.ok(near.length >= 4);
});

test("never returns duplicates, even when the sample is large", () => {
  const picked = selectForReview(videos, "seed-a", 40);
  assert.equal(new Set(picked).size, 40);
});

test("reports an interval, not just a rate", () => {
  const results = Array.from({ length: 20 }, (_, i) => ({
    id: `v${i}`,
    declaredBps: 2000,
    reviewedBps: i < 5 ? 3100 : 2000,
  }));
  const rate = underDeclarationRate(results);
  assert.equal(rate.misses, 5);
  assert.equal(rate.rate, 0.25);
  assert.ok(rate.low > 0.1 && rate.low < 0.25);
  assert.ok(rate.high > 0.25 && rate.high < 0.5);
});

test("over-declaring is not counted as a miss", () => {
  const rate = underDeclarationRate([{ id: "a", declaredBps: 5000, reviewedBps: 2000 }]);
  assert.equal(rate.misses, 0);
});

test("finds a review that moves a video across the line", () => {
  const results = [
    { id: "a", declaredBps: 2900, reviewedBps: 3200 },
    { id: "b", declaredBps: 3200, reviewedBps: 3400 },
  ];
  assert.deepEqual(crossesCliff(results), ["a"]);
});

const period = (label: string, depositedCents: bigint): PacketPeriod => ({
  label,
  jurisdiction: "MN",
  grossCents: 2_000_000n,
  contentBps: 5000,
  minorsInSegment: 1,
  ageYears: 15,
  viewTestMet: true,
  depositedCents,
  salt: 11n,
  fiduciarySigned: true,
});

test("the packet totals the shortfall", () => {
  const rows = buildRows([period("Jan", 500_000n), period("Feb", 300_000n)]);
  assert.equal(rows[0].shortfallCents, 0n);
  assert.equal(rows[1].shortfallCents, 200_000n);

  const packet = renderPacket("Child A", [period("Jan", 500_000n), period("Feb", 300_000n)]);
  assert.match(packet, /Shortfall: \$2,000\.00/);
  assert.match(packet, /What this record does not prove/);
});

test("over-depositing is not reported as a negative shortfall", () => {
  assert.equal(buildRows([period("Jan", 900_000n)])[0].shortfallCents, 0n);
});
