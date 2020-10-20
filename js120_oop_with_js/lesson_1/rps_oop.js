const readline = require('readline-sync');

// eslint-disable-next-line max-lines-per-function
function createHistory() {
  return {
    humanHistory: [1],
    computerHistory: [1],

    saveMoves(humanMove, computerMove) {
      this.humanHistory.push(humanMove);
      this.computerHistory.push(computerMove);
    },

    displayRounds() {
      let match = 1;
      let round = 1;
      console.clear();
      this.humanHistory.forEach((move, idx) => {
        if (typeof move === 'number') {
          console.log('');
          console.log(`Match ${match}`);
          console.log('----------------------------------------------------------------------------------');
          match++;
          round = 1;
        } else {
          console.log(`Round ${round}: You chose: ${move}. The computer chose: ${this.computerHistory[idx]}.`);
          round++;
        }
      });
    },

    newMatch() {
      let match = this.humanHistory.filter(el => typeof el === 'number').reverse()[0] + 1;
      this.humanHistory.push(match);
      this.computerHistory.push(match);
    }
  };
}

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choices: ['rock', 'paper', 'scissors', 'lizard', 'spock'].reduce((acc, curr) => [...acc, curr, curr, curr], []),

    choose() {
      let randomIndex = Math.floor(Math.random() * this.choices.length);
      this.move = this.choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choices: [['r', 'rock'], ['p', 'paper'], ['s', 'scissors'], ['l', 'lizard'], ['sp', 'spock']],

    choose() {
      let choice;

      while (true) {
        console.log("Please choose (r)ock, (p)aper, (s)cissors, (l)izard, or (sp)ock:");
        choice = readline.question();
        if (['rock', 'paper', 'scissors', 'lizard', 'spock', 'r', 'p', 'l', 's', 'sp'].includes(choice)) break;
        console.log("Sorry, invalid choice");
      }

      this.move = this.convertMove(choice);
    },

    convertMove(move) {
      return this.choices.filter(subarr => subarr.includes(move))[0][1];
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
  history: createHistory(),
  maxScore: 3,

  askToContinue() {
    console.log("Press enter to continue:");
    readline.question();
  },

  displayGreetingMessage() {
    console.clear();
    console.log("Welcome to Rock, Paper, Scissors!");
    this.askToContinue();
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

  displayMoves() {
    console.clear();
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

    console.log('----------------------------------------------------------------');
    this.askToContinue();
  },

  updateScore() {
    let winner = this.getWinner();
    if (winner === "player") {
      this.human.score += 1;
    } else if (winner === "computer") {
      this.computer.score += 1;
    }
  },

  updateMovePercentage() {
    let winner = this.getWinner();
    let computerChoices = this.computer.choices;
    let computerMove = this.computer.move;
    if (winner === "player") {
      if (computerChoices.filter(str => str === computerMove).length > 1) {
        computerChoices.splice(computerChoices.indexOf(computerMove), 1);
      }
    } else if (winner === "computer") {
      computerChoices.push(computerMove);
    }
  },

  displayScore() {
    let playerScore = this.human.score;
    let computerScore = this.computer.score;

    console.log(`Player: ${playerScore}\nComputer: ${computerScore}`);
    console.log('----------------------------------------------------------------');
  },

  gameOver() {
    let maxScore = this.maxScore;
    return this.human.score === maxScore || this.computer.score === maxScore;
  },

  displayFinalScore() {
    let playerScore = this.human.score;
    let computerScore = this.computer.score;

    console.clear();
    if (playerScore > computerScore) {
      console.log(`Congratulations in beating the computer ${playerScore}:${computerScore}!`);
    } else {
      console.log(`You lost ${playerScore}:${computerScore}.`);
    }
  },

  displayHistory() {
    console.log('Would you like to view history of rounds? (y/n)');
    let answer = readline.question();
    while (!['y','n'].includes(answer.toLowerCase())) {
      console.log('Please enter a valid input. (y/n)');
      answer = readline.question();
    }

    console.clear();
    return answer.toLowerCase() === 'y';
  },

  playAgain() {
    console.clear();
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    while (!['y','n'].includes(answer.toLowerCase())) {
      console.log('Please enter a valid input. (y/n)');
      answer = readline.question();
    }

    console.clear();
    return answer.toLowerCase() === 'y';
  },

  resetScore() {
    this.human.score = 0;
    this.computer.score = 0;
  },

  playRound() {
    console.clear();
    this.displayScore();
    this.human.choose();
    this.computer.choose();
    this.history.saveMoves(this.human.move, this.computer.move);
    this.displayMoves();
    this.displayWinner();
    this.updateMovePercentage();
    this.updateScore();
  },

  play() {
    this.displayGreetingMessage();

    while (true) {
      this.playRound();
      if (this.gameOver()) {
        this.displayFinalScore();
        if (this.displayHistory()) {
          this.history.displayRounds();
          this.askToContinue();
        }
        if (!this.playAgain()) {
          break;
        } else {
          this.history.newMatch();
          this.resetScore();
        }
      }
    }

    this.displayGoodbyeMessage();
  }
};

RPSGame.play();