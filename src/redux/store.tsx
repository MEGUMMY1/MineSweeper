import { configureStore } from "@reduxjs/toolkit";
import minesweeperReducer from "./minesweeperSlice";

export const store = configureStore({
  reducer: {
    minesweeper: minesweeperReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
