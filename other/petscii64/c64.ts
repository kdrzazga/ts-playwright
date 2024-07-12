class Commodore64 {
  static FPS = 2;
  static BLUE = "#352879";
  static LIGHTBLUE = "#6c5eb5";
  static VERT_S = 179;
  static VERT_LEFT_S = 180;
  static TOP_RIGHT_S = 191;
  static BOTTOM_LEFT_S = 192;
  static HORIZ_UP_S = 193;
  static HORIZ_DOWN_S = 194;
  static VERT_RIGHT_S = 195;
  static HORIZ_S = 196;
  static CROSS_S = 197;
  static BOTTOM_RIGHT_S = 217;
  static TOP_LEFT_S = 218;
  static SPACE = 160;
  static LOWER_HALF_BLOCK = 0x2585;
  static BLOCK = 0xdb;

  private tableContent: string[];
  private blink = true;
  private lastRenderTime;
  private cursorCanvas;
  private cursorContainer;
  private ctx;
  private delay;
  private ballonDirection = 1;

  constructor(delay) {
    this.tableContent = [
      "&nbsp",		
      "<center>    &nbsp**** COMMODORE 64 BASIC V2 ****&nbsp    </center>",
      "&nbsp",
      "<center> &nbsp64K RAM SYSTEM  38911 BASIC BYTES FREE&nbsp </center>",
	  "&nbsp",
	  "READY."
    ];
	
	for (let i = 5; i < 21; i++) {
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
	this.cursorContainer = document.getElementById('row6');
	this.cursorContainer.appendChild(this.cursorCanvas);
  }
  
  timeLoop() {
	const currentTime = performance.now();
	const timeSinceLastRender = currentTime - this.lastRenderTime;
	
	if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
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
	
	console.log("blink = " + this.blink);
    requestAnimationFrame(() => this.timeLoop());	
  }
 
  frame(){
	let topRow = document.getElementById('row7');	
	topRow.textContent = this.createLongFrame(Commodore64.TOP_LEFT_S, Commodore64.TOP_RIGHT_S);
	
	let frameRow = document.getElementById('row8');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(16) + "PACMAN" + String.fromCharCode(Commodore64.SPACE).repeat(16) + String.fromCharCode(Commodore64.VERT_S);
	
	//Board starts here
	frameRow = document.getElementById('row9');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_RIGHT_S) + String.fromCharCode(Commodore64.HORIZ_S).repeat(8) + String.fromCharCode(Commodore64.HORIZ_DOWN_S) + String.fromCharCode(Commodore64.HORIZ_S).repeat(4) +  String.fromCharCode(Commodore64.HORIZ_DOWN_S) + String.fromCharCode(Commodore64.HORIZ_S).repeat(8) +String.fromCharCode(Commodore64.VERT_LEFT_S);
	
	frameRow = document.getElementById('row10');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(8) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(4) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.SPACE).repeat(8) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.VERT_LEFT_S);
	
	frameRow = document.getElementById('row11');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.TOP_LEFT_S) + String.fromCharCode(Commodore64.HORIZ_S).repeat(2) + String.fromCharCode(Commodore64.TOP_RIGHT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(4) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.SPACE).repeat(8) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.VERT_LEFT_S);
	
	frameRow = document.getElementById('row12');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(4) + String.fromCharCode(Commodore64.VERT_S)+ String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.SPACE).repeat(8) + String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.VERT_LEFT_S);
	
	frameRow = document.getElementById('row13');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.BOTTOM_LEFT_S) + String.fromCharCode(Commodore64.HORIZ_S).repeat(2) + String.fromCharCode(Commodore64.BOTTOM_RIGHT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.BOTTOM_LEFT_S) + String.fromCharCode(Commodore64.HORIZ_S).repeat(4) + String.fromCharCode(Commodore64.BOTTOM_RIGHT_S) + String.fromCharCode(Commodore64.SPACE).repeat(2) + String.fromCharCode(Commodore64.VERT_LEFT_S);
	
	frameRow = document.getElementById('row14');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S)
	
	frameRow = document.getElementById('row15');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S)
	
	frameRow = document.getElementById('row16');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S)
	
	frameRow = document.getElementById('row17');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S)
	
	frameRow = document.getElementById('row18');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S)
	
	frameRow = document.getElementById('row19');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S)
	
	frameRow = document.getElementById('row20');
	frameRow.textContent = String.fromCharCode(Commodore64.VERT_S)
	
	
	let bottomRow = document.getElementById('row21');	
	bottomRow.textContent = this.createLongFrame(Commodore64.BOTTOM_LEFT_S, Commodore64.BOTTOM_RIGHT_S);
  }
  
  private createLongFrame(endSign1, endSign2){
	let topLeft = [endSign1]
	let longHorizLine = this.createLongHorizLine();
	let chars = [...topLeft, ...longHorizLine];
	chars.push(endSign2);
	let text = "";
	
	chars.forEach((c) => text += String.fromCharCode(c));
	return text;
  }
  
  private createLongHorizLine() {
	let longHorizLine = [];

	for (let i = 1; i < 39; i++){
		longHorizLine.push(Commodore64.HORIZ_S);
	}

	return longHorizLine;
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
commodore64.frame();
commodore64.initTimeLoop();
commodore64.timeLoop();
