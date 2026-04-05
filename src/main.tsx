import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import { RecentTransactionsProvider } from './context/RecentTransactionsContext';
import './index.css';

const config = createConfig({
  chains: [sepolia],
  transports: {
    // QuoterV2 eth_call simulates a full swap and is slow; default timeouts often fail on public RPCs.
    [sepolia.id]: http(undefined, { timeout: 120_000 }),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RecentTransactionsProvider>
          <App />
        </RecentTransactionsProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--chart-tooltip-bg)',
              color: 'var(--chart-tooltip-text)',
              border: '1px solid var(--chart-tooltip-border)',
            },
          }}
        />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);
