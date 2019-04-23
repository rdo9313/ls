# RPS Bonus Features
VALID_CHOICES = %w(rock scissors paper lizard spock)
RPS_HASH = {
  rock:  %w(scissors lizard),
  scissors: %w(paper lizard),
  paper: %w(rock spock),
  spock: %w(scissors rock),
  lizard: %w(spock paper)
}

def prompt(message)
  puts("=> #{message}")
end

def convert(choice)
  case choice.downcase
  when "r"
    "rock"
  when "p"
    "paper"
  when "s"
    "scissors"
  when "l"
    "lizard"
  when "sp"
    "spock"
  else
    choice
  end
end

def win?(first, second)
  RPS_HASH[first.to_sym].include?(second)
end

def choice_valid?(choice)
  VALID_CHOICES.include?(choice)
end

def determine_winner(player, computer)
  if win?(player, computer)
    "player"
  elsif win?(computer, player)
    "computer"
  end
end

def display_result(winner, player, computer)
  prompt("You chose: #{player}, Computer chose: #{computer}")
  if winner == "player"
    prompt("You won!")
  elsif winner == "computer"
    prompt("Computer won!")
  else
    prompt("It's a tie!")
  end
end

def increment_wins(winner, score)
  if winner == "player"
    score[:player] += 1
  elsif winner == "computer"
    score[:computer] += 1
  end
end

def play_again?
  request_replay
  answer = gets.chomp
  valid_answer = ""
  if answer.downcase == "n"
    return false
  elsif answer.downcase == "y"
    return true
  else
    loop do
      prompt("Enter Y to play again, N to quit")
      valid_answer = gets.chomp
      break if valid_answer.downcase == "y" || valid_answer.downcase == "n"
    end
  end

  valid_answer.downcase == "n" ? false : true
end

def winner?(score)
  score.value?(5)
end

def display_choices
  prompt("Choose one: (r)ock, (p)aper, (s)cissors, (l)izard, (sp)ock")
end

def display_invalid_choice
  prompt("That's not a valid choice.")
end

def display_goodbye
  prompt("Thank you for playing. Good bye!")
end

def display_score(score)
  if !score.value?(5)
    if score[:player] > score[:computer]
      prompt("Player is winning, #{score[:player]} : #{score[:computer]}")
      prompt("----------------------------------------------------------")
    elsif score[:computer] > score[:player]
      prompt("Computer is winning, #{score[:computer]} : #{score[:player]}")
      prompt("------------------------------------------------------------")
    else
      prompt("We are tied at #{score[:player]} : #{score[:computer]}!")
      prompt("-------------------------------------------------------")
    end
  end
end

def request_replay
  prompt("Do you want to play again?(Y for yes, N for no)")
end

def retrieve_user_choice
  choice = ""
  loop do
    display_choices
    choice = convert(gets.chomp)
    break if choice_valid?(choice)
    display_invalid_choice
  end
  choice
end

def retrieve_computer_choice
  VALID_CHOICES.sample
end

loop do
  system("clear")
  score = { player: 0, computer: 0 }
  loop do
    system("clear")
    choice = retrieve_user_choice
    computer_choice = retrieve_computer_choice

    winner = determine_winner(choice, computer_choice)
    display_result(winner, choice, computer_choice)
    increment_wins(winner, score)
    display_score(score)
    sleep(2)

    break if winner?(score)
  end

  break unless play_again?
end

display_goodbye
