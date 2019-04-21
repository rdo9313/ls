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
  case choice
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

def increment_wins(player, computer, score)
  if win?(player, computer)
    score[:player] += 1
  elsif win?(computer, player)
    score[:computer] += 1
  end
end

def play_again?(answer)
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

def retrieve_replay_answer
  gets.chomp
end

def retrieve_user_choice
  gets.chomp
end

def retrieve_computer_choice
  VALID_CHOICES.sample
end

loop do
  score = { player: 0, computer: 0 }
  loop do
    choice = ""
    loop do
      display_choices
      choice = retrieve_user_choice
      choice = convert(choice)

      if choice_valid?(choice)
        break
      else
        display_invalid_choice
      end
    end

    computer_choice = retrieve_computer_choice

    display_result(choice, computer_choice)
    increment_wins(choice, computer_choice, score)
    display_score(score)

    break if winner?(score)
  end

  request_replay
  answer = retrieve_replay_answer

  break unless play_again?(answer)
end

display_goodbye
