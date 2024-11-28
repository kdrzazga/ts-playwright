class SkullCommodore64 extends Commodore64{
  static blinkEyeCounterMax = 120;

  constructor() {
    super();
	this.blinkEyeCounter = SkullCommodore64.blinkEyeCounterMax;
    this.blink = true;
    this.eyePic = 'czachaC.png';
    this.tableContent = this.generateC64Header();

	for (let i = 5; i < 20; i++) {
      this.tableContent.push("&nbsp");
    }
	this.lastRenderTime = 0;

	this.canvas = document.createElement('canvas');
	this.canvas.style.position = 'relative';
	this.canvas.style.top = '-2px';
	this.canvas.style.left = '-16px';
	this.canvas.width = 16;
	this.canvas.height = 16;
	this.ctx = this.canvas.getContext('2d');
  }

  blinker() {
	const currentTime = performance.now();
	const timeSinceLastRender = currentTime - this.lastRenderTime;

	this.blinkCursor(currentTime, timeSinceLastRender);
	this.blinkEye();

    requestAnimationFrame(() => this.blinker());
  }

   blinkCursor(currentTime, timeSinceLastRender){
 	if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
	    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.blink) {
          this.ctx.fillStyle = Commodore64.LIGHTBLUE;
        } else {
          this.ctx.fillStyle = Commodore64.BLUE;
        }

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.blink = !this.blink;
		this.lastRenderTime = currentTime;
	}

	//console.log("blink = " + this.blink);
  }

  blinkEye(){

	if (this.blinkEyeCounter > 0){
		this.blinkEyeCounter--;
		return;
	}

	this.blinkEyeCounter = SkullCommodore64.blinkEyeCounterMax;

	let middlePicture = document.getElementById('middle-pic');
	this.eyePic = this.eyePic === 'czachaC.png' ? 'closedeye.png' : 'czachaC.png';
	const url = "resources/" + this.eyePic;
	middlePicture.setAttribute("src", url);
  }

  drawCzacha(){
	let pictureCell = document.getElementById('row7');
	pictureCell.innerHTML = "<img src = \"resources/czachaL.png\"/><img id = 'middle-pic' src = \"resources/czachaC.png\"/><img src = \"resources/czachaR.png\"/>";
	pictureCell.setAttribute("rowspan", "15");
  }
}

let width = 800;
let height = 600;

window.innerWidth = width;
window.innerHeight = height;

const commodore64 = new SkullCommodore64();
const html = commodore64.generateHtml();
const div = document.getElementById('commodore64');
const topBorderDiv = document.getElementById('top-border');
const bottomBorderDiv = document.getElementById('bottom-border');
div.innerHTML = html;
topBorderDiv.innerHTML = commodore64.generateBorder();
bottomBorderDiv.innerHTML = commodore64.generateBorder();
commodore64.drawCzacha();
commodore64.initBlinker();
commodore64.blinker();
