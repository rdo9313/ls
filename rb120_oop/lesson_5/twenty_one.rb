=begin
Twenty-One is a card game consisting of a dealer and a player, where the participants try to get as close to 21 as possible without going over.

Here is an overview of the game:
- Both participants are initially dealt 2 cards from a 52-card deck.
- The player takes the first turn, and can "hit" or "stay".
- If the player busts, he loses. If he stays, it's the dealer's turn.
- The dealer must hit until his cards add up to at least 17.
- If he busts, the player wins. If both player and dealer stays, then the highest total wins.
- If both totals are equal, then it's a tie, and nobody wins.
=end

require 'byebug'
module Hand
  def show_hand
    puts "#{name}'s Hand:"
    cards.each do |card|
      puts "=> #{card}"
    end
    puts "=> Total: #{total}"
    puts ""
  end

  def total
    total = 0
    cards.each do |card|
      if card.ace?
        total += 11
      elsif card.jack? || card.queen? || card.king?
        total += 10
      else
        total += card.value.to_i
      end
    end

    cards.select(&:ace?).count.times do
      break if total <= 21
      total -= 10
    end
    total
  end

  def add_card(card)
    cards << card
  end

  def busted?
    total > 21
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
      break unless name.size < 3
      puts "Sorry, name must be at least three characters."
    end
    self.name = name
  end

  def show_flop
    show_hand
  end
end

class Dealer < Participant
  def set_name
    self.name = 'DeepMind'
  end

  def show_flop
    puts "#{name}'s Hand:"
    puts "=> #{cards.first}"
    puts "=> ?? "
    puts ""
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
  SUITS = %w(D S H C)
  VALUES = %w(2 3 4 5 6 7 8 9 10 J Q K A)

  def initialize(suit, value)
    @suit = suit
    @value = value
  end

  def to_s
    "#{value} of #{suit}"
  end

  def suit
    case @suit
    when 'D' then 'Diamonds'
    when 'S' then 'Spades'
    when 'H' then 'Hearts'
    when 'C' then 'Clubs'
    end
  end

  def value
    case @value
    when 'J' then 'Jack'
    when 'Q' then 'Queen'
    when 'K' then 'King'
    when 'A' then 'Ace'
    else @value
    end
  end

  def ace?
    value == 'Ace'
  end

  def king?
    value == 'King'
  end

  def queen?
    value == 'Queen'
  end

  def jack?
    value == 'Jack'
  end
end

class Game
  attr_accessor :deck, :dealer, :player

  def initialize
    @deck = Deck.new
    @dealer = Dealer.new
    @player = Player.new
  end

  def continue
    puts "Press enter to continue:"
    gets
  end

  def greeting
    system 'clear'
    puts "Welcome to Twenty-One! This is a simplified version of the very
    popular card game called Blackjack. Have fun!"
    puts ''
    continue
  end

  def player_turn
    loop do
      puts "Would you like to (h)it or (s)tay?"
      answer = nil
      loop do
        answer = gets.chomp.downcase
        break if ['h', 'hit', 's', 'stay'].include?(answer)
        puts "Sorry, not a valid response."
      end
      system 'clear'
      if answer == "s" || answer == "stay"
        puts "#{player.name} stays!"
        continue
        system 'clear'
        break
      elsif player.busted?
        break
      else
        puts "#{player.name} hits!"
        continue
        player.add_card(deck.deal_one)
        system 'clear'
        player.show_hand
        break if player.busted?
      end
    end
  end

  def dealer_turn
    loop do
      dealer.show_hand
      sleep 1
      break if dealer.total > 16
      puts "#{dealer.name} draws a card."
      sleep 1
      dealer.add_card(deck.deal_one)
    end
  end

  def show_busted
    if player.busted?
      puts "#{player.name} busted! #{dealer.name} wins!"
    elsif dealer.busted?
      puts "#{dealer.name} busted! #{player.name} wins!"
    end
  end

  def play_again?
    puts "Would you like to play again? (y or n)"
    answer = nil
    loop do
      answer = gets.chomp.downcase
      break if ['y', 'n'].include?(answer)
      puts "Sorry, not a valid response."
    end
    answer == 'y'
  end

  def reset
    self.deck = Deck.new
    player.cards = []
    dealer.cards = []
  end

  def show_hands
    system 'clear'
    player.show_hand
    dealer.show_hand
  end

  def start
    greeting
    loop do
      system 'clear'
      deal_cards
      show_flop

      player_turn
      if player.busted?
        show_busted
        if play_again?
          reset
          next
        else
          break
        end
      end

      dealer_turn
      continue
      system 'clear'
      if dealer.busted?
        show_busted
        if play_again?
          reset
          next
        else
          break
        end
      end

      show_hands
      determine_result
      play_again? ? reset : break
    end
  end

  def deal_cards
    system 'clear'
    puts "Shuffling and dealing cards..."
    2.times do
      dealer.add_card(deck.deal_one)
      player.add_card(deck.deal_one)
    end
    sleep 3
  end

  def show_flop
    system 'clear'
    player.show_flop
    sleep 1
    dealer.show_flop
  end

  def show_hands
    system 'clear'
    player.show_hand
    sleep 1
    dealer.show_hand
    sleep 1
  end

  def determine_result
    if player.total > dealer.total
      puts "#{player.name} wins!"
    elsif dealer.total > player.total
      puts "#{dealer.name} wins!"
    else
      puts "It's a tie!"
    end
  end
end

Game.new.start
