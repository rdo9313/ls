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
      total += if card.ace?
                 11
               elsif card.jack? || card.queen? || card.king?
                 10
               else
                 card.value.to_i
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
    system 'clear'
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

  def request_action
    puts "Would you like to (h)it or (s)tay?"
    gets.chomp.downcase
  end

  def validate_answer(answer)
    loop do
      break if ['h', 'hit', 's', 'stay'].include?(answer)
      puts "Sorry, not a valid response."
      answer = request_action
    end
    answer
  end

  def stay?(answer)
    answer == "s" || answer == "stay"
  end

  def player_stays
    puts "#{player.name} stays!"
    continue
    system 'clear'
  end

  def player_hits
    puts "#{player.name} hits!"
    new_card = deck.deal_one
    player.add_card(new_card)
    sleep 1
    puts "#{player.name} draws a #{new_card.value} of #{new_card.suit}."
    sleep 1
    continue
    system 'clear'
  end

  def player_turn
    loop do
      answer = request_action
      answer = validate_answer(answer)
      system 'clear'
      if stay?(answer)
        player_stays
        break
      elsif player.busted?
        break
      else
        player_hits
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
    continue
    system 'clear'
  end

  def show_busted
    puts "#{player.name} busted! #{dealer.name} wins!"
  end

  def play_again?
    puts "Would you like to play again? (y or n)"
    answer = nil
    loop do
      answer = gets.chomp.downcase
      break if ['y', 'yes', 'no', 'n'].include?(answer)
      puts "Sorry, not a valid response."
    end
    answer == 'y' || answer == 'yes'
  end

  def reset
    system 'clear'
    self.deck = Deck.new
    player.cards = []
    dealer.cards = []
  end

  def start
    greeting
    loop do
      reset
      deal_cards
      show_flop

      player_turn
      if player.busted?
        show_busted
        play_again? ? next : break
      end

      dealer_turn

      show_hands
      determine_result
      break unless play_again?
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
    dealer_name = dealer.name
    player_name = player.name
    output = if dealer.busted?
               "#{dealer_name} busted! #{player_name} wins!"
             elsif player.total > dealer.total
               "#{player_name} wins!"
             elsif dealer.total > player.total
               "#{dealer_name} wins!"
             else
               "It's a tie!"
             end
    puts output
  end
end

Game.new.start
