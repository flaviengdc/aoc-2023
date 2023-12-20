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

  def map_dest_to_seed([], dest), do: dest

  def map_dest_to_seed(map, dest) do
    [range | new_map] = map
    [dst, src, span] = range
    z = dst + span

    case dest do
      n when n in dst..z ->
        src + (dest - dst)

      _ ->
        map_dest_to_seed(new_map, dest)
    end
  end

  def is_seed_in_range([], _), do: false

  def is_seed_in_range([src, span | seeds], seed) do
    if seed in src..(src + span) do
      true
    else
      is_seed_in_range(seeds, seed)
    end
  end

  def location_to_seed(maps, location) do
    Enum.reduce(Enum.reverse(maps), location, &map_dest_to_seed/2)
  end

  def seed_to_location(maps, seed), do: Enum.reduce(maps, seed, &map_seed_to_dest/2)

  # TODO: find a better algorithm
  def find_min_location_in_range(maps, seeds, location \\ 0) do
    seed = location_to_seed(maps, location)

    if is_seed_in_range(seeds, seed) do
      location
    else
      find_min_location_in_range(maps, seeds, location + 1)
    end
  end

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

result = Aoc.find_min_location_in_range(maps, seeds)
IO.puts(result)
