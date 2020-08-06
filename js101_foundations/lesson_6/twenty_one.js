const readline = require('readline-sync');

/*
1) Initialize deck
2) deal cards to player and dealer
3) Player turn: hit or stay
-repeat until bust or stay
4) If player bust, dealer wins
5) Dealer turn: hit or stay
-repeat until total >= 17
6) If dealer busts, player wins.
7) compare cards and declare winner
*/

const SUITS = ['s', 'c', 'h', 'd'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function initializeDeck() {
  let deck = [];

  SUITS.forEach(suit => {
    VALUES.forEach(value => {
      deck.push([value, suit]);
    });
  });
  return deck;
}

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function welcome() {
  console.clear();
  prompt("Welcome to Twenty-One. This is a simplified version of the popular game Blackjack.");
  prompt("This is a version without splits, double-downs, and other complext plays.");
  prompt("Please refer to https://www.blackjack.org/blackjack-rules/ for rules of the original game.");
  prompt(" ");
  askToContinue();
}

function shuffle(deck) {
  for (let idx = deck.length - 1; idx > 0; idx--) {
    let otherIdx = Math.floor(Math.random() * (idx + 1));
    [deck[idx], deck[otherIdx]] = [deck[otherIdx], deck[idx]];
  }
}

function askToContinue() {
  prompt("Press enter to continue:");
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
  prompt(`Player: ${displayCards(player)}. Total: ${total(player)}.`);
  if (playerTurn) {
    prompt(`Dealer: ${dealer[0].join('')} unknown.`);
  } else {
    prompt(`Dealer: ${displayCards(dealer)}. Total: ${total(dealer)}.`);
    askToContinue();
  }
}

function displayDealtCard(player, playerTurn = true) {
  if (playerTurn) {
    prompt(`You draw a ${player[player.length - 1].join("")}.`);
  } else {
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

function playAgain() {
  prompt("Play again? (y or n)");
  return readline.question().toLowerCase();
}

function askPlayAgain(again) {
  while (isInvalidAnswer(again)) {
    prompt("Please input a valid answer:");
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

function goodbye() {
  prompt("Thank you for playing. Goodbye!");
}

welcome();

while (true) {
  let deck = initializeDeck();
  shuffle(deck);
  let player = [];
  let dealer = [];

  dealCards(deck, player, dealer);
  displayTotals(player, dealer);

  while (true) {
    prompt("Would you like to (h)it or (s)tay?");
    let answer = readline.question().toLowerCase();
    while (isInvalidAction(answer)) {
      prompt("Please input a valid answer:");
      answer = readline.question().toLowerCase();
    }

    if (['s', 'stay'].includes(answer)) {
      console.clear();
      prompt("You decided to stay.");
      askToContinue();
      break;
    }

    dealCard(deck, player);
    displayDealtCard(player);
    displayTotals(player, dealer);

    if (bust(player)) break;
  }

  if (!bust(player)) {
    displayTotals(player, dealer, false);

    while (total(dealer) < 17) {
      dealCard(deck, dealer);
      displayDealtCard(dealer, false);
      displayTotals(player, dealer, false);
    }

    console.clear();
    if (bust(dealer)) {
      prompt("Dealer busts. You win!");
    } else if (total(player) > total(dealer)) {
      prompt(`You win ${total(player)}:${total(dealer)}!`);
    } else if (total(dealer) > total(player)) {
      prompt(`Dealer wins ${total(dealer)}:${total(player)}!`);
    } else {
      prompt("It's a tie!");
    }
  } else {
    prompt("You busted. Dealer wins!");
  }

  let again = playAgain();
  again = askPlayAgain(again);

  if (isNo(again)) break;
}

goodbye();