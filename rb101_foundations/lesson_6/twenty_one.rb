require 'pry'

SUITS = %w(d s h c)
VALUES = %w(2 3 4 5 6 7 8 9 10 J Q K A)
VALID_CHOICES = %w(h s hit stay)

def prompt(msg)
  puts "=> #{msg}"
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

def dividing_line
  puts "------------------------------------------------------------------"
end

def welcome_message
  prompt "Welcome to Twenty-One! This is a simplified version of the very
  popular card game called Blackjack. Have fun!"
  dividing_line
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
    if value == "A"
      sum += 11
    elsif value.to_i == 0
      sum += 10
    else
      sum += value.to_i
    end
  end

  values.select { |value| value == "A" }.count.times do
    sum -= 10 if sum > 21
  end
  sum
end

def display_total(player, hand)
  prompt "#{player}'s hand total is #{calculate_total(hand)}."
  sleep 1
end

def request_action
  prompt "Would you like to (h)it or (s)tay?"
  dividing_line
  gets.chomp.downcase
end

def request_valid_action
  action = ''
  loop do
    prompt "Please input a valid action:"
    dividing_line
    action = gets.chomp.downcase
    break if VALID_CHOICES.include?(action)
  end
  action
end

def busted?(hand)
  calculate_total(hand) > 21
end

def hit_21?(hand)
  calculate_total(hand) == 21
end

def valid_action?(action)
  VALID_CHOICES.include?(action)
end

def play_again?
  answer = ""
  loop do
    prompt "Would you like to play again? ('y' or 'n'):"
    dividing_line
    answer = gets.chomp.downcase
    break if answer == "y" || answer == "n"
    prompt "Please enter a valid input ('y' or 'n'):"
    dividing_line
  end
  answer == "y"
end


welcome_message
loop do
  shuffling_deck
  deck = initialize_deck
  player_hand = []
  dealer_hand = []
  deal(deck, player_hand, dealer_hand)
  display_dealer_one(dealer_hand)
  loop do
    display_all("Player", player_hand)
    display_total("Player", player_hand)
    break if busted?(player_hand) || hit_21?(player_hand)
    action = request_action
    action = request_valid_action unless valid_action?(action)
    break if ['s', 'stay'].include?(action)
    prompt "Drawing a card..."
    sleep 1
    player_hand << deck.pop
    prompt "Player draws #{player_hand.last.join}."
    sleep 1
  end

  if busted?(player_hand)
    prompt "Player busted. Dealer wins!"
    break unless play_again?
    next
  elsif hit_21?(player_hand)
    prompt "Player hit the nuts (21 points). Great job!"
    dividing_line
    sleep 1
  else
    prompt "Player chose to stay!"
    dividing_line
    sleep 1
  end

  loop do
    display_all("Dealer", dealer_hand)
    display_total("Dealer", dealer_hand)
    break if calculate_total(dealer_hand) >= 17
    prompt "Drawing a card..."
    sleep 1
    dealer_hand << deck.pop
    prompt "Dealer draws #{dealer_hand.last.join}."
    sleep 1
  end

  if busted?(dealer_hand)
    prompt "Dealer busted. Player wins!"
  elsif calculate_total(player_hand) > calculate_total(dealer_hand)
    prompt "Player wins #{calculate_total(player_hand)}:#{calculate_total(dealer_hand)}!"
  elsif calculate_total(dealer_hand) > calculate_total(player_hand)
    prompt "Dealer wins #{calculate_total(dealer_hand)}:#{calculate_total(player_hand)}!"
  else
    prompt "It's a tie!"
  end
  break unless play_again?
end

prompt "Thank you for playing Twenty-One!"
