# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Duke FinTech564 Trading Competition platform. A React + Vite frontend where students swap fETH/FT564 tokens on Sepolia testnet and compete on a leaderboard. Data comes from on-chain reads (wagmi/viem), the Fact Finance API, and local scripts that populate JSON files.

## Commands

- `npm run dev` — Vite dev server on port 3000 with API proxy and HMR
- `npm run build` — production build to `dist/`
- `npm run lint` — TypeScript type-check only (`tsc --noEmit`), no ESLint
- `npm run clean` — remove `dist/`
- `npm run fetch-pool-price` — read V2 pair reserves, append spot price to `public/pool-price.json`
- `npm run fetch-holder-balances` — query Etherscan for FT564 balances, write standings + rank evolution JSON
- `npm run seed-pool-ticks` — one-time V3 tick fix (requires `PRIVATE_KEY` env var)

No test framework is configured.

## Architecture

**Frontend stack**: React 19, Vite, Tailwind CSS v4, TanStack React Query, wagmi/viem (Web3), lightweight-charts (price chart), Recharts (rank evolution chart).

**Entry path**: `index.html` → `src/main.tsx` (providers: Wagmi, QueryClient, RecentTransactionsProvider) → `src/App.tsx` (3-column layout).

**Three panels in App.tsx**:
- Left: `MarketContext` — user balances + `PriceChart` (pool price history)
- Center: `SwapInterface` + `RecentTransactions` — ERC-20 approve → V2 pair swap flow
- Right: `Leaderboard` — standings table + rank evolution chart

**Data sources**:
- On-chain: ERC-20 balanceOf/allowance, V2 pair getReserves/swap (via wagmi hooks + viem)
- API: Fact Finance at `/api/fact/trade/{poolPrice,standings,rank}` — proxied in dev (vite.config.ts) and prod (vercel.json rewrites)
- Local JSON: scripts generate `public/pool-price.json`, `public/leaderboard-standings.json`, `public/rank-evolution.json`; sample files prefixed with `sample-` exist for testing

**Key modules**:
- `src/utils/contracts.ts` — token/pair addresses (from env), ERC-20 + V2 pair ABIs
- `src/utils/factTradeApi.ts` — API URL builder with env overrides
- `src/types/poolPrice.ts`, `src/types/leaderboard.ts` — response types with runtime type guards
- `src/context/RecentTransactionsContext.tsx` — transaction history state (max 25)

**Swap logic** (`SwapInterface.tsx`): Uniswap V2 constant-product formula with 0.3% fee. Two-step: transfer tokens to pair contract, then call `pair.swap()`. Includes approval flow, slippage tolerance, and contract error decoding.

## Environment Variables

Required (client, prefixed `VITE_`): `VITE_TOKEN_FETH_ADDRESS`, `VITE_TOKEN_FT564_ADDRESS`, `VITE_PAIR_V2_ADDRESS`.

Required (scripts): `VITE_ETHERSCAN_API_KEY`.

See `.env.example` for all variables including optional API URL overrides. The `.env` file has Sepolia defaults checked in; `.env.local` is gitignored for secrets.

## Path Alias

`@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).

## Deployment

Deployed on Vercel. The `vercel.json` rewrites `/api/fact/:path*` to `https://api.fact.finance/:path*`. In dev, Vite's proxy handles this same routing.
