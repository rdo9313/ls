function isBlank(str) {
  return str.length === 0;
}
isBlank('mars'); // false
isBlank('  ');   // false
isBlank('');     // true

