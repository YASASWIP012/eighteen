import {
  consensusIdenticalAggregation,
  cre,
  getNetwork,
  type HTTPSendRequester,
  hexToBase64,
  ok,
  prepareReportRequest,
  Runner,
  type Runtime,
  text,
} from "@chainlink/cre-sdk";
import { encodeAbiParameters, keccak256, stringToHex } from "viem";
import { z } from "zod";
import { type Declaration, digestFacts, findContradictions, parseVideos, toFacts } from "./logic.ts";

const configSchema = z.object({
  schedule: z.string(),
  videoIds: z.array(z.string()).min(1).max(50),
  chainSelectorName: z.string(),
  registryAddress: z.string(),
  channelRef: z.string(),
  declarations: z.array(z.object({ videoId: z.string(), declaredSeconds: z.number() })),
});

type Config = z.infer<typeof configSchema>;

interface Observation {
  digest: `0x${string}`;
  videos: number;
  contradictions: number;
}

const PARTS = "snippet,contentDetails,status,paidProductPlacementDetails";

// Runs on every node. Identical aggregation only succeeds when they all agree,
// which is why nothing volatile, such as view counts, is requested.
const observe =
  (apiKey: string, stageName: string) =>
  (requester: HTTPSendRequester, config: Config): Observation => {
    const url =
      "https://www.googleapis.com/youtube/v3/videos" +
      `?part=${PARTS}&id=${config.videoIds.join(",")}&key=${apiKey}`;

    const response = requester.sendRequest({ url, method: "GET" }).result();
    if (!ok(response)) throw new Error(`YouTube returned ${response.statusCode}`);

    const videos = parseVideos(text(response));
    const declarations: Declaration[] = config.declarations;
    return {
      digest: digestFacts(toFacts(videos)),
      videos: videos.length,
      contradictions: findContradictions(videos, declarations, stageName).length,
    };
  };

const onSchedule = (runtime: Runtime<Config>): string => {
  const { config } = runtime;
  const apiKey = runtime.getSecret({ id: "YOUTUBE_API_KEY" }).result().value;
  const stageName = runtime.getSecret({ id: "CHILD_STAGE_NAME" }).result().value;

  const http = new cre.capabilities.HTTPClient();
  const observation = http
    .sendRequest(runtime, observe(apiKey, stageName), consensusIdenticalAggregation<Observation>())(config)
    .result();

  const network = getNetwork({
    chainFamily: "evm",
    chainSelectorName: config.chainSelectorName,
    isTestnet: true,
  });
  if (!network) throw new Error(`Unknown network ${config.chainSelectorName}`);

  const payload = encodeAbiParameters(
    [{ type: "bytes32" }, { type: "bytes32" }, { type: "uint32" }, { type: "uint32" }],
    [
      keccak256(stringToHex(config.channelRef)),
      observation.digest,
      observation.videos,
      observation.contradictions,
    ],
  );

  const report = runtime.report(prepareReportRequest(payload)).result();
  new cre.capabilities.EVMClient(network.chainSelector.selector)
    .writeReport(runtime, { receiver: config.registryAddress, report })
    .result();

  runtime.log(`Sealed ${observation.videos} videos, ${observation.contradictions} contradictions`);
  return hexToBase64(observation.digest);
};

const initWorkflow = (config: Config) => {
  const cron = new cre.capabilities.CronCapability();
  return [cre.handler(cron.trigger({ schedule: config.schedule }), onSchedule)];
};

export async function main() {
  const runner = await Runner.newRunner<Config>({ configSchema });
  await runner.run(initWorkflow);
}

main();
