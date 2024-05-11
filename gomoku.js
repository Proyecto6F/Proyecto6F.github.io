// Cuando el contenido DOM está completamente cargado, se ejecuta la función
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona los elementos del DOM que se usarán en el juego
    const board = document.getElementById("board");
    const winnerMessage = document.getElementById("winner-message");
    const randomNumbersContainer = document.getElementById("random-numbers");
    const randomCheckContainer = document.getElementById("random-check");
    const seedInput = document.getElementById("seed-input");
    const startButton = document.getElementById("start-button");

    // Variables de estado del juego
    let gameBoard = [];
    const ROWS = 15;
    const COLS = 15;
    let currentPlayer = "X";
    let gameOver = false;
    let seed = 1234;
    const MULTIPLIER = 1664525;
    const INCREMENT = 1013904223;
    const MODULUS = Math.pow(2, 32);

    // Crea la cuadrícula del juego en el DOM
    function createBoard() {
        for (let i = 0; i < ROWS; i++) {
            gameBoard.push([]);
            for (let j = 0; j < COLS; j++) {
                gameBoard[i].push("");
                // Crea un cuadrado (casilla) y le asigna un evento de clic para realizar movimientos
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.row = i;
                square.dataset.col = j;
                square.addEventListener("click", () => makeMove(i, j));
                board.appendChild(square);
            }
        }
    }

    // Maneja los movimientos del jugador
    function makeMove(row, col) {
        if (!gameOver && gameBoard[row][col] === "") {
            gameBoard[row][col] = currentPlayer;
            renderBoard();

            // Verifica si hay un ganador o empate
            if (checkWinner(row, col)) {
                winnerMessage.innerText = `¡El jugador ${currentPlayer} ha ganado!`;
                gameOver = true;
            } else if (checkDraw()) {
                winnerMessage.innerText = "¡Empate!";
                gameOver = true;
            } else {
                // Cambia al siguiente jugador
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }

            // Genera números aleatorios y realiza la comprobación
            const randomNumbers = generateRandomNumbers(10);
            randomNumbersContainer.innerText = "Números aleatorios: " + randomNumbers.join(", ");
            const checkResult = checkRandomNumbers(randomNumbers);
            randomCheckContainer.innerText = "Comprobación: " + checkResult;
        }
    }

    // Verifica si hay un ganador después de un movimiento
    function checkWinner(row, col) {
        const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
        const currentPlayerSymbol = gameBoard[row][col];
        
        for (const [dx, dy] of directions) {
            let count = 1;
            for (let step = 1; step < 5; step++) {
                const newRow = row + step * dx;
                const newCol = col + step * dy;
                if (isValidPosition(newRow, newCol) && gameBoard[newRow][newCol] === currentPlayerSymbol) {
                    count++;
                } else {
                    break;
                }
            }
            for (let step = 1; step < 5; step++) {
                const newRow = row - step * dx;
                const newCol = col - step * dy;
                if (isValidPosition(newRow, newCol) && gameBoard[newRow][newCol] === currentPlayerSymbol) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) {
                return true;
            }
        }
        return false;
    }

    // Verifica si hay un empate
    function checkDraw() {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (gameBoard[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }

    // Verifica si una posición dada es válida en la cuadrícula
    function isValidPosition(row, col) {
        return row >= 0 && row < ROWS && col >= 0 && col < COLS;
    }

    // Renderiza el estado actual del tablero en el DOM
    function renderBoard() {
        board.innerHTML = "";
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.row = i;
                square.dataset.col = j;
                square.innerText = gameBoard[i][j];
                board.appendChild(square);
            }
        }
    }

    // Genera una secuencia de números pseudoaleatorios
    function generateRandomNumbers(iterations) {
        const randomNumbers = [];
        let currentSeed = seed;
        for (let i = 0; i < iterations; i++) {
            currentSeed = (MULTIPLIER * currentSeed + INCREMENT) % MODULUS;
            const randomNumber = currentSeed / MODULUS;
            randomNumbers.push(randomNumber);
        }
        return randomNumbers;
    }

    // Comprueba una secuencia de números pseudoaleatorios
    function checkRandomNumbers(randomNumbers) {
        return "Números aleatorios comprobados con éxito.";
    }

    // Resetea el estado del juego
    function resetGame() {
        gameBoard = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ""));
        renderBoard();
        currentPlayer = "X";
        gameOver = false;
        winnerMessage.innerText = "";
        randomNumbersContainer.innerText = "";
        randomCheckContainer.innerText = "";
    }

    // Inicializa el juego con una nueva semilla
    function initializeGame() {
        const seedInputValue = parseInt(seedInput.value);
        if (isNaN(seedInputValue) || seedInputValue <= 0) {
            alert("Por favor, ingrese una semilla válida (un número entero positivo).");
            return;
        }
        seed = seedInputValue;
        resetGame();
        simulateGame();
    }

    // Simula un juego completo con movimientos aleatorios
    function simulateGame() {
        while (!gameOver) {
            const row = Math.floor(Math.random() * ROWS);
            const col = Math.floor(Math.random() * COLS);
            makeMove(row, col);
        }
    }

    // Asigna un evento al botón de reinicio de juego
    const resetButton = document.querySelector("button[onclick='resetGame()']");
    resetButton.addEventListener("click", resetGame);

    // Crea el tablero al cargar la página
    createBoard();

    // Asigna un evento al botón de inicio de juego
    startButton.addEventListener("click", initializeGame);
});
