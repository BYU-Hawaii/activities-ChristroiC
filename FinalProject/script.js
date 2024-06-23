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
document.addEventListener('DOMContentLoaded', function() {
    const board = Array.from(Array(9).keys());
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const humanPlayer = 'O';
    const aiPlayer = 'X';

    cells.forEach(cell => cell.addEventListener('click', handleCellClick, false));
    resetButton.addEventListener('click', resetGame, false);

    function handleCellClick(event) {
        const cellId = event.target.id.split('-')[1];
        if (typeof board[cellId] === 'number') {
            turn(cellId, humanPlayer);
            if (!checkTie()) turn(bestSpot(), aiPlayer);
        }
    }

    function turn(cellId, player) {
        board[cellId] = player;
        document.getElementById(`cell-${cellId}`).innerText = player;
        let gameWon = checkWin(board, player);
        if (gameWon) gameOver(gameWon);
    }

    function checkWin(board, player) {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        const plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winCombos.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = {index: index, player: player};
                break;
            }
        }
        return gameWon;
    }

    function gameOver(gameWon) {
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick, false));
        declareWinner(gameWon.player === humanPlayer ? "You win!" : "You lose.");
    }

    function declareWinner(who) {
        alert(who);
    }

    function emptySquares() {
        return board.filter(s => typeof s === 'number');
    }

    function bestSpot() {
        return minimax(board, aiPlayer).index;
    }

    function checkTie() {
        if (emptySquares().length === 0) {
            cells.forEach(cell => cell.removeEventListener('click', handleCellClick, false));
            declareWinner("Tie Game!");
            return true;
        }
        return false;
    }

    function minimax(newBoard, player) {
        const availSpots = emptySquares();

        if (checkWin(newBoard, humanPlayer)) {
            return {score: -10};
        } else if (checkWin(newBoard, aiPlayer)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }

        const moves = [];
        for (let i = 0; i < availSpots.length; i++) {
            const move = {};
            move.index = newBoard
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;

            if (player === aiPlayer) {
                const result = minimax(newBoard, humanPlayer);
                move.score = result.score;
            } else {
                const result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }

        let bestMove;
        if (player === aiPlayer) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    function resetGame() {
        board.fill(null).map((_, idx) => board[idx] = idx);
        cells.forEach(cell => {
            cell.innerText = '';
            cell.addEventListener('click', handleCellClick, false);
        });
    }
    resetGame(); // Initialize the game
});

