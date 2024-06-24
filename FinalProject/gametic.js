document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const messageElement = document.getElementById('message');
    let board = Array(9).fill(null); // Initialize the board with null values
    let currentPlayer = 'X'; // Start with player 'X'

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Add event listeners to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Add event listener to the reset button
    resetButton.addEventListener('click', resetGame);

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (board[index] || checkWin() || checkDraw()) {
            return; // Ignore if the cell is already taken, the game is won, or it's a draw
        }
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());
        if (checkWin()) {
            messageElement.textContent = `${currentPlayer} wins!`;
            return;
        } else if (checkDraw()) {
            messageElement.textContent = 'It\'s a draw!';
            return;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                setTimeout(aiMove, 500); // Trigger AI move for player 'O' after 500ms
            }
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function checkDraw() {
        return board.every(cell => cell);
    }

    function aiMove() {
        const availableCells = board.map((cell, index) => cell ? null : index).filter(index => index !== null);
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        cells[randomIndex].classList.add('o');
        if (checkWin()) {
            messageElement.textContent = 'You lose, try again!';
        } else if (checkDraw()) {
            messageElement.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = 'X';
        }
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        messageElement.textContent = '';
        currentPlayer = 'X';
    }
});
