console.time()

function getStrength(hand) {
  if (hand === "11111") return 6

  const { ["1"]: jokerOccurences, ...notJokerOccurences } = hand
    .split("")
    .reduce((cardOccurences, currentCard) => {
      return {
        ...cardOccurences,
        [currentCard]: cardOccurences[currentCard]
          ? cardOccurences[currentCard] + 1
          : 1,
      }
    }, {})

  const [highestOccurenceCard, highestOccurence] = Object.entries(
    notJokerOccurences
  ).reduce(
    (highestOccurenceTuple, [card, occurence]) =>
      occurence > highestOccurenceTuple[1]
        ? [card, occurence]
        : highestOccurenceTuple,
    [null, 0]
  )

  const resolvedCardOccurences = Object.values({
    ...notJokerOccurences,
    [highestOccurenceCard]: highestOccurence + (jokerOccurences ?? 0),
  })

  if (resolvedCardOccurences.length === 1) return 6
  if (
    resolvedCardOccurences.length === 2 &&
    resolvedCardOccurences.some((n) => n === 4)
  )
    return 5
  if (
    resolvedCardOccurences.length === 2 &&
    resolvedCardOccurences.some((n) => n === 3)
  )
    return 4
  if (
    resolvedCardOccurences.length === 3 &&
    resolvedCardOccurences.some((n) => n === 3)
  )
    return 3
  if (resolvedCardOccurences.length === 5) return 0
  if (resolvedCardOccurences.length === 4) return 1

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
        .replaceAll("J", "1")
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
