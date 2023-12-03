import { readFile } from "fs/promises"

const inputAsLines = (
  await readFile("./input.txt", { encoding: "utf8" })
).split("\n")

console.log(
  Object.entries(
    Object.groupBy(
      inputAsLines
        .reduce(
          (parts, currentLine, currentLineIndex) => [
            ...parts,
            ...Array.from(currentLine.matchAll(/\d+/g), (match) => ({
              value: Number(match[0]),
              position: {
                x: match.index,
                y: currentLineIndex,
                length: match[0].length,
              },
            })),
          ],
          []
        )
        .reduce(
          (gearsPart, part) => [
            ...gearsPart,
            ...Array.from(
              Array(part.position.length + 2).keys(),
              (n) => n - 1 + part.position.x
            )
              .reduce(
                (positionsToCheck, XtoCheck, XtoCheckIndex, XtoCheckArray) => [
                  ...positionsToCheck,
                  ...(XtoCheckIndex === 0 ||
                  XtoCheckIndex === XtoCheckArray.length - 1
                    ? [
                        { x: XtoCheck, y: part.position.y - 1 },
                        { x: XtoCheck, y: part.position.y },
                        { x: XtoCheck, y: part.position.y + 1 },
                      ]
                    : [
                        { x: XtoCheck, y: part.position.y - 1 },
                        { x: XtoCheck, y: part.position.y + 1 },
                      ]
                  ).filter(
                    ({ x, y }) =>
                      x >= 0 &&
                      x <= inputAsLines[0].length - 1 &&
                      y >= 0 &&
                      y <= inputAsLines.length - 1
                  ),
                ],
                []
              )
              .reduce(
                (listOfGears, positionToCheck) =>
                  inputAsLines[positionToCheck.y][positionToCheck.x] === "*"
                    ? [
                        ...listOfGears,
                        `gear-${positionToCheck.x}-${positionToCheck.y}`,
                      ]
                    : listOfGears,
                []
              )
              .map((gears) => ({ value: part.value, gears })),
          ],
          []
        ),
      ({ gears }) => gears
    )
  )
    .filter(([, values]) => values.length === 2)
    .map(([, [value1, value2]]) => value1.value * value2.value)
    .reduce((acc, value) => acc + value, 0)
)
