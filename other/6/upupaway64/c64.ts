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

class Commodore64 {
  static FPS = 2;
  static BLUE = "#352879";
  static LIGHTBLUE = "#6c5eb5";

  private tableContent: string[];
  private blink = true;
  private lastRenderTime;
  private cursorCanvas;
  private cursorContainer;
  private ctx;
  private delay;
  private ballonCounterMax = 40;
  private ballonCounter;
  private baloonImages: CircularList<string>;
  private currentImage: string;

  constructor(delay) {
	this.ballonCounter = this.ballonCounterMax;
	this.baloonImages = new CircularList(['uua.png', 'uuaW.png', 'uuaP.png', 'uuaWR.png']);
	this.currentImage = this.baloonImages.next();
  
    this.tableContent = [
      "LIST",
	  "&nbsp",
	  "1  REM UP,UP,AND AWAY", 
	  "5  PRINT \"" + String.fromCharCode(0xe273) + "\"", 
	  "10 V = 53248: REM START OF DISPLAY CHIP", 
	  "11 POKE V+21,4: REM ENABLE SPRITE 2",
	  "12 POKE 2042,13:REM SPRITE 2 DATA FROM",
	  "BLOCK 13",
	  "20 FOR N = 0 TO 62: READ Q: POKE 832+N",
	  ",Q: NEXT",
	  "30 FOR X = 0 TO 200",
	  "40 POKE V + 4,X: REM UPDATE X COORDINAT",
	  "ES",
	  "50 POKE V + 5,X: REM UPDATE Y COORDINAT",
	  "ES",
	  "60 NEXT X",
	  "70 GOTO 30",
	  "200 DATA 0,127,0,1,255,192,3,255,224,3",
	  "BREAK",
	  "READY."
    ];
	
	for (let i = 20; i < 22; i++) {
      this.tableContent.push("&nbsp");
    }
	this.lastRenderTime = 0;
	
	this.cursorCanvas = document.createElement('canvas');
	this.cursorCanvas.style.position = 'relative';
	this.cursorCanvas.style.top = '-2px';
	this.cursorCanvas.style.left = '-16px';
	this.cursorCanvas.width = 16;
	this.cursorCanvas.height = 16;
	this.ctx = this.cursorCanvas.getContext('2d');
	this.delay = delay;
  }

  generateHtml(): string {
    const html = [];
	let number = 0;
    html.push("<table id=\"main\" bgcolor=\"" + Commodore64.BLUE + "\">");
    this.tableContent.forEach((line) => {
	  let strNumber = String(number);
	  let style = line === "&nbsp" ? "" : "style='white-space: nowrap;'";
	  html.push("<tr><td id=\"row" + strNumber + "\" colspan=\"2\" " + style + ">" + line + "</td></tr>");
	  number++;
    });
    html.push("</table>");
    return html.join("");
  }
  
  generateBorder(): string {
    const html = [];
	html.push("<table bgcolor=\"" + Commodore64.LIGHTBLUE + "\" width=\"100%\">")
	for (let i = 0; i < 3; i++){
		html.push("<tr><td width=\"10%\">&nbsp</td><td width=\"80%\">&nbsp</td><td width=\"10%\">&nbsp</td></tr>");
	}
	html.push("</table>");
    return html.join("");
  }
  
  initTimeLoop(){
	this.cursorContainer = document.getElementById('row20');
	this.cursorContainer.appendChild(this.cursorCanvas);
  }
  
  timeLoop() {
	const currentTime = performance.now();
	const timeSinceLastRender = currentTime - this.lastRenderTime;
	
	if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
		this.blinkCursor(currentTime, timeSinceLastRender);
		
		if (this.ballonCounter < 0){
			this.moveBaloon();
			this.changeColor();		
			this.ballonCounter = this.ballonCounterMax;
		}
		else {
			this.ballonCounter--;
		}
	}
	
	console.log("blink = " + this.blink);
	this.animate(this.delay);
    requestAnimationFrame(() => this.timeLoop());	
  }
  
  private changeColor(){
	this.currentImage = this.baloonImages.next();
  }
  
  private moveBaloon(){
		let randomNum = Math.random() * (300 - 50) + 110;
		this.delay = randomNum;
  }
  
  private blinkCursor(currentTime, timeSinceLastRender){
	    this.ctx.clearRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);
        if (this.blink) {
          this.ctx.fillStyle = Commodore64.LIGHTBLUE;
        } else {
          this.ctx.fillStyle = Commodore64.BLUE;
        }
		
        this.ctx.fillRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);
		this.blink = !this.blink;
		this.lastRenderTime = currentTime;
		console.log("new DELAY = ", this.delay);  
  }

  animate(delay){
	console.log("Delay = ", delay);
	let baloon = document.getElementById('baloon');
	const delayStr: string = new String(delay).toUpperCase();
	baloon.style.left = delayStr + 'px';
	const url = "resources/" + this.currentImage;
	baloon.setAttribute("src", url);
 }
}

let width = 800;
let height = 600;

window.innerWidth = width;
window.innerHeight = height;

const params = new URLSearchParams(window.location.search);
const delay = params.get('delay');

const commodore64 = new Commodore64(delay);
const html = commodore64.generateHtml();
const div = document.getElementById('commodore64');
const topBorderDiv = document.getElementById('top-border');
const bottomBorderDiv = document.getElementById('bottom-border');
div.innerHTML = html;
topBorderDiv.innerHTML = commodore64.generateBorder();
bottomBorderDiv.innerHTML = commodore64.generateBorder();
commodore64.initTimeLoop();
commodore64.timeLoop();
