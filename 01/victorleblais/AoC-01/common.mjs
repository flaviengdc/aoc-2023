import { readFile } from "fs";

let verboseMode = false;

export function verbose(...args) {
  verboseMode && console.log(...args);
}

export function run(solution) {
  // Solution preparation
  if (process.argv.length < 3) {
    console.error("Please provide a filename as argument.");
    process.exit(1);
  }
  const fileName = process.argv[2];
  verboseMode = process.argv[3] === "--verbose" || process.argv[3] === "-v";
  readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Erreur de lecture du fichier ${fileName}: ${err.message}`);
      process.exit(1);
    }
    const lines = data.split("\n");

    // Run Solution
    solution({ data, lines });
  });
}
