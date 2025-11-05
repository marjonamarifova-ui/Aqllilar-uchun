
import React from 'react';

interface PlayerProps {
  style: React.CSSProperties;
}

const Player: React.FC<PlayerProps> = ({ style }) => {
  return (
    <div style={style} className="flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 bg-yellow-400 rounded-full player-orb"></div>
    </div>
  );
};

export default Player;