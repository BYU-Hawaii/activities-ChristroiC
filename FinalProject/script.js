document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comments = document.getElementById('comments').value;
    const rating = document.getElementById('rating').value;
    const feedbackMessage = document.getElementById('feedback-message');
    
    feedbackMessage.textContent = '';

    if (name === '' || email === '' || comments === '' || rating === '') {
        feedbackMessage.style.color = 'red';
        feedbackMessage.textContent = 'Please fill out all fields.';
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        feedbackMessage.style.color = 'red';
        feedbackMessage.textContent = 'Please enter a valid email address.';
        return;
    }
    feedbackMessage.style.color = 'green';
    feedbackMessage.textContent = 'Thank you for your feedback!';
    document.getElementById('feedback-form').reset();
});
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let board = Array(9).fill(null);
let currentPlayer = 'X';

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

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || checkWin()) {
        return;
    }
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
    } else if (board.every(cell => cell)) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            aiMove();
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function aiMove() {
    const availableCells = board.map((cell, index) => cell ? null : index).filter(index => index !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    if (checkWin()) {
        alert('O wins!');
    } else if (board.every(cell => cell)) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = 'X';
    }
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}
