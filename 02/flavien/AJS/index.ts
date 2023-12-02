import assert from "node:assert";

function manufacture(gifts: string[], materials: string) {
  return gifts.reduce<string[]>((accumulator, currentGift) => {
    if (
      currentGift.split("").every((material) => {
        return materials.split("").includes(material);
      })
    ) {
      return [...accumulator, currentGift];
    }

    return accumulator;
  }, []);
}

const gifts = ["tren", "oso", "pelota"];
const materials = "tronesa";

assert(
  JSON.stringify(manufacture(gifts, materials)) ===
    JSON.stringify(["tren", "oso"])
);

const gifts2 = ["juego", "puzzle"];
const materials2 = "jlepuz";

assert(
  JSON.stringify(manufacture(gifts2, materials2)) === JSON.stringify(["puzzle"])
);

const gifts3 = ["libro", "ps5"];
const materials3 = "psli";

assert(JSON.stringify(manufacture(gifts3, materials3)) === JSON.stringify([]));
