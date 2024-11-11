class Bubble{

    static currentIndex = 0;

    constructor(){
        this.bottom = 0;
        this.left = 10;
        this.maxLeft = this.left + 90 * Math.random();
        this.speed = 0.5;

        this.imgPath = "files/bubble.png";
        this.active = false;

        this.imageElement = document.createElement('img');
        this.imageElement.src = this.imgPath;
        this.imageElement.style.width = '50px';
        this.imageElement.style.position = 'absolute';
        this.imageElement.style.display = 'none';
        document.body.appendChild(this.imageElement);
        this.index = Bubble.currentIndex;
        Bubble.currentIndex++;
    }

    move(){
       if (!this.active)
        return;

       if(this.left <= this.maxLeft)
        this.moveHorizontally();
       else
        this.moveVertically();
    }

    draw(){
        if (!this.active) {
            this.imageElement.style.display = 'none';
            return;
        }

        this.imageElement.style.display = 'block';
        this.imageElement.style.left = `${this.left}%`;
        this.imageElement.style.bottom = `${this.bottom}%`;
    }

    moveHorizontally() {
        this.left += this.speed;
    }

    moveVertically(){
        this.bottom += this.speed;

        if (this.bottom > 111){
            this.active = false;
        }
    }
}

class Animation{
    static releaseCounterMax = 200;

    constructor(){
        this.bubbles = [];
        for (let i = 0; i < 12; i++){
            const b = new Bubble();
            this.bubbles.push(b);
        }
        this.animate();

        this.releaseCounter = Animation.releaseCounterMax;
    }

    animate(){
        console.log(this.releaseCounter);
        this.moveActiveBubbles();
        this.manageReleasingBubbles();
        this.animationFrameID = requestAnimationFrame(() => this.animate());
    }

    manageReleasingBubbles(){
        this.releaseCounter--;

        if (this.releaseCounter <= 0){
            let nonActiveBubble = this.bubbles.filter(b => !b.active)[0];

            if(nonActiveBubble != null){
                this.releaseCounter = Animation.releaseCounterMax;
                nonActiveBubble.active = true;
            }
        }
    }

    moveActiveBubbles(){
        this.bubbles.filter(b => b.active).forEach(b => {
            b.move();
            b.draw();
            console.log(`[${b.left}, ${b.bottom}]`);
        });
    }
}
