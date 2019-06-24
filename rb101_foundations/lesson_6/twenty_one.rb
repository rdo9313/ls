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

def deal(deck, user, dealer)
  2.times do
    user << deck.pop
    dealer << deck.pop
  end
end

def display_all(player, hand)
  cards = ""
  hand.each { |card| cards << card.join + " " }
  prompt "#{player} has #{cards.strip}."
end

def display_dealer_one(hand)
  prompt "Dealer has #{hand[0].join} and an unknown card."
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
end

def request_action
  prompt "Would you like to (h)it or (s)tay?"
  gets.chomp.downcase
end

def request_valid_action
  action = ''
  loop do
    prompt "Please input a valid action:"
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
    answer = gets.chomp.downcase
    break if answer == "y" || answer == "n"
    prompt "Please enter a valid input ('y' or 'n'):"
  end
  answer == "y"
end

loop do
  deck = initialize_deck
  user_hand = []
  dealer_hand = []
  deal(deck, user_hand, dealer_hand)
  display_dealer_one(dealer_hand)
  loop do
    display_all("Player", user_hand)
    display_total("Player", user_hand)
    break if busted?(user_hand) || hit_21?(user_hand)
    action = request_action
    action = request_valid_action unless valid_action?(action)
    break if ['s', 'stay'].include?(action)
    user_hand << deck.pop
  end

  if busted?(user_hand)
    prompt "Dealer wins!"
    break unless play_again?
  elsif hit_21?(user_hand)
    prompt "Player hit the nuts (21 points). Great job!"
  else
    prompt "Player chose to stay!"
  end

  loop do
    display_all("Dealer", dealer_hand)
    display_total("Dealer", dealer_hand)
    break if calculate_total(dealer_hand) >= 17
    dealer_hand << deck.pop
  end

end
