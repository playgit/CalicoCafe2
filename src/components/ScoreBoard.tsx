import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

export default function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-orange-700 px-4 py-2 rounded-lg">
        <span className="font-bold">Score: {score}</span>
      </div>
      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 px-4 py-2 rounded-lg flex items-center gap-2">
        <Trophy className="w-4 h-4" />
        <span className="font-bold">High Score: {highScore}</span>
      </div>
    </div>
  );
}