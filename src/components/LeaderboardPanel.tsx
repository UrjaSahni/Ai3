import { useState, useEffect } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { motion } from 'motion/react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  time: string;
}

interface LeaderboardPanelProps {
  contestId: string;
}

// Mock leaderboard data
const generateMockLeaderboard = (): LeaderboardEntry[] => {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
  
  return names.map((name, index) => ({
    rank: index + 1,
    username: name,
    score: Math.max(1000 - index * 120 - Math.floor(Math.random() * 50), 0),
    time: `${Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  }));
};

export default function LeaderboardPanel({ contestId }: LeaderboardPanelProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(generateMockLeaderboard());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Simulate periodic refresh with slight changes
    const timer = setTimeout(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setLeaderboard(generateMockLeaderboard());
        setIsRefreshing(false);
      }, 500);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#0f172a]">
      {/* Header */}
      <div className="p-4 border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#f59e0b]" />
          <h3 className="text-white">Live Leaderboard</h3>
        </div>
        <RefreshCw
          className={`w-4 h-4 text-[#94a3b8] ${isRefreshing ? 'animate-spin' : ''}`}
        />
      </div>

      {/* Leaderboard List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={`${entry.username}-${entry.rank}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1e293b] rounded-lg p-3 border border-[#334155] hover:border-[#3b82f6] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center
                      ${entry.rank === 1 ? 'bg-[#fbbf24] text-[#0f172a]' : ''}
                      ${entry.rank === 2 ? 'bg-[#94a3b8] text-[#0f172a]' : ''}
                      ${entry.rank === 3 ? 'bg-[#d97706] text-[#0f172a]' : ''}
                      ${entry.rank > 3 ? 'bg-[#334155] text-[#94a3b8]' : ''}
                    `}
                  >
                    <span>{entry.rank}</span>
                  </div>
                  <span className="text-[#f1f5f9]">{entry.username}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pl-9">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[#94a3b8]">Score: </span>
                    <span className="text-[#3b82f6]">{entry.score}</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8]">Time: </span>
                    <span className="text-[#f1f5f9]">{entry.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Note */}
      <div className="p-3 border-t border-[#334155] bg-[#1e293b]">
        <p className="text-[#64748b] text-center">Auto-refreshes every 15s</p>
      </div>
    </div>
  );
}
