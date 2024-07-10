const BOARD_WIDTH = 16;
const BOARD_HEIGHT = 12;

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
  var index = 0;
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
      const char = boardString[index];
      if (char == 'w') {
        board[i].push(new Tile(TileType.WALL, false));
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
"wpwpwpwpwpwpwpww" + //3
"wpppppppwpppwppw" + //4
"wwpwpwpwwwpwwwpw" + //5
"wppppwppwppppppw" + //6
"wpwpwwwpwpwwwpww" + //7
"wppppwpppppppppw" + //8
"wpwwpppwpwpwwwpw" + //9
"wppwpwpwpwppwppw" + //10
"wwpppwpppwwpppww" + //11
"wwwwwwwwwwwwwwww" + //12
"";
const board = generateBoard(boardString);
drawBoard(board);

console.log(board);
