// Statute rule packs. All money is integer cents and all shares are basis
// points, so the circuit and this engine agree exactly.

export type Jurisdiction = "MN" | "CA";

export interface PeriodFacts {
  jurisdiction: Jurisdiction;
  grossCents: bigint;
  /** Share of compensated content that includes this minor, in basis points. */
  contentBps: number;
  /** Minors who share the content segment, including this one. */
  minorsInSegment: number;
  ageYears: number;
}

export interface Assessment {
  covered: boolean;
  setAsideBps: number;
  owedCents: bigint;
  flags: string[];
  citation: string;
  ruleVersion: string;
}

const COVERAGE_BPS = 3000;
const BPS = 10_000n;

export function assess(facts: PeriodFacts): Assessment {
  validate(facts);
  return facts.jurisdiction === "MN" ? assessMN(facts) : assessCA(facts);
}

function validate(f: PeriodFacts): void {
  if (f.grossCents < 0n) throw new RangeError("grossCents must not be negative");
  if (!Number.isInteger(f.contentBps) || f.contentBps < 0 || f.contentBps > 10_000) {
    throw new RangeError("contentBps must be an integer from 0 to 10000");
  }
  if (!Number.isInteger(f.minorsInSegment) || f.minorsInSegment < 1) {
    throw new RangeError("minorsInSegment must be at least 1");
  }
}

function assessMN(f: PeriodFacts): Assessment {
  const citation = "Minn. Stat. 181A.13 subds. 1, 3";
  const ruleVersion = "MN-181A.13-2026";

  // A featured minor under 14 is owed all compensation for the content, and
  // the work itself is barred, so this is never reported as plain compliance.
  if (f.ageYears < 14 && f.contentBps > 0) {
    return {
      covered: true,
      setAsideBps: 10_000,
      owedCents: f.grossCents,
      flags: ["UNDER_14_BARRED"],
      citation,
      ruleVersion,
    };
  }

  if (f.contentBps < COVERAGE_BPS) {
    return { covered: false, setAsideBps: 0, owedCents: 0n, flags: [], citation, ruleVersion };
  }

  const setAsideBps = Math.floor(f.contentBps / 2 / f.minorsInSegment);
  return {
    covered: true,
    setAsideBps,
    owedCents: (f.grossCents * BigInt(setAsideBps)) / BPS,
    flags: [],
    citation,
    ruleVersion,
  };
}

function assessCA(f: PeriodFacts): Assessment {
  const citation = "Cal. Fam. Code 6650-6655 (secondary source, code text not yet read)";
  const ruleVersion = "CA-SB764-2025";
  const MONTHLY_FLOOR_CENTS = 125_000n;

  if (f.contentBps < COVERAGE_BPS || f.grossCents < MONTHLY_FLOOR_CENTS) {
    return { covered: false, setAsideBps: 0, owedCents: 0n, flags: [], citation, ruleVersion };
  }

  const setAsideBps = Math.floor((f.contentBps * 65) / 100 / f.minorsInSegment);
  return {
    covered: true,
    setAsideBps,
    owedCents: (f.grossCents * BigInt(setAsideBps)) / BPS,
    // The equal split is carried over from Minnesota; the California source read so far is silent.
    flags: f.minorsInSegment > 1 ? ["CA_SPLIT_UNVERIFIED"] : [],
    citation,
    ruleVersion,
  };
}
