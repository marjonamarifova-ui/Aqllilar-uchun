
import React from 'react';

interface TileProps {
  value: number;
  isInPath: boolean;
  isClickable: boolean;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ value, isInPath, isClickable, onClick }) => {
  const sign = value > 0 ? '+' : '';
  const valueDisplay = value === 0 ? '0' : `${sign}${value}`;
  const colorClass = value > 0 ? 'text-green-300' : value < 0 ? 'text-red-300' : 'text-gray-300';
  
  const baseClasses = `w-20 h-20 flex items-center justify-center text-4xl font-bold border-2 rounded-xl tile`;
    
  const pathClasses = isInPath 
    ? 'tile-in-path bg-gradient-to-br from-purple-500 to-indigo-500 border-purple-300 shadow-inner shadow-cyan-300/50' 
    : 'bg-black/40 backdrop-blur-sm border-violet-700';
    
  const stateClasses = isClickable 
    ? 'cursor-pointer animate-border-glow'
    : `cursor-default ${!isInPath ? 'opacity-50' : ''}`;

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`${baseClasses} ${pathClasses} ${stateClasses}`}
    >
      <span className={colorClass}>{valueDisplay}</span>
    </button>
  );
};

export default Tile;