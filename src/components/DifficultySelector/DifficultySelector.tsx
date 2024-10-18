import { useDispatch } from "react-redux";
import { startGame } from "../../redux/minesweeperSlice";
import styles from "./DifficultySelector.module.scss";

export default function DifficultySelector() {
  const dispatch = useDispatch();

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
  };

  return (
    <div className={styles.difficulty_selector}>
      <button onClick={() => handleButtonClick(0, 0, 8, 8, 10, "beginner")}>Beginner</button>
      <button onClick={() => handleButtonClick(0, 0, 16, 16, 40, "intermediate")}>
        Intermediate
      </button>
      <button onClick={() => handleButtonClick(0, 0, 16, 32, 100, "expert")}>Expert</button>
      <button onClick={() => handleButtonClick(0, 0, 10, 10, 15, "custom")}>Custom</button>
    </div>
  );
}
