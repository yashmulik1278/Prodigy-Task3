const cells = document.querySelectorAll(".cell");
const goBackButton = document.getElementById("goBack");
const clearBoardButton = document.getElementById("clearBoard");

let currentPlayer = "X";
let gameActive = true;

let gameState = ["", "", "", "", "", "", "", "", ""];


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin(player) {
    return winningCombos.some(combo => {
        return combo.every(index => gameState[index] === player);
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== "");
}

goBackButton.addEventListener("click", () => {
    window.location.href = "index.html"; 
});

clearBoardButton.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.setAttribute("data-cell", "");
    });
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
});

function resetGame() {
    setTimeout(() => {
        cells.forEach(cell => {
            cell.textContent = "";
            cell.setAttribute("data-cell", "");
        });
        gameState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
    }, 100); 
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!cell.textContent && gameActive && currentPlayer === "X") {
            cell.textContent = currentPlayer;
            gameState[index] = currentPlayer;

            if (checkWin(currentPlayer)) {
                gameActive = false;
                setTimeout(() => {
                    alert(currentPlayer + " wins!");
                    resetGame(); 
                }, 100);
            } else if (checkDraw()) {
                gameActive = false;
                setTimeout(() => {
                    alert("It's a draw!");
                    resetGame(); 
                }, 100);
            } else {
                currentPlayer = "O"; 
                makeAIMove(); 
            }
        }
    });
});

function makeAIMove() {
    if (gameActive && currentPlayer === "O") {
        const emptyCells = gameState.reduce((acc, cell, index) => {
            if (!cell) acc.push(index);
            return acc;
        }, []);

        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const aiMove = emptyCells[randomIndex];
            const aiCell = cells[aiMove];
            aiCell.textContent = currentPlayer;
            gameState[aiMove] = currentPlayer;

            if (checkWin(currentPlayer)) {
                gameActive = false;
                setTimeout(() => {
                    alert(currentPlayer + " wins!");
                }, 100); 
            } else if (checkDraw()) {
                gameActive = false;
                setTimeout(() => {
                    alert("It's a draw!");
                }, 100); 
            } else {
                currentPlayer = "X"; 
            }
        }
    }
}