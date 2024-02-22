let board = new GameBoard();
let boardElement = board.createDiv();

let mainElement = document.querySelector("main");
mainElement.appendChild(boardElement);

let newGameButton = document.querySelector(".modal > button");
newGameButton.addEventListener("click", () => {
  // Reset board
  let newBoard = new GameBoard();
  let newBoardElement = newBoard.createDiv();
  mainElement.replaceChildren(newBoardElement);

  // Hide modal
  let modal = document.querySelector("#newGameModal");
  modal.style["display"] = "none";
  requestAnimationFrame(() => {
    modal.style.opacity = 0; // Fade out
  });
});
