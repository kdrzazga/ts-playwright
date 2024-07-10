var BOARD_WIDTH = 16;
var BOARD_HEIGHT = 12;
var TileType;
(function (TileType) {
    TileType[TileType["WALL"] = 0] = "WALL";
    TileType[TileType["WALL2"] = 1] = "WALL2";
    TileType[TileType["WALL3"] = 2] = "WALL3";
    TileType[TileType["WALL4"] = 3] = "WALL4";
    TileType[TileType["PATH"] = 4] = "PATH";
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
        else if (type == TileType.WALL2) {
            this.filePath = 'resources/wall2.png';
        }
        else if (type == TileType.WALL3) {
            this.filePath = 'resources/wall3.png';
        }
        else
            this.filePath = 'resources/wall4.png';
        this.hasPill = hasPill;
    }
    return Tile;
}());
function generateBoard(boardString) {
    var board = [];
    var index = 0;
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        board[i] = [];
        for (var j = 0; j < BOARD_WIDTH; j++) {
            var char = boardString[index];
            if (char == 'w') {
                board[i].push(new Tile(TileType.WALL, false));
            }
            else if (char == 'v') {
                board[i].push(new Tile(TileType.WALL2, false));
            }
            else if (char == 'u') {
                board[i].push(new Tile(TileType.WALL3, false));
            }
            else if (char == 'x') {
                board[i].push(new Tile(TileType.WALL4, false));
            }
            else if (char == 'p') {
                board[i].push(new Tile(TileType.PATH, true));
            }
            index++;
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
var boardString = "wwwwwwwwwwwwwwww" + //1
    "wpppwpppppwpppww" + //2
    "wpxpwpupvpwpvpww" + //3
    "wpppppppvpppvppw" + //4
    "wwpvpxpvvvpvvvpw" + //5
    "wppppxppvppppppw" + //6
    "wpupxxxpvpxxxpww" + //7
    "wppppxpppppppppw" + //8
    "wpvvpppxpwpuuupw" + //9
    "wppvpwpxpwppuppw" + //10
    "wwpppwpppwwpppww" + //11
    "wwwwwwwwwwwwwwww" + //12
    "";
var board = generateBoard(boardString);
drawBoard(board);
console.log(board);
