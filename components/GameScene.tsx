import React from 'react';
import { Level, Position } from '../types';
import HeaderUI from './LoadingIndicator'; // Re-purposed for UI
import Player from './SpiritGuide'; // Re-purposed for Player orb
import Tile from './PathSelectionScreen'; // Re-purposed for Tile

interface GameSceneProps {
  level: Level;
  score: number;
  playerPos: Position;
  path: Position[];
  timeLeft: number;
  onTileClick: (pos: Position, value: number) => void;
  onRestart: () => void;
}

function isAdjacent(pos1: Position, pos2: Position): boolean {
  const dRow = Math.abs(pos1.row - pos2.row);
  const dCol = Math.abs(pos1.col - pos2.col);
  return (dRow <= 1 && dCol <= 1) && !(dRow === 0 && dCol === 0); // Allow diagonal moves
}

const GameScene: React.FC<GameSceneProps> = ({ level, score, playerPos, path, timeLeft, onTileClick, onRestart }) => {
  const TILE_SIZE = 80; // size of tile in px
  const GAP_SIZE = 16; // size of gap in px
  const totalTileSize = TILE_SIZE + GAP_SIZE;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4 animate-fade-in">
      <HeaderUI 
        target={level.target} 
        score={score} 
        levelIndex={level.id - 1} 
        timeLeft={timeLeft}
        onRestart={onRestart} 
      />
      <div 
        className="relative grid gap-4 transition-all duration-500"
        style={{
          gridTemplateColumns: `repeat(${level.grid[0].length}, ${TILE_SIZE}px)`,
          gridTemplateRows: `repeat(${level.grid.length}, ${TILE_SIZE}px)`,
        }}
      >
        <Player
          style={{
            position: 'absolute',
            width: TILE_SIZE,
            height: TILE_SIZE,
            top: playerPos.row * totalTileSize,
            left: playerPos.col * totalTileSize,
            zIndex: 10,
          }}
        />
        {level.grid.map((row, rIndex) =>
          row.map((value, cIndex) => {
            if (value === null) {
              return <div key={`${rIndex}-${cIndex}`} className="w-20 h-20" />;
            }
            const pos = { row: rIndex, col: cIndex };
            const isInPath = path.some(p => p.row === rIndex && p.col === cIndex);
            const isClickable = isAdjacent(playerPos, pos) && !isInPath;
            
            return (
              <Tile
                key={`${rIndex}-${cIndex}`}
                value={value}
                isInPath={isInPath}
                isClickable={isClickable}
                onClick={() => onTileClick(pos, value)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default GameScene;