//Sum
function sum(num1, num2) {
  return num1 + num2;
}

//Log Quote
function brendanEichQuote() {
  console.log('Always bet on JavaScript.');
}
return value is undefined.

//Cite the Author
function cite(author, quote) {
  console.log(`${author} said: "${quote}."`);
}

//Squared Number
function squaredNumber(num) {
  return num**2;
}

//Display Division
function must be invoked like multiplesOfThree() to have an output.

//Three-way comparison
function compareByLength(str1, str2) {
  let a = str1.length;
  let b = str2.length;

  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

//Transformation
'Captain Ruby'.replace('Ruby', 'Javascript');

//Internationalization 1
function greet(languageCode) {
  switch (languageCode) {
    case 'en': return 'Hi!';
    case 'fr': return 'Salut!';
    case 'pt': return 'Olá!';
    case 'de': return 'Hallo!';
    case 'sv': return 'Hej!';
    case 'af': return 'Haai!';
  }
}

//Locale Part 1
function extractLanguage(str) {
  return str.substring(0,2);
}

//Locale Part 2
function extractRegion(str) {
  return str.split("_")[1].split('.')[0];
}

//Internationalization 2
function localGreet(locale) {
  let language = extractLanguage(locale);
  let region = extractRegion(locale);

  switch (region) {
    case 'US': return 'Hey!';
    case 'GB': return 'Hello!';
    case 'AU': return 'Howdy!';
    default: return greet(language);
  }
}