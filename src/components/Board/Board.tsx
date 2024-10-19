import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Cell from "../Cell/Cell";
import styles from "./Board.module.scss";
import Header from "../Header/Header";

export default function Board() {
  const { board, difficulty, width, height } = useSelector((state: RootState) => state.minesweeper);

  const memoizedBoard = useMemo(() => {
    return board.map((row, y) => (
      <div key={y} className={styles.row}>
        {row.map((cell, x) => (
          <Cell key={x} cell={cell} x={x} y={y} />
        ))}
      </div>
    ));
  }, [board]);

  return (
    <>
      <Header />
      <div
        className={`${styles.board} ${styles[difficulty]}`}
        style={
          difficulty === "custom"
            ? ({ "--columns": width, "--rows": height } as React.CSSProperties)
            : {}
        }
      >
        {memoizedBoard}
      </div>
    </>
  );
}
