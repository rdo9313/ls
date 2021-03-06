class Board
  attr_reader :squares
  WINNING_LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] +
                  [[1, 4, 7], [2, 5, 8], [3, 6, 9]] +
                  [[1, 5, 9], [3, 5, 7]]
  def initialize
    @squares = {}
    reset
  end

  # rubocop:disable Metrics/AbcSize
  def draw
    puts "     |     |"
    puts "  #{@squares[1]}  |  #{@squares[2]}  |  #{@squares[3]}"
    puts "     |     |"
    puts "-----+-----+-----"
    puts "     |     |"
    puts "  #{@squares[4]}  |  #{@squares[5]}  |  #{@squares[6]}"
    puts "     |     |"
    puts "-----+-----+-----"
    puts "     |     |"
    puts "  #{@squares[7]}  |  #{@squares[8]}  |  #{@squares[9]}"
    puts "     |     |"
  end
  # rubocop:enable Metrics/AbcSize

  def []=(key, marker)
    @squares[key].marker = marker
  end

  def [](key)
    @squares.values_at(key).first.marker
  end

  def unmarked_keys
    @squares.keys.select { |key| @squares[key].unmarked? }
  end

  def full?
    unmarked_keys.empty?
  end

  def someone_won?
    !!winning_marker
  end

  def winning_marker
    WINNING_LINES.each do |line|
      squares = @squares.values_at(*line)
      if three_identical_markers?(squares)
        return squares.first.marker
      end
    end
    nil
  end

  def reset
    (1..9).each { |key| @squares[key] = Square.new }
  end

  private

  def three_identical_markers?(squares)
    markers = squares.select(&:marked?).collect(&:marker)
    return false if markers.size != 3
    markers.min == markers.max
  end
end

class Square
  INITIAL_MARKER = " "
  attr_accessor :marker

  def initialize(marker = INITIAL_MARKER)
    @marker = marker
  end

  def to_s
    @marker
  end

  def marked?
    marker != INITIAL_MARKER
  end

  def unmarked?
    marker == INITIAL_MARKER
  end
end

class Player
  attr_accessor :score, :marker, :name

  def initialize
    set_name
    @score = 0
  end

  private

  def set_name
    system("clear")
    n = ''
    loop do
      puts "What's your name?"
      n = gets.chomp
      break unless n.strip.size < 3
      puts "Sorry, name must be greater than two characters."
    end
    self.name = n
  end
end

class Computer
  attr_accessor :score, :marker, :board
  attr_reader :name, :human

  def initialize(board, human)
    @board = board
    @human = human
    @score = 0
    @name = 'DeepMind'
  end

  def find_winning_square
    square = nil
    Board::WINNING_LINES.each do |line|
      board_values = board.squares.values_at(*line)
      if board_values.collect(&:marker).count(marker) == 2
        square = board.squares.select do |position, obj|
          line.include?(position) && obj.marker == ' '
        end.keys.first
      end
      break if square
    end
    square
  end

  def find_defending_square
    square = nil
    Board::WINNING_LINES.each do |line|
      board_values = board.squares.values_at(*line)
      if board_values.collect(&:marker).count(human.marker) == 2
        square = board.squares.select do |position, obj|
          line.include?(position) && obj.marker == ' '
        end.keys.first
      end
      break if square
    end
    square
  end

  def move
    square = find_winning_square
    square = find_defending_square if !square

    if board[5] == " " && !square
      square = 5
    elsif !square
      square = board.unmarked_keys.sample
    end

    board[square] = marker
  end
end

class TTTGame
  def initialize
    @board = Board.new
    @first_to_move = 'player'
    @human = Player.new
    @computer = Computer.new(@board, @human)
  end

  def play
    display_welcome_message
    loop do
      set_player_marker!
      set_current_player!
      complete_match
      break unless play_again?
      reset_board_and_score
      display_play_again_message
    end
    display_goodbye_message
  end

  private
  attr_reader :board, :human, :computer
  attr_accessor :current_marker, :first_to_move

  def complete_match
    loop do
      play_round
      break if human.score > 2 || computer.score > 2
      reset_board
    end
  end

  def play_round
    display_board
    one_match
    update_score
    display_result
    continue
  end

  def one_match
    loop do
      current_player_moves
      break if board.someone_won? || board.full?
    end
  end

  def set_player_marker!
    marker = retrieve_marker_choice
    marker = request_valid_marker(marker) if !valid_marker?(marker)
    if marker == "x"
      human.marker = "X"
      computer.marker = "O"
    else
      human.marker = "O"
      computer.marker = "X"
    end
  end

  def request_valid_marker(choice)
    loop do
      puts "I didn't understand, please input a valid answer..."
      choice = gets.chomp.downcase
      break if valid_marker?(choice)
    end
    choice
  end

  def retrieve_marker_choice
    puts "Do you want to play as 'X' or 'O'?"
    gets.chomp.downcase
  end

  def determine_player_choice(choice)
    choice == 'player' ? 'y' : 'n'
  end

  def set_current_player!
    if %w(player computer).include?(first_to_move)
      choice = determine_player_choice(first_to_move)
    else
      puts "First player choice preset is invalid."
      choice = retrieve_player_choice
      choice = request_valid_answer(choice) if !valid_answer?(choice)
    end
    determine_first_player(choice)
  end

  def determine_first_player(choice)
    first = choice == 'y' ? 'player' : 'computer'
    self.current_marker = first == 'player' ? human.marker : computer.marker
  end

  def request_valid_answer(choice)
    loop do
      puts "I didn't understand, please input a valid answer..."
      choice = gets.chomp.downcase
      break if valid_answer?(choice)
    end
    choice
  end

  def valid_marker?(choice)
    choice == "x" || choice == "o"
  end

  def valid_answer?(choice)
    choice == "y" || choice == "n"
  end

  def retrieve_player_choice
    puts "Do you want to play first? ('y' or 'n')"
    gets.chomp.downcase
  end

  def display_welcome_message
    clear
    puts "Welcome to Tic Tac Toe!"
    puts "The first to 3 wins will be the winner."
    puts ""
  end

  def display_goodbye_message
    puts "Thanks for playing Tic Tac Toe! Goodbye!"
  end

  def clear
    system("clear")
  end

  def display_board
    clear
    puts "#{human.name} is #{human.marker}. \
    #{computer.name} is #{computer.marker}.".squeeze(' ')
    puts ""
    board.draw
    puts ""
  end

  def clear_screen_and_display_board
    clear
    display_board
  end

  def current_player_moves
    if human_turn?
      human_moves
      @current_marker = computer.marker
    else
      computer.move
      @current_marker = human.marker
    end
    clear_screen_and_display_board
  end

  def human_turn?
    @current_marker == human.marker
  end

  def joinor(arr, delimiter = ", ", word = "or")
    case arr.size
    when 0 then ''
    when 1 then arr.first
    when 2 then arr.join(" #{word} ")
    else
      arr[-1] = "#{word} #{arr.last}"
      arr.join(delimiter)
    end
  end

  def human_moves
    puts "Choose a position to place piece: #{joinor(board.unmarked_keys)} "
    square = nil
    loop do
      response = gets.chomp
      square = response.to_i
      break if board.unmarked_keys.include?(square) && response.size == 1
      puts "Sorry, that's not a valid choice."
    end

    board[square] = human.marker
  end

  def continue
    puts "Press enter to continue:"
    gets
  end

  def display_result
    human_score = human.score
    comp_score = computer.score
    case board.winning_marker
    when human.marker
      puts "#{human.name} won! The score is #{human_score}:#{comp_score}."
    when computer.marker
      puts "#{computer.name} won! The score is #{human_score}:#{comp_score}."
    else
      puts "It's a tie! The score is #{human_score}:#{comp_score}."
    end
  end

  def update_score
    if board.winning_marker == human.marker
      human.score += 1
    elsif board.winning_marker == computer.marker
      computer.score += 1
    end
    clear_screen_and_display_board
  end

  def play_again?
    answer = nil
    loop do
      puts "Would you like to play again? (y/n)"
      answer = gets.chomp.downcase
      break if %w(y n).include? answer
      puts "Sorry, must be y or n"
    end

    answer == "y"
  end

  def reset_board
    board.reset
    clear
  end

  def reset_board_and_score
    human.score = 0
    computer.score = 0
    board.reset
    clear
  end

  def display_play_again_message
    puts "Let's play again!"
    puts ""
  end
end

game = TTTGame.new
game.play
