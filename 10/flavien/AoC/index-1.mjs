console.time()

const input = (await Bun.file("./input.txt").text())
  .split("\n")
  .map((line) => line.split(""))

const startingPosition = input.reduce(
  (position, line, index) => {
    const foundS = line.findIndex((char) => char === "S")
    if (foundS > -1) return { x: foundS, y: index }
    return position
  },
  { x: 0, y: 0 }
)

function canGo({ x, y }, input) {
  const canGoNorth =
    ["|", "L", "J", "S"].includes(input[y][x]) &&
    input[y - 1] &&
    ["F", "7", "|", "S"].includes(input[y - 1][x])

  const canGoWest =
    ["-", "7", "J", "S"].includes(input[y][x]) &&
    ["F", "L", "-", "S"].includes(input[y][x - 1])

  const canGoSouth =
    ["|", "F", "7", "S"].includes(input[y][x]) &&
    input[y + 1] &&
    ["L", "J", "|", "S"].includes(input[y + 1][x])

  const canGoEast =
    ["-", "F", "L", "S"].includes(input[y][x]) &&
    ["7", "J", "-", "S"].includes(input[y][x + 1])

  return [
    ...(canGoNorth ? [{ x, y: y - 1 }] : []),
    ...(canGoSouth ? [{ x, y: y + 1 }] : []),
    ...(canGoWest ? [{ x: x - 1, y }] : []),
    ...(canGoEast ? [{ x: x + 1, y }] : []),
  ]
}

function isSamePosition({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  return x1 === x2 && y1 === y2
}

let bannedPosition = startingPosition
let currentPosition = canGo(startingPosition, input)[0]
let i = 1

while (!isSamePosition(currentPosition, startingPosition)) {
  const nextPosition = canGo(currentPosition, input).filter(
    (nextPosition) => !isSamePosition(nextPosition, bannedPosition)
  )[0]

  bannedPosition = currentPosition
  currentPosition = nextPosition
  i++
}

console.log(Math.floor(i / 2))

console.timeEnd()
