import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { flagCell, revealCell } from "../../redux/minesweeperSlice";
import { CellProps } from "../../types/types";
import styles from "./Cell.module.scss";

export default function Cell({ cell, x, y }: CellProps) {
  const dispatch = useDispatch();
  const { gameOver } = useSelector((state: RootState) => state.minesweeper);

  const handleClick = () => {
    if (!cell.isRevealed && !gameOver) {
      dispatch(revealCell({ x, y }));
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!cell.isRevealed && !gameOver) {
      dispatch(flagCell({ x, y }));
    }
  };

  const getCellClass = () => {
    let className = styles.cell;

    if (cell.isRevealed) {
      className += ` ${styles.opened}`;
      if (cell.isMine) {
        className += ` ${styles.mine}`;
      } else if (cell.neighborCount > 0) {
        className += ` ${styles[`number${cell.neighborCount}`]}`;
      }
    }
    return className;
  };

  return (
    <div className={getCellClass()} onClick={handleClick} onContextMenu={handleContextMenu}>
      {cell.isRevealed && !cell.isMine && cell.neighborCount > 0 ? cell.neighborCount : ""}
      {cell.isRevealed && cell.isMine ? "💣" : ""}
      {cell.isFlagged && !cell.isRevealed ? "🚩" : ""}
    </div>
  );
}
