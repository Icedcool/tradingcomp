/**
 * One-time fix for Sepolia pools that only have full-range liquidity (ticks at MIN/MAX).
 * When the active tick is exactly 0 and tickBitmap(word 0) has no bits, SwapRouter02's
 * pool.swap loop can get stuck — exactInputSingle reverts while QuoterV2 still returns quotes.
 *
 * Minting a tiny position with tickLower = 0 flips the bitmap at tick 0 so swaps work.
 *
 * Usage:
 *   SEPOLIA_RPC_URL=https://... PRIVATE_KEY=0x... npx tsx scripts/seed-v3-pool-ticks.ts
 *
 * Requires wallet balance in both fETH and FT564 (small amounts; ~1e15 wei each is enough).
 */
import 'dotenv/config';
import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  maxUint256,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

const NPM = '0x1238536071E1c677A632429e3655c799b22cDA52' as const;
const FETH = '0x8D9263E921df92354e5D2dA8F064726887e70756' as const;
const FT564 = '0xB977127AbD2BCc57782749B63EbBB69Ec7bDA1f7' as const;
const FEE = 100;

const ERC20_ABI = parseAbi([
  'function approve(address spender, uint256 amount) returns (bool)',
]);

const NPM_ABI = parseAbi([
  'struct MintParams { address token0; address token1; uint24 fee; int24 tickLower; int24 tickUpper; uint256 amount0Desired; uint256 amount1Desired; uint256 amount0Min; uint256 amount1Min; address recipient; uint256 deadline; }',
  'function mint(MintParams params) external payable returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)',
]);

async function main() {
  const key = process.env.PRIVATE_KEY;
  if (!key || !key.startsWith('0x')) {
    console.error('Set PRIVATE_KEY in env (0x-prefixed hex).');
    process.exit(1);
  }
  const rpc = process.env.SEPOLIA_RPC_URL ?? 'https://ethereum-sepolia-rpc.publicnode.com';
  const account = privateKeyToAccount(key as `0x${string}`);

  const publicClient = createPublicClient({ chain: sepolia, transport: http(rpc, { timeout: 120_000 }) });
  const walletClient = createWalletClient({ account, chain: sepolia, transport: http(rpc, { timeout: 120_000 }) });

  const small = 10n ** 15n;
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);

  for (const token of [FETH, FT564]) {
    const hash = await walletClient.writeContract({
      account,
      chain: sepolia,
      address: token,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [NPM, maxUint256],
    });
    await publicClient.waitForTransactionReceipt({ hash });
    console.log('Approved NPM for', token, hash);
  }

  const hash = await walletClient.writeContract({
    account,
    chain: sepolia,
    address: NPM,
    abi: NPM_ABI,
    functionName: 'mint',
    args: [
      {
        token0: FETH,
        token1: FT564,
        fee: FEE,
        tickLower: 0,
        tickUpper: 200,
        amount0Desired: small,
        amount1Desired: small,
        amount0Min: 0n,
        amount1Min: 0n,
        recipient: account.address,
        deadline,
      },
    ],
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log('mint tx', hash, 'status', receipt.status);

  const bm = (await publicClient.readContract({
    address: '0x825f8e893936D33579677733583c4c02b642413C',
    abi: parseAbi(['function tickBitmap(int16 wordPosition) view returns (uint256)']),
    functionName: 'tickBitmap',
    args: [0],
  } as never)) as bigint;
  console.log('tickBitmap(0) after seed =', bm.toString(), '(non-zero means swap router should work)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
