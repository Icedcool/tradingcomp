import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type RecentTxItem = {
  id: string;
  description: string;
  hash: `0x${string}`;
  at: number;
};

const MAX_ITEMS = 25;

type RecentTransactionsContextValue = {
  items: RecentTxItem[];
  addTransaction: (description: string, hash: `0x${string}`) => void;
};

const RecentTransactionsContext = createContext<RecentTransactionsContextValue | null>(null);

export function RecentTransactionsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RecentTxItem[]>([]);

  const addTransaction = useCallback((description: string, hash: `0x${string}`) => {
    setItems((prev) => {
      if (prev.some((x) => x.hash.toLowerCase() === hash.toLowerCase())) return prev;
      return [
        {
          id: `${hash}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          description,
          hash,
          at: Date.now(),
        },
        ...prev,
      ].slice(0, MAX_ITEMS);
    });
  }, []);

  const value = useMemo(() => ({ items, addTransaction }), [items, addTransaction]);

  return (
    <RecentTransactionsContext.Provider value={value}>{children}</RecentTransactionsContext.Provider>
  );
}

export function useRecentTransactions() {
  const ctx = useContext(RecentTransactionsContext);
  if (!ctx) {
    throw new Error('useRecentTransactions must be used within RecentTransactionsProvider');
  }
  return ctx;
}

export const SEPOLIA_TX_BASE = 'https://sepolia.etherscan.io/tx/';
