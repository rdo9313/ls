class Player
  def initialize
  end

  def hit
  end

  def stay
  end

  def busted?
  end

  def total
  end
end

class Dealer
  def initialize
  end

  def deal
  end

  def hit
  end

  def stay
  end

  def busted?
  end

  def total
  end
end

class Participant
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
  def start
    deal_cards
    show_initial_cards
    player_turn
    dealer_turn
    show_result
  end
end

Game.new.start
