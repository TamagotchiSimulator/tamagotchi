import { AnimalType } from "../animals";
import Poodle from "../poodle.png";
import Cat from "../cat.png";
import Parrot from "../parrot.png";
import Dinosaur from "../dinosaur.png";

export const getAnimalImage = (animalType: AnimalType) => {
  switch (animalType) {
    case AnimalType.Poodle:
      return Poodle;
    case AnimalType.Cat:
      return Cat;
    case AnimalType.Parrot:
      return Parrot;
    case AnimalType.Dinosaur:
      return Dinosaur;
  }
};
