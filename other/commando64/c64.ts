class Commodore64 {
  static FPS = 2;
  static BLUE = "#352879";
  static LIGHTBLUE = "#6c5eb5";
  static welcomeScreenTimeoutCounterMax = 120;
  static commandoTimeoutCounterMax = 500;

  private tableContentHeader: string[];
  private tableContent: string[];
  private blink = true;
  private lastRenderTime;
  private canvas;
  private canvasContainer;
  private ctx;
  private welcomeScreenTimeoutCounter = Commodore64.welcomeScreenTimeoutCounterMax;
  private commandoTimeoutCounter = Commodore64.commandoTimeoutCounterMax;
  private animationFrameID;

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
	  "FOUND COMMANDO",
	  "LOADING",
	  "READY",
	  "RUN",
	  "&nbsp",
	  "READY"
	  
    ];
	
	for (let i = 17; i < 20; i++) {
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
  
  initBlinker(){
	this.canvasContainer = document.getElementById('row18col1');
	this.canvasContainer.appendChild(this.canvas);
  }
  
  blinker() {
	const currentTime = performance.now();
	const timeSinceLastRender = currentTime - this.lastRenderTime;
	
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
    this.animationFrameID = requestAnimationFrame(() => this.blinker());
	
	this.welcomeScreenTimeoutCounter--;
	
	if (this.welcomeScreenTimeoutCounter < 0){
		cancelAnimationFrame(this.animationFrameID);
		this.initGame();
	}
  }
  
  drawKomandos(){
	let komandosCell = document.getElementById('row5col2');
	komandosCell.innerHTML = "<img src = \"resources/komandos.png\"/>";
	komandosCell.setAttribute("rowspan", "12");
  }
  
  initLoader(){
	const html = this.generateHtml();
	const div = document.getElementById('commodore64');
	const topBorderDiv = document.getElementById('top-border');
	const bottomBorderDiv = document.getElementById('bottom-border');
	div.innerHTML = html;
	topBorderDiv.innerHTML = this.generateBorder();
	bottomBorderDiv.innerHTML = this.generateBorder();
	this.drawKomandos();
	this.initBlinker();
	this.blinker();
  }
  
  initGame(){
	this.commandoTimeoutCounter = Commodore64.commandoTimeoutCounterMax;
	const board = document.getElementById('commodore64');
	board.innerHTML = "<img src = 'resources/board.png' style='width: 90%; height: 90%;'></img>";
	board.innerHTML += "<img id='commando' src = 'resources/U.PNG'  style='position: absolute; top: 64%; left: 47%; z-index: 1;'></img>";
	
	const commandoImg = document.getElementById('commando');
	
	board.addEventListener('mousemove', (event) => {
		var x = event.clientX;
		const y = event.clientY;
		
		const commandoX = 460;
		const commandoY = 520;
	
		if (x == commandoX) x++;		
		var angle = Math.atan((y - commandoY)/(x - commandoX));
		
		var url = "resources/RU.PNG";		
		if (Math.abs(angle) > 1){
			url = "resources/U.PNG";
		}
		else if (angle > 0){
			url = "resources/LU.PNG";
		}			
		commandoImg.setAttribute("src", url);
	
		console.log(`Mouse is hovering over the board at coordinates (${x}, ${y}) angle = ${angle}`);
	});
  }
}

let width = 800;
let height = 600;

window.innerWidth = width;
window.innerHeight = height;

const commodore64 = new Commodore64();
commodore64.initLoader();
