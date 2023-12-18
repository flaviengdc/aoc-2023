console.time()

function expandLines(input) {
  const lineLength = input[0].length
  const indexesToExpand = []

  for (let i = 0; i < lineLength; i++) {
    if (input.every((line) => line[i] === ".")) {
      indexesToExpand.push(i)
    }
  }

  return input.map((line) => {
    const lineCopy = [...line]
    indexesToExpand.forEach((indexToExpand, loopIndex) => {
      lineCopy.splice(indexToExpand + loopIndex, 0, ".")
    })
    return lineCopy
  })
}

function expandColumns(input) {
  const lineLength = input[0].length
  const columnLength = input.length
  const indexesToExpand = []

  for (let i = 0; i < columnLength; i++) {
    if (input[i].every((char) => char === ".")) {
      indexesToExpand.push(i)
    }
  }

  const inputCopy = [...input]

  indexesToExpand.forEach((indexToExpand, loopIndex) => {
    inputCopy.splice(
      indexToExpand + loopIndex,
      0,
      new Array(lineLength).fill(".")
    )
  })

  return inputCopy
}

function expandCosmos(input) {
  return expandLines(expandColumns(input))
}

console.log(
  expandCosmos(
    (await Bun.file("./input.txt").text())
      .split("\n")
      .map((line) => line.split(""))
  )
    .reduce((positions, line, y) => {
      return [
        ...positions,
        ...line.reduce((positionsInLine, char, x) => {
          if (char === "#") {
            return [...positionsInLine, { x, y }]
          }
          return positionsInLine
        }, []),
      ]
    }, [])
    .reduce((lengthSum, galaxy1, index1, array) => {
      return (
        lengthSum +
        array.reduce((tmpSum, galaxy2, index2) => {
          if (index1 <= index2) return tmpSum

          return (
            tmpSum +
            Math.abs(galaxy2.x - galaxy1.x) +
            Math.abs(galaxy2.y - galaxy1.y)
          )
        }, 0)
      )
    }, 0)
)

console.timeEnd()
