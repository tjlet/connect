const apiUrl = "http://localhost:3000/api";

const boardElement = document.getElementById("board");

let currentPlayer = "X";

const drawBoard = (board) => {
  boardElement.innerHTML = "";
  board.forEach((row, rowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.addEventListener("click", () => makeMove(colIndex));
      if (cell) {
        cellElement.textContent = cell;
      }
      rowElement.appendChild(cellElement);
    });
    boardElement.appendChild(rowElement);
  });
};

const makeMove = async (colIndex) => {
  const response = await fetch(`${apiUrl}/move`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ column: colIndex, player: currentPlayer }),
  });

  const data = await response.json();

  if (data.success) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    loadBoard();
  } else {
    alert(data.message);
  }
};

const loadBoard = async () => {
  const response = await fetch(`${apiUrl}/board`);
  const board = await response.json();
  drawBoard(board);
};

loadBoard();

