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

function shuffle(deck) {
  for (let idx = deck.length - 1; idx > 0; idx--) {
    let otherIdx = Math.floor(Math.random() * (idx + 1));
    [deck[idx], deck[otherIdx]] = [deck[otherIdx], deck[idx]];
  }
}

function dealCards(deck, player, dealer) {
  for (let count = 0; count < 2; count++) {
    player.push(deck.pop());
    dealer.push(deck.pop());
  }
}

function dealCard(deck, player) {
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

function displayTotals(player, dealer) {
  prompt(`Player: ${displayCards(player)}. Total: ${total(player)}.`);
  prompt(`Dealer: ${dealer[0].join('')} unknown.`);
}

function displayDealerTotal(dealer) {
  prompt(`Dealer: ${displayCards(dealer)}. Total: ${total(dealer)}.`);
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

function isNo(again) {
  return ['n', 'no'].includes(again);
}

function goodbye() {
  prompt("Thank you for playing. Goodbye!");
}

while (true) {
  let deck = initializeDeck();
  shuffle(deck);
  let player = [];
  let dealer = [];

  dealCards(deck, player, dealer);
  displayTotals(player, dealer);

  while (true) {
    prompt("Would you like to hit or stay?");
    let answer = readline.question().toLowerCase();

    if (answer === "stay") break;

    dealCard(deck, player);
    displayTotals(player, dealer);

    if (bust(player)) break;
  }

  if (!bust(player)) {
    while (total(dealer) < 17) {
      dealCard(deck, dealer);
      displayDealerTotal(dealer);
    }

    if (bust(dealer) || total(player) > total(dealer)) {
      prompt("You win!");
    } else if (total(dealer) > total(player)) {
      prompt("Dealer wins!");
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