import { run } from "./common.mjs";
run(findFirstRepeated);

function findFirstRepeated(gifts) {
  const nbGifts = gifts.length;
  const repeat = gifts.reduce((result, giftId, index) => {
    const ealiestRepeat = gifts.indexOf(giftId, index + 1);
    return ealiestRepeat !== -1 && ealiestRepeat < result
      ? ealiestRepeat
      : result;
  }, nbGifts);

  return repeat !== nbGifts ? gifts[repeat] : -1;
}
