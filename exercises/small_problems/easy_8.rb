#1 Sum of Sums
def sum_of_sums(arr)
sum = 0
count = arr.size
  count.times do |idx|
    sum += arr[idx] * count
    count -= 1
  end
sum
end

#2 Madlibs
p "Enter a noun:"
noun = gets.chomp
p "Enter a verb:"
verb = gets.chomp
p "Enter an adjective:"
adj = gets.chomp
p "Enter an adverb:"
adv = gets.chomp

p "Do you #{verb} your #{adj} #{noun} #{adv}? That's hilarious!"

#3 Leading Substrings
def substrings_at_start(str)
  arr = []
  max = str.size
  count = 1

  loop do
    arr << str[0,count]
    break if count == max
    count += 1
  end
  arr
end

#4 All Substrings
def substrings(str)
  arr = []
  start = 0
  max = str.size - 1
  loop do
    arr << substrings_at_start(str[start..max])
    break if start == max
    start += 1
  end
  arr.flatten
end

#5 Palindromic Substrings
def palindromes(str)
  arr = substrings(str)
  arr.select { |el| el.size > 1 && el == el.reverse }
end

#6 FizzBuzz
def fizzbuzz(a, b)
  (a..b).each do |i|
    if i % 15 == 0
      p "FizzBuzz"
    elsif i % 5 == 0
      p "Buzz"
    elsif i % 3 == 0
      p "Fizz"
    else
      p i
    end
  end
end

#7 Double Char Part 1
def repeater(str)
  new = ""
  str.chars.each { |char| new << char * 2 }
  new
end

#8 Double Char Part 2
CONSONANTS = %w(b c d f g h j k l m n p q r s t v w x y z)

def double_consonants(string)
  result = ''
  string.each_char do |char|
    result << char
    result << char if CONSONANTS.include?(char.downcase)
  end
  result
end

#9 Convert number to reversed array of digits
def reversed_number(num)
  num.to_s.reverse.to_i
end

# Get the Middle Character
def center_of(str)
  index = str.size / 2
  str.size.odd? ? str[index] : str[index-1,2]
end
