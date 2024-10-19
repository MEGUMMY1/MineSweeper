import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Board from "../components/Board/Board";
import DifficultySelector from "../components/DifficultySelector/DifficultySelector";
import { startGame } from "../redux/minesweeperSlice";
import styles from "./GamePage.module.scss";

export default function GamePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedDifficulty = localStorage.getItem("difficulty") || "intermediate";

    let width = 16,
      height = 16,
      mineCount = 40;
    if (storedDifficulty === "beginner") {
      width = 8;
      height = 8;
      mineCount = 10;
    } else if (storedDifficulty === "expert") {
      width = 16;
      height = 32;
      mineCount = 100;
    } else if (storedDifficulty === "custom") {
      // 커스텀 난이도 수정 要
      width = 10;
      height = 10;
      mineCount = 15;
    }

    dispatch(
      startGame({
        width,
        height,
        mineCount,
        difficulty: storedDifficulty,
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
