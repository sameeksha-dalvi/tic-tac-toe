function createPlayer(name, marker) {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
}

const player1 = createPlayer("Sameeksha", "X");
const player2 = createPlayer("Mani", "O");

console.log("Player One: " + player1.getName());
console.log("Player Two: " + player2.getName());



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
        Gameboard.resetBoard();
    }

    const markCell = (row, col, clickedCell) => {

        const marker = GameLogicController.getCurrentPlayer().getMarker();

        if(marker == 'X'){
            clickedCell.classList.add('playerX');
            console.log('add class playerX ');
        }

        if(marker == 'O'){
            clickedCell.classList.add('playerO');
            console.log('add class playerX ');
        }

        const result = GameLogicController.playRound(row, col);

        if (result) {
            if (result == 'X' || result == 'O') {
                alert("Winner is " + result);
            } else if (result == 'draw') {
                alert(result);
            }


            clickedCell.textContent = marker;
        }

    }

    return { resetBoardUI, markCell };

})();

const GameLogicController = (function () {
    let currentPlayer = player1;
    let winner = "";

    const getCurrentPlayer = () => currentPlayer;

    const switchTurn = () => {

        if (currentPlayer.getName() == player1.getName()) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }

    }

    const playRound = (row, col) => {

        if (Gameboard.isCellEmpty(row, col)) {

            Gameboard.placeMark(row, col, currentPlayer.getMarker());
            Gameboard.printBoard();

            winner = GameLogicController.checkWinner();

            if (winner) {

                return winner;

            } else if (GameLogicController.checkDraw()) {

                return 'draw';
            } else {
                GameLogicController.switchTurn();
                return true;
            }


        } else {
            return false;
        }
    }

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


    }

    const getRowElement = (index) => JSON.stringify(Gameboard.getBoard()[index]);

    const getColumnElement = (index) => JSON.stringify(Gameboard.getBoard().map(row => row[index]));

    const getFirstDiagonal = () => {

        const firstDiagonal = [];
        const len = Gameboard.getBoard().length;

        for (let i = 0; i < len; i++) {
            firstDiagonal.push(Gameboard.getBoard()[i][i]);
        }

        return JSON.stringify(firstDiagonal);
    }


    const getSecondDiagonal = () => {

        const secondDiagonal = [];
        const len = Gameboard.getBoard().length;

        for (let i = 0; i < len; i++) {
            secondDiagonal.push(Gameboard.getBoard()[i][len - 1 - i]);
        }

        return JSON.stringify(secondDiagonal);
    }


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
    }

    return { getCurrentPlayer, switchTurn, playRound, getRowElement, getColumnElement, getFirstDiagonal, getSecondDiagonal, checkWinner, checkDraw };

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