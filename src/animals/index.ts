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

export abstract class Animal implements AnimalInterface {
  abstract id: string;
  abstract type: AnimalType;
  abstract stats: AnimalStats;
  constructor(public name: string = "") {
    this.name = name;
  }

  public getAnimal() {
    return this;
  }

  abstract update(delta: number): void;
}
