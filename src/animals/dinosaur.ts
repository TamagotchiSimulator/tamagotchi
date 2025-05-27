import { Animal, AnimalStats, RateChangePerSecond } from "./index";
import { AnimalType } from "./index";

export const BASE_DINOSAUR_STATS = {
  hunger: 55,
  happiness: 50,
  sleep: 50,
};

export const DINOSAUR_RATE_CHANGE_PER_SECOND = {
  hunger: 0.75,
  happiness: 0.35,
  sleep: 0.45,
};

export class Dinosaur extends Animal {
  type: AnimalType = AnimalType.Dinosaur;
  stats: AnimalStats = BASE_DINOSAUR_STATS;
  rateChangePerSecond: RateChangePerSecond = DINOSAUR_RATE_CHANGE_PER_SECOND;

  constructor(name: string) {
    super(name);
    this.stats = { ...BASE_DINOSAUR_STATS };
  }

  public feed(): void {
    this.stats.hunger -= 10;
  }
  public play(): void {
    this.stats.happiness += 10;
  }
  public sleep(): void {
    this.stats.sleep -= 10;
  }
}
