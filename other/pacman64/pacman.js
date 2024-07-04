var BOARD_WIDTH = 16;
var BOARD_HEIGHT = 12;
var TileType;
(function (TileType) {
    TileType[TileType["WALL"] = 0] = "WALL";
    TileType[TileType["WALL2"] = 1] = "WALL2";
    TileType[TileType["WALL3"] = 2] = "WALL3";
    TileType[TileType["PATH"] = 3] = "PATH";
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
        else
            this.filePath = 'resources/wall3.png';
        this.hasPill = hasPill;
    }
    return Tile;
}());
function generateBoard(boardString) {
    var board = [];
    for (var y = 0; y < BOARD_HEIGHT; y++) {
        board[y] = [];
        for (var x = 0; x < BOARD_WIDTH; x++) {
            var char = boardString[y * BOARD_WIDTH + x];
            if (char == 'w') {
                board[y].push(new Tile(TileType.WALL, false));
            }
            else if (char == 'v') {
                board[y].push(new Tile(TileType.WALL2, false));
            }
            else if (char == 'u') {
                board[y].push(new Tile(TileType.WALL3, false));
            }
            else if (char == 'p') {
                board[y].push(new Tile(TileType.PATH, true));
            }
        }
    }
    return board;
}
function drawBoard(board) {
    var html = '<table>';
    for (var y = 0; y < BOARD_HEIGHT; y++) {
        html += '<tr>';
        for (var x = 0; x < BOARD_WIDTH; x++) {
            html += '<td>';
            html += '<img src=\'' + board[y][x].filePath + '\'></img>';
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
    "wpvpwpupvpwpvpww" +
    "wpppppppvpppvppw" +
    "wwpvpupvvvpvvvpw" +
    "wppppuppvppppppw" +
    "wpupuuupvpvvvpww" +
    "wppppupppppppppw" +
    "wpuupppvpwpuuupw" +
    "wppupwpvpwppuppw" +
    "wwpppwpppwwpppww" +
    "wwwwwwwwwwwwwwww";
var board = generateBoard(boardString);
drawBoard(board);
console.log(board);
