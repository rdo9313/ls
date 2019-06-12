#1 Searching 101
p "Enter the 1st number:"
first = gets.chomp.to_i
p "Enter the 2nd number:"
second = gets.chomp.to_i
p "Enter the 3rd number:"
third = gets.chomp.to_i
p "Enter the 4th number:"
fourth = gets.chomp.to_i
p "Enter the 5th number:"
fifth = gets.chomp.to_i
p "Enter the last number:"
last = gets.chomp.to_i

arr = [first, second, third, fourth, fifth]
if arr.include?(last)
  p "The number #{last} appears in #{arr}."
else
  p "The number #{last} does not appear in #{arr}."
end

 #2 Arithmetic Integer
def prompt(message)
  puts "==> #{message}"
end

p "Enter the first number:"
first = gets.chomp.to_i
p "Enter the second number:"
second = gets.chomp.to_i

sum = first + second
difference = first - second
product = first * second
dividend = first / second
modulo = first % second
exponent = first ** second

prompt("#{first} + #{second} = #{sum}")
prompt("#{first} - #{second} = #{difference}")
prompt("#{first} * #{second} = #{product}")
prompt("#{first} / #{second} = #{dividend}")
prompt("#{first} % #{second} = #{modulo}")
prompt("#{first} ** #{second} = #{exponent}")

#3 Counting the Number of Characters
p "Please write word or multiple words:"
input = gets.chomp
clean = input.delete(" ").size

p "There are #{clean} characters in #{input}."

#4 Multiplying Two Numbers
def multiply(n1, n2)
  n1 * n2
end

#5 Squaring an Argument
def square(int)
  multiply(int, int)
end

#6 Exclusive Or
def xor?(a, b)
  (a == true && b == false) || (a == false && b == true) ? true : false
end

#7 Odd Lists
def oddities(arr)
  array = []
  arr.size.times do |idx|
    array << arr[idx] if idx.even?
  end
  array
end

#8 Palindromic Strings Part 1
def palindrome?(str)
  str == str.reverse
end

#9 Palindromic Strings Part 2
def real_palindrome?(str)
  clean = str.downcase.gsub(/[^a-zA-z0-9]/, "")
  clean == clean.reverse
end

#10 Palindromic Numbers
def palindromic_number?(int)
  int.to_s.chars == int.to_s.chars.reverse
end
