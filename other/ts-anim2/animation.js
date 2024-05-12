var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var Pictures = /** @class */ (function () {
    function Pictures() {
        this.current_pic = 'pic.png';
    }
    Pictures.prototype.draw = function () {
        var image = new Image();
        image.src = this.current_pic;
        ctx.drawImage(image, 0, 0);
    };
    Pictures.prototype.update = function () {
        this.current_pic = 'pic.png';
        this.draw();
    };
    return Pictures;
}());
var pic = new Pictures();
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pic.update();
}
animate();
