const canvas = document.createElement('canvas');
canvas.style.position = 'relative';
canvas.style.top = '0px';
canvas.style.left = '0px';
canvas.width = 40;
canvas.height = 60;
const ctx = canvas.getContext('2d');

let lastRenderTime = 0;
const fps = 2;
let blink = false;

function animate(currentTime) {
    const timeSinceLastRender = currentTime - lastRenderTime;

    if (timeSinceLastRender > 1000 / fps) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (blink) {
          ctx.fillStyle = '#6060c0';
        } else {
          ctx.fillStyle = '#200080';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        lastRenderTime = currentTime;
    }
    requestAnimationFrame(animate);
}

blink = true;
requestAnimationFrame(animate);

const canvasContainer = document.getElementById('blinking-square');
canvasContainer.appendChild(canvas);

function blinker() {
    blink = !blink;
    requestAnimationFrame(blinker);
}
requestAnimationFrame(blinker);