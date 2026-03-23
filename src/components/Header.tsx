import { WalletConnect } from './WalletConnect';
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm">
          <Activity size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Duke FinTech564</h1>
          <p className="text-xs text-gray-500 font-medium tracking-wide mt-1 uppercase">Trading Platform</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <WalletConnect />
      </div>
    </header>
  );
}
