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
    function Commodore64(delay) {
        this.blink = true;
        this.ballonCounterMax = 40;
        this.ballonCounter = this.ballonCounterMax;
        this.baloonImages = new CircularList(['uua.png', 'uuaW.png', 'uuaP.png', 'uuaWR.png']);
        this.currentImage = this.baloonImages.next();
        this.tableContent = [
            "&nbsp",
            "<center>    &nbsp**** COMMODORE 64 BASIC V2 ****&nbsp    </center>",
            "&nbsp",
            "<center> &nbsp64K RAM SYSTEM  38911 BASIC BYTES FREE&nbsp </center>",
            "&nbsp",
            "READY."
        ];
        for (var i = 5; i < 22; i++) {
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
    Commodore64.prototype.generateHtml = function () {
        var html = [];
        var number = 0;
        html.push("<table id=\"main\" bgcolor=\"" + Commodore64.BLUE + "\">");
        this.tableContent.forEach(function (line) {
            var strNumber = String(number);
            var style = line === "&nbsp" ? "" : "style='white-space: nowrap;'";
            html.push("<tr><td id=\"row" + strNumber + "\" colspan=\"2\" " + style + ">" + line + "</td></tr>");
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
    Commodore64.prototype.initTimeLoop = function () {
        this.cursorContainer = document.getElementById('row6');
        this.cursorContainer.appendChild(this.cursorCanvas);
    };
    Commodore64.prototype.timeLoop = function () {
        var _this = this;
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - this.lastRenderTime;
        if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
            this.blinkCursor(currentTime, timeSinceLastRender);
            if (this.ballonCounter < 0) {
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
        requestAnimationFrame(function () { return _this.timeLoop(); });
    };
    Commodore64.prototype.changeColor = function () {
        this.currentImage = this.baloonImages.next();
    };
    Commodore64.prototype.moveBaloon = function () {
        var randomNum = Math.random() * (300 - 50) + 50;
        this.delay = randomNum;
    };
    Commodore64.prototype.blinkCursor = function (currentTime, timeSinceLastRender) {
        this.ctx.clearRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);
        if (this.blink) {
            this.ctx.fillStyle = Commodore64.LIGHTBLUE;
        }
        else {
            this.ctx.fillStyle = Commodore64.BLUE;
        }
        this.ctx.fillRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);
        this.blink = !this.blink;
        this.lastRenderTime = currentTime;
        console.log("new DELAY = ", this.delay);
    };
    Commodore64.prototype.animate = function (delay) {
        console.log("Delay = ", delay);
        var hotAirBaloonCell = document.getElementById('row7');
        var style = "style=\"margin-left: " + delay + "px;\"/>";
        hotAirBaloonCell.innerHTML = '<img src = "resources/' + this.currentImage + '" ' + style;
        hotAirBaloonCell.setAttribute("rowspan", "15");
    };
    Commodore64.FPS = 2;
    Commodore64.BLUE = "#352879";
    Commodore64.LIGHTBLUE = "#6c5eb5";
    return Commodore64;
}());
var width = 800;
var height = 600;
window.innerWidth = width;
window.innerHeight = height;
var params = new URLSearchParams(window.location.search);
var delay = params.get('delay');
var commodore64 = new Commodore64(delay);
var html = commodore64.generateHtml();
var div = document.getElementById('commodore64');
var topBorderDiv = document.getElementById('top-border');
var bottomBorderDiv = document.getElementById('bottom-border');
div.innerHTML = html;
topBorderDiv.innerHTML = commodore64.generateBorder();
bottomBorderDiv.innerHTML = commodore64.generateBorder();
commodore64.initTimeLoop();
commodore64.timeLoop();
