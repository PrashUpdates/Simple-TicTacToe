/*==================================
        TicTac Arena
        script.js
        Part 1
==================================*/

"use strict";

/*==========================
        Theme
==========================*/

const themeBtn=document.getElementById("themeBtn");

loadTheme();

if(themeBtn){

themeBtn.addEventListener(

"click",

toggleTheme

);

}

/*==========================
        Toggle Theme
==========================*/

function toggleTheme(){

document.body.classList.toggle(

"light"

);

const isLight=

document.body.classList.contains(

"light"

);

localStorage.setItem(

"theme",

isLight?"light":"dark"

);

updateThemeButton();

}

/*==========================
        Load Theme
==========================*/

function loadTheme(){

const theme=

localStorage.getItem("theme");

if(theme==="light"){

document.body.classList.add(

"light"

);

}

updateThemeButton();

}

/*==========================
        Update Button
==========================*/

function updateThemeButton(){

if(!themeBtn) return;

if(

document.body.classList.contains(

"light"

)

){

themeBtn.textContent=

"☀️ Light";

}else{

themeBtn.textContent=

"🌙 Dark";

}

}

/*==========================
        Page Ready
==========================*/

window.addEventListener(

"load",

()=>{

console.log(

"TicTac Arena Ready"

);

});

/*==================================
        TicTac Arena
        script.js
        Part 2
==================================*/

"use strict";

/*==========================
        Scores
==========================*/

function loadScores(){

document.getElementById("scoreX").textContent=

localStorage.getItem("scoreX")||0;

document.getElementById("scoreO").textContent=

localStorage.getItem("scoreO")||0;

document.getElementById("draw").textContent=

localStorage.getItem("draw")||0;

}

/*==========================
        Save Scores
==========================*/

function saveScores(x,o,d){

localStorage.setItem("scoreX",x);

localStorage.setItem("scoreO",o);

localStorage.setItem("draw",d);

}

/*==========================
        Reset Scores
==========================*/

const resetBtn=

document.getElementById("resetBtn");

if(resetBtn){

resetBtn.addEventListener(

"click",

()=>{

if(confirm(

"Reset all scores?"

)){

saveScores(0,0,0);

loadScores();

}

});

}

/*==========================
        Helpers
==========================*/

function $(id){

return document.getElementById(id);

}

function showMessage(text){

const status=$("status");

if(status){

status.textContent=text;

}

}

/*==========================
        Game Page
==========================*/

if(document.body.classList.contains("game-page")){

loadScores();

}

/*==========================
        Console
==========================*/

console.log(

"TicTac Arena Script Loaded ✔"

);

