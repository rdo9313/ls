VALID_CHOICES = %w(rock scissors paper lizard spock r s p l sp)
RPS_HASH = {
  rock:  %w(scissors lizard),
  scissors: %w(paper lizard),
  paper: %w(rock spock),
  spock: %w(scissors rock),
  lizard: %w(spock paper)
}
CONVERT = {
  "r" => "rock",
  "s" => "scissors",
  "p" => "paper",
  "sp" => "spock",
  "l" => "lizard"
}

def prompt(message)
  puts("=> #{message}")
end

def win?(first, second)
  (first == 'rock' && RPS_HASH[:rock].include?(second)) ||
    (first == 'paper' && RPS_HASH[:paper].include?(second)) ||
    (first == 'scissors' && RPS_HASH[:scissors].include?(second)) ||
    (first == 'spock' && RPS_HASH[:spock].include?(second)) ||
    (first == 'lizard' && RPS_HASH[:lizard].include?(second))
end

def choice_valid?(choice)
  VALID_CHOICES.include?(choice)
end

def display_result(player, computer)
  prompt("You chose: #{player}, Computer chose: #{computer}")
  if win?(player, computer)
    prompt("You won!")
  elsif win?(computer, player)
    prompt("Computer won!")
  else
    prompt("It's a tie!")
  end
end

def increment_wins(player, computer, win_count)
  if win?(player, computer)
    win_count[:player] += 1
  elsif win?(computer, player)
    win_count[:computer] += 1
  end
end

def play_again?(answer)
  if answer.downcase == "n"
    return false
  elsif answer.downcase == "y"
    return true
  end

  valid_answer = ""
  while answer.downcase != "y" || answer.downcase != "n"
    prompt("Enter Y to play again, N to quit")
    valid_answer = gets.chomp
    break if valid_answer.downcase == "y" || valid_answer.downcase == "n"
  end

  valid_answer.downcase == "n" ? false : true
end

def has_winner?(win_count)
  win_count.has_value?(2)
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

def display_score(win_count)
  if !win_count.has_value?(2)
    if win_count[:player] > win_count[:computer]
      prompt("Player is winning, #{win_count[:player]} : #{win_count[:computer]}")
    elsif win_count[:computer] > win_count[:player]
      prompt("Computer is winning, #{win_count[:computer]} : #{win_count[:player]}")
    else
      prompt("We are tied at #{win_count[:player]} : #{win_count[:computer]}!")
    end
  end
end

def request_replay
  prompt("Do you want to play again?(Y for yes, N for no)")
end

def retrieve_replay_answer
  gets.chomp
end

def retrieve_user_choice
  gets.chomp
end

def retrieve_computer_choice
  RPS_HASH.keys.map { |key| key.to_s }.sample
end

loop do
  win_count = {player: 0, computer: 0}
  loop do
    choice = ""
    loop do
      display_choices
      choice = retrieve_user_choice

      if choice_valid?(choice)
        choice = CONVERT[choice]
        break
      else
        display_invalid_choice
      end
    end

    computer_choice = retrieve_computer_choice

    display_result(choice, computer_choice)
    increment_wins(choice, computer_choice, win_count)
    display_score(win_count)

    break if has_winner?(win_count)
  end

  request_replay
  answer = retrieve_replay_answer

  break unless play_again?(answer)
end

display_goodbye
