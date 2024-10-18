import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Cell from "../Cell/Cell";
import styles from "./Board.module.scss";
import Header from "../Header/Header";

export default function Board() {
  const { board, difficulty } = useSelector((state: RootState) => state.minesweeper);

  return (
    <>
      <Header />
      <div className={`${styles.board} ${styles[difficulty]}`}>
        {board.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <Cell key={x} cell={cell} x={x} y={y} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
