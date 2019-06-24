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

def display_user(hand)
  cards = ""
  hand.each { |card| cards << card.join + " " }
  prompt "You have #{cards.strip}."
end

def display_dealer(hand)
  prompt "Dealer has #{hand[0].join} and an unknown card."
end

def display_total(hand)
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

def request_action
  prompt "Would you like to (h)it or (s)tay?"
  gets.chomp.downcase
end

def request_valid_action(action)
  loop do
    prompt "Please input a valid action:"
    action = gets.chomp.downcase
    break if VALID_CHOICES.include?(action)
  end
  action
end

def valid_action?(action)
  VALID_CHOICES.include?(action)
end

loop do
  deck = initialize_deck
  user_hand = []
  dealer_hand = []
  deal(deck, user_hand, dealer_hand)
  loop do
    display_user(user_hand)
    display_dealer(dealer_hand)
    display_total(user_hand)
    action = request_action
    request_valid_action(action) if !valid_action?(action)
    if action == "h" || action == "hit"
      user_hand << deck.pop
    end
  end
end
