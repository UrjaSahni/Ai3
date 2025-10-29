import { X, TrendingUp, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

export interface Submission {
  id: string;
  problemId: string;
  problemTitle: string;
  language: string;
  status: 'accepted' | 'wrong_answer' | 'runtime_error';
  timestamp: Date;
  executionTime: string;
}

interface UserStatsPanelProps {
  username: string;
  submissions: Submission[];
  onClose: () => void;
}

export default function UserStatsPanel({ username, submissions, onClose }: UserStatsPanelProps) {
  const acceptedSubmissions = submissions.filter((s) => s.status === 'accepted').length;
  const totalSubmissions = submissions.length;
  const successRate = totalSubmissions > 0 ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1) : '0';

  const uniqueProblemsSolved = new Set(
    submissions.filter((s) => s.status === 'accepted').map((s) => s.problemId)
  ).size;

  const statusConfig = {
    accepted: {
      icon: CheckCircle2,
      color: 'text-[#22c55e]',
      bg: 'bg-[#22c55e]/10',
      label: 'Accepted',
    },
    wrong_answer: {
      icon: XCircle,
      color: 'text-[#ef4444]',
      bg: 'bg-[#ef4444]/10',
      label: 'Wrong Answer',
    },
    runtime_error: {
      icon: XCircle,
      color: 'text-[#f97316]',
      bg: 'bg-[#f97316]/10',
      label: 'Runtime Error',
    },
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e293b] border border-[#334155] rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#334155] flex items-center justify-between">
          <div>
            <h2 className="text-white mb-1">User Statistics</h2>
            <p className="text-[#94a3b8]">{username}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[#94a3b8] hover:text-white hover:bg-[#334155]"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-[#334155]">
          <div className="bg-[#0f172a] rounded-lg p-4 border border-[#334155]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-[#94a3b8]">Success Rate</span>
            </div>
            <p className="text-white">{successRate}%</p>
          </div>

          <div className="bg-[#0f172a] rounded-lg p-4 border border-[#334155]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
              <span className="text-[#94a3b8]">Problems Solved</span>
            </div>
            <p className="text-white">{uniqueProblemsSolved}</p>
          </div>

          <div className="bg-[#0f172a] rounded-lg p-4 border border-[#334155]">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-[#94a3b8]">Total Submissions</span>
            </div>
            <p className="text-white">{totalSubmissions}</p>
          </div>
        </div>

        {/* Submission History */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <div className="p-6 pb-3 shrink-0">
            <h3 className="text-white">Submission History</h3>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#64748b]">No submissions yet</p>
                <p className="text-[#64748b]">Start solving problems to see your history!</p>
              </div>
            ) : (
              <div className="space-y-3 pr-2">
                {submissions.map((submission) => {
                  const config = statusConfig[submission.status];
                  const Icon = config.icon;

                  return (
                    <div
                      key={submission.id}
                      className="bg-[#0f172a] rounded-lg p-4 border border-[#334155] hover:border-[#3b82f6] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white">{submission.problemTitle}</span>
                            <Badge variant="outline" className="border-[#334155] text-[#94a3b8]">
                              {submission.problemId}
                            </Badge>
                          </div>
                          <p className="text-[#64748b]">
                            {submission.timestamp.toLocaleString()}
                          </p>
                        </div>

                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg}`}>
                          <Icon className={`w-4 h-4 ${config.color}`} />
                          <span className={config.color}>{config.label}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-[#94a3b8]">
                        <span>Language: <span className="text-[#f1f5f9]">{submission.language}</span></span>
                        <span>•</span>
                        <span>Runtime: <span className="text-[#f1f5f9]">{submission.executionTime}</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
