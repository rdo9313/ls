// Rock Paper Scissors
const readline = require('readline-sync');
const MSG = require('./rps.json');
const WINNING_COMBOS = {
                  rock:  ['scissors', 'lizard'],
                  paper: ['rock', 'spock'],
                  scissors: ['lizard', 'paper'],
                  spock: ['scissors', 'rock'],
                  lizard: ['spock', 'paper']
                  };
const VALID_CHOICES = Object.keys(WINNING_COMBOS);

function prompt(message) {
  console.log(`=> ${message}`);
}

function askToContinue() {
  prompt(MSG["next"]);
  readline.question();
}

function greeting() {
  prompt(MSG["welcome"]);
  askToContinue();
}

function getPlayerChoice() {
  prompt(MSG["choice"]);
  return readline.question().toLowerCase();
}

function convertAcronymToFull(choice) {
  switch (choice) {
    case 'r':
      return 'rock';
    case 'p':
      return 'paper';
    case 's':
      return 'scissors';
    case 'l':
      return 'lizard';
    case 'sp':
      return 'spock';
    default:
      return choice;
  }
}

function isInvalidChoice(choice) {
  return !VALID_CHOICES.includes(choice);
}

function getValidChoice(choice) {
  choice = convertAcronymToFull(choice);
  while (isInvalidChoice(choice)) {
    prompt(MSG["valid_choice"]);
    choice = convertAcronymToFull(readline.question().toLowerCase());
  }
  return choice;
}

function getWinner(choice, computerChoice) {
  let winner;
  if (WINNING_COMBOS[choice].includes(computerChoice)) {
    winner = 'player';
  } else if (WINNING_COMBOS[computerChoice].includes(choice)) {
    winner = 'computer';
  } else {
    winner = 'tie';
  }
  return winner;
}

function displayWinner(winner) {
  if (winner === "player") {
    prompt("You win!");
  } else if (winner === "computer") {
    prompt("Computer wins!");
  } else {
    prompt("It's a tie!");
  }
}

function isInvalidPlayerAnswer(input) {
  return !['y','yes','n','no'].includes(input);
}

function playAgain() {
  prompt(MSG["again"]);
  return readline.question().toLowerCase();
}

function askPlayAgain(again) {
  while (isInvalidPlayerAnswer(again)) {
    prompt(MSG["valid_again"]);
    again = readline.question().toLowerCase();
  }
  return again;
}

function displayChoices(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);
}

function isNo(again) {
  return ['n','no'].includes(again);
}

function displayScore(score) {
  let playerScore = score["player"];
  let computerScore = score["computer"];

  if (playerScore > computerScore) {
    prompt(`You are winning ${playerScore}:${computerScore}`);
  } else if (playerScore < computerScore) {
    prompt(`You are losing ${playerScore}:${computerScore}`);
  } else {
    prompt(`You are tied ${playerScore}:${computerScore}`);
  }
}

function updateScore(winner, score) {
  score[winner] += 1;
}

function gameOver(score) {
  return score["player"] > 4 || score["computer"] > 4;
}

function displayFinalScore(score) {
  let playerScore = score["player"];
  let computerScore = score["computer"];

  if (playerScore > computerScore) {
    prompt(`Congratulations in beating the computer ${playerScore}:${computerScore}!`);
  } else {
    prompt(`You lost ${playerScore}:${computerScore}.`);
  }
}

function goodbye() {
  prompt(MSG["goodbye"]);
}

greeting();

while (true) {
  const score = {player: 0, computer: 0};

  while (!gameOver(score)) {
    console.clear();

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    let choice = getPlayerChoice();
    choice = getValidChoice(choice);

    displayChoices(choice, computerChoice);

    let winner = getWinner(choice, computerChoice);
    displayWinner(winner);
    updateScore(winner, score);

    if (!gameOver(score)) {
      displayScore(score);
      askToContinue();
    }
  }

  displayFinalScore(score);

  let again = playAgain();
  again = askPlayAgain(again);

  if (isNo(again)) break;
}

goodbye();