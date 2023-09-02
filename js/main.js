window.onload = () => {
    "use strict";
    
    if("serviceWorker" in navigator){
       navigator.serviceWorker.register("./sw.js");
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const algodao = document.getElementById("algodao");
    const janela = document.getElementById("janela");
    const resetButton = document.getElementById("reset");

    let currentPlayer = "X";
    let gameOver = false;
    const boardState = ["", "", "", "", "", "", "", "", ""];

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (
                boardState[a] &&
                boardState[a] === boardState[b] &&
                boardState[a] === boardState[c]
            ) {
                gameOver = true;
                janela.textContent = `${currentPlayer} venceu!`;
                return;
            }
        }

        if (!boardState.includes("") && !gameOver) {
            gameOver = true;
            janela.textContent = "Empate!";
        }
    }

    function handleMove(index) {
        if (!boardState[index] && !gameOver) {
            boardState[index] = currentPlayer;
            render();
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function render() {
        algodao.innerHTML = "";
        boardState.forEach((value, index) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.textContent = value;
            square.addEventListener("click", () => handleMove(index));
            algodao.appendChild(square);
        });
    }

    resetButton.addEventListener("click", () => {
        boardState.fill("");
        gameOver = false;
        janela.textContent = "";
        currentPlayer = "X";
        render();
    });

    render();
});

