import { useState, useEffect } from 'react';
import { Play, Send, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import SubmissionStatus from './SubmissionStatus';
import { problems } from '../data/problems';
import { Submission } from './UserStatsPanel';
import TestCaseResults, { TestCase } from './TestCaseResults';

interface CodeEditorProps {
  username: string;
  currentProblemId: string;
  onAddSubmission: (submission: Submission) => void;
}

type SubmissionStatusType = 'idle' | 'pending' | 'running' | 'accepted' | 'wrong_answer' | 'runtime_error';

// Mock test case generator
const generateTestCaseResults = (problemId: string, shouldPass: boolean): TestCase[] => {
  const testCasesByProblem: Record<string, { input: string; expected: string }[]> = {
    P1: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1,2]' },
      { input: 'nums = [3,3], target = 6', expected: '[0,1]' },
      { input: 'nums = [1,5,3,7,9], target = 12', expected: '[2,4]' },
    ],
    P2: [
      { input: 's = "()"', expected: 'true' },
      { input: 's = "()[]{}"', expected: 'true' },
      { input: 's = "(]"', expected: 'false' },
      { input: 's = "([)]"', expected: 'false' },
    ],
    P3: [
      { input: 's = "abcabcbb"', expected: '3' },
      { input: 's = "bbbbb"', expected: '1' },
      { input: 's = "pwwkew"', expected: '3' },
      { input: 's = ""', expected: '0' },
    ],
    P4: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', expected: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', expected: '[]' },
      { input: 'list1 = [], list2 = [0]', expected: '[0]' },
    ],
    P5: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', expected: '49' },
      { input: 'height = [1,1]', expected: '1' },
      { input: 'height = [4,3,2,1,4]', expected: '16' },
    ],
    P6: [
      { input: 'nums1 = [1,3], nums2 = [2]', expected: '2.00000' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', expected: '2.50000' },
    ],
  };

  const defaultTestCases = [
    { input: 'test input 1', expected: 'output 1' },
    { input: 'test input 2', expected: 'output 2' },
    { input: 'test input 3', expected: 'output 3' },
  ];

  const testCaseData = testCasesByProblem[problemId] || defaultTestCases;
  
  return testCaseData.map((tc, index) => {
    const willPass = shouldPass || Math.random() > 0.4;
    const actualOutput = willPass ? tc.expected : generateWrongOutput(tc.expected, index);
    
    return {
      id: index + 1,
      input: tc.input,
      expectedOutput: tc.expected,
      actualOutput,
      passed: willPass,
      runtime: `${Math.floor(Math.random() * 50 + 10)}ms`,
    };
  });
};

const generateWrongOutput = (expected: string, seed: number): string => {
  const wrongOutputs = [
    '[1,0]',
    'false',
    '2',
    '[]',
    '48',
    '2.10000',
    'null',
    '0',
  ];
  return wrongOutputs[seed % wrongOutputs.length];
};

export default function CodeEditor({ username, currentProblemId, onAddSubmission }: CodeEditorProps) {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatusType>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestCase[] | null>(null);

  const currentProblem = problems.find((p) => p.id === currentProblemId) || problems[0];

  // Update code when problem or language changes
  useEffect(() => {
    setCode(currentProblem.starterCode[language as keyof typeof currentProblem.starterCode]);
    setSubmissionStatus('idle');
    setTestResults(null);
  }, [language, currentProblemId, currentProblem]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setTestResults(null);
    toast.info('Running test cases...');
    
    // Simulate running code
    setTimeout(() => {
      setIsRunning(false);
      
      // Generate test results (randomly pass/fail for demo)
      const allPassed = Math.random() > 0.4;
      const results = generateTestCaseResults(currentProblem.id, allPassed);
      setTestResults(results);
      
      const passedCount = results.filter(r => r.passed).length;
      const totalCount = results.length;
      
      if (passedCount === totalCount) {
        toast.success(`All test cases passed! (${passedCount}/${totalCount}) ✓`);
      } else {
        toast.error(`${totalCount - passedCount} test case(s) failed. (${passedCount}/${totalCount})`);
      }
    }, 2000);
  };

  const handleSubmit = async () => {
    setSubmissionStatus('pending');
    toast.info('Submitting your solution...');

    // Simulate submission process
    setTimeout(() => {
      setSubmissionStatus('running');
      toast.info('Running against all test cases...');
    }, 1000);

    setTimeout(() => {
      // Randomly simulate success or failure for demo
      const success = Math.random() > 0.3;
      
      let finalStatus: 'accepted' | 'wrong_answer' | 'runtime_error';
      
      if (success) {
        finalStatus = 'accepted';
        setSubmissionStatus('accepted');
        toast.success('Accepted! Your solution passed all test cases.');
      } else {
        const outcomes: Array<'wrong_answer' | 'runtime_error'> = ['wrong_answer', 'runtime_error'];
        finalStatus = outcomes[Math.floor(Math.random() * outcomes.length)];
        setSubmissionStatus(finalStatus);
        
        if (finalStatus === 'wrong_answer') {
          toast.error('Wrong Answer - Failed on test case 3');
        } else {
          toast.error('Runtime Error - Check your code for errors');
        }
      }

      // Add submission to history
      const submission: Submission = {
        id: `sub-${Date.now()}`,
        problemId: currentProblem.id,
        problemTitle: currentProblem.title,
        language: language.charAt(0).toUpperCase() + language.slice(1),
        status: finalStatus,
        timestamp: new Date(),
        executionTime: `${Math.floor(Math.random() * 500 + 100)}ms`,
      };

      onAddSubmission(submission);
    }, 4000);
  };

  return (
    <div className="h-full flex flex-col bg-[#0f172a] overflow-hidden">
      {/* Editor Header */}
      <div className="p-4 border-b border-[#334155] flex items-center justify-between shrink-0">
        <h3 className="text-white">Code Editor</h3>
        
        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px] bg-[#1e293b] border-[#334155] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-[#334155]">
              <SelectItem value="java" className="text-white hover:bg-[#334155]">
                Java
              </SelectItem>
              <SelectItem value="python" className="text-white hover:bg-[#334155]">
                Python
              </SelectItem>
              <SelectItem value="cpp" className="text-white hover:bg-[#334155]">
                C++
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Code Editor Area */}
        <div className="p-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full min-h-[350px] bg-[#1e293b] border-[#334155] text-[#f1f5f9] font-mono resize-none focus-visible:ring-[#3b82f6]"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>

        {/* Test Case Results */}
        {testResults && (
          <TestCaseResults 
            testCases={testResults} 
            onClose={() => setTestResults(null)}
          />
        )}
      </div>

      {/* Bottom Fixed Area */}
      <div className="shrink-0">
        {/* Status Area */}
        {submissionStatus !== 'idle' && (
          <div className="px-4 py-3 border-t border-[#334155] bg-[#1e293b]">
            <SubmissionStatus status={submissionStatus} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 border-t border-[#334155] flex items-center gap-3 bg-[#0f172a]">
          <Button
            variant="outline"
            onClick={handleRunCode}
            disabled={isRunning || submissionStatus === 'running'}
            className="flex-1 border-[#334155] text-[#f1f5f9] hover:bg-[#334155] hover:text-white"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </>
            )}
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={submissionStatus === 'running' || submissionStatus === 'pending' || isRunning}
            className="flex-1 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed]"
          >
            {submissionStatus === 'running' || submissionStatus === 'pending' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
