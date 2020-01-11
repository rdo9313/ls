module Hand
  MAX_VALUE = 21
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
      break if total <= MAX_VALUE
      total -= 10
    end
    total
  end

  def add_card(card)
    cards << card
  end

  def busted?
    total > MAX_VALUE
  end
end

class Participant
  include Hand
  attr_accessor :name, :cards, :score

  def initialize
    @cards = []
    @score = 0
    set_name
  end
end

class Player < Participant
  def show_flop
    show_hand
  end

  private

  def set_name
    name = ''
    loop do
      puts "What's your name?"
      name = gets.chomp.strip
      break unless name.size < 3
      puts "Sorry, name must be at least three characters."
    end
    self.name = name
  end
end

class Dealer < Participant
  def show_flop
    puts "#{name}'s Hand:"
    puts "=> #{cards.first}"
    puts "=> ?? "
    puts ""
  end

  private

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
    @cards.shuffle!
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
  DEALER_MIN = 17
  NUM_OF_WINS = 3
  attr_accessor :deck, :dealer, :player

  def initialize
    system 'clear'
    @deck = Deck.new
    @dealer = Dealer.new
    @player = Player.new
  end

  def start
    greeting
    loop do
      reset_score
      play_round
      break unless play_again?
    end
  end

  private

  def play_round
    loop do
      shuffle_and_deal

      player_turn
      if player.busted?
        calculate_and_display_result
        break if game_over?
        next
      end

      dealer_turn

      show_hands
      calculate_and_display_result
      break if game_over?
    end
  end

  def calculate_and_display_result
    determine_result
    update_score
    display_winner
  end

  def game_over?
    player.score >= NUM_OF_WINS || dealer.score >= NUM_OF_WINS
  end

  def shuffle_and_deal
    reset
    deal_cards
    show_flop
  end

  def continue
    puts "Press enter to continue:"
    gets
  end

  def greeting
    system 'clear'
    puts "Welcome to Twenty-One! This is a simplified version of the very
    popular card game called Blackjack. First to 3 wins. Have fun!"
    puts ''
    continue
  end

  def request_action
    answer = nil
    loop do
      puts "Would you like to (h)it or (s)tay?"
      answer = gets.chomp.downcase
      break if ['h', 'hit', 's', 'stay'].include?(answer)
      puts "Sorry, not a valid response."
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
      break if dealer.total >= DEALER_MIN
      puts "#{dealer.name} draws a card."
      sleep 1
      dealer.add_card(deck.deal_one)
    end
    continue
    system 'clear'
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
    dealer_total = dealer.total
    player_total = player.total
    output = if dealer.busted?
               "#{dealer_name} busted! #{player_name} wins!"
             elsif player.busted?
               "#{player_name} busted! #{dealer_name} wins!"
             elsif player_total > dealer_total
               "#{player_name} wins!"
             elsif dealer_total > player_total
               "#{dealer_name} wins!"
             else
               "It's a tie!"
             end
    puts output
  end

  def reset_score
    player.score = 0
    dealer.score = 0
  end

  def calibrate(total)
    total > Hand::MAX_VALUE ? (total % Hand::MAX_VALUE) : total
  end

  def update_score
    player_total = calibrate(player.total)
    dealer_total = calibrate(dealer.total)
    if dealer.busted? || (player_total > dealer_total)
      player.score += 1
    elsif player.busted? || (dealer_total > player_total)
      dealer.score += 1
    end
  end

  def display_score
    player_score = player.score
    dealer_score = dealer.score
    output = if player_score > dealer_score
               "#{player.name} is winning #{player_score}:#{dealer_score}!"
             elsif dealer_score > player_score
               "#{dealer.name} is winning #{dealer_score}:#{player_score}!"
             else
               "The score is tied #{player_score}:#{dealer_score}!"
             end
    puts output
    continue
  end

  def display_winner
    player_score = player.score
    dealer_score = dealer.score
    if player_score >= NUM_OF_WINS
      puts "#{player.name} wins #{player_score}:#{dealer_score}!"
    elsif dealer_score >= NUM_OF_WINS
      puts "#{dealer.name} wins #{dealer_score}:#{player_score}!"
    else
      display_score
    end
  end
end

Game.new.start
