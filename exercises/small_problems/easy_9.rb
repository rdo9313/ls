#1 Welcome Stranger
def greetings(arr, hash)
  name = arr.join(" ")
  p "Hello, #{name}! Nice to have a #{hash[:title]} #{hash[:occupation]} around."
end

#2 Double Doubles
def twice(num)
  is_double?(num) ? num : num * 2
end

def is_double?(num)
  string = num.to_s
  half = string.size / 2
  if string.size.even? && string.size > 1
    return true if string[0,half] == string[half..-1]
  end
  false
end

#3 Always Return Negative
def negative(num)
  num <= 0 ? num : num * -1
end

#4 Counting Up
def sequence(num)
  1.upto(num).to_a
end

#5 Uppercase Check
def uppercase?(str)
  str == str.upcase
end

#6 How long are you?
def word_lengths(str)
  str.split(" ").map { |word| word + " #{word.size}" }
end

#7 Name Swapping
def swap_name(name)
  name.split(" ").reverse.join(", ")
end

#8 Sequence Count
def sequence(count, first)
  arr = []
  placeholder = first
  count.times do |i|
    arr << first
    first += placeholder
  end
  arr
end

#9 Grade book
def get_grade(a, b, c)
  average = (a + b + c) / 3.0
  case average
    when (90..100) then "A"
    when (80...90) then "B"
    when (70...80) then "C"
    when (60...70) then "D"
    else "F"
  end
end

#10 Grocery List
def buy_fruit(arr)
  array = []
  arr.each do |pair|
    pair.last.times do
      array << pair.first
    end
  end
  array
end
