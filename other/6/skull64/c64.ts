class Commodore64 {
  static FPS = 2;
  static BLUE = "#352879";
  static LIGHTBLUE = "#6c5eb5";

  private tableContent: string[];
  private blink = true;
  private lastRenderTime;
  private canvas;
  private canvasContainer;
  private ctx;
  private eyePic = 'czachaC.png';
  private blinkEyeCounterMax = 120;
  private blinkEyeCounter;

  constructor() {
	this.blinkEyeCounter = this.blinkEyeCounterMax;

    this.tableContent = [
      "&nbsp",		
      "<center>    &nbsp**** COMMODORE 64 BASIC V2 ****&nbsp    </center>",
      "&nbsp",
      "<center> &nbsp64K RAM SYSTEM  38911 BASIC BYTES FREE&nbsp </center>",
      "&nbsp",
	  "READY.",
	  "&nbsp",
	  "&nbsp"
	];
	
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
	html.push("<center>");
	html.push("<table bgcolor=\"" + Commodore64.LIGHTBLUE + "\" width=\"100%\">")
	for (let i = 0; i < 3; i++){
		html.push("<tr><td width=\"10%\">&nbsp</td><td width=\"80%\">&nbsp</td><td width=\"10%\">&nbsp</td></tr>");
	}
	html.push("</table>");
	html.push("</center>");
    return html.join("");  
  }
  
  initBlinker(){
	this.canvasContainer = document.getElementById('row6');
	this.canvasContainer.appendChild(this.canvas);
  }
  
  blinker() {
	const currentTime = performance.now();
	const timeSinceLastRender = currentTime - this.lastRenderTime;
	
	this.blinkCursor(currentTime, timeSinceLastRender);
	this.blinkEye();

    requestAnimationFrame(() => this.blinker());	
  }
  
   private blinkCursor(currentTime, timeSinceLastRender){
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
	
	console.log("blink = " + this.blink); 
  }
  
  private blinkEye(){
  
	if (this.blinkEyeCounter > 0){
		this.blinkEyeCounter--;
		return;
	}
	
	this.blinkEyeCounter = this.blinkEyeCounterMax;	
	
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

const commodore64 = new Commodore64();
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
