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

// 
