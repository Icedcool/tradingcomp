/** One row in `public/leaderboard-standings.json` — Competition Standings table. */
export type LeaderboardStandingsRow = {
  rank: number;
  wallet: `0x${string}`;
  /** FT564 balance (human-readable string) */
  portfolioValue: string;
  /** % change vs last script run (same wallet); "0" if unknown */
  change24h: string;
};

export type LeaderboardStandingsFile = {
  updatedAt: string;
  rows: LeaderboardStandingsRow[];
};

/** One holder in a rank-evolution snapshot (top by balance). */
export type RankEvolutionEntry = {
  rank: number;
  wallet: `0x${string}`;
  balance: string;
};

/** One time point for the evolution chart (top N holders). */
export type RankEvolutionSnapshot = {
  timestamp: string;
  top: RankEvolutionEntry[];
};

export function isLeaderboardStandingsFile(x: unknown): x is LeaderboardStandingsFile {
  if (x === null || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  if (typeof o.updatedAt !== 'string' || !Array.isArray(o.rows)) return false;
  return o.rows.every(
    (r) =>
      r !== null &&
      typeof r === 'object' &&
      typeof (r as LeaderboardStandingsRow).rank === 'number' &&
      typeof (r as LeaderboardStandingsRow).wallet === 'string' &&
      typeof (r as LeaderboardStandingsRow).portfolioValue === 'string' &&
      typeof (r as LeaderboardStandingsRow).change24h === 'string',
  );
}

export function isRankEvolutionSnapshot(x: unknown): x is RankEvolutionSnapshot {
  if (x === null || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  if (typeof o.timestamp !== 'string' || !Array.isArray(o.top)) return false;
  return o.top.every(
    (e) =>
      e !== null &&
      typeof e === 'object' &&
      typeof (e as RankEvolutionEntry).rank === 'number' &&
      typeof (e as RankEvolutionEntry).wallet === 'string' &&
      typeof (e as RankEvolutionEntry).balance === 'string',
  );
}
