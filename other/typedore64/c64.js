var Commodore64 = /** @class */ (function () {
    function Commodore64() {
        this.tableContent = [
            "    **** COMMODORE 64 BASIC V2 ****    ",
            "",
            " 64K RAM SYSTEM  38911 BASIC BYTES FREE ",
        ];
    }
    Commodore64.prototype.generateHtml = function () {
        var html = [];
        html.push("<table id=\"main\" bgcolor=\"#200080\">");
        this.tableContent.forEach(function (line) {
            html.push("<tr><td>" + line + "</td></tr>");
        });
        html.push("</table>");
        return html.join("");
    };
    return Commodore64;
}());
var commodore64 = new Commodore64();
var html = commodore64.generateHtml();
var div = document.getElementById('commodore64');
div.innerHTML = html;
