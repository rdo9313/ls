# Car Loan Payment Calculator
def prompt(message)
  puts "=> #{message}"
end

prompt("Welcome! I will help you figure out your car loan payments.")

prompt("First, I will need to know your loan amount:")
loan_amount = gets.chomp.to_f

prompt("Next, I will need to know the APR of the loan (enter 3.2 for 3.2%):")
apr = gets.chomp
monthly_rate = apr.to_f / 1200

prompt("Finally, I will need to know the loan duration in months:")
loan_duration = gets.chomp.to_i

monthly_payment = loan_amount * (monthly_rate / (1 - (1 + monthly_rate)**(-loan_duration)))

prompt("Your monthly payment is #{monthly_payment}")
