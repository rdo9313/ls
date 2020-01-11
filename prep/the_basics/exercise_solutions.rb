# 1. Add two strings together that, when concatenated, return your first and last name as your full name in one string.
"Ryan" + "Do"

# 2. Use the modulo operator, division, or a combination of both to take a 4 digit number and find the digit in the: 1) thousands place 2) hundreds place 3) tens place 4) ones place
1) 1234 / 1000
2) 1234 % 1000 / 100
3) 1234 % 100 / 10
4) 1234 % 10

# 3. Write a program that uses a hash to store a list of movie titles with the year they came out. Then use the puts command to make your program print out the year of each movie to the screen. The output for your program should look something like this.
movie_titles = { "limitless": 2011, "lucy": 2014, "source_code": 2011}
puts movie_titles[:limitless]
puts movie_titles[:lucy]
puts movie_titles[:source_code]

# 4. Use the dates from the previous example and store them in an array. Then make your program output the same thing as exercise 3.
array = [2011, 2014, 2011]
puts array[0]
puts array[1]
puts array[2]

# 5. Write a program that outputs the factorial of the numbers 5, 6, 7, and 8.
puts 5 * 4 * 3 * 2
puts 6 * 5 * 4 * 3 * 2
puts 7 * 6 * 5 * 4 * 3 * 2
ptus 8 * 7 * 6 * 5 * 4 * 3 * 2

# 6. Write a program that calculates the squares of 3 float numbers of your choosing and outputs the result to the screen.
puts 3.21 * 3.21
puts 4.56 * 4.56
puts 108.56 * 108.56

# 7. What does the following error message tell you?
# SyntaxError: (irb):2: syntax error, unexpected ')', expecting '}'
#   from /usr/local/rvm/rubies/ruby-2.0.0-rc2/bin/irb:16:in `<main>'

A closing hash tag should be used instead of a parenthesis
