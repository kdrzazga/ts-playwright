const BOARD_WIDTH = 16;
const BOARD_HEIGHT = 12;

enum TileType {
  WALL,
  WALL2,
  WALL3,
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
	else this.filePath = 'resources/wall3.png';
	
    this.hasPill = hasPill;
  }
}

function generateBoard(boardString: string): Tile[][] {
  const board: Tile[][] = [];

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    board[y] = [];
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const char = boardString[y * BOARD_WIDTH + x];
      if (char == 'w') {
        board[y].push(new Tile(TileType.WALL, false));
      } else if (char == 'v') {
        board[y].push(new Tile(TileType.WALL2, false));
	  } else if (char == 'u') {
        board[y].push(new Tile(TileType.WALL3, false));
      } else if (char == 'p') {
        board[y].push(new Tile(TileType.PATH, true));
      }
    }
  }

  return board;
}

function drawBoard(board){
	 let html = '<table>';
	 for (let y = 0; y < BOARD_HEIGHT; y++) {
		html += '<tr>';
		for (let x = 0; x < BOARD_WIDTH; x++) {
			html += '<td>';
			html += '<img src=\'' + board[y][x].filePath + '\'></img>';
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

const board = generateBoard(boardString);
drawBoard(board);

console.log(board);
