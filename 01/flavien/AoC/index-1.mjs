import { readFile } from "fs/promises"
console.log(
  (await readFile("./input.txt", { encoding: "utf8" }))
    .split("\n")
    .map((line) => {
      const lineDigits = Array.from(
        line.matchAll(new RegExp(/\d/g)),
        (m) => m[0]
      )

      return Number(`${lineDigits.at(0)}${lineDigits.at(-1)}`)
    })
    .reduce((accumulator, currentValue) => (accumulator += currentValue), 0)
)
