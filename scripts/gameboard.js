class GameBoard {
  cells;
  currentMark;
  availableMarks = ["X", "O"];

  constructor() {
    this.currentMark = 0;
    this.cells = new Array();
    for (let id = 0; id < 9; id++) {
      let newCell = new Cell(id, "").createDiv();
      newCell.addEventListener("click", () => {
        // Only write once!
        if (newCell.written) return;
        newCell.style["color"] = "black";

        newCell.textContent = this.availableMarks[this.currentMark];
        this.currentMark = (this.currentMark + 1) % this.availableMarks.length;
        newCell.written = true;
      });

      newCell.addEventListener("mouseover", () => {
        // Only write once!
        if (newCell.written) return;
        newCell.textContent = this.availableMarks[this.currentMark];
        newCell.style["color"] = "#777";
      });

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
