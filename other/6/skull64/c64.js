var Commodore64 = /** @class */ (function () {
    function Commodore64() {
        this.blink = true;
        this.eyePic = 'czachaC.png';
        this.blinkEyeCounterMax = 120;
        this.blinkEyeCounter = this.blinkEyeCounterMax;
        this.tableContent = [
            "&nbsp",
            "<center>    &nbsp**** COMMODORE 64 BASIC V2 ****&nbsp    </center>",
            "&nbsp",
            "<center> &nbsp64K RAM SYSTEM  38911 BASIC BYTES FREE&nbsp </center>",
            "&nbsp",
            "READY.",
            "&nbsp",
            "&nbsp"
        ];
        for (var i = 5; i < 20; i++) {
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
        html.push("<center>");
        html.push("<table bgcolor=\"" + Commodore64.LIGHTBLUE + "\" width=\"100%\">");
        for (var i = 0; i < 3; i++) {
            html.push("<tr><td width=\"10%\">&nbsp</td><td width=\"80%\">&nbsp</td><td width=\"10%\">&nbsp</td></tr>");
        }
        html.push("</table>");
        html.push("</center>");
        return html.join("");
    };
    Commodore64.prototype.initBlinker = function () {
        this.canvasContainer = document.getElementById('row6');
        this.canvasContainer.appendChild(this.canvas);
    };
    Commodore64.prototype.blinker = function () {
        var _this = this;
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - this.lastRenderTime;
        this.blinkCursor(currentTime, timeSinceLastRender);
        this.blinkEye();
        requestAnimationFrame(function () { return _this.blinker(); });
    };
    Commodore64.prototype.blinkCursor = function (currentTime, timeSinceLastRender) {
        if (timeSinceLastRender >= 1000 / Commodore64.FPS) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.blink) {
                this.ctx.fillStyle = Commodore64.LIGHTBLUE;
            }
            else {
                this.ctx.fillStyle = Commodore64.BLUE;
            }
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.blink = !this.blink;
            this.lastRenderTime = currentTime;
        }
        console.log("blink = " + this.blink);
    };
    Commodore64.prototype.blinkEye = function () {
        if (this.blinkEyeCounter > 0) {
            this.blinkEyeCounter--;
            return;
        }
        this.blinkEyeCounter = this.blinkEyeCounterMax;
        var middlePicture = document.getElementById('middle-pic');
        this.eyePic = this.eyePic === 'czachaC.png' ? 'closedeye.png' : 'czachaC.png';
        var url = "resources/" + this.eyePic;
        middlePicture.setAttribute("src", url);
    };
    Commodore64.prototype.drawCzacha = function () {
        var pictureCell = document.getElementById('row7');
        pictureCell.innerHTML = "<img src = \"resources/czachaL.png\"/><img id = 'middle-pic' src = \"resources/czachaC.png\"/><img src = \"resources/czachaR.png\"/>";
        pictureCell.setAttribute("rowspan", "15");
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
var commodore64 = new Commodore64();
var html = commodore64.generateHtml();
var div = document.getElementById('commodore64');
var topBorderDiv = document.getElementById('top-border');
var bottomBorderDiv = document.getElementById('bottom-border');
div.innerHTML = html;
topBorderDiv.innerHTML = commodore64.generateBorder();
bottomBorderDiv.innerHTML = commodore64.generateBorder();
commodore64.drawCzacha();
commodore64.initBlinker();
commodore64.blinker();
