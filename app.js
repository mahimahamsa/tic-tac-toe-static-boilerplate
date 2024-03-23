document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const message = document.getElementById('message');
    const button = document.getElementById('button');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    // Event listener for each box
    boxes.forEach(box => {
      box.addEventListener('click', () => {
        if (gameActive && box.innerText === '') {
          const index = parseInt(box.id) - 1;
          makeMove(index);
        }
      });
    });
  
    // Event listener for the "Play again" button
    button.addEventListener('click', () => {
      resetGame();
    });
  
    // Function to handle player moves
    function makeMove(index) {
      gameBoard[index] = currentPlayer;
      boxes[index].innerText = currentPlayer;
  
      if (checkWin()) {
        message.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        showResult();
      } else if (gameBoard.every(cell => cell !== '')) {
        message.innerText = 'It\'s a draw!';
        gameActive = false;
        showResult();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  
    // Function to check for a winner
    function checkWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
      ];
  
      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
      });
    }
  
    // Function to show the game result
    function showResult() {
      document.getElementById('result').style.visibility = 'visible';
      document.getElementById('result').style.opacity = '1';
    }
  
    // Function to reset the game
    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      boxes.forEach(box => (box.innerText = ''));
      message.innerText = '';
      currentPlayer = 'X';
      gameActive = true;
  
      document.getElementById('result').style.visibility = 'hidden';
      document.getElementById('result').style.opacity = '0';
    }
  });