import type { SignalStrength } from "./types";

const weightedRules: Array<[RegExp, number]> = [
  [/issuer transition/i, 3],
  [/card portfolio migration|portfolio migration/i, 3],
  [/customer migration|account migration/i, 3],
  [/m&a integration|post-merger integration|system integration/i, 3],
  [/divestiture|carve-?out|tsa exit|system separation/i, 3],
  [/consent order|mra\b|mria\b/i, 3],
  [/cyber incident|breach|ransomware/i, 3],
  [/regulatory remediation|aml remediation|kyc remediation|sanctions remediation/i, 3],
  [/erp modernization|crm modernization|sap modernization|oracle modernization|workday modernization|salesforce modernization/i, 2],
  [/cloud migration|cloud modernization/i, 2],
  [/\bai implementation\b|enterprise ai|named enterprise|customer rollout/i, 2],
  [/payment modernization|payments modernization|fednow|rtp|ach modernization/i, 2],
  [/core banking|card processor|fiserv|fis\b|jack henry|tsys/i, 2],
  [/data platform migration|snowflake migration|databricks migration|fabric migration/i, 2],
  [/major contract win/i, 2],
  [/product launch/i, 1],
  [/funding round/i, 1],
  [/broad partnership|strategic partnership/i, 1],
  [/stock-only|stock movement|share price/i, -2],
  [/physical infrastructure only|data center only|warehouse only/i, -2],
  [/executive hire|appointed ceo|appointed cto/i, -2]
];

export function scoreText(text: string) {
  return weightedRules.reduce((score, [pattern, points]) => {
    return pattern.test(text) ? score + points : score;
  }, 0);
}

export function strengthFromScore(score: number): SignalStrength {
  if (score >= 5) return "High";
  if (score >= 3) return "Medium";
  return "Low";
}

export function strengthWeight(strength: SignalStrength) {
  return strength === "High" ? 3 : strength === "Medium" ? 2 : 1;
}
