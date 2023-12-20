func even(n: int): bool =
  n mod 2 == 0

func compute_perf(time: int, holding_time: int): int =
  return (time - holding_time) * holding_time

func compute_result(time: int, distance: int64): int =
  let best_holding_time = time div 2

  var computed_result = 0

  for holding_time in countdown(best_holding_time, 1):
    let perf = compute_perf(time, holding_time)
    if perf > distance:
      computed_result += 1
    else:
      break

  return (computed_result * 2) - (if even(time): 1 else: 0)

proc show_results*(races: seq[(int, int64)]) =
  var results = 1
  for (time, distance) in races:
    results *= compute_result(time, distance)

  echo results

proc show_results*(races: seq[(int, int)]) =
  show_results(cast[seq[(int, int64)]] (races))
