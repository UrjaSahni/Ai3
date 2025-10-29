import { useState } from 'react';
import { Code2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface JoinContestPageProps {
  onJoinContest: (contestId: string, username: string) => void;
}

export default function JoinContestPage({ onJoinContest }: JoinContestPageProps) {
  const [contestId, setContestId] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contestId || !username) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Successfully joined contest!');
      onJoinContest(contestId, username);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-xl">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white">Shodh-a-Code</h1>
        </div>

        {/* Form Card */}
        <div className="bg-[#1e293b]/80 backdrop-blur-xl border border-[#334155] rounded-xl p-8 shadow-2xl">
          <h2 className="text-white mb-6 text-center">Join a Contest</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contestId" className="text-[#f1f5f9]">
                Contest ID
              </Label>
              <Input
                id="contestId"
                type="text"
                placeholder="Enter contest ID"
                value={contestId}
                onChange={(e) => setContestId(e.target.value)}
                className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#f1f5f9]">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed]"
            >
              {loading ? (
                <span>Joining...</span>
              ) : (
                <span className="flex items-center gap-2">
                  Join Contest
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[#64748b]">Powered by Shodh AI</p>
        </div>
      </div>
    </div>
  );
}
