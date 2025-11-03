import React from 'react';

interface HeaderUIProps {
  target: number;
  score: number;
  levelIndex: number;
  timeLeft: number;
  onRestart: () => void;
}

const HeaderUI: React.FC<HeaderUIProps> = ({ target, score, levelIndex, timeLeft, onRestart }) => {
  const scoreColor = score > target && target > 0 ? 'text-red-500' : 'text-green-400';
  const timeColor = timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-yellow-400';

  return (
    <div className="w-full max-w-2xl mb-8 p-4 bg-black/30 rounded-xl backdrop-blur-sm flex justify-between items-center text-white">
      <div className="text-center">
        <h3 className="text-lg text-gray-400">LEVEL</h3>
        <p className="text-4xl font-bold">{levelIndex + 1}</p>
      </div>
       <div className="text-center">
        <h3 className="text-lg text-gray-400">TARGET</h3>
        <p className="text-4xl font-bold text-cyan-400">{target}</p>
      </div>
      <div className="text-center">
        <h3 className="text-lg text-gray-400">SCORE</h3>
        <p className={`text-4xl font-bold transition-colors ${scoreColor}`}>{score}</p>
      </div>
       <div className="text-center">
        <h3 className="text-lg text-gray-400">TIME</h3>
        <p className={`text-4xl font-bold transition-colors ${timeColor}`}>{timeLeft}</p>
      </div>
       <button 
        onClick={onRestart}
        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-colors self-center h-12"
       >
         Restart
       </button>
    </div>
  );
};

export default HeaderUI;