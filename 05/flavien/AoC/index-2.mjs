console.time()

const {
  seeds,
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
} = Object.entries(
  (await Bun.file("./input.txt").text()).match(
    /seeds: (?<seeds>[\s\S]*)\n\nseed-to-soil map:\n(?<seedToSoil>[\s\S]*)\n\nsoil-to-fertilizer map:\n(?<soilToFertilizer>[\s\S]*)\n\nfertilizer-to-water map:\n(?<fertilizerToWater>[\s\S]*)\n\nwater-to-light map:\n(?<waterToLight>[\s\S]*)\n\nlight-to-temperature map:\n(?<lightToTemperature>[\s\S]*)\n\ntemperature-to-humidity map:\n(?<temperatureToHumidity>[\s\S]*)\n\nhumidity-to-location map:\n(?<humidityToLocation>[\s\S]*)\n/
  ).groups
).reduce(
  (acc, cur) => ({
    ...acc,
    [cur[0]]:
      cur[0] === "seeds"
        ? cur[1]
            .split("\n")
            .map((line) => line.match(/\d+ \d+/g))[0]
            .map((matches) => matches.split(" "))
            .map(([rangeStart, rangeLength]) => [
              Number(rangeStart),
              Number(rangeLength),
            ])
        : cur[1].split("\n").map((x) => x.split(" ").map(Number)),
  }),
  {}
)

function getReverseMapping(destinationNumber, map) {
  return map.reduce(
    (sourceNumber, [destinationRangeStart, sourceRangeStart, rangeLength]) =>
      destinationNumber >= destinationRangeStart &&
      destinationNumber < destinationRangeStart + rangeLength
        ? sourceRangeStart + destinationNumber - destinationRangeStart
        : sourceNumber,
    destinationNumber
  )
}

let found = false
let potentialLocation = 0
while (!found) {
  const seedFromLocation = ((location) => {
    return (
      (seedToSoilMapping) =>
      (soilToFertilizerMapping) =>
      (fertilizerToWaterMapping) =>
      (waterToLightMapping) =>
      (lightToTemperatureMapping) =>
      (temperatureToHumidityMapping) =>
      (humidityToLocationMapping) =>
        getReverseMapping(
          getReverseMapping(
            getReverseMapping(
              getReverseMapping(
                getReverseMapping(
                  getReverseMapping(
                    getReverseMapping(location, humidityToLocationMapping),
                    temperatureToHumidityMapping
                  ),
                  lightToTemperatureMapping
                ),
                waterToLightMapping
              ),
              fertilizerToWaterMapping
            ),
            soilToFertilizerMapping
          ),
          seedToSoilMapping
        )
    )(seedToSoil)(soilToFertilizer)(fertilizerToWater)(waterToLight)(
      lightToTemperature
    )(temperatureToHumidity)(humidityToLocation)
  })(potentialLocation)

  seeds.some(
    ([rangeStart, rangeLength]) =>
      seedFromLocation >= rangeStart &&
      seedFromLocation < rangeStart + rangeLength
  )
    ? (found = true)
    : (potentialLocation += 1)
}

console.log(potentialLocation)

console.timeEnd()
