const readline = require('readline-sync');

const WINNING_COUNT = 3;
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';

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

    prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);

  let square = emptySquares(board)[randomIndex];
  board[square] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  let winningLines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  for (let line = 0; line < winningLines.length; line++) {
    let [sq1, sq2, sq3] = winningLines[line];

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

function updateScore(board, score) {
  if (detectWinner(board) === "Player") {
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
    prompt(`Computer won ${computerScore}:${playerScore}. Try again!`);
  }
}

function asktoContinue() {
  prompt("Please press enter to continue:");
  readline.question();
}

function gameOver(score) {
  return (score.player >= WINNING_COUNT || score.computer >= WINNING_COUNT);
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

while (true) {
  let score = {player: 0, computer: 0};

  while (true) {
    let board = initializeBoard();
    while (true) {
      displayBoard(board);

      playerChoosesSquare(board);
      if (someoneWon(board) || boardFull(board)) break;

      computerChoosesSquare(board);
      if (someoneWon(board) || boardFull(board)) break;
    }

    displayBoard(board);

    if (someoneWon(board)) {
      prompt(`${detectWinner(board)} won!`);
      updateScore(board, score);
    } else {
      prompt("It's a tie!");
    }

    if (gameOver(score)) {
      displayWinner(score);
      break;
    }

    displayScore(score);
    asktoContinue();
  }

  prompt("Play again? (y or n)");
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y') break;
}

prompt("Thanks for playing Tic Tac Toe!");