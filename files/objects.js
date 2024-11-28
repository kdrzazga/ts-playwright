function findStarElement(id){
    const numberIdMap = {
        1 : 'star1',
        2 : 'star2',
        3 : 'star3',
        4 : 'star4',
        5 : 'star5',
        6 : 'star6',
        7 : 'star7'
    };

    let elementId = numberIdMap[id];
    let webElement = document.getElementById(elementId);
    return webElement;
}

function flashStar(id){

    let webElement = findStarElement(id);
    if (webElement != null){
        webElement.src = 'files/bigStar.gif';
    }
    else{
        console.error('Star not found');
    }
}

function restoreStar(id){
    let webElement = findStarElement(id);
    if (webElement != null){
        webElement.src = 'files/star.gif';
    }
}

class Bubble {

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
        this.imageElement.style.zIndex = '6';
        this.imageElement.id = `bubble_${this.index}`;
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
        for (let i = 0; i < 22; i++){
            const b = new Bubble();
            const rb = new RightBubble();
            this.bubbles.push(b);
            this.bubbles.push(rb);
        }
        this.animate();

        this.releaseCounter = Animation.releaseCounterMax;
    }

    animate(){
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
        });
    }
}
