#1 Rotation Part 1
def rotate_array(arr)
  arr[1..-1] + [array[0]]
end

# Rotation Part 2
def rotate_rightmost_digits(num, n)
  array = num.to_s.chars
  new = array[0, array.size - n] + rotate_array(array[array.size - n, n])
  new.join.to_i
end

#3 Rotation Part 3
def max_rotation(num)
  start = num.to_s.size
  loop do
    num = rotate_rightmost_digits(num, start)
    start -= 1
    break if start < 2
  end
  num
end

#4 1000 Lights
def thousand_lights(num)
  lights = Hash.new()
  1.upto(num) { |i| lights[i] = false }
  1.upto(num) do |i|
    toggle_every_nth_light(lights, i)
  end
  lights.select { |k,v| v }.keys
end

def toggle_every_nth_light(lights, n)
  lights.each do |num, bool|
    lights[num] = !bool if num % n == 0
  end
  lights
end

#5 Diamonds!
def diamond(num)
  space = num / 2 + 1

  1.upto(num) do |i|
    if i.odd?
      space -= 1
      puts " " * space + "*" * i
    end
  end

  (num-2).downto(1) do |i|
    if i.odd?
      space += 1
      puts " " * space + "*" * i
    end
  end
end

#6 Stack Machine Interpretation
def minilang(str)
  stack = []
  register = 0

  commands = str.split(" ")
  commands.each do |cmd|
    case cmd
      when "PUSH"
        stack.push(register)
      when "ADD"
        register += stack.pop
      when "SUB"
        register -= stack.pop
      when "MULT"
        register *= stack.pop
      when "DIV"
        register /= stack.pop
      when "MOD"
        register = register % stack.pop
      when "POP"
        register = stack.pop
      when "PRINT"
        puts register
      else
        register = cmd.to_i
    end
  end
end

#7 Word to Digit
NUMBERS = {"zero"=> "0", "one"=> "1", "two"=> "2", "three"=> "3", "four"=> "4", "five"=> "5", "six"=> "6", "seven"=> "7", "eight"=> "8", "nine"=> "9"}

def word_to_digit(str)
  NUMBERS.keys.each do |word|
    str.gsub!(/\b#{word}\b/, NUMBERS[word])
  end
  str
end

#8 Fibonacci NUMBERS (Recursion)
def fibonacci(n)
  return 1 if n < 3
  fibonacci(n-1) + fibonacci(n-2)
end

#9 Fibonacci Numbers (Procedural)
def fibonacci(nth)
  first, last = [1, 1]
  3.upto(nth) do
    first, last = [last, first + last]
  end
  last
end

#10 Fibonacci Numbers (Last Digit)
def fibonacci_last(nth)
  fibonacci(nth).to_s[-1].to_i
end
