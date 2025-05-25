/**
 * Contains the game logic including the game tick
 */

import { Animal } from "../animals";

export class Game {
  private delta: number;

  private lastTime: number;

  private animals: Animal[];

  constructor() {
    this.delta = 0;
    this.lastTime = 0;
    this.animals = [];
  }

  public addAnimal(animal: Animal) {
    this.animals.push(animal);
  }

  public removeAnimal(id: string) {
    this.animals = this.animals.filter((a) => a.id !== id);
  }

  public getAnimals() {
    return this.animals;
  }

  /**
   * The tick is the beating heart of our little tamagochi
   */
  private tick() {
    const currentTime = performance.now();
    this.delta = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(this.delta);
    window.requestAnimationFrame(() => this.tick());
  }

  private update(delta: number) {
    this.animals.forEach((animal) => {
      animal.update(delta);
    });
  }
}
