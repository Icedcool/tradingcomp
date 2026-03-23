import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Mock data generator
const generateLeaderboard = () => {
  return Array.from({ length: 10 }).map((_, i) => ({
    rank: i + 1,
    wallet: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
    portfolioValue: (1000 - i * 50 + Math.random() * 20).toFixed(2),
    change24h: (Math.random() * 10 - 5).toFixed(0),
    isCurrentUser: i === 3, // Mock current user at rank 4
  }));
};

const generateEvolutionData = () => {
  const data = [];
  let time = new Date();
  time.setDate(time.getDate() - 7);
  
  for (let i = 0; i < 7; i++) {
    data.push({
      date: time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'User 1': Math.floor(Math.random() * 5) + 1,
      'User 2': Math.floor(Math.random() * 5) + 2,
      'User 3': Math.floor(Math.random() * 5) + 3,
    });
    time.setDate(time.getDate() + 1);
  }
  return data;
};

export function Leaderboard() {
  const { address } = useAccount();
  const [leaderboard, setLeaderboard] = useState(generateLeaderboard());
  const [evolutionData, setEvolutionData] = useState(generateEvolutionData());

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard(generateLeaderboard());
      setEvolutionData(generateEvolutionData());
    }, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Evolution Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
          <TrendingUp size={20} className="text-indigo-600" />
          Rank Evolution (Top 3)
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                reversed 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[1, 10]}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="User 1" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="User 2" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="User 3" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-1">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Trophy size={20} className="text-amber-500" />
            Competition Standings
          </h2>
        </div>
        <div className="overflow-x-auto min-w-0">
          <table className="w-full table-fixed text-left border-collapse text-sm">
            <colgroup>
              <col className="w-11" />
              <col />
              <col className="w-20 sm:w-24" />
              <col className="w-14 sm:w-16" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30">
                <th className="pl-3 pr-1 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">#</th>
                <th className="px-1 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Wallet</th>
                <th className="px-1 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide text-right" title="Portfolio value (FT564)">
                  FT564 
                </th>
                <th className="pl-1 pr-3 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide text-right">24h</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaderboard.map((row) => (
                <tr 
                  key={row.rank} 
                  className={`hover:bg-gray-50 transition-colors ${row.isCurrentUser ? 'bg-indigo-50/50 hover:bg-indigo-50' : ''}`}
                >
                  <td className="pl-3 pr-1 py-2.5 whitespace-nowrap">
                    <div className="flex items-center gap-0.5">
                      <span className={`text-xs font-bold tabular-nums ${row.rank <= 3 ? 'text-amber-500' : 'text-gray-900'}`}>
                        {row.rank}
                      </span>
                      {row.rank === 1 && <Trophy size={12} className="text-amber-500 shrink-0" />}
                    </div>
                  </td>
                  <td className="px-1 py-2.5 min-w-0 font-mono text-xs text-gray-600">
                    {row.isCurrentUser ? (
                      <span className="font-semibold text-indigo-600 inline-flex items-center gap-1 min-w-0 max-w-full">
                        <span className="truncate">
                          {address ? `${address.slice(0, 6)}…${address.slice(-4)}` : row.wallet}
                        </span>
                        <span className="bg-indigo-100 text-indigo-700 text-[9px] px-1 py-0.5 rounded shrink-0">You</span>
                      </span>
                    ) : (
                      <span className="block truncate">{row.wallet}</span>
                    )}
                  </td>
                  <td className="px-1 py-2.5 whitespace-nowrap text-right text-xs font-medium text-gray-900 tabular-nums">
                    {row.portfolioValue}
                  </td>
                  <td className="pl-1 pr-3 py-2.5 whitespace-nowrap text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-medium tabular-nums ${Number(row.change24h) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {Number(row.change24h) >= 0 ? <TrendingUp size={12} className="shrink-0" /> : <TrendingDown size={12} className="shrink-0" />}
                      {Number(row.change24h) == 0 ? '-' : Math.abs(Number(row.change24h))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
