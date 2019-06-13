#1 Cute angles
def dms(angle)
  seconds = (angle * SPD).round
  degrees, seconds = seconds.divmod(SPD)
  minutes, seconds = seconds.divmod(SPM)
  format(%(#{degrees}#{DEGREE}%02d'%02d"),minutes, seconds)
end

#2 Delete vowels
def remove_vowels(arr)
  arr.map { |word| word.delete "aeiouAEIOU" }
end

#3 Fibonacci Number Location By Length
def find_fibonacci_index_by_length(num)
  first = 1
  second = 1
  index = 2

  loop do
    index += 1
    fibonacci = first + second
    break if fibonacci.to_s.size >= num
    first = second
    second = fibonacci
  end
  index
end

#4 Reversed Arrays Part 1
def reverse!(arr)
  b = -1
  freq = arr.size / 2

  freq.times do |idx|
    arr[idx], arr[b] = arr[b], arr[idx]
    b -= 1
  end
  arr
end

#5 Reversed Arrays Part 2
def reverse(arr)
  new = []
  arr.each { |el| new.unshift(el) }
  new
end

#6 Combining Arrays
def merge(arr1, arr2)
  arr1.concat(arr2).flatten.uniq
end

#7 Halvsies
def halvsies(arr)
  half = (arr.size / 2.0).ceil
  arr1 = arr.slice(0, half)
  arr2 = arr.slice(half..-1)
  [arr1, arr2]
end

#8 Find the Duplicate
def find_dup(arr)
  arr.find { |i| arr.count(i) == 2 }
end

#9 Does My List Include This?
def include?(arr, int)
  arr.find { |i| return true if i == int }
  false
end

#10 Right Triangles
def triangle(num)
  space = num - 1
  count = 1

  num.times do
    puts " " * space + "*" * count
    count += 1
    space -= 1
  end
end
