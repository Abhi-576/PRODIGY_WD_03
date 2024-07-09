let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let aiEnabled = false; // Flag to enable AI

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(cellIndex) {
    if (!gameActive || gameState[cellIndex] !== '') {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    document.getElementById('board').children[cellIndex].textContent = currentPlayer;

    if (checkWin()) {
        document.getElementById('status').textContent = `${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        document.getElementById('status').textContent = `It's a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;

    if (aiEnabled && currentPlayer === 'O') {
        // If AI is enabled and it's AI's turn (O's turn)
        setTimeout(makeAiMove, 500); // Delay AI move for better UX
    }
}

function makeAiMove() {
    // AI makes a move
    let emptyCells = [];
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            emptyCells.push(i);
        }
    }

    // Randomly choose an empty cell to place 'O'
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let aiMoveIndex = emptyCells[randomIndex];

    gameState[aiMoveIndex] = 'O';
    document.getElementById('board').children[aiMoveIndex].textContent = 'O';

    if (checkWin()) {
        document.getElementById('status').textContent = `AI has won!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        document.getElementById('status').textContent = `It's a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return !gameState.includes('');
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;

    let cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.textContent = '';
    }
}

function toggleAi() {
    aiEnabled = !aiEnabled;
    restartGame();
    if (aiEnabled) {
        document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    } else {
        document.getElementById('status').textContent = `Player ${currentPlayer}'s turn (Human vs Human)`;
    }
}
