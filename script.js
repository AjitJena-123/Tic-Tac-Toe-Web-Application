document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const restartBtn = document.getElementById("restart-btn");
  let currentPlayer = "x";
  let gameActive = true;
  let boardState = ["", "", "", "", "", "", "", "", ""];

  const checkWin = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return boardState[a];
      }
    }

    if (boardState.includes("")) {
      return null;
    } else {
      return "T";
    }
  };

  // Function to handle player click
  const handlePlayerClick = (index) => {
    if (gameActive && !boardState[index]) {
      boardState[index] = currentPlayer;
      renderBoard();
      const winner = checkWin();
      if (winner) {
        if (winner === "T") {
          status.textContent = "It's a tie!";
        } else {
          status.textContent = `${winner} wins!`;
        }
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "x" ? "o" : "x";
        status.textContent = `${currentPlayer}'s turn`;
      }
    }
  };

  // Function to restart the game
  const restartGame = () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "x";
    gameActive = true;
    status.textContent = `${currentPlayer}'s turn`;
    renderBoard();
  };

  // Function to render the board
  const renderBoard = () => {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.textContent = cell;
      cellDiv.classList.add("cell");
      cellDiv.addEventListener("click", () => handlePlayerClick(index));
      board.appendChild(cellDiv);
    });
  };

  // Initialize the game
  renderBoard();
  restartBtn.addEventListener("click", restartGame);
});
