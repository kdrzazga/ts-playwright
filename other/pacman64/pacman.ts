const BOARD_WIDTH = 16;
const BOARD_HEIGHT = 12;

enum TileType {
  WALL,
  WALL2,
  WALL3,
  WALL4,
  PATH
}

class Tile {
  type: TileType;
  filePath : string;
  hasPill: boolean;

  constructor(type: TileType, hasPill: boolean) {
	this.type = type;
	if (type == TileType.WALL){
		this.filePath = 'resources/wall.png';
	}
	else if (type == TileType.PATH){
		this.filePath = 'resources/path.png';
	}
	else if (type == TileType.WALL2){
		this.filePath = 'resources/wall2.png';
	}
	else if (type == TileType.WALL3){
		this.filePath = 'resources/wall3.png';
	}
	else this.filePath = 'resources/wall4.png';

    this.hasPill = hasPill;
  }
}

class Pacman{
	x: number;
	y: number;
	direction: string;
	
	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
		this.direction = 'L';
	}
	
	draw(){
		//TODO
	}
}

class Game {
	pacman: Pacman;
	board: Board;
	
	constructor(){
		this.pacman = new Pacman(8, 7);
		this.board = new Board();
	}

	start(){
		this.board.generate();
		this.board.draw();
		this.pacman.draw();
	}
}

class Board{

	boardString: string;
	fields: Tile[][];

	constructor(){	
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
	
	generate() {
		this.fields = [];
		var index = 0;
		for (let i = 0; i < BOARD_HEIGHT; i++) {
			this.fields[i] = [];
			for (let j = 0; j < BOARD_WIDTH; j++) {
				const char = this.boardString[index];
				if (char == 'w') {
					this.fields[i].push(new Tile(TileType.WALL, false));
				} else if (char == 'v') {
					this.fields[i].push(new Tile(TileType.WALL2, false));
				} else if (char == 'u') {
					this.fields[i].push(new Tile(TileType.WALL3, false));
				} else if (char == 'x') {
					this.fields[i].push(new Tile(TileType.WALL4, false));
				} else if (char == 'p') {
					this.fields[i].push(new Tile(TileType.PATH, true));
				}
				
				index++;
			}
		}
	}
	
	draw(){
		let html = '<table style="border-spacing: 0px;">';
		for (let i = 0; i < BOARD_HEIGHT; i++) {
			html += '<tr>';
			for (let j = 0; j < BOARD_WIDTH; j++) {
				html += '<td x="' + String(j) + '" y = "' + String(i) + '">';
				html += '<img src=\'' + this.fields[i][j].filePath + '\'></img>';
				html += '</td>';
			}
			html += '</tr>';
		}
		html += '</table>';
		let boardDiv = document.getElementById('board');
		boardDiv.innerHTML = html;
	}
}

let game = new Game();
game.start();
