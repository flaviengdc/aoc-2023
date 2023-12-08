console.time()

const [instructions, , ...nodes] = (await Bun.file("./input.txt").text()).split(
  "\n"
)

const parsedNodes = nodes.reduce((parsedNodes, node) => {
  const { groups } = /(?<node>\w+) = \((?<left>\w+), (?<right>\w+)\)/.exec(node)

  return {
    ...parsedNodes,
    [groups.node]: {
      L: groups.left,
      R: groups.right,
    },
  }
}, {})

let currentNode = "AAA"
let i = 0
while (currentNode !== "ZZZ") {
  currentNode = parsedNodes[currentNode][instructions[i % instructions.length]]
  i++
}

console.log(i)

console.timeEnd()
