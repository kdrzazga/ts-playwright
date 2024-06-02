var Commodore64 = /** @class */ (function () {
    function Commodore64() {
        this.blink = true;
        this.frameIndex = 0;
        this.frames = ['kw1', 'kw2', 'kw3'];
        this.tableContentHeader = [
            "&nbsp",
            "<center>    &nbsp**** COMMODORE 64 BASIC V2 ****&nbsp    </center>",
            "&nbsp",
            "<center> &nbsp64K RAM SYSTEM  38911 BASIC BYTES FREE&nbsp </center>"
        ];
        this.tableContent = [
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
            "RUN"
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
            html.push("<tr><td id=\"row" + strNumber + "\" colspan=\"2\">" + line + "</td></tr>");
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
        this.karatekaCell = document.getElementById('row5col2');
        this.karatekaCell.innerHTML = "<img src = \"resources/k.png\"/>";
        this.karatekaCell.setAttribute("rowspan", "12");
    };
    Commodore64.prototype.blinker = function () {
        var _this = this;
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - this.lastRenderTime;
        if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.karatekaCell.innerHTML = "<img src = \"resources/" + this.frames[this.frameIndex] + ".png\"/>";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.lastRenderTime = currentTime;
        }
        console.log("frame number = " + this.frameIndex);
        requestAnimationFrame(function () { return _this.blinker(); });
    };
    Commodore64.FPS = 4;
    Commodore64.BLUE = "#200080";
    Commodore64.LIGHTBLUE = "#6060c0";
    return Commodore64;
}());
var width = 800;
var height = 600;
window.innerWidth = width;
window.innerHeight = height;
var commodore64 = new Commodore64();
var html = commodore64.generateHtml();
var div = document.getElementById('commodore64');
var topBorderDiv = document.getElementById('top-border');
var bottomBorderDiv = document.getElementById('bottom-border');
div.innerHTML = html;
topBorderDiv.innerHTML = commodore64.generateBorder();
bottomBorderDiv.innerHTML = commodore64.generateBorder();
commodore64.initBlinker();
commodore64.blinker();
