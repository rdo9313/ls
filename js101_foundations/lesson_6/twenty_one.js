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
    player.push(deck.pop().join(''));
    dealer.push(deck.pop().join(''));
  }
}

function displayCards(player, dealer) {
  prompt(`Player: ${player[0]}, ${player[1]}`);
  prompt(`Dealer: ${dealer[0]}, unknown`);
}


let deck = initializeDeck();
shuffle(deck);
let player = [];
let dealer = [];

dealCards(deck, player, dealer);
displayCards(player, dealer);