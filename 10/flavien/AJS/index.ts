import assert from "node:assert";

function createChristmasTree(ornaments, height) {
  let result = "";

  let i = -1;

  function addNextOrnament() {
    i = (i + 1) % ornaments.length;

    return ornaments[i];
  }

  for (let i = 0; i < height; i++) {
    result += " ".repeat(height - 1 - i);
    result += Array.from(new Array(i + 1).keys())
      .map((e) => `${addNextOrnament()} `)
      .join("")
      .trimEnd();
    result += "\n";
  }
  result += " ".repeat(height - 1);
  result += "|\n";
  return result;
}

assert(
  createChristmasTree("123", 4) ===
    `   1
  2 3
 1 2 3
1 2 3 1
   |
`
);

assert(
  createChristmasTree("*@o", 3) ===
    `  *
 @ o
* @ o
  |
`
);
