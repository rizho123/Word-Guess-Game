var words = ["bronze", "monkey", "random", "difficult", "unable", "simple"]

var currentWord = "";
var userWins = 0;
var userLosses = 0;
var wordLetters = [];
var blanks = 0;
var blankPlacer = [];
var guessRemain = 5;
var wrongGuess = [];


function Game() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordLetters = currentWord.split("");
    blanks = wordLetters.length;
    
    for (var i = 0; i < blanks; i++) {
        blankPlacer.push("_");
    }

    document.getElementById("currentword").innerHTML = "  " + blankPlacer.join("  ");
}

function reset() {
    guessRemain = 5;
    wrongGuess = [];
    blankPlacer = [];
    Game()
}

function checkLetters(letter) {
    wordL = false;
    for (var i = 0; i < blanks; i++) {
        if (currentWord[i] === letter) {
            wordL = true;
        }
    }
    if (wordL) {
        for (var i = 0; i < blanks; i++) {
            if (currentWord[i] === letter) {
                blankPlacer[i] = letter;
            }
        }
    }
    else {
        wrongGuess.push(letter);
        guessRemain--;
    }
}

function complete() {
    console.log(wordLetters, blankPlacer);
    if (wordLetters.toString() == blankPlacer.toString()) {
        userWins++;
        reset()
        document.getElementById("wins").innerHTML = " " + userWins;
        document.getElementById("status").innerHTML = "You win!";
        setTimeout(function(){
            document.getElementById("status").innerHTML = "Press any key to begin!";
        }, 3000)

    } else if (guessRemain === 0) {
        userLosses++;
        reset()
        document.getElementById("losses").innerHTML = " " + userLosses;
        document.getElementById("status").innerHTML = "You lose!";
        setTimeout(function(){
            document.getElementById("status").innerHTML = "Press any key to begin!";
        }, 3000)
    }
    document.getElementById("currentword").innerHTML = "  " + blankPlacer.join(" ");
    document.getElementById("gremain").innerHTML = " " + guessRemain;
}

Game()

document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(guesses);
    complete()
    document.getElementById("lguessed").innerHTML = "  " + wrongGuess.join(" ");
};