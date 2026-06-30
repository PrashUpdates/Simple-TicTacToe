/*====================================
      TicTac Arena - game.js
              Part 1
====================================*/

"use strict";

/*===============
    Elements
================*/

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const mode = document.getElementById("mode");
const level = document.getElementById("level");
const restartBtn = document.getElementById("restartBtn");

/*===============
    Variables
================*/

let gameBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "X";
let gameOver = false;

/*===============
    Win Patterns
================*/

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

/*===============
    Start Game
================*/

cells.forEach((cell,index)=>{

    cell.addEventListener("click",()=>{

        playMove(index);

    });

});

/*===============
    Play Move
================*/

function playMove(index){

    if(gameOver) return;

    if(gameBoard[index]!="") return;

    gameBoard[index]=currentPlayer;

    cells[index].textContent=currentPlayer;

    cells[index].classList.add(

        currentPlayer.toLowerCase()

    );

    if(checkWinner()){

        finishGame(currentPlayer);

        return;

    }

    if(checkDraw()){

        finishGame("draw");

        return;

    }

    changePlayer();

}

/*===============
    Change Turn
================*/

function changePlayer(){

    currentPlayer =

    currentPlayer==="X"

    ? "O"

    : "X";

    status.textContent=

    "Player "

    +currentPlayer+

    " Turn";

}

/*====================================
      TicTac Arena - game.js
              Part 2
====================================*/

/*=================
    Winner
==================*/

function checkWinner(){

    for(let pattern of winPatterns){

        const [a,b,c]=pattern;

        if(
            gameBoard[a]!=="" &&
            gameBoard[a]===gameBoard[b] &&
            gameBoard[b]===gameBoard[c]
        ){

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            return true;
        }

    }

    return false;

}

/*=================
    Draw
==================*/

function checkDraw(){

    return gameBoard.every(cell=>cell!="");

}

/*=================
    Finish Game
==================*/

function finishGame(result){

    gameOver=true;

    if(result==="draw"){

        status.textContent="🤝 Match Draw";

        updateScore("draw");

    }

    else{

        status.textContent=
        "🎉 Player "+result+" Wins";

        updateScore(result);

    }

}

/*=================
    Restart
==================*/

restartBtn.addEventListener(

"click",

restartGame

);

function restartGame(){

    gameBoard=[

        "","","",

        "","","",

        "","",""

    ];

    currentPlayer="X";

    gameOver=false;

    status.textContent="Player X Turn";

    cells.forEach(cell=>{

        cell.textContent="";

        cell.className="cell";

    });

}

/*=================
    AI Trigger
==================*/

function changePlayer(){

    currentPlayer=

    currentPlayer==="X"

    ?

    "O"

    :

    "X";

    status.textContent=

    "Player "+currentPlayer+" Turn";

    if(

        mode.value==="ai" &&

        currentPlayer==="O" &&

        !gameOver

    ){

        setTimeout(aiMove,400);

    }

}

/*====================================
      TicTac Arena - game.js
              Part 3
====================================*/

/*=================
    AI Move
==================*/

function aiMove(){

    if(gameOver) return;

    if(level.value==="easy"){

        easyAI();

    }

    else if(level.value==="medium"){

        mediumAI();

    }

    else{

        hardAI();

    }

}

/*=================
    Easy AI
==================*/

function easyAI(){

    let empty=[];

    gameBoard.forEach((cell,index)=>{

        if(cell===""){

            empty.push(index);

        }

    });

    const move=

    empty[Math.floor(Math.random()*empty.length)];

    playMove(move);

}

/*=================
    Medium AI
==================*/

function mediumAI(){

    let move=findWinningMove("O");

    if(move==-1){

        move=findWinningMove("X");

    }

    if(move==-1){

        easyAI();

        return;

    }

    playMove(move);

}

/*=================
    Hard AI
==================*/

function hardAI(){

    /* Beginner Version
       (Center > Corner > Random)
    */

    if(gameBoard[4]===""){

        playMove(4);

        return;

    }

    const corners=[0,2,6,8];

    for(let c of corners){

        if(gameBoard[c]===""){

            playMove(c);

            return;

        }

    }

    easyAI();

}

/*=================
    Find Winning Move
==================*/

function findWinningMove(player){

    for(let pattern of winPatterns){

        const[a,b,c]=pattern;

        const values=[

            gameBoard[a],

            gameBoard[b],

            gameBoard[c]

        ];

        const count=

        values.filter(v=>v===player).length;

        const empty=

        values.indexOf("");

        if(count===2 && empty!==-1){

            return pattern[empty];

        }

    }

    return -1;

}

/*=================
    Score
==================*/

function updateScore(result){

    let x=+localStorage.getItem("scoreX")||0;

    let o=+localStorage.getItem("scoreO")||0;

    let d=+localStorage.getItem("draw")||0;

    if(result==="X") x++;

    else if(result==="O") o++;

    else d++;

    localStorage.setItem("scoreX",x);

    localStorage.setItem("scoreO",o);

    localStorage.setItem("draw",d);

    loadScores();

}

console.log("Game Loaded Successfully ✔");