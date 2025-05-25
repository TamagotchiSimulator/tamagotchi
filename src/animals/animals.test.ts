import { Poodle, BASE_POODLE_STATS } from "./poodle";
import { AnimalType } from "./index";
import { Cat, BASE_CAT_STATS } from "./cat";
import { Parrot, BASE_PARROT_STATS } from "./parrot";
import { Dinosaur, BASE_DINOSAUR_STATS } from "./dinosaur";

describe("Animal Creation", () => {
  describe("We can create a poodle", () => {
    it("Should create a Poodle with the correct name and type", () => {
      const myPoodle = new Poodle("Buddy");
      expect(myPoodle.name).toBe("Buddy");
      expect(myPoodle.type).toBe(AnimalType.Poodle);
    });

    it("Should have the correct Poodle stats", () => {
      const myPoodle = new Poodle("Buddy");
      expect(myPoodle.stats).toEqual(BASE_POODLE_STATS);
    });
  });

  describe("We can create a cat", () => {
    it("Should create a cat with the correct name and type", () => {
      const myCat = new Cat("Whiskers");
      expect(myCat.name).toBe("Whiskers");
      expect(myCat.type).toBe(AnimalType.Cat);
    });

    it("Should have the correct cat stats", () => {
      const myCat = new Cat("Whiskers");
      expect(myCat.stats).toEqual(BASE_CAT_STATS);
    });
  });

  describe("We can create a parrot", () => {
    it("Should create a parrot with the correct name and type", () => {
      const myParrot = new Parrot("Polly");
      expect(myParrot.name).toBe("Polly");
      expect(myParrot.type).toBe(AnimalType.Parrot);
    });

    it("Should have the correct parrot stats", () => {
      const myParrot = new Parrot("Polly");
      expect(myParrot.stats).toEqual(BASE_PARROT_STATS);
    });
  });

  describe("We can create a dinosaur", () => {
    it("Should create a dinosaur with the correct name and type", () => {
      const myDinosaur = new Dinosaur("Rex");
      expect(myDinosaur.name).toBe("Rex");
      expect(myDinosaur.type).toBe(AnimalType.Dinosaur);
    });

    it("Should have the correct dinosaur stats", () => {
      const myDinosaur = new Dinosaur("Rex");
      expect(myDinosaur.stats).toEqual(BASE_DINOSAUR_STATS);
    });
  });
});
