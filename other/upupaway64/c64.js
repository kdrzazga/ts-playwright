var Commodore64 = /** @class */ (function () {
    function Commodore64(delay) {
        this.blink = true;
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
    Commodore64.prototype.initBlinker = function () {
        this.cursorContainer = document.getElementById('row6');
        this.cursorContainer.appendChild(this.cursorCanvas);
    };
    Commodore64.prototype.blinker = function () {
        var _this = this;
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - this.lastRenderTime;
        if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
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
        }
        console.log("blink = " + this.blink);
        requestAnimationFrame(function () { return _this.blinker(); });
    };
    Commodore64.prototype.animate = function () {
        console.log("Delay = ", this.delay);
        var hotAirBaloonCell = document.getElementById('row7');
        var style = "style=\"margin-left: " + 10 * this.delay + "px;\"/>";
        hotAirBaloonCell.innerHTML = "<img src = \"resources/uua.png\"" + style;
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
commodore64.initBlinker();
commodore64.blinker();
commodore64.animate();
