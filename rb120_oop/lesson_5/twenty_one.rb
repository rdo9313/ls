require 'byebug'
module Hand
  def add_card(card)
    cards << card
  end
end

class Participant
  include Hand
  attr_accessor :name, :cards

  def initialize
    @cards = []
    set_name
  end
end

class Player < Participant
  def set_name
    name = ''
    loop do
      puts "What's your name?"
      name = gets.chomp
      break unless name.empty?
      puts "Sorry, must enter a value."
    end
    self.name = name
  end
end

class Dealer < Participant
  def set_name
    self.name = 'DeepMind'
  end
end

class Deck
  attr_accessor :cards
  def initialize
    @cards = []
    Card::SUITS.each do |suit|
      Card::VALUES.each do |value|
        @cards << Card.new(suit, value)
      end
    end
    randomize!
  end

  def randomize!
    cards.shuffle!
  end

  def deal_one
    cards.pop
  end
end

class Card
  SUITS = %w(d s h c)
  VALUES = %w(2 3 4 5 6 7 8 9 10 J Q K A)
  def initialize(suit, value)
    @suit = suit
    @value = value
  end
end

class Game
  attr_accessor :deck, :dealer, :player

  def initialize
    @deck = Deck.new
    @dealer = Dealer.new
    @player = Player.new
  end

  def start
    deal_cards
    show_initial_cards
    player_turn
    dealer_turn
    show_result
  end

  def deal_cards
    2.times do
      dealer.add_card(deck.deal_one)
      player.add_card(deck.deal_one)
    end
  end
end

Game.new.start
