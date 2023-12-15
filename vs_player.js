const cells = document.querySelectorAll(".cell");
const goBackButton = document.getElementById("goBack");
const clearBoardButton = document.getElementById("clearBoard");

let currentPlayer = "X";

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let gameState = ["", "", "", "", "", "", "", "", ""];

function checkWin(player) {
    return winningCombos.some(combination => {
        return combination.every(index => gameState[index] === player);
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== "");
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!cell.textContent && !checkWin("X") && !checkWin("O")) {
            cell.textContent = currentPlayer;
            gameState[index] = currentPlayer;

            if (checkWin(currentPlayer)) {
                setTimeout(function() {
                    alert(currentPlayer + " wins!");
                    resetGame();
                }, 100);
            } else if (checkDraw()) {
                setTimeout(function() {
                    alert("It's a draw!");
                    resetGame();
                }, 100);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    });
});

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.setAttribute("data-cell", "");
    });
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
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
});