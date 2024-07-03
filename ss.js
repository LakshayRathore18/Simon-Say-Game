// Variables
let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highest = 0;
let boxes = ["red", "blue", "orange", "purple"];
let h2 = document.querySelector("h2");

// press any key (starting the game) 
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game is Started");
        started = true;
        levelUp();
    }
})

function boxflash(box){
    box.classList.add("flash");
    setTimeout(() => {
        box.classList.remove("flash");
    }, 200);
}

function levelUp(){
    if(started ==false) return ; 
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;
    let rno = Math.floor(Math.random()*4);
    let randcolor = boxes[rno];
    gameSeq.push(randcolor);
    console.log(gameSeq);
    let randbox = document.querySelector(`.${randcolor}`);
    boxflash(randbox);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        if(level-1 >=highest) highest = level-1;
        h2.innerText = `Game over! Your score was ${level-1}\nHighest Score: ${highest}\nPress any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
    idx++;
}

function boxPress(){
    boxflash(this)

    let userColor = this.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);
}

let allBoxes = document.querySelectorAll(".box");

for(box of allBoxes){
    box.addEventListener("click",boxPress);
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}