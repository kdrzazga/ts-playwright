var FieldContent;
(function (FieldContent) {
    FieldContent[FieldContent["X"] = 0] = "X";
    FieldContent[FieldContent["O"] = 1] = "O";
    FieldContent[FieldContent["none"] = 2] = "none";
})(FieldContent || (FieldContent = {}));
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.fieldContentToString = function (fc) {
        var _a;
        var map = (_a = {},
            _a[FieldContent.X] = 'X',
            _a[FieldContent.O] = 'O',
            _a[FieldContent.none] = 'none',
            _a);
        if (!(fc in map)) {
            throw new Error('Invalid FieldContent');
        }
        return map[fc];
    };
    return Helper;
}());
var Field = /** @class */ (function () {
    function Field() {
        this.content = FieldContent.none;
    }
    return Field;
}());
var TicTacToeTurn = /** @class */ (function () {
    function TicTacToeTurn() {
        this.current = FieldContent.X;
    }
    TicTacToeTurn.prototype.next = function () {
        if (this.current === FieldContent.O) {
            this.current = FieldContent.X;
        }
        else {
            this.current = FieldContent.O;
        }
        return this.current;
    };
    return TicTacToeTurn;
}());
var Board = /** @class */ (function () {
    function Board() {
        this.fields = new Array(Board.SIZE_X)
            .fill(null)
            .map(function () { return new Array(Board.SIZE_Y).fill(new Field()); });
    }
    Board.prototype.getFieldContent = function (x, y) {
        if (x < 0 || x >= Board.SIZE_X || y < 0 || y >= Board.SIZE_Y) {
            console.error("Error: Wrong coordinates provided.");
            return FieldContent.none;
        }
        return this.fields[x][y].content;
    };
    Board.prototype.setFieldContent = function (x, y, content) {
        if (x < 0 || x >= Board.SIZE_X || y < 0 || y >= Board.SIZE_Y) {
            console.error("Error: Wrong coordinates provided.");
        }
        else {
            this.fields[x][y].content = content;
        }
    };
    Board.SIZE_X = 3;
    Board.SIZE_Y = 3;
    return Board;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.turn = new TicTacToeTurn();
        this.board = new Board();
    }
    Game.prototype.click = function (x, y) {
        var currentPlayer = this.turn.next();
        this.board.setFieldContent(x, y, currentPlayer);
    };
    return Game;
}());
var game = new Game();
game.click(0, 0);
game.click(1, 1);
game.click(2, 2);
console.log(Helper.fieldContentToString(game.board.getFieldContent(0, 0)));
console.log(Helper.fieldContentToString(game.board.getFieldContent(1, 1)));
console.log(Helper.fieldContentToString(game.board.getFieldContent(2, 2)));
console.log(Helper.fieldContentToString(game.board.getFieldContent(0, 1)));
