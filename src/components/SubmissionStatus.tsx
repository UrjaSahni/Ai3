import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';

type Status = 'pending' | 'running' | 'accepted' | 'wrong_answer' | 'runtime_error';

interface SubmissionStatusProps {
  status: Status;
}

export default function SubmissionStatus({ status }: SubmissionStatusProps) {
  const statusConfig = {
    pending: {
      icon: Loader2,
      label: 'Pending',
      color: 'bg-[#64748b] text-white',
      animate: true,
    },
    running: {
      icon: Loader2,
      label: 'Running',
      color: 'bg-[#3b82f6] text-white',
      animate: true,
    },
    accepted: {
      icon: CheckCircle2,
      label: 'Accepted',
      color: 'bg-[#22c55e] text-white',
      animate: false,
    },
    wrong_answer: {
      icon: XCircle,
      label: 'Wrong Answer',
      color: 'bg-[#ef4444] text-white',
      animate: false,
    },
    runtime_error: {
      icon: AlertCircle,
      label: 'Runtime Error',
      color: 'bg-[#f97316] text-white',
      animate: false,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[#94a3b8]">Status:</span>
      <Badge className={`${config.color} hover:${config.color} flex items-center gap-1.5`}>
        <Icon className={`w-3.5 h-3.5 ${config.animate ? 'animate-spin' : ''}`} />
        {config.label}
      </Badge>
    </div>
  );
}
