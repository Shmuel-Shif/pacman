"use strict";

const GHOST = "&#9781";
var gGhosts;
var gGhostColors = [];
var gDeadGhosts = [];

var gGhostsInterval;

function createGhosts(board) {
  gGhosts = [];
  // TODO: Create 3 ghosts and an interval
  for (var i = 0; i < 3; i++) {
    createGhost(board);
  }
  clearInterval(gGhostsInterval);
  gGhostsInterval = setInterval(moveGhosts, 1500);
}

function createGhost(board) {
  // TODO: Create a ghost with arbitrary start pos & currCellContent
  const ghost = {
    location: { i: 3, j: 3 },
    currCellContent: FOOD,
    color: getRandomColor(),
  };

  // TODO: Add the ghost to the ghosts array
  gGhosts.push(ghost);

  // TODO: Update the board
  gBoard[ghost.location.i][ghost.location.j] = GHOST;
}

function moveGhosts() {
  // TODO: loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    moveGhost(gGhosts[i]);
  }
}

function moveGhost(ghost) {
  // TODO: figure out moveDiff, nextLocation, nextCell
  const diff = getMoveDiff();
  const nextLocation = {
    i: ghost.location.i + diff.i,
    j: ghost.location.j + diff.j,
  };
  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  // TODO: return if cannot move
  if (nextCell === WALL || nextCell === GHOST) return;

  // TODO: hitting a pacman? call gameOver
  if (nextCell === PACMAN) {
    if (gPacman.isSuper || !gGame.isOn) return;
    gameOver("Youre Busted");
    return;
  }

  // TODO: moving from current location:
  // TODO: update the model (restore prev cell contents)
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;

  // TODO: update the DOM
  renderCell(ghost.location, ghost.currCellContent);

  // TODO: Move the ghost to new location:
  // TODO: update the model (save cell contents so we can restore later)
  ghost.currCellContent = nextCell;
  ghost.location = nextLocation;

  gBoard[ghost.location.i][ghost.location.j] = GHOST;
  // TODO: update the DOM
  renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
  const randNum = getRandomIntInclusive(1, 4);

  switch (randNum) {
    case 1:
      return { i: 0, j: 1 };
    case 2:
      return { i: 1, j: 0 };
    case 3:
      return { i: 0, j: -1 };
    case 4:
      return { i: -1, j: 0 };
  }
}

function getGhostHTML(ghost) {
  const color = gPacman.isSuper ? "blue" : ghost.color;
  return `<span style= "color:${color}">${GHOST}</span>`;
}

function killGhost(location) {
  for (var i = 0; i < gGhosts.length; i++) {
    if (
      gGhosts[i].location.i === location.i &&
      gGhosts[i].location.j === location.j
    ) {
      gDeadGhosts.push(gGhosts[i]);
      gGhosts.splice(i, 1);
    }
  }
}

function renderGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
  }
}

function restoreGhosts() {
  for (var i = 0; i < gDeadGhosts.length; i++) {
    gGhosts.push(gDeadGhosts[i]);
  }
  gDeadGhosts = [];
  renderGhosts();
}
