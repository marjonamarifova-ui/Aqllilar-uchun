import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black animate-fade-in p-4 text-center">
      <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-wider" style={{ textShadow: '0 0 15px rgba(167, 139, 250, 0.6)' }}>
        Aqllilar uchun
      </h1>
      <p className="mt-4 text-xl text-gray-300 max-w-2xl">
        Yorqin katakchalar ustiga bosing va sonlarni qo'shib boring. To'g'ri natijaga erishish va jumboqni yechish uchun o'z yo'lingizni diqqat bilan rejalashtiring.
      </p>
      <div className="mt-12">
        <button
          onClick={onStart}
          className="px-16 py-4 bg-violet-600 text-white font-bold text-xl rounded-full hover:bg-violet-500 hover:scale-105 transform transition-all duration-300 shadow-lg shadow-violet-600/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-75"
        >
          Boshlash
        </button>
      </div>
    </div>
  );
};

export default StartScreen;