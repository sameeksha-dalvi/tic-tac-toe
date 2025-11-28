
const Gameboard = (function () {

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