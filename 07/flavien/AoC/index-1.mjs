console.time()

function getStrength(hand) {
  const cardOccurencesValues = Object.values(
    hand.split("").reduce((accumulator, currentChar) => {
      return {
        ...accumulator,
        [currentChar]: accumulator[currentChar]
          ? accumulator[currentChar] + 1
          : 1,
      }
    }, {})
  )

  if (cardOccurencesValues.length === 1) return 6
  if (
    cardOccurencesValues.length === 2 &&
    cardOccurencesValues.some((n) => n === 4)
  )
    return 5
  if (
    cardOccurencesValues.length === 2 &&
    cardOccurencesValues.some((n) => n === 3)
  )
    return 4
  if (
    cardOccurencesValues.length === 3 &&
    cardOccurencesValues.some((n) => n === 3)
  )
    return 3
  if (cardOccurencesValues.length === 4) return 1
  if (cardOccurencesValues.length === 5) return 0

  return 2
}

console.log(
  (await Bun.file("./input.txt").text())
    .split("\n")
    .map((line) =>
      line
        .replaceAll("A", "E")
        .replaceAll("K", "D")
        .replaceAll("Q", "C")
        .replaceAll("J", "B")
        .replaceAll("T", "A")
    )
    .map((line) => /(?<hand>\S+) (?<bid>\d+)/.exec(line).groups)
    .sort((entry1, entry2) => {
      return (
        Math.max(
          -1,
          Math.min(1, getStrength(entry1.hand) - getStrength(entry2.hand))
        ) || entry1.hand.localeCompare(entry2.hand)
      )
    })
    .reduce((accumulator, currentValue, index) => {
      return accumulator + currentValue.bid * (index + 1)
    }, 0)
)

console.timeEnd()
