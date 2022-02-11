const X_CLASS = 'x'
const CIRCLE_CLASS  = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const cellEles = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const restart = document.querySelector('#restart');
const  winningMessageElement = document.querySelector('#winningMessage')
const winningMessageText = document.querySelector('[data-winning-message-text]')

let circleTurn;

startGame();
restart.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellEles.forEach(cell => {
        cell.classList.remove(X_CLASS);//we have to remove X_CLASS & CIRCLE_CLASS to restart the game
        cell.classList.remove(CIRCLE_CLASS);//we have to remove X_CLASS & CIRCLE_CLASS to restart the game
        cell.addEventListener('click', handleClick, { once: true});
    });
    setHoverClass();
    winningMessageElement.classList.remove('show');//we have to remove show class to restart the game again
}

function handleClick(e) {
       //placemark
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    
    swapTurn();
    setHoverClass();

      //this function is to check  win
    if (checkWin(currentClass)){
        endGame(false);   
    }

    //check for draw 
}

function endGame(draw){
    if(draw){

    }else{//this function is to say who's the winner
        winningMessageText.innerText = `${circleTurn ? "X's" : "O's"} Wins!`
    }
    winningMessageElement.classList.add('show');
}

//this function in to placemark.
function placeMark(cell, currentClass){     
    cell.classList.add(currentClass);
}

//this function is for switch turn.
function swapTurn() {
    circleTurn = !circleTurn
}

//this function for hover effect
function setHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}

//this function is to check  win
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellEles[index].classList.contains(currentClass);
        });
    });
};