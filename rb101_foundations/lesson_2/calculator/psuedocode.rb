# method that returns the sums of two integers
# informal
# Given two integers, use the addition operator to determine the sum.

# formal
# START
# SET num1 = first given integer
# SET num2 = second given integer
# IF num1.class = integer class && num2.class = integer class
  # PRINT num1 + num2
# ELSE
# PRINT "not a number"
# END

# method that takes an array of strings, and returns a string that is all those strings concatenated together
# informal
# Given an array of strings.
# Iterate through the array one by one.
# Save the first string as the starting value.
# for each iteration, use the addition operator to concatenate current string to starting string.
# At the last string of the array, return the final value.

# formal
# START
# Given an array of strings called "array"
# SET iterator = 1
# SET string_result = starting string
# WHILE iterator <= length of array
# SET current_string = string within array at current space iterator
# string_result += current_string
# iterator += 1
# PRINT string_result
# END

# method that takes an array of integers, and returns a new array with every other element
# informal
# Given an array of integers.
# Iterate through array one by one.
# Create a iterator count and create a new array everytime the iterator count is odd
# Input the current element into new array
# Return all elements
