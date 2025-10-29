import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number; // Duration in seconds
}

export default function Timer({ duration }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatTime = (num: number) => String(num).padStart(2, '0');

  // Color coding based on time left
  const getTimeColor = () => {
    if (timeLeft > duration * 0.5) return 'text-[#22c55e]'; // Green
    if (timeLeft > duration * 0.2) return 'text-[#f59e0b]'; // Orange
    return 'text-[#ef4444]'; // Red
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-[#0f172a] rounded-lg border border-[#334155]">
      <Clock className={`w-4 h-4 ${getTimeColor()}`} />
      <span className={`font-mono ${getTimeColor()}`}>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
}
