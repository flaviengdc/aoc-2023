import assert from "node:assert";

function organizeGifts(gifts) {
  const matches = gifts.match(/\d+[a-z]+/g);

  if (!matches) return "";

  const organizedGifts = matches.map((gift) => {
    const matches = /(?<quantity>\d+)(?<type>[a-z]+)/.exec(gift);
    if (!matches) return "";

    const { groups } = matches;
    if (!groups) return "";

    const { quantity, type } = groups;

    const quantityAsNumber = Number(quantity);

    const pallets = Math.floor(quantityAsNumber / 50);
    const quantityWithoutPallets = quantityAsNumber - pallets * 50;
    const boxes = Math.floor(quantityWithoutPallets / 10);
    const leftOver = quantityAsNumber - pallets * 50 - boxes * 10;

    let organizedGifts = "";
    if (pallets) {
      organizedGifts += `[${type}]`.repeat(pallets);
    }
    if (boxes) {
      organizedGifts += `{${type}}`.repeat(boxes);
    }
    if (leftOver) {
      organizedGifts += `(${`${type}`.repeat(leftOver)})`;
    }

    return organizedGifts;
  });

  return organizedGifts.join("");
}

const result1 = organizeGifts("76a11b");
console.log(result1);

assert(result1 === "[a]{a}{a}(aaaaaa){b}(b)");

// `[a]{a}{a}(aaaaaa){b}(b)`

/* Explanation:

  76a: 76 gifts type 'a' would be packed in 7 boxes and 6 gifts would be left, resulting in 1 pallet [a] (for the first 5 boxes), 2 loose boxes {a}{a} and a bag with 6 gifts (aaaaaa)

  11b: 11 gifts type 'b' would be packed in 1 box and 1 gift would be left, resulting in 1 loose box {b} and a bag with 1 gift (b)
*/
