import assert from "node:assert";

function adjustLights(lights) {
  const firstVersion = Array.from(new Array(lights.length)).map((_, index) =>
    index % 2 ? "🟢" : "🔴"
  );
  const secondVersion = Array.from(new Array(lights.length)).map((_, index) =>
    index % 2 ? "🔴" : "🟢"
  );

  return Math.min(
    ...lights.reduce(
      (changes, light, index) => {
        return [
          changes[0] + (light === firstVersion[index] ? 0 : 1),
          changes[1] + (light === secondVersion[index] ? 0 : 1),
        ];
      },
      [0, 0]
    )
  );
}

assert(adjustLights(["🟢", "🔴", "🟢", "🟢", "🟢"]) === 1);
// -> 1 (you change the fourth light to 🔴)

assert(adjustLights(["🔴", "🔴", "🟢", "🟢", "🔴"]) === 2);
// -> 2 (you change the second light to 🟢 and the third to 🔴)

assert(adjustLights(["🟢", "🔴", "🟢", "🔴", "🟢"]) === 0);
// -> 0 (they are already alternating)

assert(adjustLights(["🔴", "🔴", "🔴"]) === 1);
// -> 1 (you change the second light to 🟢)
