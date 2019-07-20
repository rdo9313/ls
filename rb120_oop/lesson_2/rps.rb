require 'pry'

class Rock
  attr_reader :name

  def initialize
    @name = "rock"
  end

  def >(other_move)
    other_move.name == "scissors" || other_move.name == "lizard"
  end
end

class Paper
  attr_reader :name

  def initialize
    @name = "paper"
  end

  def >(other_move)
    other_move.name == "rock" || other_move.name == "spock"
  end
end

class Scissors
  attr_reader :name

  def initialize
    @name = "scissors"
  end

  def >(other_move)
    other_move.name == "paper" || other_move.name == "lizard"
  end
end

class Spock
  attr_reader :name

  def initialize
    @name = "spock"
  end

  def >(other_move)
    other_move.name == "scissors" || other_move.name == "rock"
  end
end

class Lizard
  attr_reader :name

  def initialize
    @name = "lizard"
  end

  def >(other_move)
    other_move.name == "spock" || other_move.name == "paper"
  end
end

VALUES = { 'rock' => Rock, 'paper' => Paper, 'scissors' => Scissors,
  'lizard' => Lizard, 'spock' => Spock }
class RPSGame
  attr_accessor :human, :computer
  def initialize
    @human = Human.new
    @computer = Computer.new
  end

  def display_welcome_message
    puts "Welcome to Rock, Paper, Scissors! First to 5 wins!"
  end

  def display_goodbye_message
    puts "Thanks for playing Rock, Paper, Scissors. Good bye!"
  end

  def display_moves
    puts "#{human.name} chose #{human.move.name}"
    puts "#{computer.name} chose #{computer.move.name}"
  end

  def display_winner
    if human.move > computer.move
      puts "#{human.name} won! The score is #{human.score}:#{computer.score}!"
    elsif computer.move > human.move
      puts "#{computer.name} won! The score is #{human.score}:#{computer.score}!"
    else
      puts "It's a tie!"
    end
  end

  def game_over?
    human.score > 4 || computer.score > 4
  end

  def increment_score
    if human.move > computer.move
      human.score += 1
    elsif computer.move > human.move
      computer.score += 1
    end
  end

  def play_again?
    answer = nil
    loop do
      puts "Would you like to play again? (y/n)"
      answer = gets.chomp
      break if ['y', 'n'].include?(answer.downcase)
      puts "Sorry, must be y or n."
    end
    answer.downcase == "y"
  end

  def play
    display_welcome_message
    loop do
      human.choose
      computer.choose
      display_moves
      increment_score
      display_winner
      break if game_over?
    end
    display_goodbye_message
  end
end

class Player
  attr_accessor :move, :name, :score
  def initialize
    set_name
    @score = 0
  end
end

class Human < Player
  def set_name
    n = ''
    loop do
      puts "What's your name?"
      n = gets.chomp
      break unless n.empty?
      puts "Sorry, must enter a value."
    end
    self.name = n
  end

  def choose
    choice = nil
    loop do
      puts "Please choose rock, paper, scissors, lizard, or spock:"
      choice = gets.chomp
      break if VALUES.keys.include?(choice)
      puts "Sorry, invalid choice."
    end
    self.move = VALUES[choice].new
  end
end

class Computer < Player
  def set_name
    self.name = ['R2D2', 'Hal', 'Sonny', 'Number 5'].sample
  end

  def choose
    self.move = VALUES[VALUES.keys.sample].new
  end
end

RPSGame.new.play
