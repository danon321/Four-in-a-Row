
let player = {
    number: 1,
    symbol: "X",
    place: [1, 1],
    hisTurn: true
}

let boardSize = 5;

function createBoard(rows, columns){
    let board = [];
    let boardEl = document.querySelector('.board');

    for(let i = 1; i <= rows; i++){
        let row = [];

        for(let j = 1; j <= columns; j++){
            let cell = document.createElement('div');
            cell.setAttribute('data-column', j);
            cell.setAttribute('data-row', i);
            row.push('empty');
            boardEl.appendChild(cell);
        }
        board.push(row);
    }
    return board;
}

console.log(createBoard(3,4));

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

            if(isInBoard(board, firstCoordinate, secoundCoordinate) && 
            (board[startingPlace[0] + direction[0]][startingPlace[1] + direction[1]] === searchedElement))
                return direction;
    })
}

//Check if coordinations are in board area
function isInBoard(board, firstCord, secCord) {
    return (firstCord < board.length) && (secCord < board.length) && (firstCord >= 0) && (secCord >= 0) ? true : false;
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

        if(isInBoard(board, start[0], start[1]) && board[start[0]][start[1]] == searchedElement){
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

function checkIfPlayerWon(board, directions, player, winPoints) {
    for(let i = 0; i < directions.length; i++) {
        if(pointsInDirection(board, directions[i], player).points >= winPoints) {
            console.log("WYGRAŁ JEBANY!", pointsInDirection(board, directions[i], player).path)
            return "WYGRANA";
        }

        return false;
    }
}

let board = 
    [
        ["X","X","O","O","O","O","O"],
        ["X","X","O","X","O","O","O"],
        ["O","O","X","X","O","O","O"],
        ["X","O","X","X","O","O","O"],
        ["X","O","X","X","X","O","O"],
        ["X","O","X","X","X","O","O"]
    ];



console.log(checkIfPlayerWon(
    board,
    searchedElementDirects(board, player),
    player,
    4))

