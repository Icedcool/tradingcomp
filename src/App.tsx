/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { MarketContext } from './components/MarketContext';
import { RecentTransactions } from './components/RecentTransactions';
import { SwapInterface } from './components/SwapInterface';
import { Leaderboard } from './components/Leaderboard';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100">
      <Header />
      
      <main className="max-w-[1600px] mx-auto px-4 py-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

          {/* Middle Panel: recent txs + swap — shown first on mobile */}
          <div className="order-1 lg:order-2 lg:col-span-4 flex flex-col gap-4 sm:gap-6 items-center">
            <div className="w-full max-w-md lg:sticky lg:top-24">
              <SwapInterface />
              <RecentTransactions />
            </div>
          </div>

          {/* Left Panel: Market Context */}
          <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-4 sm:gap-6">
            <MarketContext />
          </div>

          {/* Right Panel: The Competition */}
          <div className="order-3 lg:col-span-4 flex flex-col gap-4 sm:gap-6">
            <Leaderboard />
          </div>

        </div>
      </main>
    </div>
  );
}
