class CircularList<T> {
    private list: T[];
    private index: number;

    constructor(list: T[]) {
        this.list = list;
        this.index = 0;
    }

    public next(): T {
        const result = this.list[this.index];
        this.index = (this.index + 1) % this.list.length;
        return result;
    }
}

class Commodore64 {
    static FPS = 2;
    static BLUE = "#352879";
    static LIGHTBLUE = "#6c5eb5";
    static welcomeScreenTimeoutCounterMax = 1520;
    static commandoTimeoutCounterMax = 300;
    static commandoReloadCounterMax = 2;

    private tableContentHeader: string[];
    private tableContent: string[];
    private blinking = true;
    private lastRenderTime: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private commandoImages: CircularList<string>;
    private currentCommandoImg: string;
    private commandoImgChangeCounter = 0;
    private welcomeScreenTimeoutCounter = Commodore64.welcomeScreenTimeoutCounterMax;
    private commandoTimeoutCounter = Commodore64.commandoTimeoutCounterMax;
    private commandoReloadCounter = Commodore64.commandoReloadCounterMax;
    private animationFrameID: number | null = null;
	private grenadeX;

    constructor() {
        this.tableContentHeader = [
            "&nbsp",		
            "<center>&nbsp**** COMMODORE 64 BASIC V2 ****&nbsp</center>",
            "&nbsp",
            "<center>&nbsp64K RAM SYSTEM  38911 BASIC BYTES FREE&nbsp</center>"
        ];
    
        this.tableContent = [
            "&nbsp", "READY.", "LOAD", "&nbsp",
            "PRESS PLAY ON TAPE", "OK", "&nbsp",
            "SEARCHING", "FOUND COMMANDO", "LOADING",
            "READY", "RUN", "&nbsp", "READY"
        ];

        for (let i = 0; i < 3; i++) {
            this.tableContent.push("&nbsp");
        }
        
        this.lastRenderTime = 0;
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'relative';
        this.canvas.style.cssText = 'top: -2px; left: -16px;';
        this.canvas.width = 16;
        this.canvas.height = 16;
        this.ctx = this.canvas.getContext('2d')!;
        
        this.commandoImages = new CircularList([
            'resources/lu.png',
            'resources/u.png',
            'resources/ru.png'
        ]);
        this.currentCommandoImg = this.commandoImages.next();
    }

    private generateHtml(): string {
        let number = 0;
        const html = [];
        html.push(`<table id="main" bgcolor="${Commodore64.BLUE}">`);
        this.tableContentHeader.forEach((line) => {
            const style = line === "&nbsp" ? "" : "style='white-space: nowrap;'";
            html.push(`<tr><td id="row${number}" colspan="2" ${style}>${line}</td></tr>`);
            number++;
        });
        this.tableContent.forEach((line) => {
            html.push(`<tr><td id="row${number}col1">${line}</td><td id="row${number}col2"></td></tr>`);
            number++;
        });
        html.push('</table>');
        return html.join("");
    }
  
    private generateBorder(): string {
        return `
        <table bgcolor="${Commodore64.LIGHTBLUE}" width="100%">
            ${'<tr><td width="10%">&nbsp</td><td width="80%">&nbsp</td><td width="10%">&nbsp</td></tr>'.repeat(3)}
        </table>`;
    }

    private initBlinker() {
        const canvasContainer = document.getElementById('row18col1');
        canvasContainer?.appendChild(this.canvas);
    }

    private blink() {
        const currentTime = performance.now();
        const timeSinceLastRender = currentTime - this.lastRenderTime;

        if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
            this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx!.fillStyle = this.blinking ? Commodore64.LIGHTBLUE : Commodore64.BLUE;
            this.ctx!.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.blinking = !this.blinking;
            this.lastRenderTime = currentTime;
        }

        this.animationFrameID = requestAnimationFrame(() => this.blink());
        this.welcomeScreenTimeoutCounter--;

        if (this.welcomeScreenTimeoutCounter < 0) {
            cancelAnimationFrame(this.animationFrameID!);
            this.initGame();
        }
    }

    private rotateCommando() {
        const currentTime = performance.now();
        const commandoWebElement = document.getElementById('commando');
        commandoWebElement!.setAttribute("src", this.currentCommandoImg);

        this.commandoImgChangeCounter++;
        if (this.commandoImgChangeCounter > 32) {
            this.currentCommandoImg = this.commandoImages.next();
            this.commandoImgChangeCounter = 0;
        }

        this.animationFrameID = requestAnimationFrame(() => this.rotateCommando());
        this.commandoTimeoutCounter--;

        if (this.commandoTimeoutCounter < 0) {
            cancelAnimationFrame(this.animationFrameID!);
            this.initGame();
        }
    }

    private drawKomandos() {
        const komandosCell = document.getElementById('row5col2');
        if (komandosCell) {
            komandosCell.innerHTML = "<img src='resources/komandos.png'/>";
            komandosCell.setAttribute("rowspan", "12");
        }
    }

    public initLoader() {
        const div = document.getElementById('commodore64');
        const topBorderDiv = document.getElementById('top-border');
        const bottomBorderDiv = document.getElementById('bottom-border');

        if (div && topBorderDiv && bottomBorderDiv) {
            div.innerHTML = this.generateHtml();
            topBorderDiv.innerHTML = this.generateBorder();
            bottomBorderDiv.innerHTML = this.generateBorder();
            this.drawKomandos();
            this.initBlinker();
            this.blink();
        }
    }

    private initGame() {
        this.commandoTimeoutCounter = Commodore64.commandoTimeoutCounterMax;
        
        const board = document.getElementById('commodore64');
        if (board) {
            board.innerHTML = `
            <img src='resources/board.png' style='width: 150%; height: 150%;'></img>
            <img id='commando' src='resources/u.png' style='position: absolute; top: 54%; left: 47%; z-index: 1;'></img>
            <img id='grenade' src='resources/bottle.png' style='position: absolute; top: 24%; left: 25%; z-index: 1; width: calc(10% * 0.3); height: calc(30% * 0.3);'></img>
            `;
            const grenade = document.getElementById('grenade')!;
            this.grenadeX = grenade.offsetTop;  // offsetTop is read-only
            this.commandoImgChangeCounter = grenade.offsetLeft;

            this.rotateCommando();
            this.commandoReloadCounter--;
            console.log(this.commandoReloadCounter);

            if (this.commandoReloadCounter < 0) {
                console.log("%c ----------------------------------RELOADING COMMANDO----------------------------------", "color: blue; font-weight: bold;");
                location.reload();
            }
        }
    }
}

const width = 800;
const height = 600;

window.innerWidth = width;
window.innerHeight = height;

const commodore64 = new Commodore64();
commodore64.initLoader();
