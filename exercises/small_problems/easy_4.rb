#1 Short Long Short
def short_long_short(str1, str2)
  if str1.length > str2.length
    str2 + str1 + str2
  else
    str1 + str2 + str1
  end
end

#2 What Century is That?
def century(yr)
  century = yr / 100 + 1
  century -= 1 if yr % 100 == 0
  century.to_s + suffix(century)
end

def suffix(century)
  century = century % 100
  return 'th' if [11,12,13].include?(century)
  ones = century % 10

  case ones
    when 1 then 'st'
    when 2 then 'nd'
    when 3 then 'rd'
    else 'th'
  end
end

#3 Leap Years Part 1
def leap_year?(yr)
  (yr % 4 == 0 && yr % 100 != 0) || (yr % 400 == 0)
end

#4 Leap Years Part 2
def leap_year?(yr)
  if yr >= 1752
    (yr % 4 == 0 && yr % 100 != 0) || (yr % 400 == 0)
  else
    yr % 4 == 0
  end
end

#5 Multiples of 3 and 5
def multisum(int)
  sum = 0
  count = 1
  loop do
    break if count > int
    sum += count if multiple(count)
    count += 1
  end
  sum
end

def multiple(int)
  int % 5 == 0 || int % 3 == 0
end

#6 Running Totals
def running_total(arr)
  sum = 0
  arr.map { |el| sum += el }
end

#7 Convert a String to a Number!
DIGITS = {
  '0' => 0, '1' => 1, '2' => 2, '3' => 3, '4' => 4,
  '5' => 5, '6' => 6, '7' => 7, '8' => 8, '9' => 9
}

def string_to_integer(str)
sum = 0
  str.chars.each do |el|
    sum = DIGITS[el] + (10 * sum)
  end
sum
end

#8 Convert a String to a Signed Number!
def string_to_signed_integer(str)
  sign = str[0]
  case sign
  when '-'
    string_to_integer(str[1..-1]) * -1
  when '+'
    string_to_integer(str[1..-1])
  else
    string_to_integer(str)
  end
end

#9 Convert a Number to a String!
DIGITS = %w(0 1 2 3 4 5 6 7 8 9)

def integer_to_string(int)
  number = []
  loop do
    int, ones = int.divmod(10)
    number.unshift(DIGITS[ones])
    break if int == 0
  end
  number.join
end

#10 Convert a Signed Number to a String!
def signed_integer_to_string(num)
  if num < 0
    "-" + integer_to_string(-num)
  elsif num > 0
    "+" + integer_to_string(num)
  else
    "0"
  end
end
