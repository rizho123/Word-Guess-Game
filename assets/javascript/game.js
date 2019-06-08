var words = ["nebula", "monkey", "planets", "milkyway", "galaxy", "solarflare"]

var currentWord = "";
var userWins = 0;
var userLosses = 0;
var wordLetters = [];
var blanks = 0;
var blankPlacer = [];
var guessRemain = 10;
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

function imgBrd() {
    if (currentWord === words[0]) {
        document.getElementById("image").src = "./assets/images/imageboard/nebula.gif";
        document.getElementById("caption").innerHTML = "Nebula";
    } else if (currentWord === words[1]) {
        document.getElementById("image").src = "./assets/images/imageboard/monkey.gif";
        document.getElementById("caption").innerHTML = "Monkey";
    } else if (currentWord === words[2]) {
        document.getElementById("image").src = "./assets/images/imageboard/planets.gif";
        document.getElementById("caption").innerHTML = "Planets";
    } else if (currentWord === words[3]) {
        document.getElementById("image").src = "./assets/images/imageboard/milkyway.gif";
        document.getElementById("caption").innerHTML = "Milky Way";
    } else if (currentWord === words[4]) {
        document.getElementById("image").src = "./assets/images/imageboard/galaxy.gif";
        document.getElementById("caption").innerHTML = "Galaxy";
    } else if (currentWord === words[5]) {
        document.getElementById("image").src = "./assets/images/imageboard/solarflare.gif";
        document.getElementById("caption").innerHTML = "Solar Flare";
    }
}

function reset() {
    guessRemain = 10;
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
        imgBrd()
        reset()
        document.getElementById("wins").innerHTML = " " + userWins;
        document.getElementById("status").innerHTML = "You win!";
        setTimeout(function(){
            document.getElementById("status").innerHTML = "Press any key to begin!";
            document.getElementById("image").src = "./assets/images/imageboard/starterpic.gif";
            document.getElementById("caption").innerHTML = "";
        }, 3000)

    } else if (guessRemain === 0) {
        userLosses++;
        reset()
        document.getElementById("losses").innerHTML = " " + userLosses;
        document.getElementById("status").innerHTML = "You lose!";
        setTimeout(function(){
            document.getElementById("status").innerHTML = "Press any key to begin!";
            document.getElementById("image").src = "./assets/images/imageboard/starterpic.gif";
            document.getElementById("caption").innerHTML = "";
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