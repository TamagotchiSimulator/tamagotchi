/**
 * Contains the game logic including the game tick
 */

import { Animal } from "../animals";

export class Game {
  private delta: number;

  private lastTime: number;

  private animals: Animal[];
  private stateSubscribers: ((animals: Animal[]) => void)[] = [];

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
    return [...this.animals];
  }

  public start() {
    this.lastTime = performance.now();
    this.tick();
  }

  public onAnimalsChange(callback: (animals: Animal[]) => void) {
    this.stateSubscribers.push(callback);
    return () => {
      this.stateSubscribers = this.stateSubscribers.filter(
        (sub) => sub !== callback
      );
    };
  }

  private broadcastChanges() {
    this.stateSubscribers.forEach((callback) => callback(this.getAnimals()));
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
    let hasUpdated = false;
    this.animals.forEach((animal) => {
      const preUpdateStats = animal.getStats();
      animal.update(delta);
      const postUpdateStats = animal.getStats();

      const totalPreValue = Object.values(preUpdateStats).reduce(
        (acc, curr) => acc + curr,
        0
      );

      const totalPostValue = Object.values(postUpdateStats).reduce(
        (acc, curr) => acc + curr,
        0
      );

      if (totalPreValue !== totalPostValue) {
        hasUpdated = true;
      }
    });

    if (hasUpdated) {
      this.broadcastChanges();
    }
  }
}
