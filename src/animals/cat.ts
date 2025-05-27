import { Animal, AnimalStats, RateChangePerSecond } from "./index";
import { AnimalType } from "./index";

export const BASE_CAT_STATS = {
  hunger: 50,
  happiness: 45,
  sleep: 55,
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
}
