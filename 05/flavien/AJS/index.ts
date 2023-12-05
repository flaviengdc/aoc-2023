import assert from "node:assert";

function cyberReindeer(road, time) {
  let santaPosition = road.indexOf("S");
  let parsedRoad: string[] = road.split("").map((char) => {
    switch (char) {
      case "S":
      case ".":
        return ".";
      case "*":
        return "*";
      case "|":
        return "5";
      default:
        return char;
    }
  });

  const resultTable: string[] = [];

  do {
    const currentIterationResult = [
      ...parsedRoad.slice(0, santaPosition),
      "S",
      ...parsedRoad.slice(santaPosition + 1),
    ]
      .join("")
      .replace(/\d/g, "|");

    resultTable.push(currentIterationResult);

    parsedRoad = parsedRoad.map((char) =>
      /\d/.test(char) ? `${Number(char) > 1 ? Number(char) - 1 : "*"}` : char
    );

    if (/\D/.test(parsedRoad[santaPosition + 1])) {
      santaPosition++;
    }
    time--;
  } while (time > 0);

  return resultTable;
}

const road = "S..|...|..";
const time = 10; // units of time
const result = cyberReindeer(road, time);

assert(
  JSON.stringify(result, null, 2) ===
    JSON.stringify(
      [
        "S..|...|..", // initial state
        ".S.|...|..", // sled advances on the road
        "..S|...|..", // sled advances on the road
        "..S|...|..", // sled stops at the barrier
        "..S|...|..", // sled stops at the barrier
        "...S...*..", // barrier opens, sled advances
        "...*S..*..", // sled advances on the road
        "...*.S.*..", // sled advances on the road
        "...*..S*..", // sled advances on the road
        "...*...S..", // passes through the open barrier
      ],
      null,
      2
    )
);
