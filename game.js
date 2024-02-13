var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 1;
var currentScore = 0;
var highScore = 0;

$(document).keypress(function(){

    if (hasStarted === false) {
        hasStarted = true;
        nextSequence();
    } 
});

$(document).click(function(){

    if (hasStarted === false) {
        hasStarted = true;
        nextSequence();
    } 
});


function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);

    $("#level-title").text("Level "+level);
    level ++;
}

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  });

function playSound(name) {
    var music = new Audio("./sounds/"+name+".mp3");
    music.play();
}

function animatePress(currentColour){
    $("#"+currentColour).fadeOut(50).fadeIn(50);
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    hasStarted = false;
    level = 1;
    gamePattern = [];
    $("h1").text("Press A Key to Start");
    currentScore = 0;
}

function updateHighScore() {
    if (highScore <= currentScore){
        highScore = currentScore;
    }

    $("#highScore").text("Highscore: "+highScore);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function(){
            nextSequence();
        }, 1000);
        currentScore++;
        updateHighScore();
      }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
            startOver();
        }, 5000);
    }

}








