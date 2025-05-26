import { Animal, AnimalStats, RateChangePerSecond } from "./index";
import { AnimalType } from "./index";

export const BASE_CAT_STATS = {
  hunger: 40,
  happiness: 60,
  sleep: 70,
};

export const CAT_RATE_CHANGE_PER_SECOND = {
  hunger: 0.5,
  happiness: 0.25,
  sleep: 0.75,
};
export class Cat extends Animal {
  type: AnimalType = AnimalType.Cat;
  stats: AnimalStats = BASE_CAT_STATS;
  rateChangePerSecond: RateChangePerSecond = CAT_RATE_CHANGE_PER_SECOND;

  constructor(name: string) {
    super(name);
    this.stats = { ...BASE_CAT_STATS };
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
