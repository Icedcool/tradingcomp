/**
 * Fact Finance trade API — same-origin paths default to `/api/fact/*` so Vite (dev) and
 * Vercel (rewrites) can proxy to https://api.fact.finance without browser CORS issues.
 *
 * Override base with `VITE_FACT_TRADE_API_BASE` (e.g. `https://api.fact.finance` if CORS allows).
 */
const FACT_TRADE_PATHS = {
  poolPrice: '/trade/poolPrice',
  standings: '/trade/standings',
  rank: '/trade/rank',
} as const;

export type FactTradeEndpoint = keyof typeof FACT_TRADE_PATHS;

export function getFactTradeApiBase(): string {
  const raw = import.meta.env.VITE_FACT_TRADE_API_BASE;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed !== '') return trimmed.replace(/\/$/, '');
  }
  return '/api/fact';
}

/** Full URL for a trade endpoint (pool price array, standings object, rank evolution array). */
export function factTradeUrl(endpoint: FactTradeEndpoint): string {
  return `${getFactTradeApiBase()}${FACT_TRADE_PATHS[endpoint]}`;
}
