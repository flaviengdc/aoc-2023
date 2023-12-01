import { readFile } from "fs/promises"
console.log(
  (await readFile("./input.txt", { encoding: "utf8" }))
    .split("\n")
    .map((line) => {
      const lineDigits = Array.from(
        line.matchAll(
          new RegExp(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
        ),
        (m) => m[1]
      ).map((nAsNumberOrText) =>
        Number.isNaN(Number(nAsNumberOrText))
          ? [
              "one",
              "two",
              "three",
              "four",
              "five",
              "six",
              "seven",
              "eight",
              "nine",
            ].indexOf(nAsNumberOrText) + 1
          : nAsNumberOrText
      )

      return Number(`${lineDigits.at(0)}${lineDigits.at(-1)}`)
    })
    .reduce((accumulator, currentValue) => (accumulator += currentValue), 0)
)
