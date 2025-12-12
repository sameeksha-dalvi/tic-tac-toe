let player1 = "";
let player2 = "";


function createPlayer(name, marker) {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
}

const startGameBtn = document.querySelector('#startBtn');

startGameBtn.addEventListener('click', () => {

    const playerName1 = document.querySelector('#player1-name').value;
    const playerName2 = document.querySelector('#player2-name').value;

    if (playerName1 == '' || playerName2 == '') {
        alert("Please enter Player Name");
        return;
    }


    player1 = createPlayer(playerName1, "X");

    player2 = createPlayer(playerName2, "O");

    GameLogicController.setPlayers(player1, player2);

    const player1X = document.querySelector('#player1X');

    player1X.textContent = playerName1 + " : X";

    player1X.classList.add('player1X');

    const player2O = document.querySelector('#player2O');

    player2O.textContent = playerName2 + " : O";

    player2O.classList.add('no-current-player');



    document.querySelector('.setup-screen').classList.add('hidden');
    document.querySelector('.game-screen').classList.remove('hidden');



});


const Gameboard = (function () {
    const rows = 3;
    const colums = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < colums; j++) {
            board[i][j] = '';
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            let rowString = "";
            for (let j = 0; j < colums; j++) {
                rowString += board[i][j] + " ";
            }
            console.log(rowString);
        }

    }

    const placeMark = (row, col, marker) => {
        board[row][col] = marker;
    }

    const isCellEmpty = (row, col) => {
        if (board[row][col] == '') {
            return true;
        } else {
            return false;
        }
    }

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < colums; j++) {
                board[i][j] = '';
            }
        }
    }

    return { getBoard, printBoard, placeMark, isCellEmpty, resetBoard };

})();


const DisplayController = (function () {

    const resetBoardUI = (boardCells) => {
        const len = boardCells.length;
        for (let i = 0; i < len; i++) {
            boardCells[i].textContent = '';
            boardCells[i].classList.remove('playerX');
            boardCells[i].classList.remove('playerO');
        }
        const winnerMsgShown = document.querySelector('.winner-msg');

        const drawMsgShown = document.querySelector('.draw-msg');

        if (winnerMsgShown) {
            winnerMsgShown.remove();
        }

        if (drawMsgShown) {
            drawMsgShown.remove();
        }
        
        GameLogicController.resetGameOver();

        Gameboard.resetBoard();
    }

    const markCell = (row, col, clickedCell) => {

        const marker = GameLogicController.getCurrentPlayer().getMarker();

        if (marker == 'X') {
            clickedCell.classList.add('playerX');
            //console.log('add class playerX ');
        }

        if (marker == 'O') {
            clickedCell.classList.add('playerO');
            //console.log('add class playerX ');
        }

        const result = GameLogicController.playRound(row, col);

        if (result) {
            if (result == 'X' || result == 'O') {
                const displayWinnerDiv = document.querySelector('.winner');

                const winnerMsg = document.createElement('div');

                winnerMsg.className = 'winner-msg';

                winnerMsg.textContent = "Winner is : " + result;

                displayWinnerDiv.appendChild(winnerMsg);

                clickedCell.textContent = marker;
                return;
            } else if (result == 'draw') {

                const displayDrawDiv = document.querySelector('.winner');

                const drawMsg = document.createElement('div');

                drawMsg.className = 'draw-msg';

                drawMsg.textContent = "It's a Draw!"

                displayDrawDiv.appendChild(drawMsg);

                clickedCell.textContent = marker;

                return;

            }


            clickedCell.textContent = marker;

            DisplayController.showCurrentPlayer(marker);

        }

    }


    const showCurrentPlayer = (turnPlayedMarker) => {

        if (turnPlayedMarker == 'X') {
            document.querySelector('#player1X').classList.remove('player1X');
            document.querySelector('#player1X').classList.add('no-current-player');
            document.querySelector('#player2O').classList.remove('no-current-player')
            document.querySelector('#player2O').classList.add('player2O');
        }

        if (turnPlayedMarker == 'O') {
            document.querySelector('#player1X').classList.remove('no-current-player');
            document.querySelector('#player1X').classList.add('player1X');
            document.querySelector('#player2O').classList.remove('player2O')
            document.querySelector('#player2O').classList.add('no-current-player');
        }

    }

    return { resetBoardUI, markCell, showCurrentPlayer };

})();

const GameLogicController = (function () {
    let currentPlayer = null;
    let winner = "";
    let gameOver = false;

    const getCurrentPlayer = () => currentPlayer;

    const switchTurn = () => {

        if (currentPlayer.getName() == player1.getName()) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }

    };

    const playRound = (row, col) => {

        if(gameOver){
            return false;
        }

        if (Gameboard.isCellEmpty(row, col)) {

            Gameboard.placeMark(row, col, currentPlayer.getMarker());
            Gameboard.printBoard();

            winner = GameLogicController.checkWinner();

            if (winner) {
                gameOver = true;
                return winner;

            } else if (GameLogicController.checkDraw()) {
                gameOver = true;
                return 'draw';
            } else {
                GameLogicController.switchTurn();
                return true;
            }


        } else {
            return false;
        }
    };

    const checkWinner = () => {

        if (GameLogicController.getRowElement(0) == '["X","X","X"]'
            || GameLogicController.getRowElement(1) == '["X","X","X"]'
            || GameLogicController.getRowElement(2) == '["X","X","X"]'
            || GameLogicController.getColumnElement(0) == '["X","X","X"]'
            || GameLogicController.getColumnElement(1) == '["X","X","X"]'
            || GameLogicController.getColumnElement(2) == '["X","X","X"]'
            || GameLogicController.getFirstDiagonal() == '["X","X","X"]'
            || GameLogicController.getSecondDiagonal() == '["X","X","X"]'
        ) {
            return 'X'

        }

        if (GameLogicController.getRowElement(0) == '["O","O","O"]'
            || GameLogicController.getRowElement(1) == '["O","O","O"]'
            || GameLogicController.getRowElement(2) == '["O","O","O"]'
            || GameLogicController.getColumnElement(0) == '["O","O","O"]'
            || GameLogicController.getColumnElement(1) == '["O","O","O"]'
            || GameLogicController.getColumnElement(2) == '["O","O","O"]'
            || GameLogicController.getFirstDiagonal() == '["O","O","O"]'
            || GameLogicController.getSecondDiagonal() == '["O","O","O"]') {

            return 'O';
        }

        return false;


    };

    const getRowElement = (index) => JSON.stringify(Gameboard.getBoard()[index]);

    const getColumnElement = (index) => JSON.stringify(Gameboard.getBoard().map(row => row[index]));

    const getFirstDiagonal = () => {

        const firstDiagonal = [];
        const len = Gameboard.getBoard().length;

        for (let i = 0; i < len; i++) {
            firstDiagonal.push(Gameboard.getBoard()[i][i]);
        }

        return JSON.stringify(firstDiagonal);
    };


    const getSecondDiagonal = () => {

        const secondDiagonal = [];
        const len = Gameboard.getBoard().length;

        for (let i = 0; i < len; i++) {
            secondDiagonal.push(Gameboard.getBoard()[i][len - 1 - i]);
        }

        return JSON.stringify(secondDiagonal);
    };


    const checkDraw = () => {
        let len = Gameboard.getBoard().length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (Gameboard.getBoard()[i][j] == '') {
                    return false;
                }
            }
        }

        return true;
    };

    const setPlayers = (p1, p2) => {
        player1 = p1;
        player2 = p2;
        currentPlayer = p1;
    };

    const isGameOver = () => gameOver;

    const resetGameOver = () => {
        gameOver = false;
    };

    return { getCurrentPlayer, switchTurn, playRound, getRowElement, getColumnElement, getFirstDiagonal, getSecondDiagonal, checkWinner, checkDraw, setPlayers, isGameOver,resetGameOver };

})();



const boardContainer = document.querySelector(".board");

boardContainer.addEventListener('click', function (e) {
    const clickedCell = e.target;
    const boardCells = Array.from(boardContainer.children);
    const index = boardCells.indexOf(clickedCell);
    const { row: row, col: col } = getCellPosition(index);

    DisplayController.markCell(row, col, clickedCell);
});

function getCellPosition(index) {
    const rowPosition = Math.floor(index / 3);
    const colPosition = index % 3;

    return { row: rowPosition, col: colPosition };
}

const resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener('click', function () {
    const boardCells = Array.from(boardContainer.children);
    DisplayController.resetBoardUI(boardCells);
});

