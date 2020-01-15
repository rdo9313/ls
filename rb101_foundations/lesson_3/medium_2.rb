# Q3
The string will return pumpkins while array will return ["pumpkins", "rutabaga"]. This is because reassignment is used for the string which does not mutate the passed in object, while the array that is passed in is met with the << operator, which is mutating.

# Q4
string will return pupmkinsratabaga, array will return ["pumpkins"].

# Q5
def color_valid
color == "blue" || color == "green"
end
