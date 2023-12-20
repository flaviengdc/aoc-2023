defmodule Aoc do
  def map_seed_to_dest([], seed), do: seed

  def map_seed_to_dest(map, seed) do
    [range | new_map] = map
    [dst, src, span] = range
    z = src + span

    case seed do
      n when n in src..z ->
        seed - src + dst

      _ ->
        map_seed_to_dest(new_map, seed)
    end
  end

  def seed_to_location(maps, seed), do: Enum.reduce(maps, seed, &map_seed_to_dest/2)

  def lines_to_map(line, maps) do
    cond do
      line == "" ->
        maps

      "to" == Enum.at(String.split(line, "-"), 1) ->
        maps ++ [[]]

      true ->
        {last, maps} = List.pop_at(maps, -1)
        numbers = str_to_number_list(line)
        maps ++ [last ++ [numbers]]
    end
  end

  def line_to_seeds(line) do
    String.split(line, ": ")
    |> Enum.at(-1)
    |> str_to_number_list()
  end

  defp str_to_number_list(str) do
    String.split(str, " ") |> Enum.map(&String.to_integer/1)
  end
end

{:ok, text} = File.read("input.txt")
[seed_line | map_lines] = String.split(text, "\n")

seeds = Aoc.line_to_seeds(seed_line)
maps = Enum.reduce(map_lines, [], &Aoc.lines_to_map/2)

result = Enum.reduce(seeds, fn b, a -> min(a, Aoc.seed_to_location(maps, b)) end)
IO.puts(result)
