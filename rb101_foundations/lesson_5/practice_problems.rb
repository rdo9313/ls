#1
arr.map(&:to_i).sort.reverse

#2
books.sort do |a,b|
  a[:published].to_i <=> b[:published].to_i
end

#3
arr1[-1][-1][-1]
arr2[1][:third][0]
arr3[2][:third][0][0]
hsh1["b"][1]
hsh2[:third].key(0)

#4
arr1[1][1] = 4
arr2[-1] = 4
hsh1[:first][2][0] = 4
hsh2[["a"]][:a][2] = 4

#5
sum = 0
munsters.each_value { |v| sum += v["age"] if v["gender"] == "male" }

#6
munsters.each do |k,v|
  p "#{k} is a #{v["age"]}-year-old (#{v["gender"]})"
end

#7
a = 4
b = [3,8]

#8
vowels = 'aeiou'

hsh.each_value do |v|
  v.each do |str|
    str.chars.each do |char|
      p char if vowels.include?(char)
    end
  end
end

#9
arr.map do |sub|
  sub.sort do |a,b|
    b <=> a
  end
end

#10
arr = [{a: 1}, {b: 2, c: 3}, {d: 4, e: 5, f: 6}]

arr.map do |hash|
  new = {}
  hash.each do |k,v|
    new[k] = v + 1
  end
  new
end

#11
arr = [[2], [3, 5, 7], [9], [11, 13, 15]]

arr.map do |array|
  array.select { |i| i % 3 == 0 }
end

#12
arr = [[:a, 1], ['b', 'two'], ['sea', {c: 3}], [{a: 1, b: 2, c: 3, d: 4}, 'D']]

hash = {}

arr.each do |array|
  hash[array[0]] = array[1]
end
hash

#13
arr = [[1, 6, 7], [1, 4, 9], [1, 8, 3]]

arr.sort_by { |array| array.select { |n| n.odd? } }

#14
hsh = {
  'grape' => {type: 'fruit', colors: ['red', 'green'], size: 'small'},
  'carrot' => {type: 'vegetable', colors: ['orange'], size: 'medium'},
  'apple' => {type: 'fruit', colors: ['red', 'green'], size: 'medium'},
  'apricot' => {type: 'fruit', colors: ['orange'], size: 'medium'},
  'marrow' => {type: 'vegetable', colors: ['green'], size: 'large'},
}

arr = []
hsh.each_value do |v|
  if v[:type] == 'fruit'
    arr << v[:colors].map(&:capitalize)
  else
    arr << v[:size].upcase
  end
end

#15
arr = [{a: [1, 2, 3]}, {b: [2, 4, 6], c: [3, 6], d: [4]}, {e: [8], f: [6, 10]}]

arr.select do |hsh|
  hsh.all? do |_ , v|
    v.all? do |n|
      n.even?
    end
  end
end

#16
UUID = %w(0 1 2 3 4 5 6 7 8 9 a b c d e f)

def generate_uuid
  random = ""
  sections = [8,4,4,4,12]
  sections.each_with_index do |section, idx|
    section.times { random << UUID.sample }
    random << "-" unless idx >= sections.size - 1
  end
  random
end

generate_uuid
