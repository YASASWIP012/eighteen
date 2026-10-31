import { assess } from "./rules/index.ts";
import { commit, type PrivatePeriod } from "./witness.ts";

export interface PacketPeriod extends PrivatePeriod {
  label: string;
  fiduciarySigned: boolean;
}

export interface PacketRow {
  label: string;
  citation: string;
  owedCents: bigint;
  depositedCents: bigint;
  shortfallCents: bigint;
  fiduciarySigned: boolean;
  flags: string[];
  commitment: string;
}

const dollars = (cents: bigint) =>
  `$${(Number(cents) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

export function buildRows(periods: PacketPeriod[]): PacketRow[] {
  return periods.map((period) => {
    const assessment = assess(period);
    const gap = assessment.owedCents - period.depositedCents;
    return {
      label: period.label,
      citation: assessment.citation,
      owedCents: assessment.owedCents,
      depositedCents: period.depositedCents,
      shortfallCents: gap > 0n ? gap : 0n,
      fiduciarySigned: period.fiduciarySigned,
      flags: assessment.flags,
      commitment: commit(period).toString(16).padStart(64, "0"),
    };
  });
}

/** The record a child hands to a lawyer at 18. Markdown, so it opens anywhere. */
export function renderPacket(childAlias: string, periods: PacketPeriod[]): string {
  const rows = buildRows(periods);
  const total = (pick: (row: PacketRow) => bigint) => rows.reduce((sum, row) => sum + pick(row), 0n);

  const table = rows.map(
    (r) =>
      `| ${r.label} | ${dollars(r.owedCents)} | ${dollars(r.depositedCents)} | ` +
      `${dollars(r.shortfallCents)} | ${r.fiduciarySigned ? "Yes" : "No"} | ${r.citation} |`,
  );

  return [
    `# Birthday Packet: ${childAlias}`,
    "",
    `Owed: ${dollars(total((r) => r.owedCents))}. Deposited: ${dollars(total((r) => r.depositedCents))}. Shortfall: ${dollars(total((r) => r.shortfallCents))}.`,
    "",
    "| Period | Owed | Deposited | Shortfall | Fiduciary signed | Rule |",
    "|---|---|---|---|---|---|",
    ...table,
    "",
    "## Commitments",
    "",
    ...rows.map((r) => `- ${r.label}: 0x${r.commitment}`),
    "",
    "## What this record does not prove",
    "",
    "- That the parent's declared content share is accurate. It shows who declared what, and when.",
    "- That all income was reported. Income outside the connected platform is self-reported.",
    "- That any shortfall was knowing or reckless, which is what a claim under these statutes turns on.",
    "",
    "This packet is not legal advice. Take it to a lawyer.",
    "",
  ].join("\n");
}
