import { randomUUID } from "crypto";
import { Animal, AnimalStats } from "./index";
import { AnimalType } from "./index";

export const BASE_DINOSAUR_STATS = {
  hunger: 90,
  happiness: 20,
  sleep: 50,
};

export class Dinosaur extends Animal {
  id = randomUUID();
  type: AnimalType = AnimalType.Dinosaur;
  stats: AnimalStats = BASE_DINOSAUR_STATS;

  constructor(name: string) {
    super(name);
  }

  update(delta: number): void {
    console.log(`${this.name} is updating with delta ${delta}`);
  }
}
