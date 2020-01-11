# Question 1
ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 402, "Eddie" => 10 }
ages.key?("Spot")

# Question 2
munsters_description = "The Munsters are creepy in a good way."
munsters_description.swapcase!
munsters_description.capitalize!
munsters_description.downcase!
munsters_description.upcase!

# Question 3
ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 5843, "Eddie" => 10 }
additional_ages = { "Marilyn" => 22, "Spot" => 237 }
ages.merge!(additional_ages)

# Question 4
advice = "Few things in life are as important as house training your pet dinosaur."

advice.include?("Dino")

# Question 5
flintstones = ["Fred", "Barney", "Wilma", "Betty", "BamBam", "Pebbles"]
flintstones = %w(Fred Barney Wilma Betty BamBam Pebbles)

# Question 6
flintstones = %w(Fred Barney Wilma Betty BamBam Pebbles)
flintstones << "Dino"

# Question 7
flintstones.push("Dino").push("Hoppy")

# Question 8
advice = "Few things in life are as important as house training your pet dinosaur."
advice.slice!(0..38)

# Question 9
statement = "The Flintstones Rock!"
statement.count("t")

# Question 10
title = "Flintstone Family Members"
title.center(40)
