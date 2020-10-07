const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    }
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log("Please choose rock, paper, or scissors:");
        choice = readline.question();
        if (['rock', 'paper', 'scissors', 'lizard', 'spock'].includes(choice)) break;
        console.log("Sorry, invalid choice");
      }

      this.move = choice;
    }
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  WINNING_COMBOS: {
    rock:  ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['lizard', 'paper'],
    spock: ['scissors', 'rock'],
    lizard: ['spock', 'paper']
  },

  human: createHuman(),
  computer: createComputer(),
  maxScore: 5,

  displayGreetingMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
  },

  getWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let winner;

    if (this.WINNING_COMBOS[humanMove].includes(computerMove)) {
      winner = "player";
    } else if (this.WINNING_COMBOS[computerMove].includes(humanMove)) {
      winner = "computer";
    } else {
      winner = "tie";
    }

    return winner;
  },

  displayResult() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
  },

  displayWinner() {
    let winner = this.getWinner();

    if (winner === "player") {
      console.log("You win!");
    } else if (winner === "computer") {
      console.log("Computer wins!");
    } else {
      console.log("It's a tie!");
    }
  },

  updateScore() {
    let winner = this.getWinner();
    if (winner === "player") {
      this.human.score += 1;
    } else if (winner === "computer") {
      this.computer.score += 1;
    }
  },

  displayScore() {
    let playerScore = this.human.score;
    let computerScore = this.computer.score;

    if (playerScore > computerScore) {
      console.log(`You are winning ${playerScore}:${computerScore}`);
    } else if (computerScore > playerScore) {
      console.log(`You are losing ${playerScore}:${computerScore}`);
    } else {
      console.log(`You are tied ${playerScore}:${computerScore}`);
    }
  },

  gameOver() {
    return this.human.score === this.maxScore || this.computer.score === this.maxScore;
  },

  displayFinalScore() {
    let playerScore = this.human.score;
    let computerScore = this.computer.score;

    if (playerScore > computerScore) {
      console.log(`Congratulations in beating the computer ${playerScore}:${computerScore}!`);
    } else {
      console.log(`You lost ${playerScore}:${computerScore}.`);
    }
  },

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayGreetingMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      this.updateScore();
      this.displayScore();
      if (!this.playAgain()) break;
    }

      this.displayGoodbyeMessage();
  }
};

RPSGame.play();