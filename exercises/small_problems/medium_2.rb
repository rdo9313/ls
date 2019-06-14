#1 Longest Sentence
def longest_sentence(str)
  sentences = str.scan(/[^.?!]+[.?!]/).map { |sentence|
    sentence.gsub("\n"," ").strip
  }
  sentences.map { |sentence| sentence.split(" ").count }.max
end

#2 Now I Know My ABCs
ABC = {"B" => "O", "X" => "K", "D" => "Q", "C" => "P", "N" => "A",
"G" => "T", "R" => "E", "F" => "S", "J" => "W", "H" => "U", "V" => "I",
"L" => "Y", "Z" => "M" }

def block_word?(str)
  dumpster = []
  str.upcase.chars.each do |char|
    if ABC.keys.include?(char)
      dumpster << char << ABC[char]
    elsif ABC.values.include?(char)
      dumpster << char << ABC.key(char)
    else
      dumpster << nil
    end
  end
   if dumpster.uniq.length == dumpster.length && !dumpster.include?(nil)
    return true
  end
  false
end

#3 Lettercase Percentage Ratio
LOWERCASE = ('a'..'z').to_a
UPPERCASE = ('A'..'Z').to_a

def letter_percentages(str)
  totals = {}
  lower = []
  upper = []
  neither = []
  str.chars.each do |char|
    if LOWERCASE.include?(char)
      lower << char
    elsif UPPERCASE.include?(char)
      upper << char
    else
      neither << char
    end
  end
  total_count = (lower.size + upper.size + neither.size).to_f
  totals["lowercase"] = (lower.size / total_count) * 100
  totals["uppercase"] = (upper.size / total_count) * 100
  totals["neither"] = (neither.size / total_count) * 100
  totals
end
