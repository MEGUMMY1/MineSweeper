import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { flagCell, revealCell } from "../../redux/minesweeperSlice";
import { CellProps } from "../../types/types";
import styles from "./Cell.module.scss";
import { useState, useMemo } from "react";

export default function Cell({ cell, x, y }: CellProps) {
  const dispatch = useDispatch();
  const { gameOver, board } = useSelector((state: RootState) => state.minesweeper);

  const [leftMouseDown, setLeftMouseDown] = useState(false);
  const [rightMouseDown, setRightMouseDown] = useState(false);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setLeftMouseDown(true);
    } else if (e.button === 2) {
      setRightMouseDown(true);
    }

    // 양쪽 클릭 기능 (Area Open)
    if (leftMouseDown && rightMouseDown) {
      openAdjacentCells();
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setLeftMouseDown(false);
    } else if (e.button === 2) {
      setRightMouseDown(false);
    }
  };

  const openAdjacentCells = () => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newX = x + j;
        const newY = y + i;

        if (newX >= 0 && newX < board[0].length && newY >= 0 && newY < board.length) {
          const adjacentCell = board[newY][newX];
          if (!adjacentCell.isRevealed && !adjacentCell.isFlagged) {
            dispatch(revealCell({ x: newX, y: newY }));
          }
        }
      }
    }
  };

  const cellClass = useMemo(() => {
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
  }, [cell.isRevealed, cell.isMine, cell.neighborCount]);

  return (
    <div
      className={cellClass}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {cell.isRevealed && !cell.isMine && cell.neighborCount > 0 ? cell.neighborCount : ""}
      {cell.isRevealed && cell.isMine ? "💣" : ""}
      {cell.isFlagged && !cell.isRevealed ? "🚩" : ""}
    </div>
  );
}
