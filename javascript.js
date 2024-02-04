const DisplayController = (function () {
    gameArea = document.querySelector("#game");


    function drawBoard(board) {
        gameArea.replaceChildren();
        board.forEach((row, i) => {
            displayRow = document.createElement("div")
            row.forEach((value, j) => {
                boardSpace = document.createElement("h1")
                boardSpace.textContent = board[itr][j];
                displayRow.appendChild(boardSpace);
            })
            gameArea.appendChild(displayRow);
        })

    }

    return {
        drawBoard
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
        let diagTotal = board[0][0] + board[1][1] + board[2][2];

        board.forEach((row, itr) => {
            rowTotal = 0;
            colTotal = board[0][itr] + board[1][itr] + board[2][itr];
            row.forEach((value) => {
                rowTotal = rowTotal + value;
            });
            if (rowTotal == 3 || colTotal == 3 || diagTotal == 3) return winner = 'X';
            else if (rowTotal == -3 || colTotal == 3 || diagTotal == 3) return winner = 'O';
        });

        return winner;
    }

    const move = (x, y, player) => {
        if (board[x][y] != 0) return // invalid move
        board[x][y] = player;
    }

    const reset = () => {
        board.forEach((row, i) => {
            row.forEach((value, j) => {
                board[itr][j] = 0;
            })
        });
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
    }

    function playRound(x, y) {
        board.move(x, y, activePlayer.token)
        board.printBoard();
        if (board.checkWin()) {
            console.log(`Player ${activePlayer.name} Wins!`)
        }
        else {
            switchTurn();
            console.log(`Player ${activePlayer.name} turn`);
        }
    }

    board.printBoard();
    console.log(`Player ${activePlayer.name} turn`);

    return {
        playRound,
        reset
    }

})();

game = GameController;
