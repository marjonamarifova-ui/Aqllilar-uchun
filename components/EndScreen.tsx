
import React from 'react';

interface EndScreenProps {
  totalScore: number;
  onPlayAgain: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ totalScore, onPlayAgain }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-300 via-teal-400 to-cyan-500 text-gray-900 animate-fade-in p-4 text-center">
      <h1 className="text-5xl md:text-7xl font-bold" style={{ textShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        Oʻyin tugadi!
      </h1>
      <p className="mt-4 text-2xl text-gray-800">
        Siz topshiriqlarni muvaffaqiyatli bajardingiz.
      </p>
      <div className="mt-8 text-center bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <p className="text-2xl text-gray-800">Yakuniy Hisob:</p>
        <p className="text-7xl font-bold text-cyan-800 mt-2">{totalScore}</p>
      </div>
      <button
        onClick={onPlayAgain}
        className="mt-12 px-12 py-3 bg-cyan-600 text-white font-bold text-lg rounded-full hover:bg-cyan-500 hover:scale-105 transform transition-all duration-300 shadow-lg shadow-cyan-600/40 focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        Qayta o'ynash
      </button>
    </div>
  );
};

export default EndScreen;