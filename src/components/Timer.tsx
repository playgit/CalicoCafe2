import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
}

export default function Timer({ timeLeft }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2 bg-orange-700 px-4 py-2 rounded-lg">
      <Clock className="w-5 h-5" />
      <span className="font-mono font-bold">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}