import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import JoinContestPage from './components/JoinContestPage';
import ContestDashboard from './components/ContestDashboard';
import LeaderboardPage from './components/LeaderboardPage';
import { Submission } from './components/UserStatsPanel';

type Page = 'join' | 'dashboard' | 'leaderboard';

interface ContestData {
  contestId: string;
  username: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('join');
  const [contestData, setContestData] = useState<ContestData | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [currentProblemId, setCurrentProblemId] = useState('P1');

  const handleJoinContest = (contestId: string, username: string) => {
    setContestData({ contestId, username });
    setSubmissions([]);
    setCurrentProblemId('P1');
    setCurrentPage('dashboard');
  };

  const handleLeaveContest = () => {
    setContestData(null);
    setSubmissions([]);
    setCurrentProblemId('P1');
    setCurrentPage('join');
  };

  const handleAddSubmission = (submission: Submission) => {
    setSubmissions((prev) => [submission, ...prev]);
  };

  const handleNavigateToLeaderboard = () => {
    setCurrentPage('leaderboard');
  };

  const handleBackToContest = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {currentPage === 'join' && (
        <JoinContestPage onJoinContest={handleJoinContest} />
      )}
      
      {currentPage === 'dashboard' && contestData && (
        <ContestDashboard
          contestId={contestData.contestId}
          username={contestData.username}
          onLeaveContest={handleLeaveContest}
          onNavigateToLeaderboard={handleNavigateToLeaderboard}
          submissions={submissions}
          onAddSubmission={handleAddSubmission}
          currentProblemId={currentProblemId}
          onChangeProblem={setCurrentProblemId}
        />
      )}
      
      {currentPage === 'leaderboard' && contestData && (
        <LeaderboardPage
          contestId={contestData.contestId}
          onBackToContest={handleBackToContest}
        />
      )}
      
      <Toaster theme="dark" />
    </div>
  );
}
