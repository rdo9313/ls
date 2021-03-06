# Features added:
# 1) Keeping Score
# 2) Lizard and Spock
# 3) Add a class for each move
# 4) Track history of moves
# 5) adjust computer choice based on history
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

  def continue
    puts "Enter any button to continue:"
    gets
  end

  def display_history
    history.each_with_index do |result, idx|
      puts "#{idx + 1}. #{result}"
    end
    continue
  end

  def display_welcome_message
    system('clear')
    message = <<~HEREDOC
    Welcome to Rock, Paper, Scissors, Lizard, Spock! First to 3 wins!
    -----------------------------------------------------------------
    The full explanation and rules are at
    http://www.samkass.com/theories/RPSSL.html
    -----------------------------------------------------------------
    HEREDOC
    puts message
    continue
  end

  def display_goodbye_message
    puts "Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Good bye!"
  end

  def display_moves
    system("clear")
    puts "#{human.name} chose #{human.move.name}, #{computer.name} \
    chose #{computer.move.name}.".squeeze(' ')
    sleep(1)
  end

  def display_winner
    player = human
    comp = computer
    player_score = player.score
    comp_score = computer.score
    if player.move > comp.move
      puts "#{player.name} wins! The score is #{player_score}:#{comp_score}."
    elsif comp.move > human.move
      puts "#{comp.name} wins! The score is #{player_score}:#{comp_score}."
    else
      puts "It's a tie! The score is #{player_score}:#{comp_score}."
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
    human_name = human.name
    computer_name = computer.name
    human_move = human.move.name
    computer_move = computer.move.name
    if game_over?
      history << "#{human_name} chose #{human_move}, #{computer_name} \
      chose #{computer_move}.
      --------------------------------------------------------------------"
                 .squeeze(' ')
    else
      history << "#{human_name} chose #{human_move}, #{computer_name} \
      chose #{computer_move}.".squeeze(' ')
    end
  end

  def match_history?
    system("clear")
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
    player = human
    comp = computer
    if player.move > comp.move
      comp.probability[comp.move.name] -= 1
    elsif computer.move > player.move
      comp.probability[comp.move.name] += 1
    end
  end

  def play_again?
    answer = nil
    loop do
      system("clear")
      puts "Play again? (y/n)"
      answer = gets.chomp
      break if ['y', 'n'].include?(answer.downcase)
      puts "Sorry, must be y or n."
    end
    answer.downcase == "y"
  end

  def clear_scores
    human.clear_score
    computer.clear_score
  end

  def determine_moves
    human.choose
    computer.choose
  end

  def update_state
    continue
    save_history
    update_probability
  end

  def play
    display_welcome_message
    loop do
      clear_scores
      loop do
        determine_moves
        display_moves
        increment_score
        display_winner
        update_state
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
  CHOICES = { 'rock' => Rock, 'paper' => Paper, 'scissors' => Scissors,
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
      break unless n.strip.empty?
      puts "Sorry, must enter a value."
    end
    self.name = n
  end

  def convert(choice)
    case choice
    when 'r' then 'rock'
    when 'p' then 'paper'
    when 's' then 'scissors'
    when 'sp' then 'spock'
    when 'l' then 'lizard'
    else
      choice
    end
  end

  def choose
    choice = nil
    loop do
      system("clear")
      puts "Please choose (r)ock, (p)aper, (s)cissors, (l)izard, or (sp)ock:"
      choice = convert(gets.chomp.downcase)
      break if CHOICES.keys.include?(choice)
      puts "Sorry, invalid choice."
      sleep(1)
    end
    self.move = CHOICES[choice].new
  end
end

class Computer < Player
  attr_reader :probability
  def initialize
    super
    @probability = { 'rock' => 10, 'paper' => 10, 'scissors' => 10,
                     'lizard' => 10, 'spock' => 10 }
  end

  def choices
    array = []
    @probability.each do |choice, frequency|
      frequency.times { array << choice }
    end
    array
  end

  def set_name
    self.name = 'DeepMind'
  end

  def choose
    self.move = CHOICES[choices.sample].new
  end
end

RPSGame.new.play
