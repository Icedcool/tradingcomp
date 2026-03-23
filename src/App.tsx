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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      
      <main className="max-w-[1600px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Market Context */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <MarketContext />
          </div>

          {/* Middle Panel: recent txs + swap */}
          <div className="lg:col-span-4 flex flex-col gap-6 items-center">
            <div className="w-full max-w-md sticky top-24">
              <SwapInterface />
            <RecentTransactions />
            </div>
          </div>

          {/* Right Panel: The Competition */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Leaderboard />
          </div>

        </div>
      </main>
    </div>
  );
}
