
import React from 'react';
import { Particles } from './StartScreen';

interface EndScreenProps {
  totalScore: number;
  onPlayAgain: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ totalScore, onPlayAgain }) => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white animate-fade-in p-4 text-center">
      <Particles />
      <div className="z-10 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-bold" style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>
          Oʻyin tugadi!
        </h1>
        <p className="mt-4 text-2xl text-gray-300">
          Siz topshiriqlarni muvaffaqiyatli bajardingiz.
        </p>
        <div className="mt-8 text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-500/30">
          <p className="text-2xl text-gray-300">Yakuniy Hisob:</p>
          <p className="text-7xl font-bold text-cyan-400 mt-2" style={{ textShadow: '0 0 20px rgba(56, 189, 248, 0.7)' }}>{totalScore}</p>
        </div>
        <button
          onClick={onPlayAgain}
          className="mt-12 px-12 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-lg rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          Qayta o'ynash
        </button>
      </div>
    </div>
  );
};

export default EndScreen;