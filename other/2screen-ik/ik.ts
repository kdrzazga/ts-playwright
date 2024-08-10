const fps = 1;
let lastRenderTime = 0;

class CircularList<T> {
    private list: T[];
    private index: number;

    constructor(list: T[]) {
        this.list = list;
        this.index = 0;
    }

    public next(): T {
        const result = this.list[this.index];
        this.index = (this.index + 1) % this.list.length;
        return result;
    }
}

class Karateka {
    static readonly pictureLeft = "res/kL.png";
    static readonly pictureRight = "res/k.png";

    private speed = 15;
    public x = 260;
    public y = 260;
    private steps: CircularList<string>;
    private picture = Karateka.pictureRight;
    private karatekaElement: HTMLImageElement;

    constructor() {
        const pics = [Karateka.pictureRight, 'res/kw1.png', 'res/kw2.png', 'res/kw3.png'];
        this.steps = new CircularList(pics);
        this.karatekaElement = this.getWebElement();
    }

    flip() {
        this.speed = -this.speed;
        this.picture = (this.picture === Karateka.pictureLeft) ? Karateka.pictureRight : Karateka.pictureLeft;
        this.setPicture();
    }

    move() {
        this.x += this.speed;
        this.karatekaElement.style.left = `${this.x}px`;

        if (this.x % (4 * this.speed) > 3) {
            this.picture = this.steps.next();
        }

        this.setPicture();
    }

    setPicture() {
        this.karatekaElement.setAttribute("src", this.picture);
    }

    getWebElement() {
        return document.getElementById('karateka') as HTMLImageElement;
    }
}

function moveKarateka(currentTime: number, karateka: Karateka) {
    const timeSinceLastRender = currentTime - lastRenderTime;

    if (timeSinceLastRender > 100 / fps) {
        karateka.move();

        if (karateka.x < 260 || karateka.x > 1920) {
            karateka.flip();
        }

        lastRenderTime = currentTime;
    }
}

function animate(currentTime: number) {
    moveKarateka(currentTime, karateka);
    requestAnimationFrame(animate);
}

console.log('hello');
const karateka = new Karateka();
requestAnimationFrame(animate);
