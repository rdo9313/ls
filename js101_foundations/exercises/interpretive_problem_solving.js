/* eslint-disable */
// 1000 Lights

function lightsOn(switches) {
  let array = new Array(switches).fill(false);
  let count = 1;
  let result = [];

  while (count <= switches) {
    array = array.map((bool, idx) => {
      return (idx + 1) % count === 0 ? !bool : bool;
    })
    count++;
  }

  array.forEach((val, idx) => {
    if (val) result.push(idx + 1);
  })

  return result;
}

// Diamonds
function diamond(n) {
  let increment = 2;
  let spaces;

  for (let asterisks = 1; asterisks <= n; asterisks += increment) {
    if (asterisks === n) {
      increment *= -1;
    } else if (asterisks < 0) {
      break;
    }

    spaces = (n - asterisks) / 2;
    console.log(" ".repeat(spaces).concat("*".repeat(asterisks)));
  }
}

// Now I Know My ABCs
const isBlockWord = str => {
  let blocks = ['BObo', 'XKxk', 'DQdq', 'CPcp', 'NAna', 'GTgt', 'REre', 'FSfs', 'JWjw', 'HUhu', 'VIvi', 'LYly', 'ZMzm'];
  let result = true;

  str.split("").forEach(char => {
    if (!blocks.some(block => block.match(char))) {
      result = false;
    } else {
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].match(char)) {
          blocks.splice(i, 1);
          break;
        }
      }
    }
  })
  return result;
}

// Seeing Stars
const star = size => {
  let middleIdx = Math.floor(size / 2);

  for (let i = 0; i < middleIdx; i++) {
    let array = ['*', '*', '*'];
    let spaces = ((size - 3) / 2) - i;
    console.log(' '.repeat(i) + array.join(" ".repeat(spaces)));
  }

  console.log("*".repeat(size));
  
  for (let j = (middleIdx - 1); j >= 0; j--) {
    let array = ['*', '*', '*'];
    let spaces = ((size - 3) / 2) - j;
    console.log(' '.repeat(j) + array.join(" ".repeat(spaces)));
  }
}

