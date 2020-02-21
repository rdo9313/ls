// Rock Paper Scissors
const readline = require('readline-sync');
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

function nextStep() {
  prompt("Please enter any key to continue:");
  readline.question();
}

function greeting() {
  prompt("Welcome to Rock Paper Scissors Lizard Spock.");
  nextStep();
}

function getChoice() {
  prompt('Choose one: (r)ock, (p)aper, (s)cissors, (l)izard, (sp)ock');
  return readline.question().toLowerCase();
}

function convert(choice) {
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
  choice = convert(choice);
  while (isInvalidChoice(choice)) {
    prompt("Please enter a valid choice:");
    choice = convert(readline.question().toLowerCase());
  }
  return choice;
}

function getWinner(choice, computerChoice) {
  let winner;
  if (WINNING_COMBOS[choice].includes(computerChoice)) {
    prompt("You win!");
    winner = 'player';
  } else if (WINNING_COMBOS[computerChoice].includes(choice)) {
    prompt("Computer wins!");
    winner = 'computer';
  } else {
    prompt("It's a tie!");
    winner = 'tie';
  }
  return winner;
}

function isInvalidInput(input) {
  return !['y','yes','n','no'].includes(input);
}

function getAgain() {
  prompt("Do you want to play again (y/n)?");
  return readline.question().toLowerCase();
}

function getValidAgain(again) {
  while (isInvalidInput(again)) {
    prompt("Please enter 'y' or 'n':");
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
  return score["player"] > 2 || score["computer"] > 2;
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
  prompt("Thanks for playing RPSLS. See you again!");
}

greeting();

while (true) {
  const score = {player: 0, computer: 0};

  while (!gameOver(score)) {
    console.clear();

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    let choice = getChoice();
    choice = getValidChoice(choice);

    displayChoices(choice, computerChoice);

    let winner = getWinner(choice, computerChoice);
    updateScore(winner, score);

    if (!gameOver(score)) {
      displayScore(score);
      nextStep();
    }
  }

  displayFinalScore(score);

  let again = getAgain();
  again = getValidAgain(again);

  if (isNo(again)) break;
}

goodbye();