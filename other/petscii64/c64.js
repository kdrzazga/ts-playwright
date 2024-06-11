var Commodore64 = /** @class */ (function () {
    function Commodore64(delay) {
        this.blink = true;
        this.ballonDirection = 1;
        this.tableContent = [
            "&nbsp",
            "<center>    &nbsp**** COMMODORE 64 BASIC V2 ****&nbsp    </center>",
            "&nbsp",
            "<center> &nbsp64K RAM SYSTEM  38911 BASIC BYTES FREE&nbsp </center>",
            "&nbsp",
            "READY."
        ];
        for (var i = 5; i < 21; i++) {
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
        }
        console.log("blink = " + this.blink);
        requestAnimationFrame(function () { return _this.timeLoop(); });
    };
    Commodore64.prototype.frame = function () {
        var cell = document.getElementById('row7');
        var chars = [Commodore64.TOP_LEFT_S];
        for (var i = 1; i < 39; i++) {
            chars.push(Commodore64.HORIZ_S);
        }
        chars.push(Commodore64.TOP_RIGHT_S);
        var text = "";
        chars.forEach(function (c) { return text += String.fromCharCode(c); });
        cell.textContent = text;
    };
    Commodore64.FPS = 2;
    Commodore64.BLUE = "#352879";
    Commodore64.LIGHTBLUE = "#6c5eb5";
    Commodore64.VERT_S = 179;
    Commodore64.VERT_LEFT_S = 180;
    Commodore64.TOP_RIGHT_S = 191;
    Commodore64.BOTTOM_LEFT_S = 192;
    Commodore64.HORIZ_UP_S = 193;
    Commodore64.HORIZ_DOWN_S = 194;
    Commodore64.VERT_RIGHT_S = 195;
    Commodore64.HORIZ_S = 196;
    Commodore64.CROSS_S = 197;
    Commodore64.BOTTOM_RIGHT_S = 217;
    Commodore64.TOP_LEFT_S = 218;
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
commodore64.frame();
commodore64.initTimeLoop();
commodore64.timeLoop();