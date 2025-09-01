//your JS code here. If required.
const submitBtn = document.getElementById("Start Game");
const gameDiv = document.getElementById("game");
const formDiv = document.getElementById("player-form");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player-1 = "";
let player-2 = "";
let currentPlayer = "";
let currentSymbol = "X";
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
  player1 = document.getElementById("player-1").value || "Player 1";
  player2 = document.getElementById("player-2").value || "Player 2";
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
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      return;
    }

    // Switch player
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "O";
    } else {
      currentPlayer = player1;
      currentSymbol = "X";
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
