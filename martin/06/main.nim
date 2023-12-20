from solution import show_results

const example = @[
  (7, 9),
  (15, 40),
  (30, 200),
]
discard example

const inputfile = @[
  (44, 277),
  (89, 1136),
  (96, 1890),
  (91, 1768),
]

when isMainModule:
  show_results(inputfile)
