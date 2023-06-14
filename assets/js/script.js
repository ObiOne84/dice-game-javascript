// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
// Source - javascript walktrough project - Code Institute
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("id") === "roll-dice") {
                alert("You clicked roll dice");
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
