let board = new GameBoard();

let mainElement = document.querySelector("main");
mainElement.appendChild(board.createDiv());

let newGameButton = document.querySelector(".modal > button");
newGameButton.addEventListener("click", () => {
  console.log("New game!");
});
