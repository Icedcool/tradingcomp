## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. **Token & pair addresses (`.env`)** — the app reads on-chain addresses from Vite env vars (must use the `VITE_` prefix so they are available in the browser):

   | Variable | Purpose |
   |----------|---------|
   | `VITE_TOKEN_FETH_ADDRESS` | fETH ERC-20 contract |
   | `VITE_TOKEN_FT564_ADDRESS` | FT564 ERC-20 contract |
   | `VITE_PAIR_V2_ADDRESS` | Uniswap V2 pair for fETH / FT564 |

   **Defaults:** [`.env.development`](.env.development) is loaded for `npm run dev`; [`.env.production`](.env.production) is loaded for `npm run build`. You usually don’t need to create a `.env` file unless you deploy to another network or use different contracts.

   **Override locally:** Copy [`.env.example`](.env.example) to `.env` or `.env.local` (both are gitignored), set the three `VITE_*` variables to valid `0x`-prefixed 40-hex-character addresses, then restart the dev server. Example shape:

   ```bash
   VITE_TOKEN_FETH_ADDRESS=0x...
   VITE_TOKEN_FT564_ADDRESS=0x...
   VITE_PAIR_V2_ADDRESS=0x...
   ```

3. Run the app: `npm run dev`
