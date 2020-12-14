const readline = require("readline-sync");
const randomize = require("shuffle-array");

class Card {
  static SUITS = ['s', 'c', 'h', 'd'];
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
    console.log(`You have ${this.chips} chips.`);
    console.log("");
  }
}

class Dealer {
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
    console.log("Press enter to continue:");
    readline.question();
    console.clear();
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
    console.log("Would you like to (h)it or (s)tay?");
    let action = readline.question().toLowerCase();

    while (!['h', 'hit', 's', 'stay'].includes(action)) {
      console.log("Please input a valid action:");
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
    console.log(`Your total is ${this.calculateTotal(this.player)}.`);
  }

  displayDealerTotal() {
    console.log(`Dealer's total is ${this.calculateTotal(this.dealer)}.`);
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
    console.log("Press enter to continue:");
    readline.question();
  }

  dealerTurn() {
    console.clear();
    this.dealer.revealCards();
    this.showCards();

    while (true) {
      let total = this.calculateTotal(this.dealer);
      if (total >= 17) break;
      this.showCards();
      this.displayDealerTotal();
      this.dealerContinue();
      this.hit(this.dealer);
      this.displayDealtCard(this.dealer);
    }
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Twenty-One. This is a simplified version of the popular game Blackjack.\nThis is a version without splits, double-downs, and other complex plays.\nPlease refer to https://www.blackjack.org/blackjack-rules/ for rules of the original game.");
    this.askToContinue();
  }

  displayDealtCard(player) {
    console.clear();
    console.log(`A ${player.getLast().display()} is drawn.`);
    this.askToContinue();
  }

  displayGoodbyeMessage() {
    console.log("Thank you for playing. Goodbye!");
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
      console.log("You busted!");
    } else if (this.isBusted(this.dealer)) {
      console.log("Dealer busts!");
    } else {
      let playerTotal = this.calculateTotal(this.player);
      let dealerTotal = this.calculateTotal(this.dealer);

      if (this.isWon(playerTotal, dealerTotal)) {
        console.log(`You win ${playerTotal}:${dealerTotal}!`);
      } else if (this.isWon(dealerTotal, playerTotal)) {
        console.log(`Dealer wins ${dealerTotal}:${playerTotal}!`);
      } else {
        console.log("It's a tie!");
      }
    }
  }

  isWon(score1, score2) {
    return score1 > score2;
  }

  displayFinalResult() {
    console.clear();

    if (this.player.emptyPockets()) {
      console.log("You are broke. There's always a tomorrow!");
    } else if (this.player.fullPockets()) {
      console.log("You beat the house. Great job!");
    } else {
      console.log(`You walk out with ${this.player.chips} chips.`);
    }
  }

  playAgain() {
    console.log("Would you like to play again? Enter (y)es or (n)o:");
    let answer = readline.question().toLowerCase();

    while (!['y', 'yes', 'no', 'n'].includes(answer)) {
      console.log("That is an invalid input. Please try again (y)es or (n)o:");
      answer = readline.question().toLowerCase();
    }

    return ['y', 'yes'].includes(answer);
  }
}

let game = new TwentyOneGame();
game.start();