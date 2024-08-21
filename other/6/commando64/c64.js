var CircularList = /** @class */ (function () {
    function CircularList(list) {
        this.list = list;
        this.index = 0;
    }
    CircularList.prototype.next = function () {
        var result = this.list[this.index];
        this.index = (this.index + 1) % this.list.length;
        return result;
    };
    return CircularList;
}());
var Commodore64 = /** @class */ (function () {
    function Commodore64() {
        this.blinking = true;
        this.commandoImgChangeCounter = 0;
        this.welcomeScreenTimeoutCounter = Commodore64.welcomeScreenTimeoutCounterMax;
        this.commandoTimeoutCounter = Commodore64.commandoTimeoutCounterMax;
        this.commandoReloadCounter = Commodore64.commandoReloadCounterMax;
        this.animationFrameID = null;
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
        for (var i = 0; i < 3; i++) {
            this.tableContent.push("&nbsp");
        }
        this.lastRenderTime = 0;
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'relative';
        this.canvas.style.cssText = 'top: -2px; left: -16px;';
        this.canvas.width = 16;
        this.canvas.height = 16;
        this.ctx = this.canvas.getContext('2d');
        this.commandoImages = new CircularList([
            'resources/LU.png',
            'resources/U.png',
            'resources/RU.png'
        ]);
        this.currentCommandoImg = this.commandoImages.next();
    }
    Commodore64.prototype.generateHtml = function () {
        var number = 0;
        var html = [];
        html.push("<table id=\"main\" bgcolor=\"".concat(Commodore64.BLUE, "\">"));
        this.tableContentHeader.forEach(function (line) {
            var style = line === "&nbsp" ? "" : "style='white-space: nowrap;'";
            html.push("<tr><td id=\"row".concat(number, "\" colspan=\"2\" ").concat(style, ">").concat(line, "</td></tr>"));
            number++;
        });
        this.tableContent.forEach(function (line) {
            html.push("<tr><td id=\"row".concat(number, "col1\">").concat(line, "</td><td id=\"row").concat(number, "col2\"></td></tr>"));
            number++;
        });
        html.push('</table>');
        return html.join("");
    };
    Commodore64.prototype.generateBorder = function () {
        return "\n        <table bgcolor=\"".concat(Commodore64.LIGHTBLUE, "\" width=\"100%\">\n            ").concat('<tr><td width="10%">&nbsp</td><td width="80%">&nbsp</td><td width="10%">&nbsp</td></tr>'.repeat(3), "\n        </table>");
    };
    Commodore64.prototype.initBlinker = function () {
        var canvasContainer = document.getElementById('row18col1');
        canvasContainer === null || canvasContainer === void 0 ? void 0 : canvasContainer.appendChild(this.canvas);
    };
    Commodore64.prototype.blink = function () {
        var _this = this;
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - this.lastRenderTime;
        if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = this.blinking ? Commodore64.LIGHTBLUE : Commodore64.BLUE;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.blinking = !this.blinking;
            this.lastRenderTime = currentTime;
        }
        this.animationFrameID = requestAnimationFrame(function () { return _this.blink(); });
        this.welcomeScreenTimeoutCounter--;
        if (this.welcomeScreenTimeoutCounter < 0) {
            cancelAnimationFrame(this.animationFrameID);
            this.initGame();
        }
    };
    Commodore64.prototype.rotateCommando = function () {
        var _this = this;
        var currentTime = performance.now();
        var commandoWebElement = document.getElementById('commando');
        commandoWebElement.setAttribute("src", this.currentCommandoImg);
        this.commandoImgChangeCounter++;
        if (this.commandoImgChangeCounter > 32) {
            this.currentCommandoImg = this.commandoImages.next();
            this.commandoImgChangeCounter = 0;
        }
        this.animationFrameID = requestAnimationFrame(function () { return _this.rotateCommando(); });
        this.commandoTimeoutCounter--;
        if (this.commandoTimeoutCounter < 0) {
            cancelAnimationFrame(this.animationFrameID);
            this.initGame();
        }
    };
    Commodore64.prototype.drawKomandos = function () {
        var komandosCell = document.getElementById('row5col2');
        if (komandosCell) {
            komandosCell.innerHTML = "<img src='resources/komandos.png'/>";
            komandosCell.setAttribute("rowspan", "12");
        }
    };
    Commodore64.prototype.initLoader = function () {
        var div = document.getElementById('commodore64');
        var topBorderDiv = document.getElementById('top-border');
        var bottomBorderDiv = document.getElementById('bottom-border');
        if (div && topBorderDiv && bottomBorderDiv) {
            div.innerHTML = this.generateHtml();
            topBorderDiv.innerHTML = this.generateBorder();
            bottomBorderDiv.innerHTML = this.generateBorder();
            this.drawKomandos();
            this.initBlinker();
            this.blink();
        }
    };
    Commodore64.prototype.initGame = function () {
        this.commandoTimeoutCounter = Commodore64.commandoTimeoutCounterMax;
        var board = document.getElementById('commodore64');
        if (board) {
            board.innerHTML = "\n            <img src='resources/board.png' style='width: 150%; height: 150%;'></img>\n            <img id='commando' src='resources/U.PNG' style='position: absolute; top: 54%; left: 47%; z-index: 1;'></img>\n            <img id='grenade' src='resources/bottle.PNG' style='position: absolute; top: 24%; left: 25%; z-index: 1; width: calc(10% * 0.3); height: calc(30% * 0.3);'></img>\n            ";
            var grenade = document.getElementById('grenade');
            this.grenadeX = grenade.offsetTop; // offsetTop is read-only
            this.commandoImgChangeCounter = grenade.offsetLeft;
            this.rotateCommando();
            this.commandoReloadCounter--;
            console.log(this.commandoReloadCounter);
            if (this.commandoReloadCounter < 0) {
                console.log("----------------------------------RELOADING COMMANDO----------------------------------");
                location.reload();
            }
        }
    };
    Commodore64.FPS = 2;
    Commodore64.BLUE = "#352879";
    Commodore64.LIGHTBLUE = "#6c5eb5";
    Commodore64.welcomeScreenTimeoutCounterMax = 1520;
    Commodore64.commandoTimeoutCounterMax = 300;
    Commodore64.commandoReloadCounterMax = 2;
    return Commodore64;
}());
var width = 800;
var height = 600;
window.innerWidth = width;
window.innerHeight = height;
var commodore64 = new Commodore64();
commodore64.initLoader();
