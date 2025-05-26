import { Animal, RateChangePerSecond } from "./index";
import { AnimalType } from "./index";

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
  type: AnimalType = AnimalType.Poodle;
  stats = { ...BASE_POODLE_STATS };
  rateChangePerSecond: RateChangePerSecond = POODLE_RATE_CHANGE_PER_SECOND;

  constructor(name: string) {
    super(name);
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
