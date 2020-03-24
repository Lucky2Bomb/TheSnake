var snake_x = 0;
var snake_y = 0;
var canvas = document.getElementById('area');
var context = canvas.getContext('2d');

var snake_step = 20;

var w = false;
var a = false;
var s = false;
var d = false;

drawFrame();

function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    context.fillStyle = "#009000";
    context.fillRect(snake_x, snake_y, 20, 20);
    
    context.stroke();

    goMove();
    
    setTimeout("drawFrame()", 200);
}

window.onkeydown =  function window_keyDown() {
    // console.log(window.event.keyCode);
    if(window.event.keyCode == 87) {this.W_keyDown();}
    if(window.event.keyCode == 65) {this.A_keyDown();}
    if(window.event.keyCode == 83) {this.S_keyDown();}
    if(window.event.keyCode == 68) {this.D_keyDown();}
    
}

function goMove() {
        if (w) { snake_y-=snake_step; }
        if (a) { snake_x-=snake_step; }
        if (s) { snake_y+=snake_step; }
        if (d) { snake_x+=snake_step; }
}

function W_keyDown() {
    w = true;
    a = false;
    s = false;
    d = false;
}

function A_keyDown() {
    w = false;
    a = true;
    s = false;
    d = false;
}

function S_keyDown() {
    w = false;
    a = false;
    s = true;
    d = false;
}

function D_keyDown() {
    w = false;
    a = false;
    s = false;
    d = true;
}