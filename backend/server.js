const express = require("express");
const app = express();
const port = 3000;

let board = Array(6).fill(null).map(() => Array(7).fill(null));

app.get("/api/board", (req, res) => {
  res.json(board);
});

app.post("/api/move", express.json(), (req, res) => {
  const { column, player } = req.body;
  // Simple logic for adding a move
  for (let row = 5; row >= 0; row--) {
    if (!board[row][column]) {
      board[row][column] = player;
      return res.json({ success: true });
    }
  }
  return res.status(400).json({ success: false, message: "Column is full" });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});

