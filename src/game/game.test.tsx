import { createAnimal, AnimalType, ANIMAL_CONFIGS } from "../animals";

describe("Animal Creation using factory function", () => {
  it("Should create an animal", () => {
    const garyTheDinosaur = createAnimal(AnimalType.Dinosaur, "Gary");
    expect(garyTheDinosaur).toBeDefined();
    expect(garyTheDinosaur.name).toBe("Gary");
    expect(garyTheDinosaur.type).toBe(AnimalType.Dinosaur);
  });

  it("Should create an animal with the correct id", () => {
    const garyTheDinosaur = createAnimal(AnimalType.Dinosaur, "Gary");
    expect(garyTheDinosaur.id).toBeDefined();
    expect(typeof garyTheDinosaur.id).toBe("string");
  });
});

describe("Animal management functionality", () => {
  it("Should be able to handle multiple animals", () => {
    const garyTheDinosaur = createAnimal(AnimalType.Dinosaur, "Gary");
    const jimTheCat = createAnimal(AnimalType.Cat, "Jim");

    expect(garyTheDinosaur.name).toBe("Gary");
    expect(jimTheCat.name).toBe("Jim");
    expect(garyTheDinosaur.type).toBe(AnimalType.Dinosaur);
    expect(jimTheCat.type).toBe(AnimalType.Cat);
  });

  it("Should create and add a Poodle", () => {
    const animal = createAnimal(AnimalType.Poodle, "Pauline");
    expect(animal).toBeDefined();
    expect(animal.type).toBe(AnimalType.Poodle);
    expect(animal.name).toBe("Pauline");
  });

  it("Should create and add a Cat", () => {
    const animal = createAnimal(AnimalType.Cat, "Mittens");
    expect(animal).toBeDefined();
    expect(animal.type).toBe(AnimalType.Cat);
    expect(animal.name).toBe("Mittens");
  });

  it("Should create and add a Parrot", () => {
    const animal = createAnimal(AnimalType.Parrot, "Polly");
    expect(animal).toBeDefined();
    expect(animal.type).toBe(AnimalType.Parrot);
    expect(animal.name).toBe("Polly");
  });

  it("Should create and add a Dinosaur", () => {
    const animal = createAnimal(AnimalType.Dinosaur, "Dino");
    expect(animal).toBeDefined();
    expect(animal.type).toBe(AnimalType.Dinosaur);
    expect(animal.name).toBe("Dino");
  });
});

describe("Animal stats modifiers", () => {
  it("Should apply hunger modifier when hunger is 100", () => {
    const cat = createAnimal(AnimalType.Cat, "Mittens");
    cat.stats.hunger = 100;
    cat.stats.happiness = 50;
    cat.stats.sleep = 30;

    const initialHappiness = cat.stats.happiness;
    const delta = 1000;
    const rateChange = ANIMAL_CONFIGS[AnimalType.Cat].rateChangePerSecond;

    cat.update(delta);

    expect(cat.stats.happiness).toBe(
      initialHappiness - rateChange.happiness * 2
    );
  });

  it("Should apply sleep modifier when sleep is 100", () => {
    const cat = createAnimal(AnimalType.Cat, "TestCat");

    cat.stats.hunger = 30;
    cat.stats.happiness = 50;
    cat.stats.sleep = 100;

    const initialHappiness = cat.stats.happiness;
    const delta = 1000;
    const rateChange = ANIMAL_CONFIGS[AnimalType.Cat].rateChangePerSecond;

    cat.update(delta);

    expect(cat.stats.happiness).toBe(
      initialHappiness - rateChange.happiness * 2
    );
  });

  it("Should apply both hunger and sleep modifiers when both are 100", () => {
    const cat = createAnimal(AnimalType.Cat, "TestCat");

    cat.stats.hunger = 100;
    cat.stats.happiness = 50;
    cat.stats.sleep = 100;

    const initialHappiness = cat.stats.happiness;
    const delta = 3000;
    const rateChange = ANIMAL_CONFIGS[AnimalType.Cat].rateChangePerSecond;

    cat.update(delta);

    expect(cat.stats.happiness).toBe(
      initialHappiness - rateChange.happiness * (delta / 1000) * 2 * 2
    );
  });
});
