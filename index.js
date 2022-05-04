//Board settings
const boardRow = 6;
const boardCol = 7;
const pointsToWin = 4;
let board = [];
const boardEl = document.querySelector('.board');
const currentPlayerInfo = document.getElementById('current-player');

//CSS
const rootCss = document.querySelector(':root');

//Players
let currentPlayerTurn = 1;
let players = [{
        symbol: "X",
        place: []
    },
    {
        symbol: "O",
        place: []
    }];
let player = players[0];


function createBoard(rows, columns){

    for(let i = 0; i < rows; i++){
        let row = [];

        for(let j = 0; j < columns; j++){
            let cell = document.createElement('div');
            cell.setAttribute('data-column', j);
            cell.setAttribute('data-row', i);
            row.push(null);
            boardEl.appendChild(cell);
        }
        board.push(row);
    }
    return board;
}

function setCircle(board, col, row, symbol) {
    if(row < 0) return false;

    let targetElement = document.querySelector(`[data-column="${col}"][data-row="${row}"]`);

    if(!board[row][col]){
        board[row][col] = symbol;
        targetElement.innerHTML = symbol;
        player.place = [row, col];
    }else
        setCircle(board, col, --row, symbol);
}

function nextPlayer(players) {
    currentPlayerTurn++;

    if(currentPlayerTurn > players.length)
        currentPlayerTurn = 1;
        console.log(player)
    player = players[currentPlayerTurn - 1];
}

function searchedElementDirects(board, player){
    let startingPlace = player.place;
    let searchedElement = player.symbol;
    const directions = 
    [[-1,-1], //top-left
    [-1,0], //top-mid
    [-1,1], //top-right
    [0,1], //right-mid
    [1,1], //bottom-right
    [1,0], //bottom-mid
    [1,-1], //bottom-left
    [0,-1]]; //left-mid

    // Return all directions with searched element
    return directions.filter( direction => {
            let firstCoordinate = startingPlace[0] + direction[0];
            let secoundCoordinate = startingPlace[1] + direction[1];

            if(isInBoard(firstCoordinate, secoundCoordinate) && 
            (board[startingPlace[0] + direction[0]][startingPlace[1] + direction[1]] === searchedElement))
                return direction;
    })
}

//Check if coordinations are in board area
function isInBoard(firstCord, secCord) {
    return (firstCord < boardRow) && (secCord < boardCol) &&
    (firstCord >= 0) && (secCord >= 0) ? true : false;
}

function sumCords(firstCord, secoundCord) {
    return [firstCord[0] + secoundCord[0], firstCord[1] + secoundCord[1]];
}

function pointsInDirection(board, currentDirection, player){
    let startingPlace = player.place;
    let searchedElement = player.symbol;
    let points = 0;
    let path = [];
    let reverseDirection = currentDirection.map( coordinate => coordinate * -1);
    
    function nextElementValue(board, direction, start){

        if(isInBoard(start[0], start[1]) && board[start[0]][start[1]] == searchedElement){
            path.push(start);
            start = sumCords(start, direction);
            points++;
            nextElementValue(board, direction, [start[0], start[1]]);
        }

        return false;
    }

    if(!nextElementValue(board, currentDirection, startingPlace))
        nextElementValue(board, reverseDirection, sumCords(startingPlace, reverseDirection));

    return {points, path};
}

function checkIfPlayerWon(board, directions, player) {
    for(let i = 0; i < directions.length; i++) {
        let pointsInDirectionObj = pointsInDirection(board, directions[i], player);

        if(pointsInDirectionObj.points >= pointsToWin) {
            pointsInDirectionObj.path.forEach(cord => {
                let winnerCell = document.querySelector(`[data-row="${cord[0]}"][data-column="${cord[1]}"]`);
                winnerCell.style.background = 'yellow';
            })
            return true;
        }
    }
}

//Game Init
createBoard(boardRow,boardCol);
rootCss.style.setProperty('--rows', boardRow);
rootCss.style.setProperty('--columns', boardCol);

window.addEventListener('load', () => {
    currentPlayerInfo.innerHTML = `Current player: "${player.symbol}"`;
});

boardEl.addEventListener('click', function(e) {
    let clickedCol = Number(e.target.getAttribute('data-column'));

    setCircle(board, clickedCol, boardRow - 1, player.symbol);
    checkIfPlayerWon(board, searchedElementDirects(board, player), player);
    nextPlayer(players);
    currentPlayerInfo.innerHTML = `Current player: "${player.symbol}"`;
})
