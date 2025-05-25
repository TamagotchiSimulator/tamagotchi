import { randomUUID } from "crypto";
import { Animal, RateChangePerSecond } from "./index";
import { AnimalType } from "./index";

export const BASE_PARROT_STATS = {
  hunger: 40,
  happiness: 60,
  sleep: 70,
};
export const PARROT_RATE_CHANGE_PER_SECOND = {
  hunger: 0.5,
  happiness: 0.25,
  sleep: 0.75,
};

export class Parrot extends Animal {
  id = randomUUID();
  type: AnimalType = AnimalType.Parrot;
  stats = { ...BASE_PARROT_STATS };
  rateChangePerSecond: RateChangePerSecond = PARROT_RATE_CHANGE_PER_SECOND;

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
