import assert from "node:assert";

function drawGift(size, symbol) {
  let output = "";

  for (let i = 0; i < 2 * size - 1; i++) {
    const numberOfSpaces = Math.max(0, size - i - 1);

    const topAndFrontFace =
      i === 0 || i === size - 1 || i === 2 * (size - 1)
        ? "#".repeat(size)
        : `#${symbol.repeat(size - 2)}#`;

    const sideFace =
      symbol.repeat(Math.max(0, -1 * Math.abs(i - size + 1) + size - 2)) +
      (i !== 0 && i !== 2 * (size - 1) ? "#" : "");

    output += " ".repeat(numberOfSpaces) + topAndFrontFace + sideFace + "\n";
  }

  return output;
}

/*
   ####
  #++##
 #++#+#
####++#
#++#+#
#++##
####
*/
assert(
  drawGift(4, "+") ===
    `   ####
  #++##
 #++#+#
####++#
#++#+#
#++##
####
`
);

/*
    #####
   #***##
  #***#*#
 #***#**#
#####***#
#***#**#
#***#*#
#***##
#####
*/

assert(
  drawGift(5, "*") ===
    `    #####
   #***##
  #***#*#
 #***#**#
#####***#
#***#**#
#***#*#
#***##
#####
`
);

/*
#
*/
assert(
  drawGift(1, "^") ===
    `#
`
);
