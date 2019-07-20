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

class RPSGame
  attr_accessor :human, :computer, :history
  def initialize
    @human = Human.new
    @computer = Computer.new
    @history = []
  end

  def display_history
    history.each_with_index do |result, idx|
      puts "#{idx + 1}. #{result}"
    end
  end

  def display_welcome_message
    puts "Welcome to Rock, Paper, Scissors! First to 5 wins!"
  end

  def display_goodbye_message
    puts "Thanks for playing Rock, Paper, Scissors. Good bye!"
  end

  def display_moves
    "#{human.name} chose #{human.move.name}, #{computer.name} \
    chose #{computer.move.name}.".squeeze(' ')
  end

  def display_winner
    if human.move > computer.move
      puts "#{human.name} wins! The score is #{human.score}:#{computer.score}."
    elsif computer.move > human.move
      puts "#{computer.name} wins! The score is #{human.score}:#{computer.score}."
    else
      puts "It's a tie!"
    end
  end

  def game_over?
    human.score > 2 || computer.score > 2
  end

  def increment_score
    if human.move > computer.move
      human.score += 1
    elsif computer.move > human.move
      computer.score += 1
    end
  end

  def save_history
    history << display_moves
  end

  def match_history?
    answer = nil
    loop do
      puts "View match history? (y/n)"
      answer = gets.chomp
      break if ['y', 'n'].include?(answer.downcase)
      puts "Sorry, must be y or n."
    end
    answer.downcase == "y"
  end

  def update_probability
    if human.move > computer.move
      computer.probability[computer.move.name] -= 1
    elsif computer.move > human.move
      computer.probability[computer.move.name] += 1
    end
  end

  def play_again?
    answer = nil
    loop do
      puts "Play again? (y/n)"
      answer = gets.chomp
      break if ['y', 'n'].include?(answer.downcase)
      puts "Sorry, must be y or n."
    end
    answer.downcase == "y"
  end

  def play
    display_welcome_message
    loop do
      human.clear_score
      computer.clear_score
      loop do
        human.choose
        computer.choose
        puts display_moves
        increment_score
        display_winner
        save_history
        update_probability
        break if game_over?
      end
      display_history if match_history?
      break unless play_again?
    end
    display_goodbye_message
  end
end

class Player
  attr_accessor :move, :name, :score, :history
  VALUES = { 'rock' => Rock, 'paper' => Paper, 'scissors' => Scissors,
    'lizard' => Lizard, 'spock' => Spock }
  def initialize
    set_name
    @score = 0
  end

  def clear_score
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
  attr_reader :probability
  def initialize
    super
    @probability = {'rock' => 10, 'paper' => 10, 'scissors' => 10,
    'lizard' => 10, 'spock' => 10}
  end

  def choices
    array = []
    @probability.each do |k,v|
      v.times { array << k }
    end
    array
  end

  def set_name
    self.name = 'DeepMind'
  end

  def choose
    self.move = VALUES[self.choices.sample].new
  end
end

RPSGame.new.play
