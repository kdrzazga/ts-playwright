var BOARD_WIDTH = 16;
var BOARD_HEIGHT = 12;
var Pacman = /** @class */ (function () {
    function Pacman(x, y) {
        this.x = x;
        this.y = y;
        this.direction = 'L';
    }
    return Pacman;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.pacman = new Pacman(8, 7);
        this.board = new Board();
    }
    Game.prototype.start = function () {
        this.board.generate();
        this.board.draw();
    };
    return Game;
}());
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
var Board = /** @class */ (function () {
    function Board() {
        this.boardString =
            "wwwwwwwwwwwwwwww" + //1
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
    }
    Board.prototype.generate = function () {
        this.fields = [];
        var index = 0;
        for (var i = 0; i < BOARD_HEIGHT; i++) {
            this.fields[i] = [];
            for (var j = 0; j < BOARD_WIDTH; j++) {
                var char = this.boardString[index];
                if (char == 'w') {
                    this.fields[i].push(new Tile(TileType.WALL, false));
                }
                else if (char == 'v') {
                    this.fields[i].push(new Tile(TileType.WALL2, false));
                }
                else if (char == 'u') {
                    this.fields[i].push(new Tile(TileType.WALL3, false));
                }
                else if (char == 'x') {
                    this.fields[i].push(new Tile(TileType.WALL4, false));
                }
                else if (char == 'p') {
                    this.fields[i].push(new Tile(TileType.PATH, true));
                }
                index++;
            }
        }
    };
    Board.prototype.draw = function () {
        var html = '<table style="border-spacing: 0px;">';
        for (var i = 0; i < BOARD_HEIGHT; i++) {
            html += '<tr>';
            for (var j = 0; j < BOARD_WIDTH; j++) {
                html += '<td>';
                html += '<img src=\'' + this.fields[i][j].filePath + '\'></img>';
                html += '</td>';
            }
            html += '</tr>';
        }
        html += '</table>';
        var boardDiv = document.getElementById('board');
        boardDiv.innerHTML = html;
    };
    return Board;
}());
var game = new Game();
game.start();
