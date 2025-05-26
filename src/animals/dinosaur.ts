import { Animal, AnimalStats, RateChangePerSecond } from "./index";
import { AnimalType } from "./index";

export const BASE_DINOSAUR_STATS = {
  hunger: 90,
  happiness: 20,
  sleep: 50,
};

export const DINOSAUR_RATE_CHANGE_PER_SECOND = {
  hunger: 0.5,
  happiness: 0.25,
  sleep: 0.75,
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

  update(delta: number): void {
    const deltaAsSeconds = delta / 1000;

    const clampedHunger = this.clampValues(
      this.stats.hunger + this.rateChangePerSecond.hunger * deltaAsSeconds
    );
    const clampedHappiness = this.clampValues(
      this.stats.happiness - this.rateChangePerSecond.happiness * deltaAsSeconds
    );
    const clampedSleep = this.clampValues(
      this.stats.sleep + this.rateChangePerSecond.sleep * deltaAsSeconds
    );

    this.stats.hunger = clampedHunger;
    this.stats.happiness = clampedHappiness;
    this.stats.sleep = clampedSleep;
  }
}
