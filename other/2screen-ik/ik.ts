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
        let result = this.list[this.index];
        this.index = (this.index + 1) % this.list.length;
        return result;
    }
}

class Karateka{

	static readonly pictureLeft = "res/kL.png";
	static readonly pictureRight = "res/k.png";
	
	private speed = 15;
	public x = 260;
	public y = 260;
	private steps: CircularList<string>;
	private picture = Karateka.pictureRight;
	
	constructor(){
		let pics = [Karateka.pictureRight, 'res/kw1.png', 'res/kw2.png', 'res/kw3.png'];
		
		this.steps = new CircularList(pics);
	}
	
	flip(){
		this.speed = -this.speed;
		
		if (this.picture == Karateka.pictureLeft) this.picture = Karateka.pictureRight
			else this.picture = Karateka.pictureLeft;
		
		this.setPicture();
	}
	
	move(){
		this.x += this.speed;
		var karatekaElement = this.getWebElement();
		karatekaElement.style.left = `${this.x}px`;
		if (this.x % (4* this.speed) > 3){
			this.picture = this.steps.next();
		}
		
		console.log(this.picture);
		
		this.setPicture();
	}
	
	setPicture(){
		var k = this.getWebElement();
		k.setAttribute("src", this.picture);
	}
	
	getWebElement(){
		return document.getElementById('karateka');
	}
}

function ikpostToFront(){
	var ikpost = document.getElementById('ik-cover');
	ikpost.style.zIndex = '3';
}

function moveKarateka(currentTime){
    const timeSinceLastRender = currentTime - lastRenderTime;

    if (timeSinceLastRender > 100 / fps) {
		karateka.move();
		
		if (karateka.x < 260 || karateka.x > 1920)
			karateka.flip();
		
		lastRenderTime = currentTime;
    }
}

console.log('hello');


function animate(currentTime) {
	moveKarateka(currentTime);
    requestAnimationFrame(animate);
}

const karateka = new Karateka();
requestAnimationFrame(animate);
