console.time()

const [times, distances] = (await Bun.file("./input.txt").text())
  .split("\n")
  .map((line) => line.match(/\d+/g))

console.log(
  times
    .map((time, index) => ({
      time: Number(time),
      distance: Number(distances[index]),
    }))
    .map(({ time, distance }) =>
      Array.from(new Array(time - 1).keys(), (n) => n + 1).reduce(
        (accumulator, buttonHoldTime) =>
          buttonHoldTime * (time - buttonHoldTime) > distance
            ? accumulator + 1
            : accumulator,
        0
      )
    )
    .reduce((accumulator, currentValue) => accumulator * currentValue, 1)
)

console.timeEnd()
