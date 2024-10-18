import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Board from "../components/Board/Board";
import DifficultySelector from "../components/DifficultySelector/DifficultySelector";
import { startGame } from "../redux/minesweeperSlice";

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
    <div>
      <h1>Minesweeper</h1>
      <DifficultySelector />
      <Board />
    </div>
  );
}
