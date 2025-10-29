import { useState } from 'react';
import { ArrowLeft, Trophy, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';

interface LeaderboardPageProps {
  contestId: string;
  onBackToContest: () => void;
}

const mockFullLeaderboard = [
  { rank: 1, username: 'Alice', score: 1000, submissions: 3, time: '1:23:45', problems: 'P1, P2, P3' },
  { rank: 2, username: 'Bob', score: 880, submissions: 4, time: '1:45:20', problems: 'P1, P2, P3' },
  { rank: 3, username: 'Charlie', score: 760, submissions: 5, time: '2:10:15', problems: 'P1, P2' },
  { rank: 4, username: 'David', score: 640, submissions: 3, time: '1:55:30', problems: 'P1, P2' },
  { rank: 5, username: 'Emma', score: 520, submissions: 6, time: '2:30:45', problems: 'P1, P3' },
  { rank: 6, username: 'Frank', score: 400, submissions: 4, time: '2:15:20', problems: 'P1' },
  { rank: 7, username: 'Grace', score: 380, submissions: 3, time: '2:05:10', problems: 'P1' },
  { rank: 8, username: 'Henry', score: 260, submissions: 5, time: '2:45:30', problems: 'P2' },
  { rank: 9, username: 'Ivy', score: 140, submissions: 4, time: '2:50:15', problems: 'P1' },
  { rank: 10, username: 'Jack', score: 120, submissions: 3, time: '2:55:40', problems: 'P1' },
  { rank: 11, username: 'Kate', score: 100, submissions: 2, time: '2:58:20', problems: 'P1' },
  { rank: 12, username: 'Liam', score: 80, submissions: 4, time: '3:05:30', problems: 'P1' },
  { rank: 13, username: 'Mia', score: 60, submissions: 3, time: '3:10:45', problems: 'P1' },
  { rank: 14, username: 'Noah', score: 40, submissions: 5, time: '3:15:20', problems: 'P2' },
  { rank: 15, username: 'Olivia', score: 20, submissions: 2, time: '3:20:10', problems: 'P1' },
];

export default function LeaderboardPage({ contestId, onBackToContest }: LeaderboardPageProps) {
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <div className="bg-[#1e293b] border-b border-[#334155] px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={onBackToContest}
            className="text-[#f1f5f9] hover:text-white hover:bg-[#334155]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contest
          </Button>

          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-[#94a3b8]" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-[#0f172a] border-[#334155] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-[#334155]">
                <SelectItem value="all" className="text-white hover:bg-[#334155]">
                  All Problems
                </SelectItem>
                <SelectItem value="p1" className="text-white hover:bg-[#334155]">
                  Problem P1
                </SelectItem>
                <SelectItem value="p2" className="text-white hover:bg-[#334155]">
                  Problem P2
                </SelectItem>
                <SelectItem value="p3" className="text-white hover:bg-[#334155]">
                  Problem P3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white">Contest Leaderboard</h1>
            <p className="text-[#94a3b8]">Contest #{contestId} - Live Rankings</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="container mx-auto p-6">
        <div className="bg-[#1e293b] rounded-xl border border-[#334155] overflow-hidden">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <Table>
              <TableHeader>
                <TableRow className="border-[#334155] hover:bg-transparent">
                  <TableHead className="text-[#94a3b8]">Rank</TableHead>
                  <TableHead className="text-[#94a3b8]">Username</TableHead>
                  <TableHead className="text-[#94a3b8]">Score</TableHead>
                  <TableHead className="text-[#94a3b8]">Submissions</TableHead>
                  <TableHead className="text-[#94a3b8]">Time</TableHead>
                  <TableHead className="text-[#94a3b8]">Problems Solved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFullLeaderboard.map((entry) => (
                  <TableRow
                    key={entry.rank}
                    className="border-[#334155] hover:bg-[#334155]/30 transition-colors"
                  >
                    <TableCell>
                      <div
                        className={`
                          inline-flex items-center justify-center w-8 h-8 rounded-full
                          ${entry.rank === 1 ? 'bg-[#fbbf24] text-[#0f172a]' : ''}
                          ${entry.rank === 2 ? 'bg-[#94a3b8] text-[#0f172a]' : ''}
                          ${entry.rank === 3 ? 'bg-[#d97706] text-[#0f172a]' : ''}
                          ${entry.rank > 3 ? 'bg-transparent text-[#f1f5f9]' : ''}
                        `}
                      >
                        {entry.rank}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#f1f5f9]">
                      {entry.username}
                    </TableCell>
                    <TableCell className="text-[#3b82f6]">
                      {entry.score}
                    </TableCell>
                    <TableCell className="text-[#f1f5f9]">{entry.submissions}</TableCell>
                    <TableCell className="text-[#94a3b8]">{entry.time}</TableCell>
                    <TableCell className="text-[#8b5cf6]">{entry.problems}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
            <p className="text-[#94a3b8] mb-1">Total Participants</p>
            <p className="text-white">{mockFullLeaderboard.length}</p>
          </div>
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
            <p className="text-[#94a3b8] mb-1">Total Submissions</p>
            <p className="text-white">
              {mockFullLeaderboard.reduce((sum, entry) => sum + entry.submissions, 0)}
            </p>
          </div>
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
            <p className="text-[#94a3b8] mb-1">Contest Duration</p>
            <p className="text-white">3:00:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
