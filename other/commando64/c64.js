var Commodore64 = /** @class */ (function () {
    function Commodore64() {
        this.blink = true;
        this.welcomeScreenTimeoutCounter = Commodore64.welcomeScreenTimeoutCounterMax;
        this.commandoTimeoutCounter = Commodore64.commandoTimeoutCounterMax;
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
        for (var i = 17; i < 20; i++) {
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
    Commodore64.prototype.generateHtml = function () {
        var html = [];
        var number = 0;
        html.push("<table id=\"main\" bgcolor=\"" + Commodore64.BLUE + "\">");
        this.tableContentHeader.forEach(function (line) {
            var strNumber = String(number);
            var style = line === "&nbsp" ? "" : "style='white-space: nowrap;'";
            html.push("<tr><td id=\"row" + strNumber + "\" colspan=\"2\" " + style + ">" + line + "</td></tr>");
            number++;
        });
        this.tableContent.forEach(function (line) {
            var strNumber = String(number);
            html.push("<tr><td id=\"row" + strNumber + "col1\">" + line + "</td><td id=\"row" + strNumber + "col2\"></td></tr>");
            number++;
        });
        html.push("</table>");
        return html.join("");
    };
    Commodore64.prototype.generateBorder = function () {
        var html = [];
        html.push("<table bgcolor=\"" + Commodore64.LIGHTBLUE + "\" width=\"100%\">");
        for (var i = 0; i < 3; i++) {
            html.push("<tr><td width=\"10%\">&nbsp</td><td width=\"80%\">&nbsp</td><td width=\"10%\">&nbsp</td></tr>");
        }
        html.push("</table>");
        return html.join("");
    };
    Commodore64.prototype.initBlinker = function () {
        this.canvasContainer = document.getElementById('row18col1');
        this.canvasContainer.appendChild(this.canvas);
    };
    Commodore64.prototype.blinker = function () {
        var _this = this;
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - this.lastRenderTime;
        if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = this.blink ? Commodore64.LIGHTBLUE : Commodore64.BLUE;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.blink = !this.blink;
            this.lastRenderTime = currentTime;
        }
        //console.log("blink = " + this.blink);
        this.animationFrameID = requestAnimationFrame(function () { return _this.blinker(); });
        this.welcomeScreenTimeoutCounter--;
        if (this.welcomeScreenTimeoutCounter < 0) {
            cancelAnimationFrame(this.animationFrameID);
            this.initGame();
        }
    };
    Commodore64.prototype.grenadeLaunch = function () {
        var _this = this;
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - this.lastRenderTime;
        var grenade = document.getElementById('grenade');
        if (this.grenadeY > 320) {
            grenade.style.display = 'block';
            this.grenadeY -= 5;
            var movementValues = {
                'U.PNG': 0,
                'LU.PNG': -5,
                'RU.PNG': 5
            };
            var commandoImg = document.getElementById('commando');
            var path = commandoImg.getAttribute("src");
            var key = path.split('/').pop(); //split - returns array, pop - last element from array
            var xchange = movementValues[key];
            console.log(xchange);
            this.grenadeX += xchange;
            grenade.style.top = new String(this.grenadeY) + 'px';
            grenade.style.left = new String(this.grenadeX) + 'px';
        }
        else {
            grenade.style.display = 'none';
        }
        this.animationFrameID = requestAnimationFrame(function () { return _this.grenadeLaunch(); });
        this.commandoTimeoutCounter--;
        if (this.commandoTimeoutCounter < 0) {
            cancelAnimationFrame(this.animationFrameID);
            this.initGame();
        }
    };
    Commodore64.prototype.drawKomandos = function () {
        var komandosCell = document.getElementById('row5col2');
        komandosCell.innerHTML = "<img src = \"resources/komandos.png\"/>";
        komandosCell.setAttribute("rowspan", "12");
    };
    Commodore64.prototype.initLoader = function () {
        var html = this.generateHtml();
        var div = document.getElementById('commodore64');
        var topBorderDiv = document.getElementById('top-border');
        var bottomBorderDiv = document.getElementById('bottom-border');
        div.innerHTML = html;
        topBorderDiv.innerHTML = this.generateBorder();
        bottomBorderDiv.innerHTML = this.generateBorder();
        this.drawKomandos();
        this.initBlinker();
        this.blinker();
    };
    Commodore64.prototype.initGame = function () {
        this.commandoTimeoutCounter = Commodore64.commandoTimeoutCounterMax;
        var board = document.getElementById('commodore64');
        board.innerHTML = "<img src = 'resources/board.png' style='width: 90%; height: 90%;'></img>";
        board.innerHTML += "<img id='commando' src = 'resources/U.PNG' style='position: absolute; top: 64%; left: 47%; z-index: 1;'></img>";
        board.innerHTML += "<img id='grenade' src = 'resources/bottle.PNG' style='position: absolute; top: 64%; left: 50%; z-index: 1; width: calc(10% * 0.3); height: calc(30% * 0.3);'></img>";
        var grenade = document.getElementById('grenade');
        this.grenadeX = grenade.offsetTop; //offsetTop is read-only
        this.grenadeY = grenade.offsetLeft;
        var commandoImg = document.getElementById('commando');
        board.addEventListener('mousemove', function (event) {
            var x = event.clientX;
            var y = event.clientY;
            var commandoX = 460;
            var commandoY = 520;
            if (x == commandoX)
                x++;
            var angle = Math.atan((y - commandoY) / (x - commandoX));
            var url = "resources/RU.PNG";
            if (Math.abs(angle) > 1) {
                url = "resources/U.PNG";
            }
            else if (angle > 0) {
                url = "resources/LU.PNG";
            }
            commandoImg.setAttribute("src", url);
            //console.log(`Mouse is hovering over the board at coordinates (${x}, ${y}) angle = ${angle}`);
        });
        this.grenadeLaunch();
    };
    Commodore64.FPS = 2;
    Commodore64.BLUE = "#352879";
    Commodore64.LIGHTBLUE = "#6c5eb5";
    Commodore64.welcomeScreenTimeoutCounterMax = 120;
    Commodore64.commandoTimeoutCounterMax = 500;
    return Commodore64;
}());
var width = 800;
var height = 600;
window.innerWidth = width;
window.innerHeight = height;
var commodore64 = new Commodore64();
commodore64.initLoader();
