class Bubble{

    static currentIndex = 0;

    constructor(){
        this.index = Bubble.currentIndex;
        Bubble.currentIndex++;

        this.reset();
        this.maxLeft = Math.abs(this.left + 90 * Math.random() - 50);
        const speed = 0.2 + this.index/15;
        this.speed = speed;
        this.speedVertical = speed;

        this.imgPath = "files/bubble.png";

        this.imageElement = document.createElement('img');
        this.imageElement.src = this.imgPath;
        this.imageElement.style.width = '50px';
        this.imageElement.style.position = 'absolute';
        this.imageElement.style.display = 'none';
        this.imageElement.zIndex = '-1';
        document.body.appendChild(this.imageElement);
    }

    reset(){
        this.active = false;
        this.bottom = 0;
        this.left = 5;
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
        this.bottom += this.speedVertical;

        if (this.bottom > 111){
            this.reset();
        }
    }
}

class RightBubble extends Bubble{
    constructor(){
        super();
        this.speed *= -1;
        this.maxRight = 5 + 88 * Math.random();
    }

    reset(){
        super.reset();
        this.left = 95;
    }

    move(){
        if (!this.active)
            return;

        if(this.left >= this.maxRight)
            this.moveHorizontally();
        else
            this.moveVertically();
    }
}

class Animation{
    static releaseCounterMax = 111;

    constructor(){
        this.bubbles = [];
        for (let i = 0; i < 12; i++){
            const b = new RightBubble();
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
