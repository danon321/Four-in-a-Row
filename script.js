
let player = {
    number: 1,
    playerSymbol: "X",
    circlePlaced: [0, 0],
    hisTurn: true
}

function searchedElementDirects(board, startingPlace, searchedElement){
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

function pointsInDirection(board, currentDirection, startingPlace, searchedElement){
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

function checkPointsInAllDirections(board, directions, startingPlace, searchedElement, winPoints) {
    for(let i = 0; i < directions.length; i++) {
        if(pointsInDirection(board, directions[i], startingPlace, searchedElement).points >= winPoints) {
            console.log("WYGRAŁ JEBANY!", pointsInDirection(board, directions[i], startingPlace, searchedElement).path)
            return "WYGRANA";
        }

        return false;
    }
}

let board = 
    [
        ["X","X","O","O","O"],
        ["X","O","O","X","O"],
        ["O","O","X","X","O"],
        ["X","O","X","X","O"],
        ["X","O","X","X","X"]
    ];

let start = [1, 3];
let find = "X";

// console.log(pointsInDirection(
//     board,
//     [1, 1],
//     start,
//     find
// ))

console.log(checkPointsInAllDirections(
    board,
    searchedElementDirects(board, start, find),
    start,
    find,
    4))

