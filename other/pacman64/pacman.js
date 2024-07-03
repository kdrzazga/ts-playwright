var BOARD_WIDTH = 16;
var BOARD_HEIGHT = 4;
var TileType;
(function (TileType) {
    TileType[TileType["WALL"] = 0] = "WALL";
    TileType[TileType["PATH"] = 1] = "PATH";
})(TileType || (TileType = {}));
var Tile = /** @class */ (function () {
    function Tile(type, hasPill) {
        this.type = type;
        if (type == TileType.WALL) {
            this.filePath = 'resources/wall.png';
        }
        else if (type == TileType.PATH) {
            this.filePath = 'resources/path.png';
        }
        else
            this.filePath = '';
        this.hasPill = hasPill;
    }
    return Tile;
}());
function generateBoard(boardString) {
    var board = [];
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        board[i] = [];
        for (var j = 0; j < BOARD_WIDTH; j++) {
            var char = boardString[i * 2 + j];
            if (char == 'w') {
                board[i].push(new Tile(TileType.WALL, false));
            }
            else if (char == 'p') {
                board[i].push(new Tile(TileType.PATH, true));
            }
        }
    }
    return board;
}
function drawBoard(board) {
    var html = '<table>';
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        html += '<tr>';
        for (var j = 0; j < BOARD_WIDTH; j++) {
            html += '<td>';
            html += '<img src=\'' + board[i][j].filePath + '\'></img>';
            html += '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    var boardDiv = document.getElementById('board');
    boardDiv.innerHTML = html;
}
var boardString = "wwwwwwwwwwwwwwww" +
    "wpppwpppppwpppww" +
    "wpwpwpwpwpwpwpww" +
    "wpppwpppppwpppww" +
    "";
var board = generateBoard(boardString);
drawBoard(board);
console.log(board);
