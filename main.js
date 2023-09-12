import { register, login } from "./account.js";
import { Button } from "./button.js";
import { requestSQL } from "./functions.js";
import { LoginMenu } from "./login-menu.js";


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1013;

var initialRatio = canvas.height/canvas.width;

context.imageSmoothingEnabled = false;


class Game {

    constructor() {
        
        this.drawableObjects = [];

        this.backgroundImage = new Image();
        this.backgroundImage.src = "source/images/background.png";

        console.log("XD");

        var loginMenu = new LoginMenu();
    }

    startGame(){
        document.getElementById("menu").remove();
        playButton.active = true;
    }

    gameLoop() { // Zde se musí používat "game" místo "this", protože js je kinda retardovaný. (kvůli tý funkci requestAF)
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        context.drawImage(game.backgroundImage, 0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < game.drawableObjects.length; i++) game.drawableObjects[i].draw(context);
    
        requestAnimationFrame(game.gameLoop);
    }

    resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.width * initialRatio;
    }
    
}

var game = new Game();
game.gameLoop();
game.resizeCanvas();



var playButton = new Button(700, 400, 600, 200, "source/images/playButton.png");
game.drawableObjects.push(playButton);
playButton.active = false;



canvas.addEventListener("mousedown", function (e) {
    if (playButton.collision(e.pageX, e.pageY)) { 
        
        playButton.active = false;
    }
    return false;
}, false)

window.onresize = function() {
    game.resizeCanvas();
}