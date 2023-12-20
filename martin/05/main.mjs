import fs from 'fs';
const text = fs.readFileSync('./input.txt', 'utf8');

const [seedLine, ...mapLines] = text.split("\n");
const seeds = seedLine.split(': ').at(-1).split(' ').map(Number);

const maps = mapLines.reduce((maps, line) => {
  if ("to" == line.split('-').at(1)) {
    return [...maps, []];
  }

  if (line) maps.at(-1).push(line.split(' ').map(Number));

  return maps;
}, []);

function mapSeedToDestination(seed, map) {
  // Any source numbers that aren't mapped correspond to the same destination number
  if (!map.length) {
    return seed;
  }

  const [range, ...newMap] = map;
  const [dst, src, span] = range;

  if (src > seed || seed >= src + span) {
    return mapSeedToDestination(seed, newMap);
  }

  return (seed - src) + dst;
}

function seedToLocation(seed) {
  return maps.reduce(mapSeedToDestination, seed);
}

const result = seeds.reduce((a, b) => Math.min(a, seedToLocation(b)), Infinity);
console.log(result);
