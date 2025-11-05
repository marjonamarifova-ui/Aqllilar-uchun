import React from 'react';

interface HeaderUIProps {
  target: number;
  score: number;
  levelIndex: number;
  timeLeft: number;
  onRestart: () => void;
}

const StatItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  valueClass?: string;
}> = ({ icon, label, value, valueClass = '' }) => (
  <div className="flex items-center space-x-3 text-white">
    <div className="w-8 h-8 text-cyan-300">{icon}</div>
    <div className="text-left">
      <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
    </div>
  </div>
);

const HeaderUI: React.FC<HeaderUIProps> = ({ target, score, levelIndex, timeLeft, onRestart }) => {
  const scoreColor = score > target && target > 0 ? 'text-red-400' : 'text-green-400';
  const timeColor = timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-yellow-300';

  return (
    <div className="w-full max-w-4xl mb-6 p-3 bg-black/40 rounded-xl backdrop-blur-sm flex justify-around items-center text-white border border-purple-500/30 shadow-lg shadow-purple-900/50">
      <StatItem 
        label="Level" 
        value={levelIndex + 1}
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" /></svg>}
      />
      <StatItem 
        label="Target" 
        value={target} 
        valueClass="text-cyan-300"
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a12.02 12.02 0 0 0-5.84-2.56m0 0a12.023 12.023 0 0 1-5.84-2.56m5.84 2.56V4.72m0 12.56a12.023 12.023 0 0 0 5.84 2.56m0 0a12.023 12.023 0 0 1 5.84 2.56m-5.84-2.56a12.023 12.023 0 0 0-5.84-2.56m-5.84 2.56a6 6 0 0 1-5.84-7.38m5.84 2.56v-4.82" /></svg>}
      />
      <StatItem 
        label="Score" 
        value={score} 
        valueClass={scoreColor}
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-3.356a.562.562 0 0 0-.682 0l-4.725 3.356a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>}
      />
      <StatItem 
        label="Time" 
        value={timeLeft} 
        valueClass={timeColor}
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
      />
      <button 
        onClick={onRestart}
        className="p-3 text-red-400 rounded-full hover:bg-white/10 hover:text-red-300 transition-colors"
        aria-label="Restart Level"
       >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.182-3.182m0-11.667a8.25 8.25 0 00-11.667 0L2.985 7.985" />
         </svg>
       </button>
    </div>
  );
};

export default HeaderUI;