#1 Longest Sentence
def longest_sentence(str)
  sentences = str.scan(/[^.?!]+[.?!]/).map { |sentence|
    sentence.gsub("\n"," ").strip
  }
  sentences.map { |sentence| sentence.split(" ").count }.max
end

#2 Now I Know My ABCs
ABC = {"B" => "O", "X" => "K", "D" => "Q", "C" => "P", "N" => "A",
"G" => "T", "R" => "E", "F" => "S", "J" => "W", "H" => "U", "V" => "I",
"L" => "Y", "Z" => "M" }

def block_word?(str)
  dumpster = []
  str.upcase.chars.each do |char|
    if ABC.keys.include?(char)
      dumpster << char << ABC[char]
    elsif ABC.values.include?(char)
      dumpster << char << ABC.key(char)
    else
      dumpster << nil
    end
  end
   if dumpster.uniq.length == dumpster.length && !dumpster.include?(nil)
    return true
  end
  false
end

#3 Lettercase Percentage Ratio
LOWERCASE = ('a'..'z').to_a
UPPERCASE = ('A'..'Z').to_a

def letter_percentages(str)
  totals = {}
  lower = []
  upper = []
  neither = []
  str.chars.each do |char|
    if LOWERCASE.include?(char)
      lower << char
    elsif UPPERCASE.include?(char)
      upper << char
    else
      neither << char
    end
  end
  total_count = (lower.size + upper.size + neither.size).to_f
  totals["lowercase"] = (lower.size / total_count) * 100
  totals["uppercase"] = (upper.size / total_count) * 100
  totals["neither"] = (neither.size / total_count) * 100
  totals
end

#4 Matching Parentheses?
def balanced?(str)
  parens = 0

  str.chars.each do |char|
    parens += 1 if char == "("
    parens -= 1 if char == ")"
    break if parens < 0
  end
  parens.zero?
end

#5 Triangle Sides
def triangle(a, b, c)
  sides = [a,b,c]
  max = sides.max

  if sides.include?(0) || max >= (sides.reduce(:+) - max)
    :invalid
  elsif a == b && b == c
    :equilateral
  elsif a == b || b == c || a == c
    :isosceles
  else
    :scalene
  end
end

#6 Tri-Angles
def triangle(a, b, c)
  angles = [a,b,c]

  if angles.reduce(:+) != 180 || angles.include?(0)
    :invalid
  elsif angles.include?(90)
    :right
  elsif angles.any? { |angle| angle > 90 }
    :obtuse
  else
    :acute
  end
end

#7 Unlucky Days
def friday_13th(yr)
  month = 1
  count = 0
  loop do
    count += 1 if Time.new(yr, month, 13).friday?
    month += 1
    break if month > 12
  end
  count
end

#8 Next Featured Number Higher than a Given Value
def featured(num)
  test = num + 1
  loop do
    if test.odd? && (test % 7 == 0) && test.to_s.chars.size == test.to_s.chars.uniq.size
      break
    else
      test += 1
    end
  end
  test
end

#9 Bubble Sort
def bubble_sort!(array)
  loop do
    swapped = false
    1.upto(array.size - 1) do |i|
      next if array[i-1] <= array[i]
      array[i-1], array[i] = array[i], array[i-1]
      swapped = true
    end
    break unless swapped
  end
end

#10 Sum Square - Square Sum
def sum_square_difference(num)
(1..num).reduce(:+) ** 2 - (1..num).reduce(0) { |sum, int| sum + int **2}
end
