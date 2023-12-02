console.log(
  (await Bun.file("./input.txt").text())
    .split("\n")
    .map((game) => {
      function getGameMinCubes(color) {
        return Math.max(
          ...Array.from(
            game.matchAll(new RegExp(`(\\d+) ${color}`, "g")),
            (m) => Number(m[1])
          ),
          0
        )
      }

      return {
        red: getGameMinCubes("red"),
        green: getGameMinCubes("green"),
        blue: getGameMinCubes("blue"),
      }
    })
    .reduce((accumulator, currentValue, index) => {
      if (
        currentValue.red <= 12 &&
        currentValue.green <= 13 &&
        currentValue.blue <= 14
      ) {
        return accumulator + index + 1
      }

      return accumulator
    }, 0)
)
