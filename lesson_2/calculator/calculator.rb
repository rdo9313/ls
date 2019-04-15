require 'yaml'
MESSAGES = YAML.load_file('calculator_messages.yml')

def prompt(message)
  puts("=> #{message}")
end

def valid_number?(num)
  /^\d+$/.match(num)
end

def operation_to_message(op)
  case op
  when "1"
    "Adding"
  when "2"
    "Subtracting"
  when "3"
    "Multiplying"
  when "4"
    "Dividing"
  end
end

prompt(MESSAGES["welcome"])

name = ''
loop do
  name = gets.chomp

  if name.empty?
    prompt(MESSAGES["valid_name"])
  else
    break
  end
end

prompt("Hi #{name}!")

loop do # main loop
  num1 = ""
  loop do
    prompt(MESSAGES["first_number"])
    num1 = gets.chomp

    if valid_number?(num1)
      break
    else
      prompt(MESSAGES["invalid_number"])
    end
  end

  num2 = ""
  loop do
    prompt(MESSAGES["second_number"])
    num2 = gets.chomp

    if valid_number?(num2)
      break
    else
      prompt(MESSAGES["invalid_number"])
    end
  end
  operator_prompt = <<-MSG
    What operation would you like to perform?
    1) add
    2) subtract
    3) multiply
    4) divide
  MSG
  prompt(operator_prompt)

  operator = ""
  loop do
    operator = gets.chomp

    if %w(1 2 3 4).include?(operator)
      break
    else
      prompt(MESSAGES["invalid_operator"])
    end
  end

  prompt("#{operation_to_message(operator)} the two numbers...")
  result = case operator
           when "1"
             num1.to_i + num2.to_i
           when "2"
             num1.to_i - num2.to_i
           when "3"
             num1.to_i * num2.to_i
           when "4"
             num1.to_f / num2.to_f
           end

  prompt("The result is #{result}")
  prompt(MESSAGES["go_again"])
  answer = gets.chomp
  break unless answer.downcase.start_with?("y")
end

prompt(MESSAGES["thank_you"])
