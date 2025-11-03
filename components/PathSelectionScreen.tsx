
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

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`w-20 h-20 flex items-center justify-center text-4xl font-bold border-2 rounded-xl
        ${isInPath ? 'tile-in-path' : 'bg-black/30 border-violet-700'}
        ${isClickable ? 'cursor-pointer' : 'cursor-default'}
        ${!isClickable && !isInPath ? 'opacity-50' : ''}
        tile`}
    >
      <span className={colorClass}>{valueDisplay}</span>
    </button>
  );
};

export default Tile;
