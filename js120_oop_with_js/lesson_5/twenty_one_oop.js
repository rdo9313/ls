const readline = require("readline-sync");
const randomize = require("shuffle-array");
const MSG = require('./twenty_one.json');

class Card {
  static SUITS = ['♠', '♦', '♣', '♥'];
  static VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }

  isAce() {
    return this.value === "A";
  }

  isFaceCard() {
    return ["J", "Q", "K"].includes(this.value);
  }

  display() {
    return this.hidden ? "??" : this.value + this.suit;
  }
}

class Deck {
  constructor() {
    this.cards = this.initializeDeck();
  }

  initializeDeck() {
    let deck = [];

    Card.SUITS.forEach(suit => {
      Card.VALUES.forEach(value => {
        deck.push(new Card(suit, value));
      });
    });

    randomize(deck);
    return deck;
  }

  deal() {
    return this.cards.pop();
  }
}

let Hand = {
  resetHand() {
    this.cards = [];
  },

  draw(card) {
    this.cards.push(card);
  },

  getCards() {
    return this.cards;
  },

  getLast() {
    return this.cards[this.cards.length - 1];
  },

  show(string) {
    console.log(`${string}`);
    console.log("---------------------------------------------------------------");
    console.log(this.cards.map(card => card.display()).join(" "));
    console.log("");
  },

  revealCards() {
    this.cards.forEach(card => card.reveal());
  }
};

class Player {
  static MONEY = 5;
  static TARGET = Player.MONEY * 2;

  constructor() {
    this.chips = Player.MONEY;
  }

  winHand() {
    this.chips += 1;
  }

  loseHand() {
    this.chips -= 1;
  }

  emptyPockets() {
    return this.chips <= 0;
  }

  fullPockets() {
    return this.chips >= Player.TARGET;
  }

  showPockets() {
    console.log(`${MSG["showPockets"]}`, this.chips);
    console.log("");
  }
}

class Dealer {
  constructor() {
    this.target = 17;
  }
}

Object.assign(Player.prototype, Hand);
Object.assign(Dealer.prototype, Hand);

class TwentyOneGame {
  static MAX_SCORE = 21;

  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
  }

  askToContinue() {
    console.log("---------------------------------------------------------------");
    this.prompt(MSG["continue"]);
    readline.question();
    console.clear();
  }

  prompt(msg) {
    console.log(`=> ${msg}`);
  }

  start() {
    this.displayWelcomeMessage();
    while (true) {
      this.playHand();
      if (this.player.emptyPockets() || this.player.fullPockets()) break;
      if (!this.playAgain()) break;
    }

    this.displayFinalResult();
    this.displayGoodbyeMessage();
  }

  playHand() {
    this.dealCards();
    this.showCards();
    this.playerTurn();

    if (!this.isBusted(this.player)) {
      this.dealerTurn();
    }

    this.updatePockets();
    this.showCards();
    this.displayResult();
  }

  dealCards() {
    this.deck = new Deck();
    this.player.resetHand();
    this.dealer.resetHand();

    for (let turn = 0; turn < 2; turn++) {
      this.player.draw(this.deck.deal());
      this.dealer.draw(this.deck.deal());
    }

    this.dealer.getLast().hide();
  }

  showCards() {
    console.clear();
    this.player.showPockets();
    this.player.show("Player");
    this.dealer.show("Dealer");
  }

  hit(player) {
    player.draw(this.deck.deal());
  }

  getPlayerAction() {
    this.displayPlayerTotal();
    this.prompt(MSG["hitOrStay"]);
    let action = readline.question().toLowerCase();

    while (!['h', 'hit', 's', 'stay'].includes(action)) {
      this.prompt(MSG["invalidAction"]);
      action = readline.question().toLowerCase();
    }

    return action;
  }

  calculateTotal(player) {
    let sum = 0;
    let aceCount = 0;

    player.getCards().forEach(card => {
      if (card.isAce()) {
        sum += 11;
        aceCount += 1;
      } else if (card.isFaceCard()) {
        sum += 10;
      } else {
        sum += Number(card.value);
      }
    });

    while (aceCount > 0) {
      if (sum > TwentyOneGame.MAX_SCORE) sum -= 10;
      aceCount -= 1;
    }

    return sum;
  }

  isBusted(player) {
    return this.calculateTotal(player) > TwentyOneGame.MAX_SCORE;
  }

  displayPlayerTotal() {
    console.log(`${MSG["playerTotal"]}`, this.calculateTotal(this.player));
  }

  displayDealerTotal() {
    console.log(`${MSG["dealerTotal"]}`, this.calculateTotal(this.dealer));
  }

  playerTurn() {
    while (['h', 'hit'].includes(this.getPlayerAction())) {
      this.hit(this.player);
      this.displayDealtCard(this.player);
      this.showCards();
      if (this.isBusted(this.player)) break;
    }
  }

  dealerContinue() {
    this.prompt(MSG["continue"]);
    readline.question();
  }

  dealerTurn() {
    console.clear();
    this.dealer.revealCards();
    this.showCards();

    while (true) {
      let total = this.calculateTotal(this.dealer);
      if (total >= this.dealer.target) break;
      this.showCards();
      this.displayDealerTotal();
      this.dealerContinue();
      this.hit(this.dealer);
      this.displayDealtCard(this.dealer);
    }
  }

  displayWelcomeMessage() {
    console.clear();
    this.prompt(MSG["welcome"]);
    console.log("");
    console.log(`${MSG["test"]}`, this.player.chips, Player.TARGET);
    this.askToContinue();
  }

  displayDealtCard(player) {
    console.clear();
    console.log(`${MSG["dealtCard"]}`, player.getLast().display());
    this.askToContinue();
  }

  displayGoodbyeMessage() {
    this.prompt(MSG["goodbye"]);
  }

  updatePockets() {
    let playerTotal = this.calculateTotal(this.player);
    let dealerTotal = this.calculateTotal(this.dealer);

    if (this.isBusted(this.player)) {
      this.player.loseHand();
    } else if (this.isBusted(this.dealer)) {
      this.player.winHand();
    } else if (this.isWon(playerTotal, dealerTotal)) {
      this.player.winHand();
    } else if (this.isWon(dealerTotal, playerTotal)) {
      this.player.loseHand();
    }
  }

  displayResult() {
    if (this.isBusted(this.player)) {
      this.prompt(MSG["playerBusts"]);
    } else if (this.isBusted(this.dealer)) {
      this.prompt(MSG["dealerBusts"]);
    } else {
      let playerTotal = this.calculateTotal(this.player);
      let dealerTotal = this.calculateTotal(this.dealer);

      if (this.isWon(playerTotal, dealerTotal)) {
        console.log(`${MSG["playerWin"]}`, playerTotal, dealerTotal);
      } else if (this.isWon(dealerTotal, playerTotal)) {
        console.log(`${MSG["dealerWin"]}`, dealerTotal, playerTotal);
      } else {
        this.prompt(MSG["tie"]);
      }
    }
  }

  isWon(score1, score2) {
    return score1 > score2;
  }

  displayFinalResult() {
    console.clear();

    if (this.player.emptyPockets()) {
      this.prompt(MSG["isBroke"]);
    } else if (this.player.fullPockets()) {
      this.prompt(MSG["isChampion"]);
    } else {
      console.log(`${MSG["walkOut"]}`, this.player.chips);
    }
  }

  playAgain() {
    this.prompt(MSG["playAgain"]);
    let answer = readline.question().toLowerCase();

    while (!['y', 'yes', 'no', 'n'].includes(answer)) {
      this.prompt(MSG["invalidPlayAgain"]);
      answer = readline.question().toLowerCase();
    }

    return ['y', 'yes'].includes(answer);
  }
}

let game = new TwentyOneGame();
game.start();