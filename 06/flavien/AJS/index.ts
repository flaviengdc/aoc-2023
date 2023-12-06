import assert from "node:assert";

function maxDistance(movements) {
  const right = (movements.match(/>/g) ?? []).length;
  const left = (movements.match(/</g) ?? []).length;
  const joker = (movements.match(/\*/g) ?? []).length;

  return Math.abs(right - left) + joker;
}

const movements = ">>*<";
const result = maxDistance(movements);
console.log(result); // -> 2
assert(result === 2);

const movements2 = "<<<>";
const result2 = maxDistance(movements2);
console.log(result2); // -> 2
assert(result2 === 2);

const movements3 = ">***>";
const result3 = maxDistance(movements3);
console.log(result3); // -> 5
assert(result3 === 5);
