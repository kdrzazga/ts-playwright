var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Commodore64 = /** @class */ (function () {
    function Commodore64(delay) {
        this.blink = true;
        this.pacmanPos = 30;
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
        this.blinkCursor(currentTime, timeSinceLastRender);
        this.movePacman();
        requestAnimationFrame(function () { return _this.timeLoop(); });
    };
    Commodore64.prototype.blinkCursor = function (currentTime, timeSinceLastRender) {
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
    };
    Commodore64.prototype.movePacman = function () {
        var pacmanCell = document.getElementById('pacman');
        var pacman = document.getElementById('pacman');
        pacman.style.marginLeft = new String(this.pacmanPos) + 'px';
        this.pacmanPos += 2;
        if (this.pacmanPos > 500) {
            this.pacmanPos = 30;
        }
        console.log("pacman pos = ", this.pacmanPos);
        //pacmanCell.innerHTML = '';
    };
    Commodore64.prototype.frame = function () {
        var row = [];
        var elements = [];
        var topRow = document.getElementById('row7');
        topRow.textContent = this.createLongFrame(Commodore64.TOP_LEFT_S, Commodore64.TOP_RIGHT_S);
        var frameRow = document.getElementById('row8');
        frameRow.textContent = String.fromCharCode(Commodore64.VERT_S) + String.fromCharCode(Commodore64.SPACE).repeat(16) + "PACMAN" + String.fromCharCode(Commodore64.SPACE).repeat(16) + String.fromCharCode(Commodore64.VERT_S);
        //Board starts here
        elements = [[1, Commodore64.VERT_RIGHT_S], [8, Commodore64.HORIZ_S], [1, Commodore64.HORIZ_DOWN_S], [4, Commodore64.HORIZ_S],
            [1, Commodore64.HORIZ_DOWN_S], [12, Commodore64.HORIZ_S], [1, Commodore64.HORIZ_DOWN_S], [4, Commodore64.HORIZ_S], [1, Commodore64.HORIZ_DOWN_S], [6, Commodore64.HORIZ_S], [1, Commodore64.VERT_LEFT_S]];
        this.generateRow('row9', elements);
        elements = [[1, Commodore64.VERT_S], [8, Commodore64.SPACE], [1, Commodore64.VERT_S], [4, Commodore64.SPACE],
            [1, Commodore64.VERT_S], [2, Commodore64.SPACE], [10, Commodore64.SPACE], [1, Commodore64.VERT_S], [4, Commodore64.SPACE], [1, Commodore64.VERT_S], [6, Commodore64.SPACE], [1, Commodore64.VERT_S]];
        this.generateRow('row10', elements);
        elements = [[1, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.TOP_LEFT_S], [2, Commodore64.HORIZ_S], [1, Commodore64.TOP_RIGHT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S], [4, Commodore64.SPACE], [1, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.TOP_LEFT_S], [6, Commodore64.HORIZ_S], [1, Commodore64.TOP_RIGHT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S], [4, Commodore64.SPACE], [1, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.TOP_LEFT_S], [1, Commodore64.TOP_RIGHT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S]];
        this.generateRow('row11', elements);
        elements = [[1, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S], [4, Commodore64.SPACE], [1, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S], [6, Commodore64.SPACE], [1, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S], [4, Commodore64.SPACE], [1, Commodore64.VERT_S], [2, Commodore64.SPACE], [2, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S]];
        this.generateRow('row12', elements);
        elements = [[1, Commodore64.VERT_S], [2, Commodore64.SPACE], [1, Commodore64.BOTTOM_LEFT_S], [2, Commodore64.HORIZ_S], [1, Commodore64.BOTTOM_RIGHT_S], [2, Commodore64.SPACE], [1, Commodore64.BOTTOM_LEFT_S], [4, Commodore64.HORIZ_S], [1, Commodore64.BOTTOM_RIGHT_S], [2, Commodore64.SPACE], [1, Commodore64.BOTTOM_LEFT_S], [6, Commodore64.HORIZ_S], [1, Commodore64.BOTTOM_RIGHT_S], [2, Commodore64.SPACE], [1, Commodore64.BOTTOM_LEFT_S], [4, Commodore64.HORIZ_S], [1, Commodore64.BOTTOM_RIGHT_S], [2, Commodore64.SPACE], [1, Commodore64.BOTTOM_LEFT_S], [1, Commodore64.BOTTOM_RIGHT_S], [2, Commodore64.SPACE], [1, Commodore64.VERT_S]];
        this.generateRow('row13', elements);
        frameRow = document.getElementById('row14');
        frameRow.innerHTML = String.fromCharCode(Commodore64.VERT_S)
            + '&nbsp</td>'
            + '<td width = "10%"></td>'
            + '<td width = "80%"><img id = "pacman" src = "resources/pm.png" style = "margin-left : 50px"></img></td>'
            + '<td>&nbsp</td>'
            + String.fromCharCode(Commodore64.VERT_S);
        elements = [[1, Commodore64.VERT_S]];
        this.generateRow('row15', elements);
        elements = [[1, Commodore64.VERT_S]];
        this.generateRow('row16', elements);
        elements = [[1, Commodore64.VERT_S]];
        this.generateRow('row17', elements);
        elements = [[1, Commodore64.VERT_S]];
        this.generateRow('row18', elements);
        elements = [[1, Commodore64.VERT_S]];
        this.generateRow('row19', elements);
        elements = [[1, Commodore64.VERT_S]];
        this.generateRow('row20', elements);
        var bottomRow = document.getElementById('row21');
        bottomRow.textContent = this.createLongFrame(Commodore64.BOTTOM_LEFT_S, Commodore64.BOTTOM_RIGHT_S);
    };
    Commodore64.prototype.generateRow = function (id, elements) {
        var frameRow = document.getElementById(id);
        var row = [];
        elements.forEach(function (_a) {
            var count = _a[0], charCode = _a[1];
            return row.push(String.fromCharCode(charCode).repeat(count));
        });
        frameRow.textContent = row.join('');
    };
    Commodore64.prototype.createLongFrame = function (endSign1, endSign2) {
        var topLeft = [endSign1];
        var longHorizLine = this.createLongHorizLine();
        var chars = __spreadArray(__spreadArray([], topLeft, true), longHorizLine, true);
        chars.push(endSign2);
        var text = "";
        chars.forEach(function (c) { return text += String.fromCharCode(c); });
        return text;
    };
    Commodore64.prototype.createLongHorizLine = function () {
        var longHorizLine = [];
        for (var i = 1; i < 39; i++) {
            longHorizLine.push(Commodore64.HORIZ_S);
        }
        return longHorizLine;
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
    Commodore64.SPACE = 160;
    Commodore64.LOWER_HALF_BLOCK = 0x2585;
    Commodore64.BLOCK = 0xdb;
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
