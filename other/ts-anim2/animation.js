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
var lastRenderTime = 0;
var fps = 5;
function animate(currentTime) {
    var timeSinceLastRender = currentTime - lastRenderTime;
    if (timeSinceLastRender > 1000 / fps) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pic.update();
        lastRenderTime = currentTime;
    }
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
