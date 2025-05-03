const winIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let turn = 'X';

var scoreBoard = {
    xScore : 0,
    oScore : 0
}
let gameOver = false;
let computerMoveTimeOut = null;

const para = document.createElement("p");
para.id = "endText";

const boxes = document.getElementsByClassName("box");

const turnBox = document.getElementsByClassName("turn");
turnBox[0].style.transition = "all  .25s ease-in-out";
turnBox[1].style.transition = "all  .25s ease-in-out";

for(let box of boxes){
    box.addEventListener("click",async function(event){
        if(box.innerText === '' && turn === 'X' && !gameOver){
            box.style.color = 'crimson';
            box.innerText = 'X';
            changeTurn();
            let hasWinner = await findWinner();
            if(!isDraw() && !hasWinner){
                let randTimeout = Math.random() * 1000;
                computerMoveTimeOut = setTimeout(async () => {
                    await computerMove();
                    hasWinner = await findWinner(); // Check if computer wins
                    if (hasWinner) return; // Exit if the computer wins
                    if (isDraw()) {
                        para.textContent = "It's a draw!";
                        para.style.color = 'crimson';
                        resetButton.after(para);
                        gameOver = true;
                        resetButton.innerText = 'Play Again';
                    }
                }, randTimeout);
            }
            else if(isDraw() && !hasWinner){
                para.id = "endText";
                para.textContent = "It's a draw!";
                para.style.color = 'crimson';
                resetButton.after(para);
                gameOver = true;
                button.innerText = 'Play Again';

            }
        }
    })
}

let resetButton = document.getElementById("button");
resetButton.addEventListener("click", function(event){
    resetButton.innerText = 'Reset';
    resetGame();
})

function changeTurn(){
    turn = (turn === 'X') ? 'O' : 'X';
    turnBox[0].style.backgroundColor = (turn === 'X') ? 'rgb(71, 45, 180)' : 'rgba(0, 0, 0, .1)';
    turnBox[1].style.backgroundColor = (turn === 'X') ? 'rgba(0, 0, 0, .1)' : 'rgb(71, 45, 180)';
}

function isDraw(){
    for(let box of boxes){
        if(box.innerText === ''){
            return false;
        }
    }
    turnBox[0].style.backgroundColor = 'rgba(0, 0, 0, .1)';
    turnBox[1].style.backgroundColor = 'rgba(0, 0, 0, .1)';
    return true;
}

function findWinner(){
    return new Promise((resolve, reject) => {
        for(let index of winIndexes){
            if (boxes[index[0]].innerText === boxes[index[1]].innerText &&
                boxes[index[1]].innerText === boxes[index[2]].innerText &&
                boxes[index[0]].innerText !== '') {

                let winner = boxes[index[1]].innerText;
                para.textContent = winner === 'X' ? 'You win!' : 'Computer Wins!';
                para.style.color = 'crimson';
                resetButton.after(para);
                gameOver = true;
                button.innerText = 'Play Again';
                resolve(true);
                turnBox[0].style.backgroundColor = 'rgba(0, 0, 0, .1)';
                turnBox[1].style.backgroundColor = 'rgba(0, 0, 0, .1)';
                return;
            }
        }
        resolve(false);
    })
}

function computerMove(){
            let moveIndex = Math.floor(Math.random() * 9);
            while(boxes[moveIndex].innerText !== ''){
                moveIndex =  Math.floor(Math.random() * 9);
            }

            boxes[moveIndex].innerText = 'O';
            boxes[moveIndex].style.color = 'gold';
            changeTurn();
}

function resetGame(){
    if(computerMoveTimeOut){
        clearTimeout(computerMoveTimeOut);
        computerMoveTimeOut = null;
    }
    for(let box of boxes){
        box.innerText = '';
    }
    gameOver = false;
    turn = 'X';
    para.remove();
    turnBox[0].style.backgroundColor = (turn === 'X') ? 'rgb(71, 45, 180)' : 'rgba(0, 0, 0, .1)';
    turnBox[1].style.backgroundColor = (turn === 'X') ? 'rgba(0, 0, 0, .1)' : 'rgb(71, 45, 180)';
}

