function interpolateS(input) {
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
      ["|", "F", "7", "S"].includes(input[y - 1][x])

    const canGoWest =
      ["-", "7", "J", "S"].includes(input[y][x]) &&
      ["-", "F", "L", "S"].includes(input[y][x - 1])

    const canGoSouth =
      ["|", "F", "7", "S"].includes(input[y][x]) &&
      input[y + 1] &&
      ["|", "L", "J", "S"].includes(input[y + 1][x])

    const canGoEast =
      ["-", "F", "L", "S"].includes(input[y][x]) &&
      ["-", "7", "J", "S"].includes(input[y][x + 1])

    return [canGoNorth, canGoSouth, canGoWest, canGoEast]
  }

  function guessSChar([canGoNorth, canGoSouth, canGoWest, canGoEast]) {
    if (canGoNorth && canGoEast) return "L"
    if (canGoNorth && canGoSouth) return "|"
    if (canGoNorth && canGoWest) return "J"

    if (canGoEast && canGoSouth) return "F"
    if (canGoEast && canGoWest) return "-"

    if (canGoSouth && canGoWest) return "7"
  }

  const guessedSChar = guessSChar(canGo(startingPosition, input))

  return input.map((line) =>
    line.map((char) => (char === "S" ? guessedSChar : char))
  )
}

function sanitizeInput(input) {
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
      ["|", "F", "7", "S"].includes(input[y - 1][x])

    const canGoWest =
      ["-", "7", "J", "S"].includes(input[y][x]) &&
      ["-", "F", "L", "S"].includes(input[y][x - 1])

    const canGoSouth =
      ["|", "F", "7", "S"].includes(input[y][x]) &&
      input[y + 1] &&
      ["|", "L", "J", "S"].includes(input[y + 1][x])

    const canGoEast =
      ["-", "F", "L", "S"].includes(input[y][x]) &&
      ["-", "7", "J", "S"].includes(input[y][x + 1])

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
  const loopTiles = [startingPosition, currentPosition]

  while (!isSamePosition(currentPosition, startingPosition)) {
    const nextPosition = canGo(currentPosition, input).filter(
      (nextPosition) => !isSamePosition(nextPosition, bannedPosition)
    )[0]

    loopTiles.push(currentPosition)
    bannedPosition = currentPosition
    currentPosition = nextPosition
  }

  return input.map((line, y) =>
    line.map((char, x) =>
      loopTiles.map(({ x, y }) => `x${x}y${y}`).includes(`x${x}y${y}`)
        ? char
        : "."
    )
  )
}

function getSouthRayScore(input, { x, y }) {
  const southRay = input.filter((_, index) => index > y).map((line) => line[x])

  const sanitizedSouthRay = southRay.filter(
    (char) => char !== "." && char !== "|"
  )

  let score = sanitizedSouthRay.filter((char) => char === "-").length

  const rayWithoutDash = sanitizedSouthRay.filter((char) => char !== "-")

  for (let i = 0; i < Math.floor(rayWithoutDash.length / 2); i++) {
    const pattern = rayWithoutDash.slice(i * 2, i * 2 + 2)

    if (pattern.join("") === "7L" || pattern.join("") === "FJ") {
      score++
    }
  }

  return score
}

console.time()

console.log(
  interpolateS(
    sanitizeInput(
      (await Bun.file("./input.txt").text())
        .split("\n")
        .map((line) => line.split(""))
    )
  ).reduce(
    (total, line, y, array) =>
      total +
      line.reduce(
        (lineSum, char, x) =>
          char === "." && getSouthRayScore(array, { x, y }) % 2 === 1
            ? lineSum + 1
            : lineSum,
        0
      ),
    0
  )
)

console.timeEnd()
