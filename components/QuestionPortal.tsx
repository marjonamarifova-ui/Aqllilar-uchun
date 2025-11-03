import React, { useState } from 'react';

interface LevelCompleteScreenProps {
  levelIndex: number;
  onNextLevel: () => void;
}

const motivationalPhrases = [
  "Barakalla!",
  "Sen zo'rsan!",
  "Ajoyib!",
  "Qoyilmaqom!",
  "Siz daxosiz!",
  "Yaxshi ish!",
];

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({ levelIndex, onNextLevel }) => {
  const [phrase] = useState(() => motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black/50 backdrop-blur-md animate-fade-in text-center p-4 z-50">
      <div className="p-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-2xl border-2 border-green-300">
        <h2 className="text-5xl font-bold text-white">{phrase}</h2>
        <p className="mt-2 text-xl text-green-100">
          Siz {levelIndex + 1}-darajani muvaffaqiyatli yakunladingiz
        </p>
        <button
          onClick={onNextLevel}
          className="mt-8 px-12 py-3 bg-white text-teal-600 font-bold text-lg rounded-full hover:bg-green-100 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          Keyingi Daraja
        </button>
      </div>
    </div>
  );
};

export default LevelCompleteScreen;