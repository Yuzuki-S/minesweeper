document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}

function startGame () {
  createBoard(6);
  // Don't remove this function call: it makes the game work!
  for (let index = 0; index < board.cells.length; index++) {
    var number = countSurroundingMines(board.cells[index]);
    board.cells[index].surroundMines = number;
  }

  lib.initBoard()
  document.addEventListener("click", checkForWin) 
   
  
  
  document.addEventListener("contextmenu", checkForWin)
}




// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (let index =0; index < board.cells.length; index++){
    if (board.cells[index].isMine && !board.cells[index].isMarked){
      return 
    }
    if (board.cells[index].isMarked && !board.cells[index].isMine && board.cells[index].hidden) {
      return
    }
    if (!board.cells[index].isMine && board.cells[index].hidden) {
      return
    }
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  for (let index =0; index < surrounding.length; index++) {
    if (surrounding[index].isMine === true){
     count++;
    }
  }
  return count;
}

function createBoard(size) {

  for(let r = 0; r < size; r++){
    for(let c = 0; c < size; c++){
      let randomNum = Math.floor((Math.random() * 10))
      let thisIsAMine = false;
      if(randomNum >= 7){
        thisIsAMine = true;
      }

      board.cells.push({row: r, col: c, isMine: thisIsAMine, hidden: false })
      
    }

  }
}

