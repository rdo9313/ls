#1 How old is Teddy?
p "Teddy is #{rand(20..200)} years old!"

#2 How big is the room?
p "Enter the length of the room in meters:"
length = gets.chomp
p "Enter the width of the room in meters:"
width = gets.chomp
square_meters = (length.to_f * width.to_f).round(2)
square_feet = (10.7639 * square_meters).round(2)
p "The area of the room is #{square_meters} square meters (#{square_feet} square feet)."

#3 Tip calculator
p "What is the bill?"
bill = gets.chomp.to_f
p "What is the tip percentage?"
tip_percent = gets.chomp.to_f / 100

tip = (bill * tip_percent).round(2)

p "The tip is $#{tip}"
p "The total is $#{bill + tip}"

#4 When will I Retire?
YEAR = Time.now.year

p "What is your age?"
age = gets.chomp.to_i
p "At what age would you like to retire?"
retire_age = gets.chomp.to_i

years_left = retire_age - age

p "It's #{YEAR}. You will retire in #{YEAR + years_left}. You only have #{years_left} years of work to go!"

#5 Greeting a user
p "What is your name?"
name = gets.chomp

if name.include?("!")
  p "HELLO #{name.upcase}. WHY ARE WE SCREAMING?"
else
  p "Hello #{name}."
end

#6 Odd Numbers
(1..99).each { |int| p int if int.odd? }

#7 Even Numbers
(1..99).each { |int| p int if int.even? }

#8 Sum or Product of Consecutive Integers
p "Please enter an integer greater than 0:"
int = gets.chomp.to_i
p "Enter 's' to computer the sum, 'p' to compute the product."
operator = gets.chomp

sum = (1..int).reduce(:+)
product = (1..int).reduce(:*)

if operator == "s"
  sum
elsif operator == "p"
  product
else
  "Not a valid choice."
end

#9 String Assignment
BOB
BOB

#10 Mutation
%w(Moe Larry CURLY SHEMP Harpo CHICO Groucho Zeppo)
