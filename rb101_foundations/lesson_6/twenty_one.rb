SUITS = %w(d s h c)
VALUES = %w(2 3 4 5 6 7 8 9 10 J Q K A)
VALID_CHOICES = %w(h s hit stay)

def prompt(msg)
  puts "=> #{msg}"
end

def lined_prompt(msg)
  prompt(msg)
  puts "------------------------------------------------------------------"
end

def initialize_deck
  deck = []
  VALUES.each do |value|
    SUITS.each do |suit|
      deck << Array.new([value, suit])
    end
  end
  deck.shuffle
end

def welcome_message
  prompt "Welcome to Twenty-One! This is a simplified version of the very
  popular card game called Blackjack. Have fun!"
  sleep 4
end

def shuffling_deck
  prompt "Shuffling the deck..."
  sleep 1
end

def deal(deck, player, dealer)
  2.times do
    player << deck.pop
    dealer << deck.pop
  end
end

def display_hand(player, hand)
  cards = ""
  hand.each { |card| cards << card.join + " " }
  prompt "#{player} has #{cards.strip}."
  sleep 1
end

def display_dealer_one(hand)
  prompt "Dealer has #{hand[0].join} and an unknown card."
end

def add_card_values(values)
  sum = 0
  values.each do |value|
    sum += if value == "A"
             11
           elsif value.to_i == 0
             10
           else
             value.to_i
           end
  end
  sum
end

def optimize_ace_value(values, sum)
  values.select { |value| value == "A" }.count.times do
    sum -= 10 if sum > 21
  end
  sum
end

def calculate_total(hand)
  values = hand.map { |card| card[0] }
  sum = add_card_values(values)

  optimize_ace_value(values, sum)
end

def display_total(player, total)
  prompt "#{player}'s hand total is #{total}."
end

def request_action
  lined_prompt "Would you like to (h)it or (s)tay?"
  gets.chomp.downcase
end

def request_valid_action
  action = ''
  loop do
    lined_prompt "Please input a valid action:"
    action = gets.chomp.downcase
    break if VALID_CHOICES.include?(action)
  end
  action
end

def draw_message
  prompt "Drawing a card..."
  sleep 1
end

def draw_card(hand, deck)
  hand << deck.pop
end

def show_drawn(player, hand)
  prompt "#{player} draws #{hand.last.join}."
  sleep 1
end

def busted?(total)
  total > 21
end

def hit_21?(total)
  total == 21
end

def valid_action?(action)
  VALID_CHOICES.include?(action)
end

def valid_answer?(answer)
  answer == "y" || answer == "n"
end

def determine_result(player_total, dealer_total)
  if busted?(dealer_total)
    "dealer_bust"
  elsif player_total > dealer_total
    "player_win"
  elsif dealer_total > player_total
    "dealer_win"
  end
end

def display_result(result, player_total, dealer_total)
  case result
  when "dealer_bust"
    prompt "Dealer busted. Player wins!"
  when "player_win"
    prompt "Player wins #{player_total}:#{dealer_total}!"
  when "dealer_win"
    prompt "Dealer wins #{dealer_total}:#{player_total}!"
  else
    prompt "It's a tie!"
  end
end

def player_sequence(player_hand, hand_value, deck)
  loop do
    player_total = calculate_total(player_hand)
    hand_value[:player] = player_total
    display_hand("Player", player_hand)
    display_total("Player", player_total)
    break if busted?(player_total) || hit_21?(player_total)
    action = request_action
    action = request_valid_action unless valid_action?(action)
    break if ['s', 'stay'].include?(action)
    draw_message
    draw_card(player_hand, deck)
    show_drawn("Player", player_hand)
  end
end

def dealer_sequence(dealer_hand, hand_value, deck)
  loop do
    dealer_total = calculate_total(dealer_hand)
    hand_value[:dealer] = dealer_total
    display_hand("Dealer", dealer_hand)
    display_total("Dealer", dealer_total)
    break if dealer_total >= 17
    draw_message
    draw_card(dealer_hand, deck)
    show_drawn("Dealer", dealer_hand)
  end
end

def play_again?
  answer = ""
  loop do
    lined_prompt "Would you like to play again? ('y' or 'n'):"
    answer = gets.chomp.downcase
    break if valid_answer?(answer)
    lined_prompt "Please enter a valid input ('y' or 'n'):"
  end
  answer == "y"
end

system('clear')
welcome_message
loop do
  system('clear')
  player_hand = []
  dealer_hand = []
  hand_value = { player: 0, dealer: 0 }
  deck = initialize_deck
  shuffling_deck
  deal(deck, player_hand, dealer_hand)
  display_dealer_one(dealer_hand)

  player_sequence(player_hand, hand_value, deck)

  if busted?(hand_value[:player])
    prompt "Player busted. Dealer wins!"
    play_again? ? next : break
  else
    lined_prompt "Player chose to stay!"
    sleep 1
  end

  dealer_sequence(dealer_hand, hand_value, deck)

  result = determine_result(hand_value[:player], hand_value[:dealer])
  display_result(result, hand_value[:player], hand_value[:dealer])
  break unless play_again?
end

prompt "Thank you for playing Twenty-One!"
