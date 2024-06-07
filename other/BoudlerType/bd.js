var Display = /** @class */ (function () {
    function Display() {
        this.board = new Array(40).fill(null).map(function () { return new Array(25).fill(null); });
    }
    Display.prototype.showBoard = function (x, y) {
        var table = document.getElementById('board');
        var tbody = document.createElement('tbody');
        for (var i = 0; i < 15; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < 15; j++) {
                var cell = document.createElement('td');
                cell.textContent = this.board[x + i - 7][y + j - 7] || "&nbsp";
                cell.className = 'thin';
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        table.style.width = '100px';
        table.style.height = '100px';
        table.style.margin = '0 auto';
        table.style.textAlign = 'center';
        document.body.appendChild(table);
    };
    return Display;
}());
var display = new Display();
display.showBoard(15, 15);
