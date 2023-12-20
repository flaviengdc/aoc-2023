from math import prod

def even(n): return n % 2 == 0

def compute_perf(time: int, holding_time: int) -> int:
  return (time - holding_time) * holding_time

def compute_result(time: int, distance: int) -> int:
  best_holding_time = int(time/2)

  computed_result = 0

  for holding_time in range(best_holding_time, 1, -1):
    perf = compute_perf(time, holding_time)
    if perf > distance:
      computed_result += 1
    else:
      break

  return (computed_result * 2) - (1 if even(time) else 0)

def show_results(races: list[tuple[int, int]]):
  results = [compute_result(time, distance) for (time, distance) in races]

  print(prod(results))
