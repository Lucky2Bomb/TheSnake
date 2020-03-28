"use struct";

let snake_x = 0;
let snake_y = 0;
const pixel_size = 20;
let snake_step = pixel_size;
const snake_step_interval = 200;

let canvas = document.getElementById('area');
let context = canvas.getContext('2d');
let img_snake = new Image();
img_snake.src = "snake.jpg";
let canvas_width = canvas.width;
let canvas_height = canvas.height;

let target_x = 0;
let target_y = 0;

// console.log("canvas width:" + canvas_width);
// console.log("canvas height:" + canvas_height);

let w = false;
let a = false;
let s = false;
let d = false;



let pX = [];
let pY = [];

snake_x = SetRandomPosX();
snake_y = SetRandomPosY();
target_x = SetRandomPosX();
target_y = SetRandomPosY();

// console.log("snake_x: " + snake_x + "; snake_y: " + snake_y);
drawFrame();
// pX = snake_x;
// pY = snake_y;


window.addEventListener("keydown", window_keyDown);
window.addEventListener("keydown", window_cutOffTheTail);

function window_cutOffTheTail() {
    if (window.event.keyCode == 87 || window.event.keyCode == 65 || window.event.keyCode == 83 || window.event.keyCode == 68) {
        window.removeEventListener("keydown", window_cutOffTheTail);
        setTimeout(cutTail, 200);
    }

}

function window_keyDown() {
    // console.log(window.event.keyCode);
    if (window.event.keyCode == 87) { this.W_keyDown(); }
    if (window.event.keyCode == 65) { this.A_keyDown(); }
    if (window.event.keyCode == 83) { this.S_keyDown(); }
    if (window.event.keyCode == 68) { this.D_keyDown(); }

    //space
    if (window.event.keyCode == 32) { window.setInterval(clearXBOCT, snake_step_interval); }

    //ctrl
    if (window.event.keyCode == 17) {
        pX.push(pX[pX.length - 1]);
        pY.push(pY[pY.length - 1]);
    }
}

function attackTheTarget() {
    if (snake_x == target_x && snake_y == target_y) {

        target_x = SetRandomPosX();
        target_y = SetRandomPosY();

        pX.push(pX[pX.length - 1]);
        pY.push(pY[pY.length - 1]);
    }
}

function cutTail() {
    window.setInterval(clearXBOCT, snake_step_interval);
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

    if (snake_x >= canvas_width) {
        snake_x = 0;
    }

    if (snake_y >= canvas_height) {
        snake_y = 0;
    }

    if (snake_x < 0) {
        snake_x = canvas_width - pixel_size;
    }

    if (snake_y < 0) {
        snake_y = canvas_height - pixel_size;
    }

    attackTheTarget();

    pX.push(snake_x);
    pY.push(snake_y);



    setTimeout(drawFrame, snake_step_interval);
}

function SetRandomPosX() {
    return getRandomInt(2, canvas_width / pixel_size) * pixel_size - pixel_size;
}

function SetRandomPosY() {
    return getRandomInt(2, canvas_height / pixel_size) * pixel_size - pixel_size;
}

function clearXBOCT() {
    context.clearRect(pX.shift(), pY.shift(), pixel_size, pixel_size);
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function goMove() {
    if (w) {
        snake_y -= snake_step;
        // context.clearRect(snake_x, snake_y+60, 20, 20);
    }
    if (a) {
        snake_x -= snake_step;
        // context.clearRect(snake_x+60, snake_y, 20, 20);
    }
    if (s) {
        snake_y += snake_step;
        // context.clearRect(snake_x, snake_y-60, 20, 20);
    }
    if (d) {
        snake_x += snake_step;
        // context.clearRect(snake_x-60, snake_y, 20, 20);
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