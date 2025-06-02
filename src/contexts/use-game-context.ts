import { createContext, useContext } from "react";
import { Animal, AnimalType } from "../animals";

export const GameContext = createContext<{
  animals: Animal[];
  addAnimal: (animal: Animal) => void;
  createAndAddAnimal: (type: AnimalType, name: string) => void;
  removeAnimal: (id: string) => void;
  getAnimals: () => Animal[];
  start: () => void;
  stop: () => void;
} | null>(null);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameProvider");
  }
  return context;
}
