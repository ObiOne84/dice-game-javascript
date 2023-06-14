// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
// Source - javascript walktrough project - Code Institute
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("id") === "roll-dice") {
                rollTheDice();
            } else if (this.getAttribute("id") === "restart") {
                alert("You clicked restart");
            } else if (this.getAttribute("id") === "exit") {
                alert("You clicked exit");
            } else if (this.getAttribute("id") === "button-one") {
                alert("You clicked play again");
            } else if (this.getAttribute("id") === "button-two") {
                alert("You clicked play again");
            } else if (this.getAttribute("id") === "play") {
                alert("You clicked play");
            }
        });
    }
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
        return document.getElementById("message").innerHTML = "DRAW!";
    } else if (sumPlayer > sumCpu) {
        let pName = localStorage.getItem('pname');
        document.getElementById("message").innerHTML = `${pName} WINS!`;
        return incrementPlayerScore();
    } else {
        document.getElementById("message").innerHTML = "CPU WINS!";
        return incrementCpuScore();
    }
}
