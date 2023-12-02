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

      return (
        getGameMinCubes("red") *
        getGameMinCubes("green") *
        getGameMinCubes("blue")
      )
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
)
