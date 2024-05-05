enum FieldContent {
    X,
    O,
    none,
}

class Helper {
    static fieldContentToString(fc: FieldContent): string {
        const map = {
            [FieldContent.X]: 'X',
            [FieldContent.O]: 'O',
            [FieldContent.none]: 'none',
        };

        if (!(fc in map)) {
            throw new Error('Invalid FieldContent');
        }

        return map[fc];
    }
}

class Field {
    content: FieldContent;

    constructor() {
        this.content = FieldContent.none;
    }
}

class TicTacToeTurn {
    private current: FieldContent;

    constructor() {
        this.current = FieldContent.X;
    }

    next() {
        if (this.current === FieldContent.O) {
            this.current = FieldContent.X;
        } else {
            this.current = FieldContent.O;
        }
        return this.current;
    }
}

class Board {
    private fields: Field[][];
    static SIZE_X = 3;
    static SIZE_Y = 3;

    constructor() {
        this.fields = new Array(Board.SIZE_X)
            .fill(null)
            .map(() => new Array(Board.SIZE_Y).fill(new Field()));
    }

    getFieldContent(x: number, y: number): FieldContent {
        if (x < 0 || x >= Board.SIZE_X || y < 0 || y >= Board.SIZE_Y) {
            console.error("Error: Wrong coordinates provided.");
			return FieldContent.none;
        }
        return this.fields[x][y].content;
    }

    setFieldContent(x: number, y: number, content: FieldContent): void {
        if (x < 0 || x >= Board.SIZE_X || y < 0 || y >= Board.SIZE_Y) {
            console.error("Error: Wrong coordinates provided.");
        } else {
            this.fields[x][y].content = content;
        }
    }
}

class Game {
    private turn: TicTacToeTurn;
    public board: Board;

    constructor() {
        this.turn = new TicTacToeTurn();
        this.board = new Board();
    }

    click(x: number, y: number) {
        const currentPlayer = this.turn.next();
        this.board.setFieldContent(x, y, currentPlayer);
    }
}

const game = new Game();

game.click(0, 0);
game.click(1, 1);
game.click(2, 2);

console.log(Helper.fieldContentToString(game.board.getFieldContent(0, 0)));
console.log(Helper.fieldContentToString(game.board.getFieldContent(1, 1)));
console.log(Helper.fieldContentToString(game.board.getFieldContent(2, 2)));
console.log(Helper.fieldContentToString(game.board.getFieldContent(0, 1)));
