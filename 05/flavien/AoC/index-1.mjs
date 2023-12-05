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
        ? cur[1].split("\n").map((x) => x.split(" ").map(Number))[0]
        : cur[1].split("\n").map((x) => x.split(" ").map(Number)),
  }),
  {}
)

function getMapping(sourceNumber, map) {
  return map.reduce(
    (
      destinationNumber,
      [destinationRangeStart, sourceRangeStart, rangeLength]
    ) =>
      sourceNumber >= sourceRangeStart &&
      sourceNumber < sourceRangeStart + rangeLength
        ? destinationRangeStart + sourceNumber - sourceRangeStart
        : destinationNumber,
    sourceNumber
  )
}

console.log(
  Math.min(
    ...seeds.map((seed) =>
      (
        (seedToSoilMapping) =>
        (soilToFertilizerMapping) =>
        (fertilizerToWaterMapping) =>
        (waterToLightMapping) =>
        (lightToTemperatureMapping) =>
        (temperatureToHumidityMapping) =>
        (humidityToLocationMapping) =>
          getMapping(
            getMapping(
              getMapping(
                getMapping(
                  getMapping(
                    getMapping(
                      getMapping(seed, seedToSoilMapping),
                      soilToFertilizerMapping
                    ),
                    fertilizerToWaterMapping
                  ),
                  waterToLightMapping
                ),
                lightToTemperatureMapping
              ),
              temperatureToHumidityMapping
            ),
            humidityToLocationMapping
          )
      )(seedToSoil)(soilToFertilizer)(fertilizerToWater)(waterToLight)(
        lightToTemperature
      )(temperatureToHumidity)(humidityToLocation)
    )
  )
)

console.timeEnd()
