const map = new Map()

console.log(
  (await Bun.file("./input.txt").text())
    .split("\n")
    .reduceRight((totalCards, currentLine) => {
      const regex =
        /Card +(?<cardNumber>\d+):(?<winning>( +\d+)+) \|(?<draw>( +\d+)+)/
      const cardNumber = Number(currentLine.match(regex).groups.cardNumber)
      if (map.has(cardNumber)) {
        return totalCards + map.get(cardNumber)
      }
      const numberOfCards =
        1 +
        Array.from(
          new Array(
            new Set(
              currentLine.match(regex).groups.draw.match(/\d+/g)
            ).intersection(
              new Set(currentLine.match(regex).groups.winning.match(/\d+/g))
            ).size
          ).keys(),
          (n) => n + cardNumber + 1
        ).reduce((accumulatorGeneratedCards, currentCard) => {
          return accumulatorGeneratedCards + map.get(currentCard)
        }, 0)
      map.set(cardNumber, numberOfCards)
      return totalCards + numberOfCards
    }, 0)
)
