class Commodore64 {
  static FPS = 4;
  static BLUE = "#352879";
  static LIGHTBLUE = "#6c5eb5";

  private tableContentHeader: string[];
  private tableContent: string[];
  private blink = true;
  private lastRenderTime;
  private canvas;
  private canvasContainer;
  private frameIndex = 0;
  private frames = ['kw1', 'kw2', 'kw3'];
  private karatekaCell;
  private direction = -1;
  private stepCounter = 0;
  private stepMax = 12 +  Math.floor(Math.random() * 38);

  constructor() {
    this.tableContentHeader = [
      "&nbsp",		
      "<center>    &nbsp**** COMMODORE 64 BASIC V2 ****&nbsp    </center>",
      "&nbsp",
      "<center> &nbsp64K RAM SYSTEM  38911 BASIC BYTES FREE&nbsp </center>"
	];
	
	this.tableContent = [
	  "&nbsp",
	  "READY.",
	  "LOAD",
	  "&nbsp",
	  "PRESS PLAY ON TAPE",
	  "OK",
	  "&nbsp",
	  "SEARCHING",
	  "FOUND INTER.KARATE+",
	  "LOADING",
	  "READY",
	  "RUN",
	  "&nbsp",
	  "&nbsp",
	  "&nbsp"
	  
    ];
	
	for (let i = 17; i < 20; i++) {
      this.tableContent.push("&nbsp");
    }
	this.lastRenderTime = 0;
  }

  generateHtml(): string {
    const html = [];
	let number = 0;
    html.push("<table id=\"main\" bgcolor=\"" + Commodore64.BLUE + "\">");
	
    this.tableContentHeader.forEach((line) => {
		let strNumber = String(number);
		let style = line === "&nbsp" ? "" : "style='white-space: nowrap;'";
		html.push("<tr><td id=\"row" + strNumber + "\" colspan=\"2\" " + style + ">" + line + "</td></tr>");
		number++;
	});
	
    this.tableContent.forEach((line) => {
	  let strNumber = String(number);
      html.push("<tr><td id=\"row" + strNumber + "col1\">" + line + "</td><td id=\"row" + strNumber + "col2\"></td></tr>");
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
  
  initAnim(){
	this.karatekaCell = document.getElementById('row5col2');
	this.karatekaCell.innerHTML = "<img src = \"resources/k.png\"/>";
	this.karatekaCell.setAttribute("rowspan", "12");
  }
  
  anim() {	
	const currentTime = performance.now();
	const timeSinceLastRender = currentTime - this.lastRenderTime;
	
	if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
		this.frameIndex = (this.frameIndex + 1) % this.frames.length;        
		this.karatekaCell.innerHTML = "<img src = \"resources/" + this.frames[this.frameIndex] + ".png\" style='transform: scale(" + String(this.direction) + ", 1);'/>";
		this.lastRenderTime = currentTime;
		this.stepCounter++;
		
		if (this.stepCounter > this.stepMax){
			this.changeDirection();
			this.stepMax = 12 +  Math.floor(Math.random() * 38);
			console.log("Frames before another direction change: " + this.stepMax);
		}
	}
	
	console.log("frame number = " + this.frameIndex);
    requestAnimationFrame(() => this.anim());
  }
  
  changeDirection(){
	this.direction = -this.direction;
	this.stepCounter = 0;
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

commodore64.initAnim();
commodore64.anim();
