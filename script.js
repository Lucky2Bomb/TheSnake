"use struct";

let snake_x = 0;
let snake_y = 0;
const pixel_size = 20;
let snakeStep = pixel_size;
const snakeStepInterval = 200;

let canvas = document.getElementById('area');
let context = canvas.getContext('2d');
let img_snake = new Image();
img_snake.src = "snake.jpg";
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let target_x = 0;
let target_y = 0;

// console.log("canvas width:" + canvasWidth);
// console.log("canvas height:" + canvasHeight);

let w = false;
let a = false;
let s = false;
let d = false;

let currentSnakeTailX = [];
let currentSnakeTailY = [];

snake_x = SetRandomPosX();
snake_y = SetRandomPosY();
target_x = SetRandomPosX();
target_y = SetRandomPosY();

setLengthSnake(4);

drawFrame();

window.setInterval(clearXBOCT, snakeStepInterval);


window.addEventListener("keydown", window_keyDown);
window.addEventListener("keydown", checkSnakeCrush_keyDown);

function setLengthSnake(value) {
    for(let i = 0; i < value; i++ ) {
        currentSnakeTailX.push(snake_x);
        currentSnakeTailY.push(snake_y);
    }
}


// window.addEventListener("keydown", window_cutOffTheTail);

function checkSnakeCrush_keyDown() {
    //console.log(window.event.keyCode);
    if (window.event.keyCode == 87 || window.event.keyCode == 65 || 
        window.event.keyCode == 83 || window.event.keyCode == 68) { 
        //setTimeout(checkSnakeCrush, snakeStepInterval);
        window.removeEventListener("keydown", checkSnakeCrush_keyDown);
     }
}

function window_keyDown() {
    //console.log(window.event.keyCode);
    if (window.event.keyCode == 87) { this.W_keyDown(); }
    if (window.event.keyCode == 65) { this.A_keyDown(); }
    if (window.event.keyCode == 83) { this.S_keyDown(); }
    if (window.event.keyCode == 68) { this.D_keyDown(); }

    //space
    if (window.event.keyCode == 32) { window.setInterval(clearXBOCT, snakeStepInterval); }

    //alt
    if (window.event.keyCode == 18) {
        console.log("snake crush!");
        for(let i = 0; i < currentSnakeTailX.length; i++ ) {
            console.log(`X[${i}] ` + currentSnakeTailX[i] + `; Y[${i}] ` + currentSnakeTailY[i]);
        }
        console.log("current snake x = " + snake_x + "; current snake y = " + snake_y);
        alert("oh!");
    }
    
    //ctrl
    if (window.event.keyCode == 17) {
        currentSnakeTailX.push(currentSnakeTailX[currentSnakeTailX.length - 1]);
        currentSnakeTailY.push(currentSnakeTailY[currentSnakeTailY.length - 1]);
    }
}

function attackTheTarget() {
    if (snake_x == target_x && snake_y == target_y) {

        target_x = SetRandomPosX();
        target_y = SetRandomPosY();

        currentSnakeTailX.push(currentSnakeTailX[currentSnakeTailX.length - 1]);
        currentSnakeTailY.push(currentSnakeTailY[currentSnakeTailY.length - 1]);
    }
}

function drawFrame() {
    // context.clearRect(snake_x, snake_y, 20, 20);
    context.beginPath();

    // context.fillRect(snake_x, snake_y, pixel_size, pixel_size);

    context.fillStyle = "#900000";
    context.fillRect(target_x, target_y, pixel_size, pixel_size);
    context.drawImage(img_snake, snake_x, snake_y, pixel_size, pixel_size);

    context.stroke();
    goMove();
    // checkSnakeCrush();

    teleportOutOfWall();

    attackTheTarget();

    setTimeout(drawFrame, snakeStepInterval);

    currentSnakeTailX.push(snake_x);
    currentSnakeTailY.push(snake_y);
}

function SetRandomPosX() {
    return getRandomInt(2, canvasWidth / pixel_size) * pixel_size - pixel_size;
}

function SetRandomPosY() {
    return getRandomInt(2, canvasHeight / pixel_size) * pixel_size - pixel_size;
}

function clearXBOCT() {
    context.clearRect(currentSnakeTailX.shift(), currentSnakeTailY.shift(), pixel_size, pixel_size);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkSnakeCrush() {
    if (currentSnakeTailX.indexOf(snake_x) != -1 && currentSnakeTailY.indexOf(snake_y) != -1) {
        if(currentSnakeTailX.indexOf(snake_x) == currentSnakeTailY.indexOf(snake_y)){
        console.log("snake crush!");
        setTimeout(checkSnakeCrush, snakeStepInterval);
    }
}
}

function teleportOutOfWall() {
    if (snake_x >= canvasWidth) {
        snake_x = 0;
    }

    if (snake_y >= canvasHeight) {
        snake_y = 0;
    }

    if (snake_x < 0) {
        snake_x = canvasWidth - pixel_size;
    }

    if (snake_y < 0) {
        snake_y = canvasHeight - pixel_size;
    }
}

function goMove() {
    if (w) {
        snake_y -= snakeStep;
    }
    if (a) {
        snake_x -= snakeStep;
    }
    if (s) {
        snake_y += snakeStep;
    }
    if (d) {
        snake_x += snakeStep;
    }
}

function W_keyDown() {

    if (!s) {
        w = true;
        a = false;
        s = false;
        d = false;
    }
}

function A_keyDown() {
    if (!d) {
        w = false;
        a = true;
        s = false;
        d = false;
    }
}

function S_keyDown() {
    if (!w) {
        w = false;
        a = false;
        s = true;
        d = false;
    }
}

function D_keyDown() {
    if (!a) {
        w = false;
        a = false;
        s = false;
        d = true;
    }
}