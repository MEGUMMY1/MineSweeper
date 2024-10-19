import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Board from "../components/Board/Board";
import DifficultySelector from "../components/DifficultySelector/DifficultySelector";
import { startGame } from "../redux/minesweeperSlice";
import styles from "./GamePage.module.scss";

export default function GamePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      startGame({
        width: 16,
        height: 16,
        mineCount: 40,
        difficulty: "intermediate",
        firstClickX: 0,
        firstClickY: 0,
      })
    );
  }, [dispatch]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>MINESWEEPER</h1>
        <div className={styles.wrapper}>
          <DifficultySelector />
          <Board />
        </div>
      </div>
    </div>
  );
}
