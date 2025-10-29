import { useState, useEffect } from 'react';
import { Code2, LogOut, Trophy, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import ProblemView from './ProblemView';
import CodeEditor from './CodeEditor';
import LeaderboardPanel from './LeaderboardPanel';
import Timer from './Timer';
import UserStatsPanel, { Submission } from './UserStatsPanel';

interface ContestDashboardProps {
  contestId: string;
  username: string;
  onLeaveContest: () => void;
  onNavigateToLeaderboard: () => void;
  submissions: Submission[];
  onAddSubmission: (submission: Submission) => void;
  currentProblemId: string;
  onChangeProblem: (problemId: string) => void;
}

export default function ContestDashboard({
  contestId,
  username,
  onLeaveContest,
  onNavigateToLeaderboard,
  submissions,
  onAddSubmission,
  currentProblemId,
  onChangeProblem,
}: ContestDashboardProps) {
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showStatsPanel, setShowStatsPanel] = useState(false);
  const [leaderboardKey, setLeaderboardKey] = useState(0);

  // Contest duration: 3 hours (10800 seconds)
  const CONTEST_DURATION = 10800;

  // Refresh leaderboard every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboardKey(prev => prev + 1);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleLeaveConfirm = () => {
    setShowLeaveDialog(false);
    onLeaveContest();
  };

  // Get user initials
  const userInitials = username.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      {/* Top Bar */}
      <div className="bg-[#1e293b] border-b border-[#334155] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-lg">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white">Shodh-a-Code</span>
          </div>
          <div className="h-6 w-px bg-[#334155]" />
          <span className="text-[#94a3b8]">Contest #{contestId}</span>
        </div>

        <div className="flex items-center gap-4">
          <Timer duration={CONTEST_DURATION} />

          <Button
            variant="ghost"
            onClick={() => setShowStatsPanel(true)}
            className="text-[#f1f5f9] hover:text-white hover:bg-[#334155]"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            My Stats
          </Button>

          <Button
            variant="ghost"
            onClick={onNavigateToLeaderboard}
            className="text-[#f1f5f9] hover:text-white hover:bg-[#334155]"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Full Leaderboard
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
              <span className="text-white">{userInitials}</span>
            </div>
            <span className="text-[#f1f5f9]">{username}</span>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowLeaveDialog(true)}
            className="border-[#334155] text-[#f87171] hover:bg-[#334155] hover:text-[#f87171]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Leave Contest
          </Button>
        </div>
      </div>

      {/* Main Content - 3 Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem */}
        <div className="w-[35%] border-r border-[#334155] overflow-hidden">
          <ProblemView 
            currentProblemId={currentProblemId}
            onChangeProblem={onChangeProblem}
          />
        </div>

        {/* Center Panel - Code Editor */}
        <div className="w-[40%] border-r border-[#334155] overflow-hidden">
          <CodeEditor 
            username={username}
            currentProblemId={currentProblemId}
            onAddSubmission={onAddSubmission}
          />
        </div>

        {/* Right Panel - Leaderboard */}
        <div className="w-[25%] overflow-hidden">
          <LeaderboardPanel key={leaderboardKey} contestId={contestId} />
        </div>
      </div>

      {/* User Stats Panel */}
      {showStatsPanel && (
        <UserStatsPanel
          username={username}
          submissions={submissions}
          onClose={() => setShowStatsPanel(false)}
        />
      )}

      {/* Leave Contest Dialog */}
      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <DialogContent className="bg-[#1e293b] border-[#334155]">
          <DialogHeader>
            <DialogTitle className="text-white">Leave Contest?</DialogTitle>
            <DialogDescription className="text-[#94a3b8]">
              Are you sure you want to leave this contest? Your progress will be saved but you'll need to rejoin to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLeaveDialog(false)}
              className="border-[#334155] text-[#f1f5f9] hover:bg-[#334155]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLeaveConfirm}
              className="bg-[#f87171] hover:bg-[#ef4444] text-white"
            >
              Leave Contest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
