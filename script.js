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

//Gameboard.placeMark(0,0,'X');
// Gameboard.placeMark(0,1,'O');
// Gameboard.placeMark(0,2,'X');
// Gameboard.placeMark(1,0,'X');
// Gameboard.placeMark(1,1,'O');
// Gameboard.placeMark(1,2,'O');
// Gameboard.placeMark(2,0,'O');
// Gameboard.placeMark(2,1,'X');
// Gameboard.placeMark(2,2,'X');

//console.log(Gameboard.isCellEmpty(0,1));

//Gameboard.printBoard();

// console.log(GameLogicController.getCurrentPlayer().getName());

// console.log(GameLogicController.switchTurn());

// console.log(GameLogicController.getCurrentPlayer().getName());

console.log(GameLogicController.playRound(0, 0));
console.log(GameLogicController.playRound(0, 2));
console.log(GameLogicController.playRound(1, 1));

const isDraw = GameLogicController.checkDraw();

console.log("Draw :" + isDraw);

console.log(GameLogicController.playRound(1, 2));
console.log(GameLogicController.playRound(2, 2));

//console.log(JSON.stringify(Gameboard.getBoard()[][0]));

//console.log(Gameboard.getBoard().map(row => row[0]));

const result = GameLogicController.checkWinner();

if (result) {
    console.log("winner : " + result);

    if (player1.getMarker() == result) {
        console.log("winner name: " + player1.getName());
    }

    if (player2.getMarker() == result) {
        console.log("winner name: " + player2.getName());
    }
}