# Q1
10.times { |i| p " " * i + "The Flinstones Rock!" }

# Q2
puts "the value of 40 + 2 is " + (40 + 2)
Can not concatenate a string and integer types.

1. puts "the value of 40 + 2 is " + (40 + 2).to_s
2. puts "the value of 40 + 2 is #{(40 + 2)}"

# Q3
while divisor > 0 do
  factors << number / divisor if number % divisor == 0
  divisor -= 1
end

# Q4
First rolling buffer mutates the input, the second does not.

# Q5
Must pass in limit variable to fib method since it is not in the method scope.

# Q6
def new_method(a_string_param, an_array_param)
  a_string_param += "rutabaga"
  an_array_param += ["rutabaga"]

  return a_string_param, an_array_param
end

# Q7
34

# Q8
Yes. The hash being passed into the method is being passed by reference and any changes made directly mutates that object.

# Q9
"paper"

# Q10
"no"
