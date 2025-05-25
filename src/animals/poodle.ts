import { Animal, RateChangePerSecond } from "./index";
import { AnimalType } from "./index";
import { randomUUID } from "crypto";

export const BASE_POODLE_STATS = {
  hunger: 60,
  happiness: 90,
  sleep: 60,
};

export const POODLE_RATE_CHANGE_PER_SECOND = {
  happiness: 0.25,
  hunger: 0.5,
  sleep: 0.75,
};

export class Poodle extends Animal {
  id = randomUUID();
  type: AnimalType = AnimalType.Poodle;
  stats = { ...BASE_POODLE_STATS };
  rateChangePerSecond: RateChangePerSecond = POODLE_RATE_CHANGE_PER_SECOND;

  constructor(name: string) {
    super(name);
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
