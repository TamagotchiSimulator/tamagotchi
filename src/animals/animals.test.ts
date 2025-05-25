import {
  Poodle,
  BASE_POODLE_STATS,
  POODLE_RATE_CHANGE_PER_SECOND,
} from "./poodle";
import { AnimalType } from "./index";
import { Cat, BASE_CAT_STATS, CAT_RATE_CHANGE_PER_SECOND } from "./cat";
import {
  Parrot,
  BASE_PARROT_STATS,
  PARROT_RATE_CHANGE_PER_SECOND,
} from "./parrot";
import {
  Dinosaur,
  BASE_DINOSAUR_STATS,
  DINOSAUR_RATE_CHANGE_PER_SECOND,
} from "./dinosaur";

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

describe("Can update animal stats", () => {
  describe("Poodle stat updates", () => {
    it("Should update the poodle stats after 2 seconds", () => {
      const myPoodle = new Poodle("Pauline");
      myPoodle.update(2000);
      expect(myPoodle.stats).toEqual({
        hunger:
          BASE_POODLE_STATS.hunger + POODLE_RATE_CHANGE_PER_SECOND.hunger * 2,
        happiness:
          BASE_POODLE_STATS.happiness -
          POODLE_RATE_CHANGE_PER_SECOND.happiness * 2,
        sleep:
          BASE_POODLE_STATS.sleep + POODLE_RATE_CHANGE_PER_SECOND.sleep * 2,
      });
    });
  });

  describe("Cat stat updates", () => {
    it("Should update the cat stats after 2 seconds", () => {
      const myCat = new Cat("Mittens");
      myCat.update(2000);
      expect(myCat.stats).toEqual({
        hunger: BASE_CAT_STATS.hunger + CAT_RATE_CHANGE_PER_SECOND.hunger * 2,
        happiness:
          BASE_CAT_STATS.happiness - CAT_RATE_CHANGE_PER_SECOND.happiness * 2,
        sleep: BASE_CAT_STATS.sleep + CAT_RATE_CHANGE_PER_SECOND.sleep * 2,
      });
    });
  });

  describe("Parrot stat updates", () => {
    it("Should update the parrot stats after 2 seconds", () => {
      const myParrot = new Parrot("Polly");
      myParrot.update(2000);
      expect(myParrot.stats).toEqual({
        hunger:
          BASE_PARROT_STATS.hunger + PARROT_RATE_CHANGE_PER_SECOND.hunger * 2,
        happiness:
          BASE_PARROT_STATS.happiness -
          PARROT_RATE_CHANGE_PER_SECOND.happiness * 2,
        sleep:
          BASE_PARROT_STATS.sleep + PARROT_RATE_CHANGE_PER_SECOND.sleep * 2,
      });
    });
  });

  describe("Dinosaur stat updates", () => {
    it("Should update the dinosaur stats after 2 seconds", () => {
      const myDinosaur = new Dinosaur("Rex");
      myDinosaur.update(2000);
      expect(myDinosaur.stats).toEqual({
        hunger:
          BASE_DINOSAUR_STATS.hunger +
          DINOSAUR_RATE_CHANGE_PER_SECOND.hunger * 2,
        happiness:
          BASE_DINOSAUR_STATS.happiness -
          DINOSAUR_RATE_CHANGE_PER_SECOND.happiness * 2,
        sleep:
          BASE_DINOSAUR_STATS.sleep + DINOSAUR_RATE_CHANGE_PER_SECOND.sleep * 2,
      });
    });
  });

  describe("Animal stats should be clamped between 0 and 100", () => {
    it("Should clamp the poodle stats between 0 and 100", () => {
      const myPoodle = new Poodle("Pauline");
      // Assuming Pauline should be quite hungry, sleepy & unhappy after an hour
      myPoodle.update(60 * 60 * 1000);
      expect(myPoodle.stats).toEqual({
        hunger: 100,
        happiness: 0,
        sleep: 100,
      });
    });
  });
});
