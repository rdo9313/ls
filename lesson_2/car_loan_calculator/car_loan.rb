# Car Loan Payment Calculator
def prompt(message)
  puts "=> #{message}"
end

def valid_number?(num)
  num.to_i != 0 && /\d/.match(num) && /^\d*\.?\d*$/.match(num)
end

def valid_integer?(integer)
  integer.to_i != 0 && /^\d+$/.match(integer)
end

prompt("Welcome! I will help you figure out your car loan payments.")

loop do
  loan_amt = ""
  prompt("First, I will need to know your loan amount:")
  loop do
    loan_amt = gets.chomp

    if valid_number?(loan_amt)
      loan_amt = loan_amt.to_f
      break
    else
      prompt("Not a valid loan amount. Try again:")
    end
  end

  monthly_rate = ""
  prompt("Next, I will need to know the APR of the loan (enter 3.2 for 3.2%):")
  loop do
    apr = gets.chomp

    if valid_number?(apr)
      monthly_rate = apr.to_f / 1200
      break
    else
      prompt("Not a valid APR. Try again:")
    end
  end

  loan_duration = ""
  prompt("Finally, I will need to know the loan duration in months:")
  loop do
    loan_duration = gets.chomp

    if valid_integer?(loan_duration)
      loan_duration = loan_duration.to_i
      break
    else
      prompt("Not a valid loan duration. Try again:")
    end
  end

  form = (loan_amt * (monthly_rate / (1 - (1 + monthly_rate)**-loan_duration)))
  monthly_payment = form.round(2)

  prompt("Processing information...")
  prompt("Your monthly payment will be $#{monthly_payment}")
  prompt("Do you want to calculate again? (Y to repeat, N to quit)")

  answer = gets.chomp
  break if answer.downcase == "n"

  valid_answer = ""
  while answer.downcase != "y"
    prompt("Enter Y to repeat, N to quit")
    valid_answer = gets.chomp
    break if valid_answer.downcase == "y" || valid_answer.downcase == "n"
  end

  break if valid_answer.downcase == "n"
end
prompt("----------------------------------------------------------------------")
prompt("Thank you for using the car loan calculator. Hope you found it useful!")
