import { randomUUID } from "crypto";
import { Animal } from "./index";
import { AnimalType } from "./index";

export const BASE_PARROT_STATS = {
  hunger: 40,
  happiness: 60,
  sleep: 70,
};

export class Parrot extends Animal {
  id = randomUUID();
  type: AnimalType = AnimalType.Parrot;
  stats = BASE_PARROT_STATS;

  constructor(name: string) {
    super(name);
  }

  update(delta: number): void {
    console.log(`${this.name} is updating with delta ${delta}`);
  }
}
