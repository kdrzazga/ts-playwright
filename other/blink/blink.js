var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'relative';
canvas.style.top = '0px';
canvas.style.left = '0px';
canvas.width = 40;
canvas.height = 60;
var ctx = canvas.getContext('2d');
var lastRenderTime = 0;
var fps = 2;
var blink = false;
function animate(currentTime) {
    var timeSinceLastRender = currentTime - lastRenderTime;
    if (timeSinceLastRender > 1000 / fps) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (blink) {
            ctx.fillStyle = '#6060c0';
        }
        else {
            ctx.fillStyle = '#200080';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        lastRenderTime = currentTime;
    }
    requestAnimationFrame(animate);
}
blink = true;
requestAnimationFrame(animate);
var canvasContainer = document.getElementById('blinking-square');
canvasContainer.appendChild(canvas);
function blinker() {
    blink = !blink;
    requestAnimationFrame(blinker);
}
requestAnimationFrame(blinker);
