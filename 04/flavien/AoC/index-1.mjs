console.log(
  (await Bun.file("./input.txt").text())
    .split("\n")
    .reduce((totalPoints, currentLine) => {
      const regex = /Card +\d+:(?<winning>( +\d+)+) \|(?<draw>( +\d+)+)/
      const cardPoints = new Set(
        currentLine.match(regex).groups.draw.match(/\d+/g)
      ).intersection(
        new Set(currentLine.match(regex).groups.winning.match(/\d+/g))
      ).size
      return totalPoints + (cardPoints >= 1 ? Math.pow(2, cardPoints - 1) : 0)
    }, 0)
)
