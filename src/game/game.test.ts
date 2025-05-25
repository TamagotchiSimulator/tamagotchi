import { Cat } from "../animals/cat";
import { Dinosaur } from "../animals/dinosaur";
import { Game } from "./index";

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
