var snake_x = 0;
var snake_y = 0;
var canvas = document.getElementById('area');
var context = canvas.getContext('2d');

var snake_step = 20;

var w = false;
var a = false;
var s = false;
var d = false;

var interval = 200;

var pX = [];
var pY = [];

drawFrame();

// pX = snake_x;
// pY = snake_y;

function drawFrame() {
    // context.clearRect(snake_x, snake_y, 20, 20);
    context.beginPath();

    
    
    context.fillStyle = "#009000";
    context.fillRect(snake_x, snake_y, 20, 20);
    context.stroke();

    goMove();

    pX.push(snake_x);
    pY.push(snake_y);

    

    setTimeout("drawFrame()", interval);
}

function clearXBOCT(){
    context.clearRect(pX.shift(), pY.shift(), 20, 20);
}

window.onkeydown = function window_keyDown() {
    console.log(window.event.keyCode);
    if (window.event.keyCode == 87) { this.W_keyDown(); }
    if (window.event.keyCode == 65) { this.A_keyDown(); }
    if (window.event.keyCode == 83) { this.S_keyDown(); }
    if (window.event.keyCode == 68) { this.D_keyDown(); }

    //space
    if (window.event.keyCode == 32) { window.setInterval(clearXBOCT, interval); }

    //ctrl
    if (window.event.keyCode == 17) { 
        pX.push(pX[pX.length - 1]);
        pY.push(pY[pY.length - 1]);
    }
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