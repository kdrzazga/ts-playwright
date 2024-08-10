var fps = 1;
var lastRenderTime = 0;
var CircularList = /** @class */ (function () {
    function CircularList(list) {
        this.list = list;
        this.index = 0;
    }
    CircularList.prototype.next = function () {
        var result = this.list[this.index];
        this.index = (this.index + 1) % this.list.length;
        return result;
    };
    return CircularList;
}());
var Karateka = /** @class */ (function () {
    function Karateka() {
        this.speed = 15;
        this.x = 260;
        this.y = 260;
        this.picture = Karateka.pictureRight;
        var pics = [Karateka.pictureRight, 'res/kw1.png', 'res/kw2.png', 'res/kw3.png'];
        this.steps = new CircularList(pics);
        this.karatekaElement = this.getWebElement();
    }
    Karateka.prototype.flip = function () {
        this.speed = -this.speed;
        this.picture = (this.picture === Karateka.pictureLeft) ? Karateka.pictureRight : Karateka.pictureLeft;
        this.setPicture();
    };
    Karateka.prototype.move = function () {
        this.x += this.speed;
        this.karatekaElement.style.left = "".concat(this.x, "px");
        if (this.x % (4 * this.speed) > 3) {
            this.picture = this.steps.next();
        }
        this.setPicture();
    };
    Karateka.prototype.setPicture = function () {
        this.karatekaElement.setAttribute("src", this.picture);
    };
    Karateka.prototype.getWebElement = function () {
        return document.getElementById('karateka');
    };
    Karateka.pictureLeft = "res/kL.png";
    Karateka.pictureRight = "res/k.png";
    return Karateka;
}());
function moveKarateka(currentTime, karateka) {
    var timeSinceLastRender = currentTime - lastRenderTime;
    if (timeSinceLastRender > 100 / fps) {
        karateka.move();
        if (karateka.x < 260 || karateka.x > 1920) {
            karateka.flip();
        }
        lastRenderTime = currentTime;
    }
}
function animate(currentTime) {
    moveKarateka(currentTime, karateka);
    requestAnimationFrame(animate);
}
console.log('hello');
var karateka = new Karateka();
requestAnimationFrame(animate);
