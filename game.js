const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

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

function createBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.index = index;
        cellDiv.addEventListener('click', handleCellClick);
        board.appendChild(cellDiv);
    });
}

function handleCellClick(e) {
    const cellIndex = e.target.dataset.index;
    if (gameState[cellIndex] || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('disabled');

    if (checkWin()) {
        showResult(`${currentPlayer} Wins!`);
        gameActive = false;
    } else if (gameState.every(cell => cell)) {
        showResult("It's a Draw!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState.fill(null);
    message.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

function showResult(result) {
    resultMessage.textContent = result;
    resultScreen.style.display = 'flex';
}

function startNewGame() {
    resultScreen.style.display = 'none';
    resetGame();
}

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', startNewGame);

resetGame();
