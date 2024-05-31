var Commodore64 = /** @class */ (function () {
    function Commodore64() {
        this.blink = true;
        this.tableContent = [
            "&nbsp",
            "<center>    &nbsp**** COMMODORE 64 BASIC V2 ****&nbsp    </center>",
            "&nbsp",
            "<center> &nbsp64K RAM SYSTEM  38911 BASIC BYTES FREE&nbsp </center>",
            "&nbsp",
            "READY."
        ];
        for (var i = 5; i < 20; i++) {
            this.tableContent.push("&nbsp");
        }
        this.lastRenderTime = 0;
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'relative';
        this.canvas.style.top = '-1px';
        this.canvas.style.left = '-14px';
        this.canvas.width = 17;
        this.canvas.height = 17;
        this.ctx = this.canvas.getContext('2d');
    }
    Commodore64.prototype.generateHtml = function () {
        var html = [];
        var number = 0;
        html.push("<table id=\"main\" bgcolor=\"" + Commodore64.BLUE + "\">");
        this.tableContent.forEach(function (line) {
            var strNumber = String(number);
            html.push("<tr><td id=\"row" + strNumber + "\">" + line + "</td></tr>");
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
        this.canvasContainer = document.getElementById('row6');
        this.canvasContainer.appendChild(this.canvas);
    };
    Commodore64.prototype.blinker = function () {
        var _this = this;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bf38bbb (typedore4.4)
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - this.lastRenderTime;
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
<<<<<<< HEAD
        console.log("blink = " + this.blink);
        requestAnimationFrame(function () { return _this.blinker(); });
    };
    Commodore64.FPS = 2;
<<<<<<< HEAD
=======
        this.blink = !this.blink;
        requestAnimationFrame(function () { return _this.blinker(); });
=======
>>>>>>> bf38bbb (typedore4.4)
        console.log("blink = " + this.blink);
        requestAnimationFrame(function () { return _this.blinker(); });
    };
<<<<<<< HEAD
>>>>>>> 5b3d4ec (typedore4.3)
=======
    Commodore64.FPS = 2;
>>>>>>> bf38bbb (typedore4.4)
=======
    Commodore64.BLUE = "#200080";
    Commodore64.LIGHTBLUE = "#6060c0";
>>>>>>> e6d2ca2 (typedore5)
    return Commodore64;
}());
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
