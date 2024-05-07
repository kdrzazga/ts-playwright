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

class Grapher {

	static CELL_SIZE = 50;

	private drawGrid(ctx: CanvasRenderingContext2D, board){
		let coeff = 1 - 0.15;
		let coeffY = 1 + 0.15;
		
		for (let x = 1; x < Board.SIZE_X; x++){
			ctx.beginPath();
			ctx.moveTo(coeff * x * Grapher.CELL_SIZE, 0);
			ctx.lineTo(coeff * x * Grapher.CELL_SIZE, Grapher.CELL_SIZE * Board.SIZE_Y);
			ctx.stroke(); // Stroke the path to actually draw the line
		}
		
		for (let y = 1; y < Board.SIZE_Y; y++){
			ctx.beginPath();
			ctx.moveTo(0, coeffY * y * Grapher.CELL_SIZE);
			ctx.lineTo(Grapher.CELL_SIZE * Board.SIZE_X, coeffY * y * Grapher.CELL_SIZE);
			ctx.stroke(); // Stroke the path to actually draw the line
		}
	}

    public draw(board: Board) {			
        let canvas = document.getElementById("tttCanvas") as HTMLCanvasElement;
        let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Cursive';
		

        for (let x = 0; x < Board.SIZE_X; x++) {
            for (let y = 0; y < Board.SIZE_Y; y++) {
                let content = board.getFieldContent(x, y);
                if (content !== FieldContent.none) {
                    ctx.fillText(Helper.fieldContentToString(content), x * Grapher.CELL_SIZE, y * Grapher.CELL_SIZE); // Adjust position as needed
                }
            }
        }
		this.drawGrid(ctx, board);
    }
}

class Game {
    private turn: TicTacToeTurn;
    public board: Board;
    public grapher: Grapher;

    constructor() {
        this.turn = new TicTacToeTurn();
        this.board = new Board();
        this.grapher = new Grapher();
    }

    click(x: number, y: number) {
        const currentPlayer = this.turn.next();
        this.board.setFieldContent(x, y, currentPlayer);
        this.grapher.draw(this.board);
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

export Field;
