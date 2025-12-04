


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

    const getCurrentPlayer = () => currentPlayer;

    const switchTurn = () =>{

        if(currentPlayer.getName() == player1.getName()){
            currentPlayer = player2;
        }else{
            currentPlayer = player1;
        }

    }

    const playRound = (row,col) =>{
        
        if(Gameboard.isCellEmpty(row,col)){

            Gameboard.placeMark(row,col,currentPlayer.getMarker());
            Gameboard.printBoard();
            GameLogicController.switchTurn();

        }else{
            return false;
        }
    }

    return {getCurrentPlayer, switchTurn, playRound};

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

console.log(GameLogicController.playRound(0,0));
console.log(GameLogicController.playRound(0,1));
console.log(GameLogicController.playRound(1,1));
console.log(GameLogicController.playRound(2,2));