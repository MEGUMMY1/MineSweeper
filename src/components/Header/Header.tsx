import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { incrementTimer, resetGame } from "../../redux/minesweeperSlice";
import styles from "./Header.module.scss";

export default function Header() {
  const { timer, mineCount, board, width, height, difficulty, gameOver } = useSelector(
    (state: RootState) => state.minesweeper
  );
  const dispatch = useDispatch();
  const remainingMines = mineCount - board.flat().filter((cell) => cell.isFlagged).length;

  const handleReset = () => {
    dispatch(resetGame({ width, height, mineCount, difficulty }));
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (!gameOver && remainingMines > 0) {
      timerId = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [gameOver, remainingMines, dispatch]);

  const buttonText = remainingMines === 0 ? "You Win" : gameOver ? "Game Over" : "Restart";

  return (
    <div className={styles.container}>
      <div className={styles.mines}>{remainingMines}</div>
      <button className={styles.reset_button} onClick={handleReset}>
        {buttonText}
      </button>
      <div className={styles.timer}>{timer}</div>
    </div>
  );
}
