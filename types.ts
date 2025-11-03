export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE',
  GAME_COMPLETE = 'GAME_COMPLETE',
}

export interface Position {
  row: number;
  col: number;
}

export interface Level {
  id: number;
  target: number;
  grid: (number | null)[][];
  startPos: Position;
  timeLimit: number; // Time in seconds
}