let getTip = function (total, tipPercent = .2) {
  return `Your tip is ${total * tipPercent}.`
}

let tip1 = getTip(22.3);
let tip2 = getTip(35.8, 0.15);

console.log(tip1);
console.log(tip2);
