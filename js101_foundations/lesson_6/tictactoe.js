const readline = require('readline-sync');
const MSG = require('./ttt.json');
const WINNING_COUNT = 3;
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

function prompt(message) {
  console.log(`=> ${message}`);
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function displayWelcome() {
  console.clear();
  prompt(MSG["welcome"]);
}

function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square ${joinOr(emptySquares(board))}:`);
    square = readline.question().trim();

    if (emptySquares(board).includes(square)) break;

    prompt(MSG["invalid_choice"]);
  }

  board[square] = HUMAN_MARKER;
}

function findWinningSquare(board) {
  let square;
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = findAtRiskSquare(line, board, COMPUTER_MARKER);
    if (square) break;
  }
  return square;
}

function findDefensiveSquare(board) {
  let square;
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = findAtRiskSquare(line, board, HUMAN_MARKER);
    if (square) break;
  }
  return square;
}

function findRandomSquare(board) {
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  return emptySquares(board)[randomIndex];
}

function computerChoosesSquare(board) {
  let square;

  if (board[5] === INITIAL_MARKER) {
    square = 5;
  }

  if (!square) {
    square = findWinningSquare(board) || findDefensiveSquare(board)
    || findRandomSquare(board);
  }

  board[square] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function findAtRiskSquare(line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];

    if (board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER) {
      return "Player";
    } else if (board[sq1] === COMPUTER_MARKER &&
               board[sq2] === COMPUTER_MARKER &&
               board[sq3] === COMPUTER_MARKER) {
      return "Computer";
    }
  }

  return null;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function updateScore(score, winner) {
  if (winner === "Player") {
    score["player"] += 1;
  } else {
    score["computer"] += 1;
  }
}

function displayScore(score) {
  let playerScore = score.player;
  let computerScore = score.computer;

  if (playerScore > computerScore) {
    prompt(`Player is winning ${playerScore}:${computerScore}.`);
  } else if (computerScore > playerScore) {
    prompt(`Computer is winning ${computerScore}:${playerScore}.`);
  } else {
    prompt(`The score is ${playerScore}:${computerScore}.`);
  }
}

function displayWinner(score) {
  let playerScore = score.player;
  let computerScore = score.computer;

  if (playerScore === WINNING_COUNT) {
    prompt(`Player won ${playerScore}:${computerScore}. Congratulations!`);
  } else {
    prompt(`Computer won ${computerScore}:${playerScore}.`);
  }
}

function displayTie() {
  prompt(MSG["tie"]);
}

function asktoContinue() {
  prompt(MSG["next"]);
  readline.question();
}

function gameOver(score) {
  return (score.player >= WINNING_COUNT || score.computer >= WINNING_COUNT);
}

function playAgain() {
  prompt(MSG["play_again"]);
  let answer = readline.question().toLowerCase();

  while (!['y', 'yes', 'n', 'no'].includes(answer)) {
    prompt(MSG["valid_answer"]);
    answer = readline.question().toLowerCase();
  }

  return answer;
}

function isNo(again) {
  return ['n','no'].includes(again);
}

function joinOr(arr, delimiter = ', ', word = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return `${arr[0]}`;
    case 2:
      return arr.join(` ${word} `);
    default:
      return arr.slice(0, arr.length - 1).join(delimiter) +
      `${delimiter}${word} ${arr[arr.length - 1]}`;
  }
}

function chooseSquare(board, currentPlayer) {
  if (['p', 'player'].includes(currentPlayer)) {
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
}

function alternatePlayer(currentPlayer) {
  return ['p', 'player'].includes(currentPlayer) ? "computer" : "player";
}

function validateFirstPlayer(answer) {
  while (!["p", "player", "c", "computer"].includes(answer)) {
    prompt(MSG["valid_answer"]);
    answer = readline.question().toLowerCase();
  }
  return answer;
}

function determineFirstTurn() {
  prompt(MSG["first_move"]);
  let answer = readline.question().toLowerCase();
  answer = validateFirstPlayer(answer);
  return answer;
}

function playRound(board, currentPlayer) {
  while (true) {
    displayBoard(board);
    chooseSquare(board, currentPlayer);
    currentPlayer = alternatePlayer(currentPlayer);
    if (someoneWon(board) || boardFull(board)) break;
  }
  displayBoard(board);
}

function goodbye() {
  prompt(MSG["goodbye"]);
}

displayWelcome();

while (true) {
  let score = {player: 0, computer: 0};
  let currentPlayer = determineFirstTurn();

  while (true) {
    let board = initializeBoard();
    playRound(board, currentPlayer);

    if (someoneWon(board)) {
      let winner = detectWinner(board);
      prompt(`${winner} won!`);
      updateScore(score, winner);
    } else {
      displayTie();
    }

    if (gameOver(score)) {
      displayWinner(score);
      break;
    }

    displayScore(score);
    asktoContinue();
  }

  let again = playAgain();
  if (isNo(again)) break;
}

goodbye();