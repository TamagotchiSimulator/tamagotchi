import { Cat } from "../animals/cat";
import { Dinosaur } from "../animals/dinosaur";
import { Game } from "./index";
import { jest } from "@jest/globals";

describe("Game initialisation", () => {
  it("Should create a game", () => {
    const game = new Game();
    expect(game).toBeDefined();
  });

  it("Should create a game with an empty list of animals", () => {
    const game = new Game();
    expect(game.getAnimals()).toEqual([]);
  });
});

describe("The game starts up and runs as expected", () => {
  const mockPerformanceNow = jest.spyOn(performance, "now");
  const mockRequestAnimationFrame = jest.spyOn(window, "requestAnimationFrame");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should initialise the game and the tick", () => {
    const game = new Game();
    const garyTheDinosaur = new Dinosaur("Gary");
    game.addAnimal(garyTheDinosaur);
    game.start();
    expect(mockPerformanceNow).toHaveBeenCalled();
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it("Should tick, and update the animal stats", () => {
    const game = new Game();
    const garyTheDinosaur = new Dinosaur("Gary");
    const initialHappiness = garyTheDinosaur.stats.happiness;
    jest.useFakeTimers();
    game.addAnimal(garyTheDinosaur);
    game.start();
    expect(garyTheDinosaur.stats).toBeDefined();
    jest.advanceTimersByTime(1000);
    expect(garyTheDinosaur.stats.happiness).toBeLessThan(initialHappiness);
  });
});

describe("Game animal handling", () => {
  it("Should add an animal to the game", () => {
    const game = new Game();
    const garyTheDinosaur = new Dinosaur("Gary");
    game.addAnimal(garyTheDinosaur);
    expect(game.getAnimals()).toContain(garyTheDinosaur);
  });

  it("Should be able to handle multiple animals", () => {
    const game = new Game();
    const garyTheDinosaur = new Dinosaur("Gary");
    const jimTheCat = new Cat("Jim");
    game.addAnimal(garyTheDinosaur);
    game.addAnimal(jimTheCat);
    expect(game.getAnimals()).toEqual([garyTheDinosaur, jimTheCat]);
  });

  it("Should be possible to remove an animal from the game", () => {
    const game = new Game();
    const garyTheDinosaur = new Dinosaur("Gary");
    game.addAnimal(garyTheDinosaur);
    game.removeAnimal(garyTheDinosaur.id);
    expect(game.getAnimals()).toEqual([]);
  });
});
