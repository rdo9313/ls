#1 Combine Two Lists
def interleave(a, b)
  a.zip(b).flatten
end

#2 Lettercase Counter
def letter_case_count(str)
  hash = Hash.new(0)
  hash[:lowercase] = str.count("a-z")
  hash[:uppercase] = str.count("A-Z")
  hash[:neither] = str.count("^a-zA-Z")
  hash
end

#3 Capitalize Words
def word_cap(str)
  str.split.map(&:capitalize).join(" ")
end

#4 Swap Case
def swapcase(str)
  a = str.chars.map do |i|
    if i == i.upcase
      i.downcase
    else
      i.upcase
    end
  end
  a.join
end

#5 Staggered Caps Part 1
def staggered_case(str)
  new = ""
  str.chars.each_with_index { |v, i|
    i.even? ? new.concat(v.upcase) : new.concat(v.downcase)
  }
  new
end

#6 Staggered Caps Part 2
def staggered_case(str)
  new = ""
  toggle = true
  str.chars.each do |char|
    if toggle
      new.concat(char.upcase)
    else
      new.concat(char.downcase)
    end
  toggle = !toggle unless char =~ /[^a-zA-Z]/
  end
  new
end

#7 Multiplicative Average
def show_multiplicative_average(arr)
  average = arr.reduce(:*) / arr.size.to_f
  format("%.3f", average)
end

#8 Multiply Lists
def multiply_list(a, b)
  a.zip(b).map { |arr| arr.reduce(:*) }
end

#9 Multiply All Pairs
def multiply_all_pairs(a, b)
  arr = []
  a.each do |i|
    b.each do |x|
      arr << i * x
    end
  end
  arr.sort
end

#10 The End is Near But Not Here
def penultimate(str)
  str.split(" ")[-2]
end
