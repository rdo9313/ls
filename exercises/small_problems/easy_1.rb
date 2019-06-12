#1 Repeat Yourself
def repeat(str, num)
  num.times do
    p str
  end
end

#2 Odd
def is_odd?(int)
  return int % 2 == 0 ? false : true
end

#3 List of Digits
def digit_list(int)
  int.to_s.chars.map(&:to_i)
end

#4 How Many?
def count_occurrences(arr)
  count = Hash.new(0)
  arr.each { |word| count[word] += 1 }
  count.each { |k,v| p "#{k} => #{v}" }
end

#5 Reverse It Part 1
def reverse_sentence(str)
  str.split.reverse.join(" ")
end

#6 Reverse It Part 2
def reverse_words(str)
  arr =  str.split.each { |word| word.reverse! if word.length >= 5 }
  arr.join(" ")
end

#7 Stringy Strings
def stringy(int)
  number = []
  int.times do |idx|
    digit = idx.even? ? 1 : 0
    number << digit
  end
  number.join
end

#8 Array Average
def average(arr)
  sum = arr.reduce(:+)
  sum / arr.size
end

#9 Sum of Digits
def sum(num)
  num.to_s.chars.map(&:to_i).reduce(:+)
end

#10 What's my Bonus?
def calculate_bonus(num, bool)
  bool ? num / 2 : 0
end
