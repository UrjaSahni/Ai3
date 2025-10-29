import { CheckCircle2, XCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';

export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  runtime?: string;
}

interface TestCaseResultsProps {
  testCases: TestCase[];
  onClose: () => void;
}

export default function TestCaseResults({ testCases, onClose }: TestCaseResultsProps) {
  const [expandedCases, setExpandedCases] = useState<Set<number>>(
    new Set(testCases.filter(tc => !tc.passed).map(tc => tc.id))
  );

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedCases);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCases(newExpanded);
  };

  const passedCount = testCases.filter(tc => tc.passed).length;
  const totalCount = testCases.length;

  return (
    <div className="bg-[#1e293b] border-t border-[#334155] max-h-[250px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="text-white">Test Case Results</h4>
          <div className="flex items-center gap-2">
            <span className={`${passedCount === totalCount ? 'text-[#22c55e]' : 'text-[#f59e0b]'}`}>
              {passedCount}/{totalCount} Passed
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[#94a3b8] hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Test Cases List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {testCases.map((testCase) => (
            <div
              key={testCase.id}
              className={`
                border rounded-lg overflow-hidden transition-colors
                ${testCase.passed ? 'border-[#22c55e]/30 bg-[#22c55e]/5' : 'border-[#ef4444]/30 bg-[#ef4444]/5'}
              `}
            >
              {/* Test Case Header */}
              <button
                onClick={() => toggleExpanded(testCase.id)}
                className="w-full p-3 flex items-center justify-between hover:bg-[#0f172a]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {testCase.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#ef4444]" />
                  )}
                  <span className="text-white">Test Case {testCase.id}</span>
                  {testCase.runtime && (
                    <span className="text-[#94a3b8]">• {testCase.runtime}</span>
                  )}
                </div>
                {expandedCases.has(testCase.id) ? (
                  <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#94a3b8]" />
                )}
              </button>

              {/* Test Case Details */}
              <AnimatePresence>
                {expandedCases.has(testCase.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-3 pb-3 space-y-3 border-t border-[#334155]/50">
                      {/* Input */}
                      <div className="pt-3">
                        <div className="text-[#94a3b8] mb-1">Input:</div>
                        <div className="bg-[#0f172a] rounded p-2 border border-[#334155]">
                          <code className="text-[#3b82f6] font-mono break-all">
                            {testCase.input}
                          </code>
                        </div>
                      </div>

                      {/* Expected Output */}
                      <div>
                        <div className="text-[#94a3b8] mb-1">Expected Output:</div>
                        <div className="bg-[#0f172a] rounded p-2 border border-[#334155]">
                          <code className="text-[#22c55e] font-mono break-all">
                            {testCase.expectedOutput}
                          </code>
                        </div>
                      </div>

                      {/* Actual Output */}
                      <div>
                        <div className="text-[#94a3b8] mb-1">Your Output:</div>
                        <div className="bg-[#0f172a] rounded p-2 border border-[#334155]">
                          <code className={`font-mono break-all ${testCase.passed ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                            {testCase.actualOutput}
                          </code>
                        </div>
                      </div>

                      {/* Status Message */}
                      {!testCase.passed && (
                        <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded p-2">
                          <span className="text-[#ef4444]">
                            ✗ Output does not match expected result
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
