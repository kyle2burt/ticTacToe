

const DisplayController = (function () {
    gameArea = document.querySelector("#game");

    function drawBoard(board) {
        gameArea.replaceChildren();
        board.forEach((row, i) => {
            displayRow = document.createElement("div")
            displayRow.classList.add("row", "row-"+i)
            row.forEach((value, j) => {
                boardSpace = document.createElement("h1")
                boardSpace.textContent = value.name;
                boardSpace.setAttribute("row", i)
                boardSpace.setAttribute("col", j)
                displayRow.appendChild(boardSpace);
            })
            gameArea.appendChild(displayRow);
        })
    }

    return {
        drawBoard,
    }
})();

const GameBoard = (function() {
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const display = DisplayController;

    const printBoard = () => {
        display.drawBoard(board)
        board.forEach((row) => {
            console.log(row);
        });
    }

    const checkWin = () => {
        let winner = false;

        let rowTotal = 0;
        let colTotal = 0;
        let diagTotal = board[0][0].token + board[1][1].token + board[2][2].token;

        board.forEach((row, itr) => {
            rowTotal = 0;
            colTotal = board[0][itr].token + board[1][itr].token + board[2][itr].token;
            row.forEach((value) => {
                rowTotal = rowTotal + value.token;
            });
            if (rowTotal == 3 || colTotal == 3 || diagTotal == 3) return winner = 'X';
            else if (rowTotal == -3 || colTotal == 3 || diagTotal == 3) return winner = 'O';
        });

        return winner;
    }

    const move = (x, y, player) => {
        if (board[x][y] != 0) return -1; // invalid move
        board[x][y] = player;
    }

    const reset = () => {
        // Reset board
        board.forEach((row, i) => {
            row.forEach((value, j) => {
                board[i][j] = 0;
            })
        });

        // Setup Board
        printBoard();
    }

    return {
        printBoard,
        checkWin,
        move,
        reset
    }
})();

function createPlayer (playerName, playerToken) {
    const name = playerName;
    const token = playerToken;
    const score = 0;

    return {
        name,
        token,
        score,
    }
}

let GameController = (function() {
    let board = GameBoard;
    let display = DisplayController;

    const players = [
        playerX = createPlayer('X', 1),
        playerO = createPlayer('O', -1)
    ];

    let activePlayer = players[0];

    function switchTurn() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    function reset() {
        activePlayer = players[0];
        board.reset();
        bindEvents();
    }

    function bindEvents() {
        boardSquares = document.querySelectorAll("#game > .row > h1");
        boardSquares.forEach((square) => {
            square.addEventListener("click", () => {
                playRound(square.getAttribute("row"), square.getAttribute("col"))
            });
        });
    }

    function playRound(x, y) {
        if (board.move(x, y, activePlayer) == -1) {
            console.log("invalid move");
        }
        else {
            board.printBoard();
            if (board.checkWin()) {
                console.log(`Player ${activePlayer.name} Wins!`)
            }
            else {
                bindEvents();
                switchTurn();
                console.log(`Player ${activePlayer.name} turn`);
            }
        }
    }

    reset()
    console.log(`Player ${activePlayer.name} turn`);

    return {
        playRound,
        reset
    }

})();

game = GameController;