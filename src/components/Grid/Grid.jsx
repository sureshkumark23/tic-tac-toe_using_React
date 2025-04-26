import Card from "../Card/Card";
import './Grid.css';
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function isWinner(board, symbol) {
  // Rows
  if (board[0] === symbol && board[1] === symbol && board[2] === symbol) return symbol;
  if (board[3] === symbol && board[4] === symbol && board[5] === symbol) return symbol;
  if (board[6] === symbol && board[7] === symbol && board[8] === symbol) return symbol;

  // Columns
  if (board[0] === symbol && board[3] === symbol && board[6] === symbol) return symbol;
  if (board[1] === symbol && board[4] === symbol && board[7] === symbol) return symbol;
  if (board[2] === symbol && board[5] === symbol && board[8] === symbol) return symbol;

  // Diagonals
  if (board[0] === symbol && board[4] === symbol && board[8] === symbol) return symbol;
  if (board[2] === symbol && board[4] === symbol && board[6] === symbol) return symbol;

  return ""; // No winner
}

function Grid({ numberOfCards }) {
  const [turn, setTurn] = useState(true);
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [winner, setWinner] = useState(null);

  function play(index) {
    // Prevent changing already clicked cells or playing after win
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = turn ? "O" : "X";

    const win = isWinner(updatedBoard, turn ? "O" : "X");
    if (win) {
      setWinner(win);
      toast.success(`congratulations ${win} player won the game `);
    } else if (!updatedBoard.includes("")) {
      setWinner("No more possibilities");
       toast("It's a draw! No more possibilities.");
    }

    setBoard(updatedBoard);
    setTurn(!turn);
  }

  function reset() {
    setBoard(Array(numberOfCards).fill(""));
    setWinner(null);
    setTurn(true);
  }

  return (
    <>
    <ToastContainer position="top-center" />
     toast("It's a draw! No more possibilities.");
      {winner && (
        <>
          <h1 className="high-light">
            {winner === "No more possibilities" ? winner : `Winner is ${winner}`}
          </h1>
          <button className="reset" onClick={reset}>Reset game</button>
          
        </>
      )}
      {!winner && <h1 className="high-light">Current turn: {turn ? 'O' : 'X'}</h1>}

      <div className="Grid">
        {board.map((value, idx) => (
          <Card onPlay={play} player={value} key={idx} index={idx} />
        ))}
      </div>
    </>
  );
}

export default Grid;
