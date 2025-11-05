// Fix: Implement the main application logic for the Number Path game.
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Position, Level } from './types';
import { LEVELS } from './constants';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import GameScene from './components/GameScene';
import LevelCompleteScreen from './components/QuestionPortal';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [playerPos, setPlayerPos] = useState<Position>(LEVELS[0].startPos);
  const [path, setPath] = useState<Position[]>([]);
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].timeLimit);
  const audioRef = useRef<HTMLAudioElement>(null);

  const level: Level = LEVELS[currentLevelIndex];

  useEffect(() => {
    // This effect handles unmuting the background music on the first user interaction.
    const audio = audioRef.current;
    if (!audio) return;

    const unmuteAndPlay = () => {
      audio.muted = false;
       // Some browsers might not truly autoplay even when muted, so we ensure play is called.
      if (audio.paused) {
        audio.play().catch(error => console.log("Playback prevented on interaction:", error));
      }
    };

    // Use { once: true } to automatically remove the listener after it fires.
    document.addEventListener('click', unmuteAndPlay, { once: true });
    document.addEventListener('touchend', unmuteAndPlay, { once: true });
  }, []);

  const handleNextLevel = useCallback(() => {
    const nextLevelIndex = currentLevelIndex + 1;
    if (nextLevelIndex < LEVELS.length) {
      setCurrentLevelIndex(nextLevelIndex);
      const nextLevel = LEVELS[nextLevelIndex];
      setScore(nextLevel.grid[nextLevel.startPos.row][nextLevel.startPos.col] || 0);
      setPlayerPos(nextLevel.startPos);
      setPath([nextLevel.startPos]);
      setTimeLeft(nextLevel.timeLimit);
      setGameState(GameState.PLAYING);
    } else {
      setGameState(GameState.GAME_COMPLETE);
    }
  }, [currentLevelIndex]);

  const resetLevel = useCallback(() => {
    const currentLevel = LEVELS[currentLevelIndex];
    setScore(currentLevel.grid[currentLevel.startPos.row][currentLevel.startPos.col] || 0);
    setPlayerPos(currentLevel.startPos);
    setPath([currentLevel.startPos]);
    setTimeLeft(currentLevel.timeLimit);
  }, [currentLevelIndex]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameState === GameState.PLAYING) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextLevel();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, handleNextLevel]);

  const handleStart = () => {
    setCurrentLevelIndex(0);
    setTotalScore(0);
    const firstLevel = LEVELS[0];
    setScore(firstLevel.grid[firstLevel.startPos.row][firstLevel.startPos.col] || 0);
    setPlayerPos(firstLevel.startPos);
    setPath([firstLevel.startPos]);
    setTimeLeft(firstLevel.timeLimit);
    setGameState(GameState.PLAYING);
  };

  const handleTileClick = (pos: Position, value: number) => {
    if (gameState !== GameState.PLAYING) return;

    const newScore = score + value;
    setScore(newScore);
    setPlayerPos(pos);
    setPath(prev => [...prev, pos]);

    if (newScore === level.target) {
      setTotalScore(prev => prev + newScore);
      setGameState(GameState.LEVEL_COMPLETE);
    }
  };

  const handleRestart = () => {
    resetLevel();
  };

  const handlePlayAgain = () => {
    handleStart();
  };

  const renderGameContent = () => {
    switch (gameState) {
      case GameState.START:
        return <StartScreen onStart={handleStart} />;
      case GameState.PLAYING:
        return (
          <GameScene
            level={level}
            score={score}
            playerPos={playerPos}
            path={path}
            timeLeft={timeLeft}
            onTileClick={handleTileClick}
            onRestart={handleRestart}
          />
        );
      case GameState.LEVEL_COMPLETE:
        return (
          <>
            <GameScene
              level={level}
              score={score}
              playerPos={playerPos}
              path={path}
              timeLeft={timeLeft}
              onTileClick={() => {}} // Disable clicks
              onRestart={handleRestart}
            />
            <div className="absolute inset-0">
              <LevelCompleteScreen levelIndex={currentLevelIndex} onNextLevel={handleNextLevel} />
            </div>
          </>
        );
      case GameState.GAME_COMPLETE:
        return <EndScreen totalScore={totalScore} onPlayAgain={handlePlayAgain} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
       <audio 
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2025/05/22/audio_7e6322ff73.mp3?filename=game-intro-345507.mp3" 
        loop 
        autoPlay
        muted
        preload="auto"
      />
      {renderGameContent()}
    </div>
  );
};

export default App;