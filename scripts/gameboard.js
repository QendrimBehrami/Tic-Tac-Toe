class GameBoard {
  cells;
  currentMark;
  availableMarks = ["X", "O"];
  writeCounter = 0; // To detect draw
  hoverColor = "#555";

  constructor() {
    this.currentMark = 0;
    this.cells = new Array();
    for (let id = 0; id < 9; id++) {
      let newCell = new Cell(id, "").createDiv();

      // Write the current mark if empty and increment to the next mark
      newCell.addEventListener("click", () => {
        // Only write once!
        if (newCell.written) return;
        newCell.style["color"] = "black";

        newCell.textContent = this.availableMarks[this.currentMark];
        newCell.written = true;
        this.writeCounter++;
        this.checkWinner(id);
        this.currentMark = (this.currentMark + 1) % this.availableMarks.length;
      });

      // Display the current mark if cell is hovered and empty
      newCell.addEventListener("mouseover", () => {
        // Only write once!
        if (newCell.written) return;
        newCell.textContent = this.availableMarks[this.currentMark];
        newCell.style["color"] = this.hoverColor;
      });

      // Reset hover if moved out and no write happened
      newCell.addEventListener("mouseout", () => {
        // Only write once!
        if (newCell.written) return;
        newCell.textContent = "";
        newCell.style["color"] = "black";
      });

      this.cells.push(newCell);
    }
  }

  createDiv() {
    let boardElement = document.createElement("div");
    boardElement.classList.add("board");
    boardElement.id = "board";

    this.cells.forEach((cell) => {
      boardElement.appendChild(cell);
    });
    return boardElement;
  }

  checkWinner(id) {
    // Left Diagonal
    if (id == 0 || id == 4 || id == 8) {
      this.checkHelper(0, 4, 8);
    }

    // Right Diagonal
    if (id == 2 || id == 4 || id == 6) {
      this.checkHelper(2, 4, 6);
    }

    // Row
    let row = Math.floor(id / 3) * 3; //Map current ID to first ID of its row
    this.checkHelper(row, row + 1, row + 2);

    // Column
    let column = id % 3;
    this.checkHelper(column, column + 3, column + 6);
  }

  /**
   * Helper function to check ids for win condition
   * @param {H} id1
   * @param {*} id2
   * @param {*} id3
   */
  checkHelper(id1, id2, id3) {
    let text;
    if (
      this.cells[id1].textContent == this.cells[id2].textContent &&
      this.cells[id2].textContent == this.cells[id3].textContent
    ) {
      text = `${this.availableMarks[this.currentMark]} wins !`;
    }

    // Draw
    if (text === undefined && this.writeCounter == 9) {
      text = "It's a draw !";
    }

    if (text) {
      let modal = document.querySelector("#newGameModal");
      let textElement = document.querySelector("#newGameModal > h1");
      textElement.textContent = text;
      modal.style["display"] = "flex";
      requestAnimationFrame(() => {
        modal.style.opacity = 1; // Fade in
      });
    }
  }
}

class Cell {
  value;
  id;
  written;

  constructor(id, value = "", written = false) {
    this.id = id;
    this.value = value;
  }

  createDiv() {
    let cell = document.createElement("div");
    cell.classList.add("board-cell");
    cell.id = this.id;
    cell.textContent = this.value;
    return cell;
  }
}
