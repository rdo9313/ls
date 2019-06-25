SUITS = %w(d s h c)
VALUES = %w(2 3 4 5 6 7 8 9 10 J Q K A)
VALID_CHOICES = %w(h s hit stay)

def prompt(msg)
  puts "=> #{msg}"
end

def lined_prompt(msg)
  puts "=> #{msg}"
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
  lined_prompt "Welcome to Twenty-One! This is a simplified version of the very
  popular card game called Blackjack. Have fun!"
  sleep 3
end

def shuffling_deck
  prompt "Shuffling the deck..."
  sleep 3
end

def deal(deck, player, dealer)
  2.times do
    player << deck.pop
    dealer << deck.pop
  end
end

def display_all(player, hand)
  cards = ""
  hand.each { |card| cards << card.join + " " }
  prompt "#{player} has #{cards.strip}."
  sleep 1
end

def display_dealer_one(hand)
  prompt "Dealer has #{hand[0].join} and an unknown card."
  sleep 1
end

def calculate_total(hand)
  values = hand.map { |card| card[0] }
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

  values.select { |value| value == "A" }.count.times do
    sum -= 10 if sum > 21
  end
  sum
end

def display_total(player, total)
  prompt "#{player}'s hand total is #{total}."
  sleep 1
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

def player_result(total)
  if busted?(total)
    prompt "Player busted. Dealer wins!"
  elsif hit_21?(total)
    lined_prompt "Player hits the nuts (21 points). Great job!"
    sleep 1
  else
    lined_prompt "Player chose to stay!"
    sleep 1
  end
end

def display_result(player_total, dealer_total)
  if busted?(dealer_total)
    prompt "Dealer busted. Player wins!"
  elsif player_total > dealer_total
    prompt "Player wins #{player_total}:#{dealer_total}!"
  elsif dealer_total > player_total
    prompt "Dealer wins #{dealer_total}:#{player_total}!"
  else
    prompt "It's a tie!"
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

welcome_message
loop do
  player_hand = []
  dealer_hand = []
  player_total = 0
  dealer_total = 0
  deck = initialize_deck
  shuffling_deck
  deal(deck, player_hand, dealer_hand)
  display_dealer_one(dealer_hand)

  loop do
    player_total = calculate_total(player_hand)
    display_all("Player", player_hand)
    display_total("Player", player_total)
    break if busted?(player_total) || hit_21?(player_total)
    action = request_action
    action = request_valid_action unless valid_action?(action)
    break if ['s', 'stay'].include?(action)
    draw_message
    draw_card(player_hand, deck)
    show_drawn("Player", player_hand)
  end

  player_result(player_total)
  if busted?(player_total)
    play_again? ? next : break
  end

  loop do
    dealer_total = calculate_total(dealer_hand)
    display_all("Dealer", dealer_hand)
    display_total("Dealer", dealer_total)
    break if dealer_total >= 17
    draw_message
    draw_card(dealer_hand, deck)
    show_drawn("Dealer", dealer_hand)
  end

  display_result(player_total, dealer_total)
  break unless play_again?
end

prompt "Thank you for playing Twenty-One!"
