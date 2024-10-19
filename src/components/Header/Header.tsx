import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { incrementTimer, resetGame } from "../../redux/minesweeperSlice";
import styles from "./Header.module.scss";
import win_icon from "../../assets/win.svg";
import lose_icon from "../../assets/lose.svg";
import restart_icon from "../../assets/restart.svg";

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

  const buttonImageSrc = remainingMines === 0 ? win_icon : gameOver ? lose_icon : restart_icon;

  return (
    <div className={styles.container}>
      <div className={styles.info_container}>
        <div className={styles.mines}>{remainingMines}</div>
        <img
          src={buttonImageSrc}
          alt="Game Status"
          className={styles.reset_button}
          onClick={handleReset}
          role="button"
          tabIndex={0}
        />
        <div className={styles.timer}>{timer}</div>
      </div>
    </div>
  );
}
