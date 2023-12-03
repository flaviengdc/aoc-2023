console.log(
  (await Bun.file("./input.txt").text()).split("\n").reduce(
    (sumOfPartNumber, currentLine, currentLineIndex, originalArray) =>
      sumOfPartNumber +
      Array.from(currentLine.matchAll(/\d+/g), (match) => ({
        value: Number(match[0]),
        position: {
          x: match.index,
          y: currentLineIndex,
          length: match[0].length,
        },
      })).reduce(
        (sumOfLinePartNumber, currentPart) =>
          sumOfLinePartNumber +
          (Array.from(
            Array(currentPart.position.length + 2).keys(),
            (n) => n - 1 + currentPart.position.x
          )
            .reduce(
              (positionsToCheck, XtoCheck, XtoCheckIndex, XtoCheckArray) => [
                ...positionsToCheck,
                ...(XtoCheckIndex === 0 ||
                XtoCheckIndex === XtoCheckArray.length - 1
                  ? [
                      { x: XtoCheck, y: currentPart.position.y - 1 },
                      { x: XtoCheck, y: currentPart.position.y },
                      { x: XtoCheck, y: currentPart.position.y + 1 },
                    ]
                  : [
                      { x: XtoCheck, y: currentPart.position.y - 1 },
                      { x: XtoCheck, y: currentPart.position.y + 1 },
                    ]
                ).filter(
                  ({ x, y }) =>
                    x >= 0 &&
                    y >= 0 &&
                    x <= currentLine.length - 1 &&
                    y <= originalArray.length - 1
                ),
              ],
              []
            )
            .some(
              (positionToCheck) =>
                !/\d|\./.test(
                  originalArray[positionToCheck.y][positionToCheck.x]
                )
            )
            ? currentPart.value
            : 0),
        0
      ),
    0
  )
)
