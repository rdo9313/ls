#1 ASCII String Value
def ascii_value(str)
  sum = 0
  str.chars.each { |char| sum += char.ord }
  sum
end

#2 After Midnight Part 1
MPH = 60
HPD = 24
MPD = MPH * HPD

def time_of_day(int)
  day, minutes = int.divmod(MPD)
  hours, minutes = minutes.divmod(MPH)
  format("%02d:%02d", hours, minutes)
end

#3 After Midnight Part 2
def after_midnight(time)
  hours, minutes = time.split(":")
  hours = hours.to_i % 24
  hours * 60 + minutes.to_i
end

def before_midnight(time)
  result = MPD - after_midnight(time)
  result = 0 if result == MPD
  result
end

#4 Letter Swap
def swap(str)
  p str.split(" ").map { |word| swapping(word) }.join(" ")
end

def swapping(word)
  word[0], word[-1] = word[-1], word[0]
  word
end

#5 Clean up the words
def cleanup(str)
  arr = []
  str.gsub(/[^a-zA-Z]/," ").chars.each do |char|
    if char == " "
      arr << char if arr.last != " "
    else
      arr << char
    end
  end
  arr.join
end

#6 Letter Counter Part 1
def word_sizes(str)
  hash = Hash.new(0)
  str.split(" ").each { |word| hash[word.size] += 1 }
  hash
end

#7 Letter Counter Part 2
def word_sizes(str)
  hash = Hash.new(0)
  str.split(" ").each do |word|
    count = word.delete "^a-zA-Z"
    hash[count.size] += 1
  end
  hash
end

#8 Alphabetical Numbers
WORDS = %w(zero one two three four
                  five six seven eight nine
                  ten eleven twelve thirteen fourteen
                  fifteen sixteen seventeen eighteen nineteen)

def alphabetic_number_sort(arr)
  arr.sort_by { |num| WORDS[num] }
end

#9 daily double
def crunch(str)
  array = []
  str.chars.each do |char|
    array << char if array.last != char
  end
  array.join
end

#10 Bannerizer
def print_in_box(str)
  size = str.size + 2
  puts "+#{"-" * size}+"
  puts "|#{" " * size}|"
  puts "| #{str} |"
  puts "|#{" " * size}|"
  puts "+#{"-" * size}+"
end

#11 Spin Me Around in Circles
Different object as soon as split method is used.
