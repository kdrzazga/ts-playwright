var Commodore64 = /** @class */ (function () {
    function Commodore64() {
        this.blink = true;
        this.frameIndex = 0;
        this.frames = ['kw1', 'kw2', 'kw3'];
        this.direction = -1;
        this.stepCounter = 0;
        this.stepMax = 12 + Math.floor(Math.random() * 38);
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
        for (var i = 17; i < 20; i++) {
            this.tableContent.push("&nbsp");
        }
        this.lastRenderTime = 0;
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
    Commodore64.prototype.initAnim = function () {
        this.karatekaCell = document.getElementById('row5col2');
        this.karatekaCell.innerHTML = "<img src = \"resources/k.png\"/>";
        this.karatekaCell.setAttribute("rowspan", "12");
    };
    Commodore64.prototype.anim = function () {
        var _this = this;
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - this.lastRenderTime;
        if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
            this.karatekaCell.innerHTML = "<img src = \"resources/" + this.frames[this.frameIndex] + ".png\" style='transform: scale(" + String(this.direction) + ", 1);'/>";
            this.lastRenderTime = currentTime;
            this.stepCounter++;
            if (this.stepCounter > this.stepMax) {
                this.changeDirection();
                this.stepMax = 12 + Math.floor(Math.random() * 38);
                console.log("Frames before another direction change: " + this.stepMax);
            }
        }
        console.log("frame number = " + this.frameIndex);
        requestAnimationFrame(function () { return _this.anim(); });
    };
    Commodore64.prototype.changeDirection = function () {
        this.direction = -this.direction;
        this.stepCounter = 0;
    };
    Commodore64.FPS = 4;
    Commodore64.BLUE = "#352879";
    Commodore64.LIGHTBLUE = "#6c5eb5";
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
commodore64.initAnim();
commodore64.anim();
