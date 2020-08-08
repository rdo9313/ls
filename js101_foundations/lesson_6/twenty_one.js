const readline = require('readline-sync');
const MSG = require('./twenty_one.json');

const SUITS = ['s', 'c', 'h', 'd'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const WINNING_COUNT = 3;

function initializeDeck() {
  let deck = [];

  SUITS.forEach(suit => {
    VALUES.forEach(value => {
      deck.push([value, suit]);
    });
  });
  shuffle(deck);
  return deck;
}

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function lineBreak() {
  console.log("------------------------------------");
}

function welcome() {
  console.clear();
  prompt("Welcome to Twenty-One. This is a simplified version of the popular game Blackjack.");
  prompt("This is a version without splits, double-downs, and other complext plays.");
  prompt("Please refer to https://www.blackjack.org/blackjack-rules/ for rules of the original game.");
  askToContinue();
}

function shuffle(deck) {
  for (let idx = deck.length - 1; idx > 0; idx--) {
    let otherIdx = Math.floor(Math.random() * (idx + 1));
    [deck[idx], deck[otherIdx]] = [deck[otherIdx], deck[idx]];
  }
}

function getPlayerAction() {
  console.log(" ");
  prompt(MSG["hitOrStay"]);
  return readline.question().toLowerCase();
}

function getValidAction(answer) {
  while (isInvalidAction(answer)) {
    prompt(MSG["invalidAnswer"]);
    answer = readline.question().toLowerCase();
  }
  return answer;
}

function askToContinue() {
  lineBreak();
  prompt(MSG["continue"]);
  readline.question();
}

function dealCards(deck, player, dealer) {
  for (let count = 0; count < 2; count++) {
    player.push(deck.pop());
    dealer.push(deck.pop());
  }
}

function dealCard(deck, player) {
  console.clear();
  player.push(deck.pop());
}

function total(cards) {
  let values = cards.map(card => card[0]);
  let sum = 0;

  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  values.filter(value => value === "A").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function displayCards(player) {
  return player.map(card => card.join("")).join(" ");
}

function displayTotals(player, dealer, playerTurn = true) {
  console.clear();
  prompt(`Player: ${displayCards(player)}  |  Total: ${total(player)}`);
  lineBreak();
  if (playerTurn) {
    prompt(`Dealer: ${dealer[0].join('')} ?   |  Total: ?`);
  } else {
    prompt(`Dealer: ${displayCards(dealer)}  |  Total: ${total(dealer)}.`);
    askToContinue();
  }
}

function displayDealtCard(player, playerTurn = true) {
  if (playerTurn) {
    prompt(MSG["playerHits"]);
    prompt(`You draw a ${player[player.length - 1].join("")}.`);
  } else {
    prompt(MSG["dealerHits"]);
    prompt(`Dealer draws a ${player[player.length - 1].join("")}.`);
  }
  askToContinue();
}

function bust(player) {
  return total(player) > 21;
}

function isInvalidAnswer(input) {
  return !['y', 'yes', 'n', 'no'].includes(input);
}

function playerStays(answer) {
  return ['s', 'stay'].includes(answer);
}

function displayStay() {
  console.clear();
  prompt(MSG["playerStays"]);
  askToContinue();
}

function displayResults(player, dealer) {
  console.clear();
  let playerTotal = total(player);
  let dealerTotal = total(dealer);

  if (bust(player)) {
    prompt(MSG["playerBusts"]);
  } else if (bust(dealer)) {
    prompt(MSG["dealerBusts"]);
  } else if (playerTotal > dealerTotal) {
    prompt(`You win ${playerTotal}:${dealerTotal}!`);
  } else if (dealerTotal > playerTotal) {
    prompt(`Dealer wins ${dealerTotal}:${playerTotal}!`);
  } else {
    prompt("It's a tie!");
  }
}

function playTurnAfterHit(deck, player, dealer, playerTurn = true) {
  if (playerTurn) {
    dealCard(deck, player);
    displayDealtCard(player);
    displayTotals(player, dealer);
  } else {
    dealCard(deck, dealer);
    displayDealtCard(dealer, false);
    displayTotals(player, dealer, false);
  }
}

function displayTurnResults(score, player, dealer) {
  displayResults(player, dealer);
  updateScore(score, player, dealer);
  displayScore(score);
}

function playAgain() {
  console.clear();
  prompt(MSG["playAgain"]);
  return readline.question().toLowerCase();
}

function askPlayAgain(again) {
  while (isInvalidAnswer(again)) {
    prompt(MSG["invalidAnswer"]);
    again = readline.question().toLowerCase();
  }

  return again;
}

function isInvalidAction(answer) {
  return !['hit', 'h', 'stay', 's'].includes(answer);
}

function isNo(again) {
  return ['n', 'no'].includes(again);
}

function updateScore(score, player, dealer) {
  if (bust(player)) {
    score.dealer += 1;
  } else if (bust(dealer)) {
    score.player += 1;
  } else if (total(player) > total(dealer)) {
    score.player += 1;
  } else if (total(dealer) > total(player)) {
    score.dealer += 1;
  }
}

function displayScore(score) {
  let playerScore = score.player;
  let dealerScore = score.dealer;

  if (dealerScore === WINNING_COUNT) {
    prompt(`Dealer wins ${dealerScore}:${playerScore}.`);
  } else if (playerScore === WINNING_COUNT) {
    prompt(`Player wins ${playerScore}:${dealerScore}.`);
  } else if (dealerScore > playerScore) {
    prompt(`Dealer is winning ${dealerScore}:${playerScore}.`);
  } else if (playerScore > dealerScore) {
    prompt(`You are winning ${playerScore}:${dealerScore}.`);
  } else {
    prompt(`You are tied ${playerScore}:${dealerScore}.`);
  }
  askToContinue();
}

function gameOver(score) {
  return score.player === WINNING_COUNT || score.dealer === WINNING_COUNT;
}

function goodbye() {
  prompt(MSG["goodbye"]);
}

welcome();

while (true) {
  let score = {player: 0, dealer: 0 };

  while (!gameOver(score)) {
    let deck = initializeDeck();
    let player = [];
    let dealer = [];

    dealCards(deck, player, dealer);
    displayTotals(player, dealer);

    while (true) {
      let answer = getPlayerAction();
      answer = getValidAction(answer);

      if (playerStays(answer)) {
        displayStay();
        displayTotals(player, dealer, false);
        break;
      }

      playTurnAfterHit(deck, player, dealer);
      if (bust(player)) break;
    }

    if (bust(player)) {
      displayTurnResults(score, player, dealer);
    } else {
      while (total(dealer) < 17) {
        playTurnAfterHit(deck, player, dealer, false);
      }

    displayTurnResults(score, player, dealer);
    }
  }
  let again = playAgain();
  again = askPlayAgain(again);

  if (isNo(again)) break;
}

goodbye();