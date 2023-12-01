import assert from "node:assert";

function findFirstRepeated(gifts) {
  const occurences = {};

  return (
    gifts.find((gift) => {
      occurences[gift] = (occurences[gift] ?? 0) + 1;
      return occurences[gift] === 2;
    }) ?? -1
  );
}

const giftIds = [2, 1, 3, 5, 3, 2];
const firstRepeatedId = findFirstRepeated(giftIds);
assert(firstRepeatedId === 3);

const giftIds2 = [1, 2, 3, 4];
const firstRepeatedId2 = findFirstRepeated(giftIds2);
assert(firstRepeatedId2 === -1);

const giftIds3 = [5, 1, 5, 1];
const firstRepeatedId3 = findFirstRepeated(giftIds3);
assert(firstRepeatedId3 === 5);
