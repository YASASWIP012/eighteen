import { keccak256, stringToHex } from "viem";

export interface VideoFact {
  id: string;
  publishedAt: string;
  durationSeconds: number;
  paidPlacement: boolean;
  madeForKids: boolean;
  textDigest: `0x${string}`;
}

export interface Declaration {
  videoId: string;
  /** Seconds the parent signed for this child. */
  declaredSeconds: number;
}

interface YouTubeVideo {
  id: string;
  snippet: { publishedAt: string; title: string; description: string };
  contentDetails: { duration: string };
  status?: { madeForKids?: boolean };
  paidProductPlacementDetails?: { hasPaidProductPlacement?: boolean };
}

/** Parses ISO 8601 durations such as PT1H2M3S and P1DT5M. */
export function parseDuration(iso: string): number {
  const match = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/.exec(iso);
  if (!match) throw new Error(`Unrecognized duration: ${iso}`);
  const [, d = "0", h = "0", m = "0", s = "0"] = match;
  return Number(d) * 86_400 + Number(h) * 3_600 + Number(m) * 60 + Number(s);
}

function textOf(video: YouTubeVideo): string {
  return `${video.snippet.title}\n${video.snippet.description}`;
}

export function parseVideos(body: string): YouTubeVideo[] {
  const parsed = JSON.parse(body) as { items?: YouTubeVideo[] };
  if (!Array.isArray(parsed.items)) throw new Error("Response has no items array");
  return parsed.items;
}

export function toFacts(videos: YouTubeVideo[]): VideoFact[] {
  return videos
    .map((video) => ({
      id: video.id,
      publishedAt: video.snippet.publishedAt,
      durationSeconds: parseDuration(video.contentDetails.duration),
      paidPlacement: video.paidProductPlacementDetails?.hasPaidProductPlacement ?? false,
      madeForKids: video.status?.madeForKids ?? false,
      textDigest: keccak256(stringToHex(textOf(video))),
    }))
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

/** Canonical digest; sorted input and fixed key order keep every node identical. */
export function digestFacts(facts: VideoFact[]): `0x${string}` {
  return keccak256(stringToHex(JSON.stringify(facts)));
}

function mentions(text: string, name: string): boolean {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, "iu").test(text);
}

/**
 * Videos that name the child in public text but were declared as zero
 * participation. One-way: it can show under-declaration, never accuracy.
 */
export function findContradictions(
  videos: YouTubeVideo[],
  declarations: Declaration[],
  stageName: string,
): string[] {
  const declared = new Map(declarations.map((d) => [d.videoId, d.declaredSeconds]));
  return videos
    .filter((video) => declared.get(video.id) === 0 && mentions(textOf(video), stageName))
    .map((video) => video.id)
    .sort();
}

/** Videos whose public text changed since the digest captured at publication. */
export function findEdits(
  facts: VideoFact[],
  captured: Record<string, `0x${string}`>,
): string[] {
  return facts
    .filter((fact) => captured[fact.id] !== undefined && captured[fact.id] !== fact.textDigest)
    .map((fact) => fact.id);
}
