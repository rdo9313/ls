let convertFarenheitToCelsius = function (farenheit) {
  let celsius = (farenheit - 32) * 5 / 9;
  return celsius;
}

console.log(convertFarenheitToCelsius(32));
console.log(convertFarenheitToCelsius(68));