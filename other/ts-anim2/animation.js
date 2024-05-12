var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var Pictures = /** @class */ (function () {
    function Pictures() {
        this.pic_sequence = ['1', '2'];
        this.current_pic_index = 0;
    }
    Pictures.prototype.update = function () {
        this.current_pic_index = (this.current_pic_index + 1) % this.pic_sequence.length;
        this.draw();
    };
    Pictures.prototype.draw = function () {
        var image = new Image();
        image.src = 'resources/' + this.pic_sequence[this.current_pic_index] + '.png';
        ctx.drawImage(image, 0, 0);
    };
    return Pictures;
}());
var pic = new Pictures();
var lastRenderTime = 0; // Initialize the last render time to 0
var frameRate = 2; // Desired frame rate (2 frames per second)
function animate(currentTime) {
    var timeSinceLastRender = currentTime - lastRenderTime;
    // Check if enough time has elapsed for the desired frame rate
    if (timeSinceLastRender > 1000 / frameRate) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pic.update();
        // Update the last render time
        lastRenderTime = currentTime;
    }
    // Request the next animation frame
    requestAnimationFrame(animate);
}
// Start the animation loop
requestAnimationFrame(animate);
