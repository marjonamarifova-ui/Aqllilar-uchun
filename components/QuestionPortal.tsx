import React, { useState, useEffect } from 'react';
import { generateLevelStory } from '../services/geminiService';
import { Level } from '../types';

interface LevelCompleteScreenProps {
  level: Level;
  onNextLevel: () => void;
}

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({ level, onNextLevel }) => {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setIsLoading(true);
        const generatedStory = await generateLevelStory(level);
        setStory(generatedStory);
      } catch (e) {
        console.error("Failed to generate story", e);
        setStory("The memory fades... the path ahead is clouded.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, [level]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black/50 backdrop-blur-md animate-fade-in text-center p-4 z-50">
      <div className="p-10 bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-600 rounded-2xl shadow-2xl shadow-purple-500/30 border-2 border-purple-300 w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-white" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.7)' }}>
          Memory Unlocked
        </h2>
        <p className="mt-2 text-xl text-purple-200">
          {level.storyTheme}
        </p>
        <div className="mt-6 h-24 flex items-center justify-center">
          {isLoading ? (
            <div className="text-white">Recalling the dream...</div>
          ) : (
            <p className="text-lg text-gray-200 italic animate-fade-in">"{story}"</p>
          )}
        </div>
        <button
          onClick={onNextLevel}
          disabled={isLoading}
          className="mt-6 px-12 py-3 bg-white text-indigo-600 font-bold text-lg rounded-full hover:bg-purple-100 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Wait...' : 'Continue the Dream'}
        </button>
      </div>
    </div>
  );
};

export default LevelCompleteScreen;
