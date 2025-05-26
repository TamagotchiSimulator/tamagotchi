import { v4 as uuidv4 } from "uuid";
/**
 * Animal base class for all animals.
 * Allows for the creation of animals, with a name.
 * Base stats for the animals will be set in their respective subclasses.
 */

export enum AnimalType {
  Poodle = "poodle",
  Cat = "cat",
  Parrot = "parrot",
  Dinosaur = "dinosaur",
}

export interface AnimalStats {
  // New interface
  hunger: number;
  happiness: number;
  sleep: number;
}

interface AnimalInterface {
  name: string;
  type: AnimalType;
  stats: AnimalStats;
}
export type RateChangePerSecond = AnimalStats;
export abstract class Animal implements AnimalInterface {
  abstract type: AnimalType;
  abstract stats: AnimalStats;
  abstract rateChangePerSecond: RateChangePerSecond;

  abstract feed(): void;
  abstract play(): void;
  abstract sleep(): void;

  constructor(public name: string = "", public id: string = uuidv4()) {
    this.name = name;
  }

  public updateStats(delta: number) {
    const deltaAsSeconds = delta / 1000;
    const hungerModifier = this.stats.hunger > 75 ? 2 : 1;
    const sleepModifier = this.stats.sleep > 75 ? 2 : 1;

    const clampedHunger = this.clampValues(
      this.stats.hunger + this.rateChangePerSecond.hunger * deltaAsSeconds
    );
    const clampedHappiness = this.clampValues(
      this.stats.happiness -
        this.rateChangePerSecond.happiness *
          deltaAsSeconds *
          hungerModifier *
          sleepModifier
    );

    const clampedSleep = this.clampValues(
      this.stats.sleep + this.rateChangePerSecond.sleep * deltaAsSeconds
    );

    return {
      hunger: clampedHunger,
      happiness: clampedHappiness,
      sleep: clampedSleep,
    };
  }

  public clampValues(value: number) {
    return Math.max(0, Math.min(value, 100));
  }

  public getStats() {
    return { ...this.stats };
  }

  /**
   * Assuming that the only way for the animal to die is
   * that it is too hungry.
   */
  public isDead() {
    return this.stats.hunger >= 100;
  }

  public update(delta: number): void {
    const { hunger, happiness, sleep } = this.updateStats(delta);

    this.stats.hunger = hunger;
    this.stats.happiness = happiness;
    this.stats.sleep = sleep;
  }
}
