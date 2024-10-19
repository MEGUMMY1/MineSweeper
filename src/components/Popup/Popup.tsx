import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../../redux/minesweeperSlice";
import styles from "./Popup.module.scss";

interface PopupProps {
  closePopup: () => void;
}

export default function Popup({ closePopup }: PopupProps) {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [mineCount, setMineCount] = useState(15);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // 입력값 가로, 세로 최대 100, 지뢰 수는 1/3 이하
    if (width > 100 || height > 100 || mineCount > Math.floor((width * height) / 3)) {
      alert("유효한 값으로 입력해 주세요.");
      return;
    }

    localStorage.setItem("difficulty", "custom");
    localStorage.setItem("customSettings", JSON.stringify({ width, height, mineCount }));

    dispatch(
      startGame({
        width,
        height,
        mineCount,
        difficulty: "custom",
        firstClickX: 0,
        firstClickY: 0,
      })
    );

    closePopup();
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.title}>Custom Game Setup</h2>
        <label className={styles.label}>
          Width (Max: 100)
          <input
            className={styles.input}
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>
        <label className={styles.label}>
          Height (Max: 100)
          <input
            className={styles.input}
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
        <label className={styles.label}>
          Mines (Max: {(width * height) / 3})
          <input
            className={styles.input}
            type="number"
            value={mineCount}
            onChange={(e) => setMineCount(Number(e.target.value))}
          />
        </label>
        <button className={styles.button} onClick={handleSubmit}>
          Start Game
        </button>
        <button className={styles.button} onClick={closePopup}>
          Cancel
        </button>
      </div>
    </div>
  );
}
