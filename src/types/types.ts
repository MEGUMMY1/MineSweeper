export interface CellProps {
  cell: Cell;
  x: number;
  y: number;
}

export interface Cell {
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

export interface MinesweeperState {
  board: Cell[][];
  gameStarted: boolean;
  timer: number;
  mineCount: number;
  width: number;
  height: number;
  difficulty: string;
  gameOver: boolean;
}
