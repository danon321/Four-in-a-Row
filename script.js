

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
    let enableDirections = directions.filter( element => {
            let firstCoordinate = startingPlace[0] + element[0];
            let secoundCoordinate = startingPlace[1] + element[1];

            if(coordsInBoard(board, firstCoordinate, secoundCoordinate ))
                return element;
    })

    // Return all directions with searched element
    return enableDirections.filter( element => {
        let valueOfDirection = board[startingPlace[0] + element[0]][startingPlace[1] + element[1]];

        if(valueOfDirection === searchedElement) return element;
    })
}

//Check if coordinations are in board area
function coordsInBoard(board, firstCord, secCord) {
    return (firstCord < board.length) && (secCord < board.length) && (firstCord >= 0) && (secCord >= 0) ? true : false;
}

function numbOfItemInSequence(board, direction, startingPlace, searchedElement){
    let itemsInSequence = 0;
    let currentDirect = direction[1];
    let currentPosition = startingPlace;
    let reverseDirect = direction[1].map(element => {
        return element * -1;
    })
    
    function nextElementValue(board, direction, start){

        if(coordsInBoard(board, start[0], start[1]) && board[start[0]][start[1]] == searchedElement){
            start = [start[0] + direction[0], start[1] + direction[1]];
            itemsInSequence++;
            nextElementValue(board, direction, [start[0], start[1]])
        }

        return false;
            // reverse = true;
            // let reverseDirection = direction.map(element => {
            //     return element * -1;
            // })

            // start = [startingPlace[0] + reverseDirection[0], startingPlace[1] + reverseDirection[1]];

            // console.log(start)

            // if(coordsInBoard(board, start[0], start[1]) && board[start[0]][start[1]] == searchedElement){
            //     itemsInSequence++;
            //     console.log(reverseDirection)
            //     nextElementValue(board, reverseDirection, [start[0], start[1]]);
            // }
        
    }

    if(!nextElementValue(board, currentDirect, currentPosition))
        nextElementValue(board, reverseDirect, currentPosition)


    return itemsInSequence;
}

let board = 
    [
        ["X","X","O","O"],
        ["X","X","O","X"],
        ["O","O","X","X"],
        ["X","O","X","X"]
    ];

console.log(numbOfItemInSequence(
    board,
    searchedElementDirects(board, [0,0], "X"),
    [1,1],
    "X"
))

