# 1
[1,2,3,4,5]

# 2
loop do
  name = gets.chomp
  while name != "stop"
    puts "Your name is #{name}!"
    name = gets.chomp
  end
end

# 3
array = [1,2,3,4,5]
array.each_with_index { |v, i| puts "index: #{i} val: #{v}"}

# 4
def count_to_zero(num)
  puts num
  num -= 1
  if num >= 0
    count_to_zero(num)
  end
end
