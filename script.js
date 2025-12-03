
const Gameboard = (function () {
    const rows = 3;
    const colums = 3;
    const board = [];

    for(let i = 0 ; i < rows ; i++){
        board[i] = [];
        for(let j = 0 ; j < colums ; j++){
            board[i][j] = '';
        }
    }

    const getBoard = () => board;

    const printBoard = () =>{
        for(let i = 0 ; i < rows ; i++){
            let rowString = "";
            for(let j = 0 ; j < colums ; j++){
            rowString += board[i][j] + " ";
            }
            console.log(rowString);
        }

    }
    
    const placeMark = (row,col,marker) =>{
        board[row][col] = marker;
    }

    const isCellEmpty = (row, col) =>{
        if(board[row][col] == ''){
            return true;
        }else{
            return false;
        }
    }

    return { getBoard, printBoard, placeMark, isCellEmpty };

})();


const DisplayController = (function () {

})();

const GameLogicController = (function () {

})();


function createPlayer(name, marker) {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
}

const player1 = createPlayer("Sameeksha","X");
const player2 = createPlayer("Mani","O");

console.log("Player One: "+player1.getName());
console.log("Player Two: "+player2.getName());


