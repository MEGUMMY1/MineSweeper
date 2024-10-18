import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MinesweeperState } from "../types/types";

const initialState: MinesweeperState = {
  board: [],
  gameStarted: false,
  timer: 0,
  mineCount: 40,
  width: 16,
  height: 16,
  difficulty: "intermediate",
  gameOver: false,
};

const minesweeperSlice = createSlice({
  name: "minesweeper",
  initialState,
  reducers: {
    startGame: (
      state,
      action: PayloadAction<{
        width: number;
        height: number;
        mineCount: number;
        difficulty: string;
        firstClickX: number;
        firstClickY: number;
      }>
    ) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.mineCount = action.payload.mineCount;
      state.difficulty = action.payload.difficulty;

      state.board = Array.from({ length: state.height }, () =>
        Array.from({ length: state.width }, () => ({
          isRevealed: false,
          isMine: false,
          isFlagged: false,
          neighborCount: 0,
        }))
      );

      // 첫 클릭 위치를 제외하고 지뢰 배치
      placeMines(state, action.payload.firstClickX, action.payload.firstClickY);
      state.gameStarted = false;
      state.gameOver = false;
      state.timer = 0;
    },
    revealCell: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      const cell = state.board[y][x];

      if (!cell.isRevealed && !cell.isFlagged && !state.gameOver) {
        cell.isRevealed = true;

        if (!state.gameStarted) {
          state.gameStarted = true; // 클릭 시 타이머 시작
        }

        if (cell.isMine) {
          state.gameOver = true; // 지뢰 클릭 시 게임 종료
          revealAllMines(state);
        } else {
          if (cell.neighborCount === 0) {
            revealAdjacentCells(state, x, y); // 주변 빈 셀 열기
          }

          // 지뢰가 아닌 셀이 모두 열렸으면 게임 종료
          if (checkIfGameWon(state)) {
            state.gameOver = true;
          }
        }
      }
    },

    flagCell: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const cell = state.board[action.payload.y][action.payload.x];
      if (!cell.isRevealed && !state.gameOver) {
        cell.isFlagged = !cell.isFlagged;
      }
    },
    incrementTimer: (state) => {
      if (state.gameStarted) {
        state.timer += 1;
      }
    },
    resetGame: (
      state,
      action: PayloadAction<{
        width: number;
        height: number;
        mineCount: number;
        difficulty: string;
      }>
    ) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.mineCount = action.payload.mineCount;
      state.difficulty = action.payload.difficulty;
      state.timer = 0;

      state.board = Array.from({ length: state.height }, () =>
        Array.from({ length: state.width }, () => ({
          isRevealed: false,
          isMine: false,
          isFlagged: false,
          neighborCount: 0,
        }))
      );

      state.gameStarted = false;
      state.gameOver = false;
      state.timer = 0;
      placeMines(state, -1, -1);
    },
  },
});

// 인접 셀을 재귀적으로 여는 함수
const revealAdjacentCells = (state: MinesweeperState, x: number, y: number) => {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // 자기 자신 제외

      const newX = x + j;
      const newY = y + i;

      // 경계 벗어나는 경우 무시
      if (newX < 0 || newX >= state.width || newY < 0 || newY >= state.height) {
        continue;
      }

      const adjacentCell = state.board[newY][newX];

      // 셀 열기
      if (!adjacentCell.isRevealed && !adjacentCell.isFlagged) {
        adjacentCell.isRevealed = true;

        // 만약 인접 셀의 이웃 지뢰 수가 0이면 재귀 호출
        if (adjacentCell.neighborCount === 0) {
          revealAdjacentCells(state, newX, newY);
        }
      }
    }
  }
};

// 지뢰 배치 함수
const placeMines = (state: MinesweeperState, firstClickX: number, firstClickY: number) => {
  // 셀 초기화
  state.board.forEach((row) => row.forEach((cell) => (cell.isMine = false)));

  let minesPlaced = 0;
  while (minesPlaced < state.mineCount) {
    const x = Math.floor(Math.random() * state.width);
    const y = Math.floor(Math.random() * state.height);

    // 첫 클릭한 셀에는 지뢰를 배치하지 않음
    if (!(x === firstClickX && y === firstClickY) && !state.board[y][x].isMine) {
      state.board[y][x].isMine = true;
      minesPlaced++;

      // 주변 셀의 이웃 지뢰 수 증가
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newX = x + j;
          const newY = y + i;

          if (newX >= 0 && newX < state.width && newY >= 0 && newY < state.height) {
            state.board[newY][newX].neighborCount += 1;
          }
        }
      }
    }
  }
};

// 지뢰가 클릭되었을 때 모든 지뢰 셀을 공개하는 함수
const revealAllMines = (state: MinesweeperState) => {
  for (let y = 0; y < state.height; y++) {
    for (let x = 0; x < state.width; x++) {
      const cell = state.board[y][x];
      if (cell.isMine) {
        cell.isRevealed = true;
      }
    }
  }
};

// 모든 지뢰가 아닌 셀이 열렸는지를 확인하는 함수
const checkIfGameWon = (state: MinesweeperState) => {
  for (let y = 0; y < state.height; y++) {
    for (let x = 0; x < state.width; x++) {
      const cell = state.board[y][x];
      if (!cell.isMine && !cell.isRevealed) {
        return false;
      }
    }
  }
  return true;
};

export const { startGame, revealCell, flagCell, incrementTimer, resetGame } =
  minesweeperSlice.actions;
export default minesweeperSlice.reducer;
