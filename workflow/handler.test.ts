import { describe, expect } from "bun:test";
import { EvmMock, HttpActionsMock, newTestRuntime, test } from "@chainlink/cre-sdk/test";
import { decodeAbiParameters } from "viem";
import { digestFacts, parseVideos, toFacts } from "./logic.ts";
import { type Config, onSchedule } from "./handler.ts";

const SEPOLIA = 16015286601757825753n;

const body = JSON.stringify({
  items: [
    {
      id: "vid1",
      snippet: { publishedAt: "2026-10-01T10:00:00Z", title: "Maya's first bike ride", description: "Family vlog" },
      contentDetails: { duration: "PT10M" },
      status: { madeForKids: false },
      paidProductPlacementDetails: { hasPaidProductPlacement: true },
    },
    {
      id: "vid2",
      snippet: { publishedAt: "2026-10-02T10:00:00Z", title: "Dad reviews a drill", description: "Tools" },
      contentDetails: { duration: "PT4M" },
      status: { madeForKids: false },
    },
  ],
});

const statement = JSON.stringify({ dealId: 1, periodId: 1, earningsCommitment: "777" });

const config: Config = {
  schedule: "0 0 * * * *",
  videoIds: ["vid1", "vid2"],
  chainSelectorName: "ethereum-testnet-sepolia",
  registryAddress: "0x0000000000000000000000000000000000000001",
  channelRef: "demo-channel",
  dealId: 1,
  periodId: 1,
  earningsUrl: "https://earnings.test/statement",
  declarations: [
    { videoId: "vid1", declaredSeconds: 0 },
    { videoId: "vid2", declaredSeconds: 0 },
  ],
};

const secrets = new Map([
  ["main", new Map([["YOUTUBE_API_KEY", "test-key"], ["CHILD_STAGE_NAME", "Maya"]])],
]);

describe("workflow handler", () => {
  test("refuses an earnings statement for another period", () => {
    HttpActionsMock.testInstance().sendRequest = (request) => {
      const payload = request.url.startsWith("https://earnings.test")
        ? JSON.stringify({ dealId: 1, periodId: 2, earningsCommitment: "1" })
        : body;
      return { statusCode: 200, body: Buffer.from(payload).toString("base64") };
    };
    expect(() => onSchedule(newTestRuntime(secrets, {}, config) as never)).toThrow();
  });

  test("seals facts and reports the contradiction on-chain", () => {
    let requested = "";
    HttpActionsMock.testInstance().sendRequest = (request) => {
      if (request.url.startsWith("https://earnings.test")) {
        return { statusCode: 200, body: Buffer.from(statement).toString("base64") };
      }
      requested = request.url;
      return { statusCode: 200, body: Buffer.from(body).toString("base64") };
    };

    let written: Uint8Array | undefined;
    EvmMock.testInstance(SEPOLIA).writeReport = (request) => {
      written = request.report?.rawReport;
      return { txStatus: "TX_STATUS_SUCCESS" };
    };

    onSchedule(newTestRuntime(secrets, {}, config) as never);

    expect(requested).toContain("paidProductPlacementDetails");
    expect(requested).not.toContain("statistics");
    expect(written).toBeDefined();

    // The report ends with the ABI payload: channel, digest, videos, contradictions.
    const payload = `0x${Buffer.from(written as Uint8Array).toString("hex").slice(-448)}` as `0x${string}`;
    const [dealId, periodId, , digest, earnings, videos, contradictions] = decodeAbiParameters(
      [
        { type: "uint256" },
        { type: "uint256" },
        { type: "bytes32" },
        { type: "bytes32" },
        { type: "uint256" },
        { type: "uint32" },
        { type: "uint32" },
      ],
      payload,
    );
    expect(dealId).toBe(1n);
    expect(periodId).toBe(1n);
    expect(earnings).toBe(777n);
    expect(digest).toBe(digestFacts(toFacts(parseVideos(body))));
    expect(videos).toBe(2);
    expect(contradictions).toBe(1);
  });
});
