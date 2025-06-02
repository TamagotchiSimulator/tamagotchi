import { createAnimal, AnimalType, ANIMAL_CONFIGS } from "./index";

describe("Animal Creation", () => {
  describe("We can create a poodle", () => {
    it("Should create a Poodle with the correct name and type", () => {
      const myPoodle = createAnimal(AnimalType.Poodle, "Sandy");
      expect(myPoodle.name).toBe("Sandy");
      expect(myPoodle.type).toBe(AnimalType.Poodle);
    });

    it("Should have the correct Poodle stats", () => {
      const myPoodle = createAnimal(AnimalType.Poodle, "Sandy");
      expect(myPoodle.stats).toEqual(
        ANIMAL_CONFIGS[AnimalType.Poodle].baseStats
      );
    });
  });

  describe("We can create a cat", () => {
    it("Should create a cat with the correct name and type", () => {
      const myCat = createAnimal(AnimalType.Cat, "Mittens");
      expect(myCat.name).toBe("Mittens");
      expect(myCat.type).toBe(AnimalType.Cat);
    });

    it("Should have the correct cat stats", () => {
      const myCat = createAnimal(AnimalType.Cat, "Mittens");
      expect(myCat.stats).toEqual(ANIMAL_CONFIGS[AnimalType.Cat].baseStats);
    });
  });

  describe("We can create a parrot", () => {
    it("Should create a parrot with the correct name and type", () => {
      const myParrot = createAnimal(AnimalType.Parrot, "Polly");
      expect(myParrot.name).toBe("Polly");
      expect(myParrot.type).toBe(AnimalType.Parrot);
    });

    it("Should have the correct parrot stats", () => {
      const myParrot = createAnimal(AnimalType.Parrot, "Polly");
      expect(myParrot.stats).toEqual(
        ANIMAL_CONFIGS[AnimalType.Parrot].baseStats
      );
    });
  });

  describe("We can create a dinosaur", () => {
    it("Should create a dinosaur with the correct name and type", () => {
      const myDinosaur = createAnimal(AnimalType.Dinosaur, "Rex");
      expect(myDinosaur.name).toBe("Rex");
      expect(myDinosaur.type).toBe(AnimalType.Dinosaur);
    });

    it("Should have the correct dinosaur stats", () => {
      const myDinosaur = createAnimal(AnimalType.Dinosaur, "Rex");
      expect(myDinosaur.stats).toEqual(
        ANIMAL_CONFIGS[AnimalType.Dinosaur].baseStats
      );
    });
  });
});

describe("Can update animal stats", () => {
  describe("Poodle stat updates", () => {
    it("Should update the poodle stats after 2 seconds", () => {
      const myPoodle = createAnimal(AnimalType.Poodle, "Sandy");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Poodle].baseStats;
      const rateChange = ANIMAL_CONFIGS[AnimalType.Poodle].rateChangePerSecond;

      myPoodle.update(2000);
      expect(myPoodle.stats).toEqual({
        hunger: baseStats.hunger + rateChange.hunger * 2,
        happiness: baseStats.happiness - rateChange.happiness * 2,
        sleep: baseStats.sleep + rateChange.sleep * 2,
      });
    });

    it("Should update the poodle stats when we feed it", () => {
      const myPoodle = createAnimal(AnimalType.Poodle, "Sandy");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Poodle].baseStats;

      myPoodle.feed();
      expect(myPoodle.stats).toEqual({
        ...baseStats,
        hunger: baseStats.hunger - 10,
      });
    });

    it("Should update the poodle stats when we play with it", () => {
      const myPoodle = createAnimal(AnimalType.Poodle, "Sandy");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Poodle].baseStats;

      myPoodle.play();
      expect(myPoodle.stats).toEqual({
        ...baseStats,
        happiness: baseStats.happiness + 10,
      });
    });

    it("Should update the poodle stats when we put it to sleep (not the sad way)", () => {
      const myPoodle = createAnimal(AnimalType.Poodle, "Sandy");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Poodle].baseStats;

      myPoodle.sleep();
      expect(myPoodle.stats).toEqual({
        ...baseStats,
        sleep: baseStats.sleep - 10,
      });
    });
  });

  describe("Cat stat updates", () => {
    it("Should update the cat stats after 2 seconds", () => {
      const myCat = createAnimal(AnimalType.Cat, "Mittens");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Cat].baseStats;
      const rateChange = ANIMAL_CONFIGS[AnimalType.Cat].rateChangePerSecond;

      myCat.update(2000);
      expect(myCat.stats).toEqual({
        hunger: baseStats.hunger + rateChange.hunger * 2,
        happiness: baseStats.happiness - rateChange.happiness * 2,
        sleep: baseStats.sleep + rateChange.sleep * 2,
      });
    });

    it("Should update the cat stats when we feed it", () => {
      const myCat = createAnimal(AnimalType.Cat, "Mittens");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Cat].baseStats;

      myCat.feed();
      expect(myCat.stats).toEqual({
        ...baseStats,
        hunger: baseStats.hunger - 10,
      });
    });

    it("Should update the cat stats when we play with it", () => {
      const myCat = createAnimal(AnimalType.Cat, "Mittens");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Cat].baseStats;

      myCat.play();
      expect(myCat.stats).toEqual({
        ...baseStats,
        happiness: baseStats.happiness + 10,
      });
    });

    it("Should update the cat stats when we put it to sleep (not the sad way)", () => {
      const myCat = createAnimal(AnimalType.Cat, "Mittens");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Cat].baseStats;

      myCat.sleep();
      expect(myCat.stats).toEqual({
        ...baseStats,
        sleep: baseStats.sleep - 10,
      });
    });
  });

  describe("Parrot stat updates", () => {
    it("Should update the parrot stats after 2 seconds", () => {
      const myParrot = createAnimal(AnimalType.Parrot, "Polly");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Parrot].baseStats;
      const rateChange = ANIMAL_CONFIGS[AnimalType.Parrot].rateChangePerSecond;

      myParrot.update(2000);
      expect(myParrot.stats).toEqual({
        hunger: baseStats.hunger + rateChange.hunger * 2,
        happiness: baseStats.happiness - rateChange.happiness * 2,
        sleep: baseStats.sleep + rateChange.sleep * 2,
      });
    });

    it("Should update the parrot stats when we feed it", () => {
      const myParrot = createAnimal(AnimalType.Parrot, "Polly");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Parrot].baseStats;

      myParrot.feed();
      expect(myParrot.stats).toEqual({
        ...baseStats,
        hunger: baseStats.hunger - 10,
      });
    });

    it("Should update the parrot stats when we play with it", () => {
      const myParrot = createAnimal(AnimalType.Parrot, "Polly");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Parrot].baseStats;

      myParrot.play();
      expect(myParrot.stats).toEqual({
        ...baseStats,
        happiness: baseStats.happiness + 10,
      });
    });

    it("Should update the parrot stats when we put it to sleep (not the sad way)", () => {
      const myParrot = createAnimal(AnimalType.Parrot, "Polly");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Parrot].baseStats;

      myParrot.sleep();
      expect(myParrot.stats).toEqual({
        ...baseStats,
        sleep: baseStats.sleep - 10,
      });
    });
  });

  describe("Dinosaur stat updates", () => {
    it("Should update the dinosaur stats after 2 seconds", () => {
      const myDinosaur = createAnimal(AnimalType.Dinosaur, "Rex");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Dinosaur].baseStats;
      const rateChange =
        ANIMAL_CONFIGS[AnimalType.Dinosaur].rateChangePerSecond;

      myDinosaur.update(2000);
      expect(myDinosaur.stats).toEqual({
        hunger: baseStats.hunger + rateChange.hunger * 2,
        happiness: baseStats.happiness - rateChange.happiness * 2,
        sleep: baseStats.sleep + rateChange.sleep * 2,
      });
    });

    it("Should update the dinosaur stats when we feed it", () => {
      const myDinosaur = createAnimal(AnimalType.Dinosaur, "Rex");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Dinosaur].baseStats;

      myDinosaur.feed();
      expect(myDinosaur.stats).toEqual({
        ...baseStats,
        hunger: baseStats.hunger - 10,
      });
    });

    it("Should update the dinosaur stats when we play with it", () => {
      const myDinosaur = createAnimal(AnimalType.Dinosaur, "Rex");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Dinosaur].baseStats;

      myDinosaur.play();
      expect(myDinosaur.stats).toEqual({
        ...baseStats,
        happiness: baseStats.happiness + 10,
      });
    });

    it("Should update the dinosaur stats when we put it to sleep (not the sad way)", () => {
      const myDinosaur = createAnimal(AnimalType.Dinosaur, "Rex");
      const baseStats = ANIMAL_CONFIGS[AnimalType.Dinosaur].baseStats;

      myDinosaur.sleep();
      expect(myDinosaur.stats).toEqual({
        ...baseStats,
        sleep: baseStats.sleep - 10,
      });
    });
  });
});

describe("Animals can die", () => {
  it("Should kill the animal if it is hungry and sad", () => {
    const myPoodle = createAnimal(AnimalType.Poodle, "Sandy");
    // Simulate 1 hour of neglect
    myPoodle.update(60 * 60 * 1000);
    expect(myPoodle.isDead()).toBe(true);
  });
});
