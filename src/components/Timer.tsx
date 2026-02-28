import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
}

export default function Timer({ timeLeft }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 30 && timeLeft > 0;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isUrgent ? 'bg-red-600 animate-pulse' : 'bg-orange-700'
    }`}>
      <Clock className="w-5 h-5" />
      <span className="font-mono font-bold">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
