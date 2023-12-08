import lcm from "compute-lcm"

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

console.log(
  lcm(
    ...Object.keys(parsedNodes)
      .filter((key) => key.endsWith("A"))
      .map((node) => {
        let i = 0
        let currentNode = node
        while (!currentNode.endsWith("Z")) {
          currentNode =
            parsedNodes[currentNode][instructions[i % instructions.length]]

          i++
        }

        return i
      })
  )
)

console.timeEnd()
