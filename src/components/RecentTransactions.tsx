import { ExternalLink, History } from 'lucide-react';
import { useRecentTransactions, SEPOLIA_TX_BASE } from '../context/RecentTransactionsContext';

function shortHash(hash: string) {
  if (hash.length <= 14) return hash;
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

export function RecentTransactions() {
  const { items } = useRecentTransactions();

  return (
    <div className="w-full mt-4 max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <History size={18} className="text-indigo-600 shrink-0" />
        <h2 className="text-sm font-semibold text-gray-900">Recent transactions</h2>
      </div>
      <div className="max-h-[220px] overflow-y-auto">
        {items.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-gray-500">
            Approvals and swaps will appear here with a Sepolia Etherscan link.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((tx) => (
              <li key={tx.id} className="px-4 py-3 hover:bg-gray-50/80 transition-colors">
                <p className="text-sm text-gray-900 font-medium leading-snug pr-1">{tx.description}</p>
                <a
                  href={`${SEPOLIA_TX_BASE}${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-xs font-mono text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  {shortHash(tx.hash)}
                  <ExternalLink size={12} className="shrink-0 opacity-70" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
