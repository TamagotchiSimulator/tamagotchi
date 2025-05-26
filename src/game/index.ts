/**
 * Contains the game logic including the game tick
 */

import { Animal, AnimalType } from "../animals";
import { Poodle } from "../animals/poodle";
import { Cat } from "../animals/cat";
import { Parrot } from "../animals/parrot";
import { Dinosaur } from "../animals/dinosaur";

export class Game {
  private delta: number;

  private lastTime: number;

  private animals: Animal[];
  private stateSubscribers: ((animals: Animal[]) => void)[] = [];
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;

  constructor() {
    this.delta = 0;
    this.lastTime = 0;
    this.animals = [];
  }

  public addAnimal(animal: Animal) {
    this.animals.push(animal);
  }

  public createAndAddAnimal(type: AnimalType, name: string): void {
    let newAnimal: Animal;
    switch (type) {
      case AnimalType.Poodle:
        newAnimal = new Poodle(name);
        break;
      case AnimalType.Cat:
        newAnimal = new Cat(name);
        break;
      case AnimalType.Parrot:
        newAnimal = new Parrot(name);
        break;
      case AnimalType.Dinosaur:
        newAnimal = new Dinosaur(name);
        break;
      default:
        console.error(`Unknown animal type: ${type}`);
        return;
    }
    this.addAnimal(newAnimal);
    this.broadcastChanges();
  }

  public removeAnimal(id: string) {
    this.animals = this.animals.filter((a) => a.id !== id);
  }

  public getAnimals() {
    return [...this.animals];
  }

  public start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTime = performance.now();
      this.tick();
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
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
    if (!this.isRunning) {
      return;
    }

    const currentTime = performance.now();
    this.delta = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(this.delta);
    this.animationFrameId = window.requestAnimationFrame(() => this.tick());
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
