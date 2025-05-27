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

  /**
   * Bit of a helper method so we can create a new animal, and specify
   * the type of animal we want to create. We also pass in the name
   */
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

  /**
   * A public method to start the game, this allows us to get things running without manually calling tick which has far more logic
   */
  public start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTime = performance.now();
      this.tick();
    }
  }

  /**
   * Having this stop method here allows us to reduce the likelyhood
   * of memory leaks etc.
   */
  public stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Our entry point to the game class from any component that has
   * an interest in what's happening within the game itself.
   */
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
   * The tick is the beating heart of our little tamagochi.
   * Rather than use a setInterval, we use the requestAnimationFrame
   * method to ensure that we're running at the same frame rate as
   * the user's browser & it's generally a bit more efficient.
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

  /**
   * This update is called from the tick method, and is responsible
   * for actually updating the state of the game. We grab the current
   * stats and update the animals based on the current game delta time.
   * We calculate if the stats have changed, and if they have we
   * broadcast the changes.
   */
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
