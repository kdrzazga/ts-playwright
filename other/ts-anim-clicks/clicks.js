"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("./pixi.js");
var AnimationApp = /** @class */ (function () {
    function AnimationApp() {
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099A7,
        });
        this.createRectangle();
        document.body.appendChild(this.app.view);
    }
    AnimationApp.prototype.createRectangle = function () {
        var rectangle = new PIXI.Graphics();
        rectangle.beginFill(0x666666);
        rectangle.drawRect(0, 0, 500, 300);
        rectangle.endFill();
        this.container = new PIXI.Container();
        this.container.addChild(rectangle);
        this.app.renderer.view.style.position = 'relative';
        this.app.renderer.view.style.left = '50%';
        this.app.renderer.view.style.top = '50%';
        this.app.renderer.view.style.transform = 'translate(-50%, -50%)';
    };
    AnimationApp.prototype.createCircle = function () {
        var circle = new PIXI.Graphics();
        circle.beginFill(0xFF69B4);
        circle.drawCircle(0, 0, 20);
        circle.endFill();
        return circle;
    };
    AnimationApp.prototype.animate = function () {
        var _this = this;
        var circle1 = this.createCircle();
        circle1.position.x = Math.random() * (500 - 20);
        circle1.position.y = Math.random() * (300 - 20);
        this.container.addChild(circle1);
        var circle2 = this.createCircle();
        circle2.position.x = Math.random() * (500 - 20);
        circle2.position.y = Math.random() * (300 - 20);
        this.container.addChild(circle2);
        var circle3 = this.createCircle();
        circle3.position.x = Math.random() * (500 - 20);
        circle3.position.y = Math.random() * (300 - 20);
        this.container.addChild(circle3);
        setTimeout(function () {
            _this.container.removeChild(circle1);
            _this.container.removeChild(circle2);
            _this.container.removeChild(circle3);
            _this.animate();
        }, 5000);
    };
    AnimationApp.prototype.handleClick = function (event) {
        if (event.target instanceof PIXI.Graphics) {
            this.animate();
        }
    };
    AnimationApp.prototype.init = function () {
        this.app.renderer.view.addEventListener('click', this.handleClick.bind(this));
    };
    AnimationApp.prototype.start = function () {
        this.init();
    };
    return AnimationApp;
}());
new AnimationApp().start();
