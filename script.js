

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

    // Disable all coordinates that are out of border
    let enableDirections = directions.filter( direction => {
            let firstCoordinate = startingPlace[0] + direction[0];
            let secoundCoordinate = startingPlace[1] + direction[1];

            if(coordsInBoard(board, firstCoordinate, secoundCoordinate))
                return direction;
    })

    // Return all directions with searched element
    return enableDirections.filter( direction => {
        let valueOfDirection = board[startingPlace[0] + direction[0]][startingPlace[1] + direction[1]];

        if(valueOfDirection === searchedElement) 
            return direction;
    })
}

//Check if coordinations are in board area
function coordsInBoard(board, firstCord, secCord) {
    return (firstCord < board.length) && (secCord < board.length) && (firstCord >= 0) && (secCord >= 0) ? true : false;
}

function sumCords(firstCord, secoundCord) {
    return [firstCord[0] + secoundCord[0], firstCord[1] + secoundCord[1]];
}

function numbOfItemInDirection(board, currentDirection, startingPlace, searchedElement){
    let itemsInDirection = 0;
    let currentPosition = startingPlace;
    let reverseDirection = currentDirection.map( coordinate => coordinate * -1);
    
    function nextElementValue(board, direction, start){

        if(coordsInBoard(board, start[0], start[1]) && board[start[0]][start[1]] == searchedElement){
            start = sumCords(start, direction);
            itemsInDirection++;
            nextElementValue(board, direction, [start[0], start[1]]);
        }

        return false;
    }

    if(!nextElementValue(board, currentDirection, currentPosition))
        nextElementValue(board, reverseDirection, sumCords(currentPosition, reverseDirection));

    return itemsInDirection;
}

let board = 
    [
        ["X","X","O","O","O"],
        ["X","X","O","X","O"],
        ["O","O","X","X","O"],
        ["X","O","X","X","O"],
        ["X","O","X","X","X"]
    ];

let start = [0,0];
let find = "X";

console.log(numbOfItemInDirection(
    board,
    [1, 1],
    start,
    find
))

console.log(searchedElementDirects(board, start, find))

