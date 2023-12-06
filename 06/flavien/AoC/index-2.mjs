console.time()

const [time, distance] = (await Bun.file("./input.txt").text())
  .split("\n")
  .map((line) => line.match(/\d+/g))
  .map((list) => Number(list.join("")))

console.log(
  Array.from(new Array(time - 1).keys(), (n) => n + 1).reduce(
    (accumulator, buttonHoldTime) =>
      buttonHoldTime * (time - buttonHoldTime) > distance
        ? accumulator + 1
        : accumulator,
    0
  )
)

console.timeEnd()
