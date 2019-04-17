# Car Loan Payment Calculator
def prompt(message)
  puts "=> #{message}"
end

def play_again?(answer)
  if answer.downcase == "n"
    return false
  elsif answer.downcase == "y"
    return true
  end

  valid_answer = ""
  while answer.downcase != "y" || answer.downcase != "n"
    prompt("Enter Y to repeat, N to quit")
    valid_answer = gets.chomp
    break if valid_answer.downcase == "y" || valid_answer.downcase == "n"
  end

  valid_answer.downcase == "n" ? false : true
end

def valid_apr?(apr)
  apr.to_f.to_s != "0.0" && /\d/.match(apr) && /^\d*\.?\d*$/.match(apr)
end

def valid_loan_amt?(loan_amt)
  loan_amt.to_f.to_s != "0.0" &&
    /\d/.match(loan_amt) && /^\d*\.?\d*$/.match(loan_amt)
end

def valid_duration?(integer)
  integer.to_i != 0 && /^\d+$/.match(integer)
end

def display_welcome
  prompt("Welcome! I will help you figure out your car loan payments.")
end

def display_invalid_loan_amt
  prompt("Not a valid loan amount. Try again:")
end

def display_invalid_apr
  prompt("Not a valid APR. Try again:")
end

def display_invalid_duration
  prompt("Not a valid loan duration. Try again:")
end

def request_loan_amt
  prompt("First, I will need to know your loan amount:")
end

def request_apr
  prompt("Next, I will need to know the APR of the loan (enter 3.2 for 3.2%):")
end

def request_duration
  prompt("Finally, I will need to know the loan duration in months:")
end

def request_replay
  prompt("Do you want to calculate again? (Y to repeat, N to quit)")
end

def display_monthly_payment(monthly_payment)
  prompt("Processing information...")
  prompt("Your monthly payment will be $#{monthly_payment}")
end

def display_end
  prompt("--------------------------------------------------------------------")
  prompt("Thanks for using the car loan calculator. Hope you found it useful!")
end

def retrieve_loan_amt
  gets.chomp
end

def retrieve_apr
  gets.chomp
end

def retrieve_duration
  gets.chomp
end

def retrieve_replay_answer
  gets.chomp
end

def calculate_payment(loan_amt, monthly_rate, loan_duration)
  form = (loan_amt * (monthly_rate / (1 - (1 + monthly_rate)**-loan_duration)))
  form.round(2)
end

display_welcome

loop do
  loan_amt = ""
  request_loan_amt
  loop do
    loan_amt = retrieve_loan_amt

    if valid_loan_amt?(loan_amt)
      loan_amt = loan_amt.to_f
      break
    else
      display_invalid_loan_amt
    end
  end

  monthly_rate = ""
  request_apr
  loop do
    apr = retrieve_apr

    if valid_apr?(apr)
      monthly_rate = apr.to_f / 1200
      break
    else
      display_invalid_apr
    end
  end

  loan_duration = ""
  request_duration
  loop do
    loan_duration = retrieve_duration

    if valid_duration?(loan_duration)
      loan_duration = loan_duration.to_i
      break
    else
      display_invalid_duration
    end
  end

  monthly_payment = calculate_payment(loan_amt, monthly_rate, loan_duration)

  display_monthly_payment(monthly_payment)
  request_replay
  answer = retrieve_replay_answer
  break unless play_again?(answer)
end

display_end
