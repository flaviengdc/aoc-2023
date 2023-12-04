import assert from "node:assert";

function decode(message: string) {
  function toReverse(s: string) {
    const copy = s;
    return copy.split("").reverse().join("");
  }

  return message
    .split("")
    .reduce<string[]>(
      (acc, cur) => {
        if (cur === "(") {
          return [...acc, ""];
        }

        if (cur === ")") {
          return [...acc.slice(0, -2), `${acc.at(-2)}${toReverse(acc.at(-1))}`];
        }

        return [...acc.slice(0, -1), `${acc.at(-1)}${cur}`];
      },
      [""]
    )
    .join("");
}

const a = decode("hola (odnum)");
assert(a === "hola mundo");

const b = decode("(olleh) (dlrow)!");
assert(b === "hello world!");

const c = decode("sa(u(cla)atn)s");
assert(c === "santaclaus");
