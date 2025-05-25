import { randomUUID } from "crypto";
import { Animal } from "./index";
import { AnimalType } from "./index";

export const BASE_CAT_STATS = {
  hunger: 40,
  happiness: 60,
  sleep: 70,
};

export class Cat extends Animal {
  id = randomUUID();
  type: AnimalType = AnimalType.Cat;
  stats = BASE_CAT_STATS;

  constructor(name: string) {
    super(name);
  }

  update(delta: number): void {
    console.log(`${this.name} is updating with delta ${delta}`);
  }
}
