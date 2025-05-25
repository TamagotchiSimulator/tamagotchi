import { Animal } from "./index";
import { AnimalType } from "./index";
import { randomUUID } from "crypto";

export const BASE_POODLE_STATS = {
  hunger: 60,
  happiness: 90,
  sleep: 60,
};

export class Poodle extends Animal {
  id = randomUUID();
  type: AnimalType = AnimalType.Poodle;
  stats = BASE_POODLE_STATS;

  constructor(name: string) {
    super(name);
  }

  update(delta: number): void {
    console.log(`${this.name} is updating with delta ${delta}`);
  }
}
