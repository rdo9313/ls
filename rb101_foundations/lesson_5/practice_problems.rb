#1
arr.map(&:to_i).sort.reverse

#2
books.sort do |a,b|
  a[:published].to_i <=> b[:published].to_i
end

#3
