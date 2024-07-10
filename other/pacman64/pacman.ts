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

function generateBoard(boardString: string): Tile[][] {
  const board: Tile[][] = [];
  var index = 0;
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
      const char = boardString[index];
      if (char == 'w') {
        board[i].push(new Tile(TileType.WALL, false));
      } else if (char == 'v') {
        board[i].push(new Tile(TileType.WALL2, false));
	  } else if (char == 'u') {
        board[i].push(new Tile(TileType.WALL3, false));
	  } else if (char == 'x') {
        board[i].push(new Tile(TileType.WALL4, false));
      } else if (char == 'p') {
        board[i].push(new Tile(TileType.PATH, true));
      }
	  
	  index++;
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
const board = generateBoard(boardString);
drawBoard(board);

console.log(board);
