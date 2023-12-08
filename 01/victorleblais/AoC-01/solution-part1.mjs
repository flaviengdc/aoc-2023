import { run, verbose } from "./common.mjs";

run(solution);

function solution({ lines }) {
  let calibration = lines.reduce((calibration, line) => {
    // Remove any non-numerical characters
    const digits = line.replace(/[^0-9]/g, "");
    // Extract the first and last digits
    const first = digits[0];
    const last = digits % 10;
    verbose(`"${line}" => ${digits} => ${first}·${last}`);
    // Add the to the total sum
    return calibration + 10 * first + last;
  }, 0);
  // Output solution
  console.log(calibration);
}
