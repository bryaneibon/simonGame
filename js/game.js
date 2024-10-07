var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
const GAME_OVER = "Game Over, Press The 'Play' Button to Restart.";

/**
 * Start the game
 */
var started = false
var level = 0;
$("#playButton").click(function () {
    if(!started){
        // Start Level 1, 1sec after pressing the Start button.
        $("#level-title").text("Game is Starting !");
        setTimeout(function() {
            nextSequence();
            started = true;
        }, 1500);
    }
});

function nextSequence() {
    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".game-btn").click(function () { 
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    if (gamePattern.length !== userClickedPattern.length) {
        if (userClickedPattern.every((value, index) => value === gamePattern[index])) {
            // No action required here, just need to check the 2 previous if before going to next level.
        } else {
            gameOver();
        }
    } else {
        var result = checkAnswer(gamePattern, userClickedPattern);
        if(result) {
            // Continue to next level after 1 sec
            setTimeout(function() {
                nextSequence(); // 1000ms = 1 sec
            }, 1000);

            // reset the user pattern at each level 
            userClickedPattern.splice(0, userClickedPattern.length);
        } else {
            gameOver();
        }        
    }
});

/**
 * After the beginning of the game, we can compare arrays lenght and content
 */
function checkAnswer(gameChoices, userChoices) {
    return compareArrays(gameChoices, userChoices);
}

function compareArrays(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  }

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function gameOver() {
    $("#level-title").text(GAME_OVER);
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    resetGame();
}

function resetGame() {
    started = false;
    level = 0;
    gamePattern.splice(0, gamePattern.length);
    userClickedPattern.splice(0, userClickedPattern.length);
}
