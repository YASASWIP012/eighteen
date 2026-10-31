import assert from "node:assert/strict";
import { test } from "node:test";
import {
  digestFacts,
  findContradictions,
  findEdits,
  parseDuration,
  parseVideos,
  toFacts,
} from "../workflow/logic.ts";

const video = (id: string, title: string, overrides = {}) => ({
  id,
  snippet: { publishedAt: "2026-10-01T10:00:00Z", title, description: "Family vlog" },
  contentDetails: { duration: "PT10M30S" },
  status: { madeForKids: false },
  paidProductPlacementDetails: { hasPaidProductPlacement: true },
  ...overrides,
});

test("parses durations, including days and hours", () => {
  assert.equal(parseDuration("PT10M30S"), 630);
  assert.equal(parseDuration("PT1H"), 3600);
  assert.equal(parseDuration("P1DT5M"), 86_700);
  assert.throws(() => parseDuration("10 minutes"));
});

test("rejects a response with no items", () => {
  assert.throws(() => parseVideos('{"error":{"code":403}}'));
});

test("digest is the same whatever order the API returns", () => {
  const a = toFacts([video("b", "One"), video("a", "Two")]);
  const b = toFacts([video("a", "Two"), video("b", "One")]);
  assert.equal(digestFacts(a), digestFacts(b));
});

test("flags a named child on a zero declaration", () => {
  const videos = [video("a", "Maya's first bike ride"), video("b", "Dad reviews a drill")];
  const declared = [
    { videoId: "a", declaredSeconds: 0 },
    { videoId: "b", declaredSeconds: 0 },
  ];
  assert.deepEqual(findContradictions(videos, declared, "Maya"), ["a"]);
});

test("does not flag a name inside another word", () => {
  const videos = [video("a", "Mayan ruins trip")];
  assert.deepEqual(findContradictions(videos, [{ videoId: "a", declaredSeconds: 0 }], "Maya"), []);
});

test("does not flag a video with declared time", () => {
  const videos = [video("a", "Maya's first bike ride")];
  assert.deepEqual(findContradictions(videos, [{ videoId: "a", declaredSeconds: 90 }], "Maya"), []);
});

test("detects a title edited after capture", () => {
  const [original] = toFacts([video("a", "Maya's first bike ride")]);
  const edited = toFacts([video("a", "A bike ride")]);
  assert.deepEqual(findEdits(edited, { a: original.textDigest }), ["a"]);
});
