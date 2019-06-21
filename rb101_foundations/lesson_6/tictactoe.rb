# rubocop: disable Style/EndOfLine
require 'pry'
# rubocop: enable Style/EndOfLine

WINNING_LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] +
                [[2, 5, 8], [1, 4, 7], [3, 6, 9]] +
                [[1, 5, 9], [3, 5, 7]]
INITIAL_MARKER = ' '
PLAYER_MARKER = 'X'
COMPUTER_MARKER = 'O'
FIRST_PLAYER = "choose"
VALID_CHOICES = %w(choose player computer)

def prompt(msg)
  puts "=> #{msg}"
end

# rubocop: disable Metrics/AbcSize
def display_board(brd)
  system("clear")
  puts "You're a #{PLAYER_MARKER}. Computer is #{COMPUTER_MARKER}."
  puts ""
  puts "     |     |"
  puts "  #{brd[1]}  |  #{brd[2]}  |  #{brd[3]}"
  puts "     |     |"
  puts "-----+-----+-----"
  puts "     |     |"
  puts "  #{brd[4]}  |  #{brd[5]}  |  #{brd[6]}"
  puts "     |     |"
  puts "-----+-----+-----"
  puts "     |     |"
  puts "  #{brd[7]}  |  #{brd[8]}  |  #{brd[9]}"
  puts "     |     |"
  puts ""
end
# rubocop: enable Metrics/AbcSize

def initialize_board
  new_board = {}
  (1..9).each { |num| new_board[num] = INITIAL_MARKER }
  new_board
end

def empty_squares(brd)
  brd.keys.select { |num| brd[num] == INITIAL_MARKER }
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

def player_places_piece!(brd)
  square = ""
  loop do
    prompt "Choose a square (#{joinor(empty_squares(brd))}):"
    square = gets.chomp.to_i
    break if empty_squares(brd).include?(square)
    prompt "Sorry, that's not a valid choice."
  end
  brd[square] = PLAYER_MARKER
end

def find_at_risk_square(line, brd)
  if brd.values_at(*line).count(COMPUTER_MARKER) == 2
    brd.select { |k,v| line.include?(k) && v == INITIAL_MARKER }.keys.first
  elsif brd.values_at(*line).count(PLAYER_MARKER) == 2
    brd.select { |k,v| line.include?(k) && v == INITIAL_MARKER }.keys.first
  else
    nil
  end
end

def computer_places_piece!(brd)
  square = nil
  WINNING_LINES.each do |line|
    square = find_at_risk_square(line, brd)
    break if square
  end

  if brd[5] == " "
    square = 5
  elsif !square
    square = empty_squares(brd).sample
  end

  brd[square] = COMPUTER_MARKER
end

def board_full?(brd)
  empty_squares(brd).empty?
end

def someone_won?(brd)
  !!detect_winner(brd)
end

def detect_winner(brd)
  WINNING_LINES.each do |line|
    if brd.values_at(*line).count(PLAYER_MARKER) == 3
      return 'Player'
    elsif brd.values_at(*line).count(COMPUTER_MARKER) == 3
      return 'Computer'
    end
  end
  nil
end

def determine_first_player
  choice = ''
  loop do
    prompt "Do you want to play first? ('y' or 'n')"
    choice = gets.chomp.downcase
    prompt "I didn't understand, please input a valid answer ('y' or 'n')"
    break if choice == "y" || choice == "n"
  end
  choice == 'y' ? 'player' : 'computer'
end

def alternate_player(player)
  player == "player" ? "computer" : "player"
end

loop do
  score = { player: 0, computer: 0 }
  loop do
    board = initialize_board
    if FIRST_PLAYER == "choose"
      starting_player = determine_first_player
    elsif VALID_CHOICES.include?(FIRST_PLAYER)
      starting_player = FIRST_PLAYER
    end
    loop do
      display_board(board)

      if starting_player == "player"
        player_places_piece!(board)
      elsif starting_player == "computer"
        computer_places_piece!(board)
      end
      starting_player = alternate_player(starting_player)
      break if someone_won?(board) || board_full?(board)
    end

    display_board(board)

    if detect_winner(board) == "Player"
      prompt "#{detect_winner(board)} won!"
      score[:player] += 1
    elsif detect_winner(board) == "Computer"
      prompt "#{detect_winner(board)} won!"
      score[:computer] += 1
    else
      prompt "It's a tie!"
    end

    break if score.value?(5)
  end

  prompt "Play again? (y or n)"
  answer = gets.chomp
  break unless answer.downcase.start_with?('y')
end

prompt "Thanks for playing Tice Tac Toe! Good bye!"
