import { WalletConnect } from './WalletConnect';
import { Activity, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-xl text-white shadow-sm shrink-0">
          <Activity size={20} className="sm:hidden" />
          <Activity size={24} className="hidden sm:block" />
        </div>
        <div className="min-w-0">
          <h1 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight leading-none truncate">Duke FinTech564</h1>
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide mt-0.5 sm:mt-1 uppercase">Trading Platform</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <WalletConnect />
      </div>
    </header>
  );
}
