function bestMove() {
  // AI to make turn
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, false);
        board[i][j] = '';

        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }

  board[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: 1,
  O: -1,
  tie: 0
};

function minimax(board, isMaximising) {
  let result = checkWinner();

  if (result != null) {
    return scores[result];
  }  

  let bestScore = isMaximising ? -Infinity : Infinity;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Check for empty cell
      if (board[i][j] == "") {
        board[i][j] = isMaximising ? ai : human;
        let score = minimax(board, !isMaximising);
        board[i][j] = "";

        bestScore = isMaximising ? max(score, bestScore) : min(score, bestScore);
      }
    }
  }

  return bestScore;  
}
