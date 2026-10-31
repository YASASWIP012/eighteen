// Statute rule packs. All money is integer cents and all shares are basis
// points, so the circuit and this engine agree exactly.

export type Jurisdiction = "MN" | "CA" | "IL";

export interface PeriodFacts {
  jurisdiction: Jurisdiction;
  grossCents: bigint;
  /** Share of compensated content that includes this minor, in basis points. */
  contentBps: number;
  /** Minors who share the content segment, including this one. */
  minorsInSegment: number;
  ageYears: number;
  /** Platform compensation threshold met, or at least $0.10 per view. */
  viewTestMet: boolean;
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
const CA_MONTHLY_FLOOR_CENTS = 125_000n;

export function assess(facts: PeriodFacts): Assessment {
  validate(facts);
  if (facts.jurisdiction === "MN") return assessMN(facts);
  if (facts.jurisdiction === "IL") return assessIL(facts);
  return assessCA(facts);
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

function result(
  f: PeriodFacts,
  covered: boolean,
  setAsideBps: number,
  citation: string,
  ruleVersion: string,
): Assessment {
  if (!covered) return { covered, setAsideBps: 0, owedCents: 0n, flags: [], citation, ruleVersion };
  return {
    covered,
    setAsideBps,
    owedCents: (f.grossCents * BigInt(setAsideBps)) / BPS,
    flags: [],
    citation,
    ruleVersion,
  };
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

  const covered = f.contentBps >= COVERAGE_BPS && f.viewTestMet;
  return result(f, covered, Math.floor(f.contentBps / 2 / f.minorsInSegment), citation, ruleVersion);
}

function assessIL(f: PeriodFacts): Assessment {
  const covered = f.ageYears < 16 && f.contentBps >= COVERAGE_BPS && f.viewTestMet;
  return result(
    f,
    covered,
    Math.floor(f.contentBps / 2 / f.minorsInSegment),
    "820 ILCS 206/95, 206/100",
    "IL-206-2025",
  );
}

function assessCA(f: PeriodFacts): Assessment {
  const covered =
    f.contentBps >= COVERAGE_BPS && f.grossCents >= CA_MONTHLY_FLOOR_CENTS && f.viewTestMet;
  return result(
    f,
    covered,
    Math.floor((f.contentBps * 65) / 100 / f.minorsInSegment),
    "Cal. Fam. Code 6651, 6652(f), 6653(a)",
    "CA-6650-2025",
  );
}
