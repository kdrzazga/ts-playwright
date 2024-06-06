class Display {
  private board: string[][] = new Array(40).fill(null).map(() => new Array(25).fill(null));

  showBoard(x: number, y: number) {
    const table = document.getElementById('board');
    const tbody = document.createElement('tbody');

    for (let i = 0; i < 15; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < 15; j++) {
        const cell = document.createElement('td');
        cell.textContent = this.board[x + i - 7][y + j - 7] || "&nbsp";
		cell.className = 'thin';
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    table.style.width = '100px';
    table.style.height = '100px';
    table.style.margin = '0 auto';
    table.style.textAlign = 'center';

    document.body.appendChild(table);
  }
}

let display = new Display();
display.showBoard(15, 15);
