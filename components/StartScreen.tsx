import React, { useRef, useEffect } from 'react';

export const Particles = () => {
  // Generate a fixed number of particles to avoid re-renders causing issues
  const particleCount = 20;
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const size = Math.random() * 3 + 1; // size between 1px and 4px
    const duration = Math.random() * 20 + 15; // duration between 15s and 35s
    const delay = Math.random() * -30; // start at different times
    const left = Math.random() * 100; // horizontal position
    
    return (
      <div
        key={i}
        className="particle"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  return <div className="absolute top-0 left-0 w-full h-full overflow-hidden" aria-hidden="true">{particles}</div>;
};


const StartScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        // Autoplay is often blocked by browsers, this is expected.
        console.log("Audio autoplay was prevented:", error);
      });
    }
  }, []);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onStart();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black overflow-hidden p-4 text-center">
      <audio 
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2025/05/22/audio_7e6322ff73.mp3?filename=game-intro-345507.mp3" 
        loop 
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-black opacity-80"></div>
      <Particles />

      <div className="z-10 flex flex-col items-center justify-center">
        <h1 
          className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-wider animate-fade-in animate-float"
          style={{ textShadow: '0 0 25px rgba(167, 139, 250, 0.5), 0 0 10px rgba(255,255,255,0.2)' }}
        >
          Aqllilar uchun
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-2xl animate-fade-in-delay-1 opacity-0">
          Yorqin katakchalar ustiga bosing va sonlarni qo'shib boring. To'g'ri natijaga erishish va jumboqni yechish uchun o'z yo'lingizni diqqat bilan rejalashtiring.
        </p>
        <div className="mt-16 animate-fade-in-delay-2 opacity-0">
          <button
            onClick={handleStart}
            className="px-20 py-5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-2xl rounded-full hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 animate-pulse-glow"
          >
            Boshlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;