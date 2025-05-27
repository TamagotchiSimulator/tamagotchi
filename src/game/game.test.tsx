import { Cat, CAT_RATE_CHANGE_PER_SECOND } from "../animals/cat";
import { Dinosaur } from "../animals/dinosaur";
import { AnimalType } from "../animals";
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

  it("Should create and add a Poodle using createAndAddAnimal", () => {
    const game = new Game();
    game.createAndAddAnimal(AnimalType.Poodle, "Pauline");
    const animals = game.getAnimals();
    expect(animals).toHaveLength(1);
    expect(animals[0].type).toBe(AnimalType.Poodle);
    expect(animals[0].name).toBe("Pauline");
  });

  it("Should create and add a Cat using createAndAddAnimal", () => {
    const game = new Game();
    game.createAndAddAnimal(AnimalType.Cat, "Mittens");
    const animals = game.getAnimals();
    expect(animals).toHaveLength(1);
    expect(animals[0].type).toBe(AnimalType.Cat);
    expect(animals[0].name).toBe("Mittens");
  });

  it("Should create and add a Parrot using createAndAddAnimal", () => {
    const game = new Game();
    game.createAndAddAnimal(AnimalType.Parrot, "Polly");
    const animals = game.getAnimals();
    expect(animals).toHaveLength(1);
    expect(animals[0].type).toBe(AnimalType.Parrot);
    expect(animals[0].name).toBe("Polly");
  });

  it("Should create and add a Dinosaur using createAndAddAnimal", () => {
    const game = new Game();
    game.createAndAddAnimal(AnimalType.Dinosaur, "Dino");
    const animals = game.getAnimals();
    expect(animals).toHaveLength(1);
    expect(animals[0].type).toBe(AnimalType.Dinosaur);
    expect(animals[0].name).toBe("Dino");
  });

  it("Should let us know if animal type is unknown", () => {
    const game = new Game();
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    game.createAndAddAnimal("unknown" as AnimalType, "Unknown");
    expect(consoleSpy).toHaveBeenCalledWith("Unknown animal type: unknown");
    expect(game.getAnimals()).toHaveLength(0);
    consoleSpy.mockRestore();
  });
});

describe("Animal stats modifiers", () => {
  it("Should apply hunger modifier when hunger is 100", () => {
    const cat = new Cat("Mittens");
    cat.stats.hunger = 100;
    cat.stats.happiness = 50;
    cat.stats.sleep = 30;

    const initialHappiness = cat.stats.happiness;
    const delta = 1000;

    cat.update(delta);

    expect(cat.stats.happiness).toBe(
      initialHappiness - CAT_RATE_CHANGE_PER_SECOND.happiness * 2
    );
  });

  it("Should apply sleep modifier when sleep is 100", () => {
    const cat = new Cat("TestCat");

    cat.stats.hunger = 30;
    cat.stats.happiness = 50;
    cat.stats.sleep = 100;

    const initialHappiness = cat.stats.happiness;
    const delta = 1000; // 1 second

    cat.update(delta);

    // Happiness should decrease more due to sleep modifier
    expect(cat.stats.happiness).toBeLessThan(initialHappiness);
  });

  it("Should apply both hunger and sleep modifiers when both are 100", () => {
    const cat = new Cat("TestCat");

    cat.stats.hunger = 100;
    cat.stats.happiness = 50;
    cat.stats.sleep = 100;

    const initialHappiness = cat.stats.happiness;
    const delta = 1000; // 1 second

    cat.update(delta);

    // Happiness should decrease significantly due to both modifiers
    expect(cat.stats.happiness).toBeLessThan(initialHappiness);
  });
});
