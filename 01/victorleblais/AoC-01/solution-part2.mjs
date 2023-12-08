import { run, verbose } from "./common.mjs";

run(solution);

function solution({ lines }) {
  const NUMBER_WORDS = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const pattern = new RegExp(`(?=(${NUMBER_WORDS.join("|")}|\\d))`, "g");

  const calibration = lines.reduce((currentCalibration, line) => {
    // Create an array of integer for all matches
    const calibration = Array.from(line.matchAll(pattern), (match) => {
      let stringIndex = NUMBER_WORDS.indexOf(match[1]);
      return stringIndex === -1 ? parseInt(match[1]) : stringIndex;
    });
    verbose("line:   ", line, "\nmatches:", calibration, "\n");
    // Add first and last to total
    return currentCalibration + 10 * calibration.at(0) + calibration.at(-1);
  }, 0);

  // Output solution
  console.log(calibration);
}
