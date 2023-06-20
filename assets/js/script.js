/*jshint esversion: 6 */

// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
// Source - javascript walktrough project - Code Institute
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("id") === "roll-dice") {
                rollTheDice();
                return;
            } else if (this.getAttribute("id") === "restart") {
                resetTheScore();
                return;
            } else if (this.getAttribute("id") === "exit") {
                // 
                localStorage.clear();
                window.location.replace("./index.html");
                //https://www.w3schools.com/jsref/met_loc_replace.asp
                return;
            } else if (this.getAttribute("id") === "button-one") {
                returnToTheGame();
                resetTheScore();
                return;
            } else if (this.getAttribute("id") === "button-two") {
                returnToTheGame();
                resetTheScore();
                return;
            } else if (this.getAttribute("id") === "play") {
                checkPlayerName();
                return;
            } else if (this.getAttribute("id") === "ok") {
                hidePopUpMessage();
            }
        });
    }
    let pName = localStorage.getItem('pname');
    document.getElementById("left").innerHTML = pName;
    document.getElementById("roll-dice").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            rollTheDice();
            return;
        }
    });
});

/**
 * Main function, that generates random number on the click of roll dice button
 * pass parameters to other function to display dice, results and winner
 */

function rollTheDice() {

    let randomNumber = [];
    for (let i = 1; i < 6; i++) {
        randomNumber.push(Math.floor(Math.random() * 6) + 1);
    }

    let sumPlayer = randomNumber[1] + randomNumber[2];
    let sumCpu = randomNumber[3] + randomNumber[4];

    if (randomNumber[1] === randomNumber[2] && randomNumber[3] !== randomNumber[4]) {
        sumPlayer = sumPlayer * 2;
        sumCpu = sumCpu;

    } else if (randomNumber[1] !== randomNumber[2] && randomNumber[3] === randomNumber[4]) {
        sumPlayer = sumPlayer;
        sumCpu = sumCpu * 2;
    } else if (randomNumber[1] === randomNumber[2] && randomNumber[3] === randomNumber[4]) {
        sumPlayer = sumPlayer * 2;
        sumCpu = sumCpu * 2;
    } else {
        sumPlayer = sumPlayer;
        sumCpu = sumCpu;
    }

    replaceImage(randomNumber);
    displayTheRollResult(sumPlayer, sumCpu);
    displayTheWinner(sumPlayer, sumCpu);
}

/**
 * The function replace the images of the dices to 
 * display the dice represneting the auto-generated random number
 */
function replaceImage(randomNumber) {

    for (let i = 1; i < 5; i++) {
        let image = new Image();
        image.src = "./assets/images/dice-" + randomNumber[i] + ".png";
        document.getElementsByTagName("img")[i].replaceWith(image);
    }
}

/** 
 * Display the dice roll result 
 */
function displayTheRollResult(sumPlayer, sumCpu) {
    let pName = localStorage.getItem('pname');
    document.getElementById("player-field").innerText = `${pName} scored ${sumPlayer} points!`;
    document.getElementById("cpu-field").innerText = `CPU scored ${sumCpu} points!`;
}

/**
 * Display to winner of the roll dice
 * the function display the name of the winner
 */
function displayTheWinner(sumPlayer, sumCpu) {
    if (sumPlayer === sumCpu) {
        document.getElementById("message").innerHTML = "DRAW!";
        return;
    } else if (sumPlayer > sumCpu) {
        let pName = localStorage.getItem('pname');
        document.getElementById("message").innerHTML = `${pName} WINS!`;
        incrementPlayerScore();
        return;
    } else {
        document.getElementById("message").innerHTML = "CPU WINS!";
        incrementCpuScore();
        return;
    }
}

/**
 * Gets the current player score from DOM and increments it by 1
 * and when player score reach 11 point it will display message
 */
function incrementPlayerScore() {
    let playerScore = parseInt(document.getElementById("palyer-score").innerText);
    document.getElementById("palyer-score").innerText = ++playerScore;
    if (playerScore === 11) {
        displayWinnerMessage();
    }
}

/**
 * Gets the current CPU score from DOM and increments it by 1
 * and when CPU score reach 11 point it will display message
 */
function incrementCpuScore() {
    let cpuScore = parseInt(document.getElementById("cpu-score").innerText);
    document.getElementById("cpu-score").innerText = ++cpuScore;
    if (cpuScore === 11) {
        displayLooserMessage();
    }
}

/**
 * Function display the message for the player who won the game but unhiding the div
 */
function displayWinnerMessage() {
    let winnerMessage = document.getElementById("winner");
    winnerMessage.style.display = "block";
}

/**
 * Function display the message for the player who lost the game but unhiding the div
 */
function displayLooserMessage() {
    let looserMessage = document.getElementById("looser");
    looserMessage.style.display = "block";
}

/**
 * This function will reset the score, and clear all messages
 */
function resetTheScore() {
    let cpuScore = document.getElementById("cpu-score");
    let playerScore = document.getElementById("palyer-score");
    cpuScore.innerHTML = "0";
    playerScore.innerHTML = "0";
    document.getElementById("player-field").innerText = "";
    document.getElementById("cpu-field").innerText = "";
    document.getElementById("message").innerHTML = "";
}

/**
 * Check it the player name field has value
 * add player name to local storage
 */
function checkPlayerName() {
    let playerName = document.getElementById("pname").value;
    if (playerName) {
        localStorage.setItem("pname", playerName);
        window.location.replace("./game.html");
        return;
    } else {
        displayPopUpMessage();
        return;
    }
}

/** 
 * Function will unhide the message for the winner and allow to return to the game
 */
function returnToTheGame() {
    let winnerMessage = document.getElementById("winner");
    winnerMessage.style.display = "none";
    let looserMessage = document.getElementById("looser");
    looserMessage.style.display = "none";
}

/**
 * Function hide pop-up message
*/
function hidePopUpMessage() {
    let hideMessage = document.getElementById("gray-box");
    let popUpWindow = document.getElementById("pop-up");
    hideMessage.style.display = "none";
    popUpWindow.style.display = "none";
}

/**
 * Function to dispaly pop-up message
 */
function displayPopUpMessage() {
    let hideMessage = document.getElementById("gray-box");
    let popUpWindow = document.getElementById("pop-up");
    hideMessage.style.display = "block";
    popUpWindow.style.display = "block";
}