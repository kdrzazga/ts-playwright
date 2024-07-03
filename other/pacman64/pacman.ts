const BOARD_WIDTH = 16;
const BOARD_HEIGHT = 4;

enum TileType {
  WALL,
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
	else this.filePath = '';
	
    this.hasPill = hasPill;
  }
}

function generateBoard(boardString: string): Tile[][] {
  const board: Tile[][] = [];

  for (let i = 0; i < BOARD_HEIGHT; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
      const char = boardString[i * 2 + j];
      if (char == 'w') {
        board[i].push(new Tile(TileType.WALL, false));
      } else if (char == 'p') {
        board[i].push(new Tile(TileType.PATH, true));
      }
    }
  }

  return board;
}

function drawBoard(board){
	 let html = '<table>';
	 for (let i = 0; i < BOARD_HEIGHT; i++) {
		html += '<tr>';
		for (let j = 0; j < BOARD_WIDTH; j++) {
			html += '<td>';
			html += '<img src=\'' + board[i][j].filePath + '\'></img>';
			html += '</td>';
		}
		html += '</tr>';
	 }
	 html += '</table>';
	 let boardDiv = document.getElementById('board');
	 boardDiv.innerHTML = html;
}

const boardString = 
"wwwwwwwwwwwwwwww" +
"wpppwpppppwpppww" +
"wpwpwpwpwpwpwpww" +
"wpppwpppppwpppww" +
"";
const board = generateBoard(boardString);
drawBoard(board);

console.log(board);
