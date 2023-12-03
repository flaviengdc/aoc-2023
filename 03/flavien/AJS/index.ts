import assert from "node:assert";

function findNaughtyStep(original, modified) {
  if (original.length > modified.length) {
    return (
      modified
        .split("")
        .reduce(
          (extraChar, currentChar, currentIndex) =>
            extraChar === null && currentChar !== original[currentIndex]
              ? original[currentIndex]
              : extraChar,
          null
        ) ?? original.at(-1)
    );
  }
  if (original.length < modified.length) {
    return (
      original
        .split("")
        .reduce(
          (extraChar, currentChar, currentIndex) =>
            extraChar === null && currentChar !== modified[currentIndex]
              ? modified[currentIndex]
              : extraChar,
          null
        ) ?? modified.at(-1)
    );
  }

  return "";
}

const original1 = "abcd";
const modified1 = "abcde";
assert(findNaughtyStep(original1, modified1) === "e");

const original2 = "stepfor";
const modified2 = "stepor";
assert(findNaughtyStep(original2, modified2) === "f");

const original3 = "abcde";
const modified3 = "abcde";
assert(findNaughtyStep(original3, modified3) === "");
