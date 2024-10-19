import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../redux/minesweeperSlice";
import { RootState } from "../../redux/store";
import styles from "./DifficultySelector.module.scss";
import { useState } from "react";
import Popup from "../Popup/Popup";

export default function DifficultySelector() {
  const dispatch = useDispatch();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const difficulty = useSelector((state: RootState) => state.minesweeper.difficulty);

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

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${difficulty === "beginner" ? styles.active : ""}`}
        onClick={() => handleButtonClick(0, 0, 8, 8, 10, "beginner")}
      >
        BEGINNER
      </button>
      <button
        className={`${styles.button} ${difficulty === "intermediate" ? styles.active : ""}`}
        onClick={() => handleButtonClick(0, 0, 16, 16, 40, "intermediate")}
      >
        INTERMEDIATE
      </button>
      <button
        className={`${styles.button} ${difficulty === "expert" ? styles.active : ""}`}
        onClick={() => handleButtonClick(0, 0, 16, 32, 100, "expert")}
      >
        EXPERT
      </button>
      <button
        className={`${styles.button} ${difficulty === "custom" ? styles.active : ""}`}
        onClick={handleOpenPopup}
      >
        CUSTOM
      </button>
      {isPopupOpen && <Popup closePopup={handleClosePopup} />}
    </div>
  );
}
