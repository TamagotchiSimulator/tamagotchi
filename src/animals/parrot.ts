import { Animal, RateChangePerSecond, AnimalType } from "./index";

export const BASE_PARROT_STATS = {
  hunger: 45,
  happiness: 50,
  sleep: 45,
};
export const PARROT_RATE_CHANGE_PER_SECOND = {
  hunger: 0.45,
  happiness: 0.3,
  sleep: 0.6,
};

export class Parrot extends Animal {
  type: AnimalType = AnimalType.Parrot;
  stats = { ...BASE_PARROT_STATS };
  rateChangePerSecond: RateChangePerSecond = PARROT_RATE_CHANGE_PER_SECOND;

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
