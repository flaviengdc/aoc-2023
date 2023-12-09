console.time()

console.log(
  (await Bun.file("./input.txt").text())
    .split("\n")
    .map((line) => line.split(" ").map((n) => Number(n)))
    .map((sequence) => {
      const sequencesAndSubsequences = [sequence]

      while (!sequencesAndSubsequences.at(-1).every((n) => n === 0)) {
        sequencesAndSubsequences.push(
          sequencesAndSubsequences
            .at(-1)
            .reduce((subsequence, number, index, array) => {
              if (index === array.length - 1) return subsequence

              return [...subsequence, array[index + 1] - number]
            }, [])
        )
      }

      return sequencesAndSubsequences.reduceRight(
        (accumulator, sequence) => accumulator + sequence.at(-1),
        0
      )
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
)

console.timeEnd()
