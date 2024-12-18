"use strict";

const WALL = "&#8251;";
const FOOD = "🟡";
const EMPTY = " ";
const SUPER_FOOD = "🧆";
const CHERRY = "🍒";

var gFoodCount;
var gCheryInterval;

const gGame = {
  score: 0,
  isOn: false,
};
var gBoard = [];

function init() {
  hideModal();

  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);

  clearInterval(gCheryInterval);
  gCheryInterval = setInterval(addCherry, 15000);

  renderBoard(gBoard, ".board-container");
  gGame.isOn = true;
  gFoodCount = 56;
}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = board[8][1] = board[1][8] = board[8][8] = SUPER_FOOD;
  return board;
}

function updateScore(diff) {
  // TODO: update model and dom
  gGame.score += diff;

  const elScore = document.querySelector(".score span");
  elScore.innerText = gGame.score;
}

function gameOver(msg) {
  console.log("Game Over");
  showModal(msg);
  gGame.isOn = false;
}

function showModal(msg) {
  var elModal = document.querySelector(".modal");
  const elMsg = elModal.querySelector("h2");

  elMsg.innerText = msg;
  elModal.classList.remove("hidden");
  gGame.isOn = false;
}

function hideModal() {
  var elModal = document.querySelector(".modal");
  elModal.classList.add("hidden");
}

function addCherry() {
  var emptyCell = findEmptyPos();
  if (!emptyCell) return;

  gBoard[emptyCell.i][emptyCell.j] = CHERRY;
  renderCell(emptyCell, CHERRY);
}
