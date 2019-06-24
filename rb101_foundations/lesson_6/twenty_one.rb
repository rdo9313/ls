require 'pry'

SUITS = %w(d s h c)
VALUES = %w(2 3 4 5 6 7 8 9 10 J Q K A)

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
  user << deck.sample(2)
  dealer << deck.sample(2)
end

def display(hand)
  p hand.size
end

def request_action(hand)
  prompt "You have #{display(hand)}."
end

user_hand = []
dealer_hand = []
deck = initialize_deck
deal(deck, user_hand, dealer_hand)
p user_hand
request_action(user_hand)
