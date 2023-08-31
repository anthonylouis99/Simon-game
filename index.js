let body=document.querySelector("body");
let h1=document.querySelector("h1");
let colors = ["red","yellow","blue","green"]
let btns = document.querySelectorAll(".btn");
let wrongSound = new Audio("./sounds/wrong.mp3");
let start=false;
let gameLevel=1;
let gamePattern=[];
let userClickPattern=[];

// a function that stats the game.
        document.addEventListener("keydown", function () {
            if (start === false) {
            sequence();
            start = true; 
            }   
    });


// The sequence of the game.

function sequence() {
    h1.innerText = "level " + gameLevel
    let randomNum = Math.floor(Math.random() * 4);
    let ranCol = colors[randomNum];
    btns.forEach(btn => {
        if (btn.id === ranCol) {
            btn.classList.add("blink")
        }
        setTimeout(() => {
            btn.classList.remove("blink");
        }, 100);
    });
    userClickPattern = [];
    gamePattern.push(ranCol);
    playSound(ranCol);
    gameLevel++;

}
// a function that adds clicks to each of the buttons;

    btns.forEach(btn => {
      btn.addEventListener("click",function(e) {
        let ChosenBtn=e.target;
        let chosenId=e.target.id;
        ChosenBtn.classList.add("pressed");
        setTimeout(() => {
        ChosenBtn.classList.remove("pressed")
        }, 100);
        playSound(chosenId);
        userClickPattern.push(chosenId);
       let currentPick = userClickPattern.length -1;
       checkAnswer(currentPick);
          
      })  
      
    });
    
//  function that plays sounds.
function playSound(color) {
    let sound=new Audio("./sounds/"+color+".mp3");
    sound.play();
    } 

// a function that checks answers.
function checkAnswer(params) {
    if (userClickPattern[params]===gamePattern[params]) {
        if (userClickPattern.length===gamePattern.length) {
            setTimeout(() => {
                sequence();
            },1000 );
        }
    } else {
        restart();
        h1.innerText = "Game Over, press a button to restart.";
        wrongSound.play();
        body.classList.add("game-over");
        setTimeout(() => {
            body.classList.remove("game-over");
        }, 100);

    }
}

function restart() {
    gamePattern = [];
        start=false;
        gameLevel=1;
    }
