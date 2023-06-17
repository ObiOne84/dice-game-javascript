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
                // https://www.w3schools.com/jsref/met_loc_assign.asp
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

function rollTheDice() {

    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;
    let num3 = Math.floor(Math.random() * 6) + 1;
    let num4 = Math.floor(Math.random() * 6) + 1;
    let sumPlayer = [];
    let sumCpu = [];

    if (num1 === num2 && num3 !== num4) {
        sumPlayer = (num1 + num2) * 2;
        sumCpu = num3 + num4;
    } else if (num1 !== num2 && num3 === num4) {
        sumPlayer = num1 + num2;
        sumCpu = (num3 + num4) * 2;
    } else if (num1 === num2 && num3 === num4) {
        sumPlayer = (num1 + num2) * 2;
        sumCpu = (num3 + num4) * 2;
    } else {
        sumPlayer = num1 + num2;
        sumCpu = num3 + num4;
    }

    replaceImage(num1, num2, num3, num4);
    displayTheRollResult(sumPlayer, sumCpu);
    displayTheWinner(sumPlayer, sumCpu);
}

function replaceImage(num1, num2, num3, num4) {
    let image1 = new Image();
    let image2 = new Image();
    let image3 = new Image();
    let image4 = new Image();
    image1.src = "./assets/images/dice-" + num1 + ".png";
    image2.src = "./assets/images/dice-" + num2 + ".png";
    image3.src = "./assets/images/dice-" + num3 + ".png";
    image4.src = "./assets/images/dice-" + num4 + ".png";
    document.getElementsByTagName("img")[1].replaceWith(image1);
    document.getElementsByTagName("img")[2].replaceWith(image2);
    document.getElementsByTagName("img")[3].replaceWith(image3);
    document.getElementsByTagName("img")[4].replaceWith(image4);
}

/** Display the dice roll result */
function displayTheRollResult(sumPlayer, sumCpu) {
    let pName = localStorage.getItem('pname');
    document.getElementById("player-field").innerText = `${pName} scored ${sumPlayer} points!`;
    document.getElementById("cpu-field").innerText = `CPU scored ${sumCpu} points!`;
}

/** Display to winner of the roll dice
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
        alert("Choose Your Name!");
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
