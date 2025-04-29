const winIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var turn = 'X';
var scoreBoard = {
    xScore : 0,
    oScore : 0
}

const boxes = document.getElementsByClassName("moves");

function changeTurn() {
    turn = (turn === 'X') ? 'O' : 'X';
}

for(let box of boxes){
    box.addEventListener('click', (clickEvent)=>{
        box.innerText = (box.innerText !== '') ? box.innerText : turn;
        changeTurn(turn);
        findWinner();
    })
}

function findDraw(){
    for(let box of boxes){
         if(box.innerText === ''){
             return false;
        }
    }
    return true;
}

function findWinner() {
    winner = "";
    for(let index in winIndexes){
        if(boxes[index[0]].innerText === boxes[index[1]].innerText &&
            boxes[index[1]].innerText === boxes[index[2]].innerText ){
            !findDraw() ? showWinner(boxes[index[1]].innerText.toLowerCase()) :  showWinner('draw') ;
            return;
        }
    }
}

function showWinner(winner){
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

function resetGame(){
    for(let box of boxes){
        box.innerText = '';
    }
}

function resetScoreBoard(){
    scoreBoard.xScore = 0;
    scoreBoard.oScore = 0;
}