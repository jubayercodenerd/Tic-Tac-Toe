const winIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var turn = 'X';
var scoreBoard = {
    xScore : 0,
    oScore : 0
}

const boxes = document.getElementsByClassName("moves");


for(let box of boxes){        //this piece of code prepares the boxes on the board for user moves by adding evenListeners
    box.addEventListener('click', (clickEvent)=>{
        box.innerText = (box.innerText !== '') ? box.innerText : turn; // if the box is empty then upon click a move will be placed depending on the turn
        changeTurn(turn);                                              // note: here it only works for pvp and not player vs comp. for player vs comp we will  
        findWinner();                                                  // just place user move upon click and restrict user from placing double moves.
    })
}


function changeTurn() {      // this funtion will change player turns
    turn = (turn === 'X') ? 'O' : 'X';
}



function findDraw(){        // this function will return a boolean value that will check for draws
    for(let box of boxes){
         if(box.innerText === ''){
             return false;
        }
    }
    return true;
}

function findWinner() {   // this function will find if theres a winner or if its a draw using the findDraw functon above
    winner = "";
    for(let index in winIndexes){
        if(boxes[index[0]].innerText === boxes[index[1]].innerText &&
            boxes[index[1]].innerText === boxes[index[2]].innerText ){
            !findDraw() ? showWinner(boxes[index[1]].innerText.toLowerCase()) :  showWinner('draw') ;
            return;
        }
    }
}

function showWinner(winner){    //this function will show the winner on the screen and will also prepare for next round
    let xWins = "X won!";
    let oWins = "O won!";
    let draw = "It's a draw!";
    if (winner === 'draw'){
        console.log(draw);
    }
    else {
        if(winner === 'x'){
            console.log(xWins);
            changeTurn();
            resetGame();
            scoreBoard.xScore++;
        }
        else {
            console.log(oWins);
            resetGame();
            scoreBoard.oScore++;
        }
    }
}

function resetGame(){     // this function will be used by the showWinner function to reset the board after each round
    for(let box of boxes){
        box.innerText = '';
    }
}

function resetScoreBoard(){    // this function will reset the scoreboard
    scoreBoard.xScore = 0;
    scoreBoard.oScore = 0;
}
