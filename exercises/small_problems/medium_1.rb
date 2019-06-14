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
