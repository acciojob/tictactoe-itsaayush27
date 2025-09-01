const submitBtn = document.getElementById("submit");
const gameDiv = document.getElementById("game");
const formDiv = document.getElementById("player-form");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x"; // lowercase for Cypress
let gameActive = true;

const winPatterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value || "Player1";
  player2 = document.getElementById("player2").value || "Player2";
  currentPlayer = player1;

  formDiv.style.display = "none";
  gameDiv.style.display = "block";
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentSymbol;
    cell.classList.add("taken");

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`; // matches Cypress
      gameActive = false;
      return;
    }

    // Switch player
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "o";
    } else {
      currentPlayer = player1;
      currentSymbol = "x";
    }

    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const cellA = document.getElementById(a).textContent;
    const cellB = document.getElementById(b).textContent;
    const cellC = document.getElementById(c).textContent;

    if (cellA && cellA === cellB && cellA === cellC) {
      document.getElementById(a).classList.add("winner");
      document.getElementById(b).classList.add("winner");
      document.getElementById(c).classList.add("winner");
      return true;
    }
  }
  return false;
}
