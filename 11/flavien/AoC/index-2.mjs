console.time()

const input = (await Bun.file("./input.txt").text())
  .split("\n")
  .map((line) => line.split(""))

function getEmptyY(input) {
  return input.reduce(
    (emptyRows, line, y) =>
      line.every((char) => char === ".") ? [...emptyRows, y] : emptyRows,
    []
  )
}

function getEmptyX(input) {
  return input[0].reduce(
    (emptyColumns, _, x) =>
      input.every((line) => line[x] === ".")
        ? [...emptyColumns, x]
        : emptyColumns,
    []
  )
}

const emptyY = getEmptyY(input)
const emptyX = getEmptyX(input)

function collectGalaxiesPositions(input) {
  return input.reduce(
    (positions, line, y) => [
      ...positions,
      ...line.reduce(
        (positionsInLine, char, x) =>
          char === "#"
            ? [
                ...positionsInLine,
                {
                  x: (1_000_000 - 1) * emptyX.filter((eX) => eX < x).length + x,
                  y: (1_000_000 - 1) * emptyY.filter((eY) => eY < y).length + y,
                },
              ]
            : positionsInLine,
        []
      ),
    ],
    []
  )
}

console.log(
  collectGalaxiesPositions(input).reduce(
    (lengthSum, galaxy1, index1, array) => {
      return (
        lengthSum +
        array.reduce(
          (tmpSum, galaxy2, index2) =>
            index2 > index1
              ? tmpSum +
                Math.abs(galaxy2.x - galaxy1.x) +
                Math.abs(galaxy2.y - galaxy1.y)
              : tmpSum,
          0
        )
      )
    },
    0
  )
)

console.timeEnd()
