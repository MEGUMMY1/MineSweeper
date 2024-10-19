import { useDispatch } from "react-redux";
import { useState } from "react";
import { startGame } from "../../redux/minesweeperSlice";
import styles from "./DifficultySelector.module.scss";

export default function DifficultySelector() {
  const dispatch = useDispatch();
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>("intermediate");

  const handleStartGame = (
    width: number,
    height: number,
    mineCount: number,
    difficulty: string,
    firstClickX: number,
    firstClickY: number
  ) => {
    dispatch(startGame({ width, height, mineCount, difficulty, firstClickX, firstClickY }));
  };

  const handleButtonClick = (
    x: number,
    y: number,
    width: number,
    height: number,
    mineCount: number,
    difficulty: string
  ) => {
    handleStartGame(width, height, mineCount, difficulty, x, y);
    setActiveDifficulty(difficulty);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${activeDifficulty === "beginner" ? styles.active : ""}`}
        onClick={() => handleButtonClick(0, 0, 8, 8, 10, "beginner")}
      >
        BEGINNER
      </button>
      <button
        className={`${styles.button} ${activeDifficulty === "intermediate" ? styles.active : ""}`}
        onClick={() => handleButtonClick(0, 0, 16, 16, 40, "intermediate")}
      >
        INTERMEDIATE
      </button>
      <button
        className={`${styles.button} ${activeDifficulty === "expert" ? styles.active : ""}`}
        onClick={() => handleButtonClick(0, 0, 16, 32, 100, "expert")}
      >
        EXPERT
      </button>
      <button
        className={`${styles.button} ${activeDifficulty === "custom" ? styles.active : ""}`}
        onClick={() => handleButtonClick(0, 0, 10, 10, 15, "custom")}
      >
        CUSTOM
      </button>
    </div>
  );
}
