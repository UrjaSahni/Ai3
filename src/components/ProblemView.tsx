import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { problems } from '../data/problems';

interface ProblemViewProps {
  currentProblemId: string;
  onChangeProblem: (problemId: string) => void;
}

export default function ProblemView({ currentProblemId, onChangeProblem }: ProblemViewProps) {
  const currentProblem = problems.find((p) => p.id === currentProblemId) || problems[0];

  const difficultyColors = {
    Easy: 'bg-[#22c55e] text-white hover:bg-[#22c55e]',
    Medium: 'bg-[#f59e0b] text-white hover:bg-[#f59e0b]',
    Hard: 'bg-[#ef4444] text-white hover:bg-[#ef4444]',
  };

  return (
    <div className="h-full flex flex-col bg-[#0f172a]">
      <div className="p-4 border-b border-[#334155]">
        <div className="flex items-center justify-between mb-3">
          <Select value={currentProblemId} onValueChange={onChangeProblem}>
            <SelectTrigger className="w-[200px] bg-[#1e293b] border-[#334155] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-[#334155]">
              {problems.map((problem) => (
                <SelectItem
                  key={problem.id}
                  value={problem.id}
                  className="text-white hover:bg-[#334155]"
                >
                  {problem.id} - {problem.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-white">{currentProblem.title}</h3>
          <Badge className={difficultyColors[currentProblem.difficulty]}>
            {currentProblem.difficulty}
          </Badge>
        </div>
        <p className="text-[#94a3b8]">Problem {currentProblem.id}</p>
      </div>

      <ScrollArea className="flex-1">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start rounded-none bg-[#1e293b] border-b border-[#334155] p-0 h-auto">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:bg-transparent data-[state=active]:text-[#3b82f6] text-[#94a3b8]"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:bg-transparent data-[state=active]:text-[#3b82f6] text-[#94a3b8]"
            >
              Examples
            </TabsTrigger>
            <TabsTrigger
              value="constraints"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:bg-transparent data-[state=active]:text-[#3b82f6] text-[#94a3b8]"
            >
              Constraints
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="p-4 space-y-4">
            <div>
              <h4 className="text-white mb-2">Problem Statement</h4>
              <p className="text-[#cbd5e1] leading-relaxed">
                {currentProblem.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="p-4 space-y-4">
            {currentProblem.examples.map((example, index) => (
              <div key={index} className="bg-[#1e293b] rounded-xl p-4 border border-[#334155]">
                <h4 className="text-white mb-3">Example {index + 1}</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-[#94a3b8]">Input:</span>
                    <code className="ml-2 text-[#3b82f6] font-mono">
                      {example.input}
                    </code>
                  </div>
                  <div>
                    <span className="text-[#94a3b8]">Output:</span>
                    <code className="ml-2 text-[#22c55e] font-mono">
                      {example.output}
                    </code>
                  </div>
                  <div>
                    <span className="text-[#94a3b8]">Explanation:</span>
                    <p className="text-[#cbd5e1] mt-1">{example.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="constraints" className="p-4">
            <div className="bg-[#1e293b] rounded-xl p-4 border border-[#334155]">
              <h4 className="text-white mb-3">Constraints</h4>
              <ul className="space-y-2">
                {currentProblem.constraints.map((constraint, index) => (
                  <li key={index} className="text-[#cbd5e1] flex items-start gap-2">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    <code className="font-mono">{constraint}</code>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
