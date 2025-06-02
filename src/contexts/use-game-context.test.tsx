import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { GameContext, useGameContext } from "./use-game-context";
import { createAnimal, AnimalType } from "../animals";
import { Animal } from "../animals";
import { jest } from "@jest/globals";

describe("useGameContext", () => {
  it("should throw an error when used outside of GameProvider", () => {
    expect(() => {
      renderHook(() => useGameContext());
    }).toThrow("useGameContext must be used within GameProvider");
  });

  it("should return the context value when used within GameProvider", () => {
    const cat = createAnimal(AnimalType.Cat, "Mittens");
    const dinosaur = createAnimal(AnimalType.Dinosaur, "Dino");
    const animals = [cat, dinosaur];

    const mockAddAnimal = jest.fn();
    const mockCreateAndAddAnimal = jest.fn();
    const mockRemoveAnimal = jest.fn();
    const mockGetAnimals = jest.fn(() => [...animals]);
    const mockStart = jest.fn();
    const mockStop = jest.fn();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <GameContext.Provider
        value={{
          animals,
          addAnimal: mockAddAnimal,
          createAndAddAnimal: mockCreateAndAddAnimal,
          removeAnimal: mockRemoveAnimal,
          getAnimals: mockGetAnimals,
          start: mockStart,
          stop: mockStop,
        }}
      >
        {children}
      </GameContext.Provider>
    );

    const { result } = renderHook(() => useGameContext(), { wrapper });

    expect(result.current.animals).toEqual(animals);
    expect(result.current.addAnimal).toBe(mockAddAnimal);
    expect(result.current.createAndAddAnimal).toBe(mockCreateAndAddAnimal);
    expect(result.current.removeAnimal).toBe(mockRemoveAnimal);
    expect(result.current.getAnimals).toBe(mockGetAnimals);
    expect(result.current.start).toBe(mockStart);
    expect(result.current.stop).toBe(mockStop);
  });

  it("should return the correct animals array", () => {
    const cat = createAnimal(AnimalType.Cat, "Whiskers");
    const dinosaur = createAnimal(AnimalType.Dinosaur, "Dino");
    const animals = [cat, dinosaur];

    const wrapper = ({ children }: { children: ReactNode }) => (
      <GameContext.Provider
        value={{
          animals,
          addAnimal: jest.fn(),
          createAndAddAnimal: jest.fn(),
          removeAnimal: jest.fn(),
          getAnimals: jest.fn(() => [...animals]),
          start: jest.fn(),
          stop: jest.fn(),
        }}
      >
        {children}
      </GameContext.Provider>
    );

    const { result } = renderHook(() => useGameContext(), { wrapper });

    expect(result.current.animals).toHaveLength(2);
    expect(result.current.animals[0].type).toBe(AnimalType.Cat);
    expect(result.current.animals[1].type).toBe(AnimalType.Dinosaur);
    expect(result.current.animals[0].name).toBe("Whiskers");
    expect(result.current.animals[1].name).toBe("Dino");
  });

  it("should be able to start with an empty animals array", () => {
    const animals: Animal[] = [];
    const wrapper = ({ children }: { children: ReactNode }) => (
      <GameContext.Provider
        value={{
          animals,
          addAnimal: jest.fn(),
          createAndAddAnimal: jest.fn(),
          removeAnimal: jest.fn(),
          getAnimals: jest.fn(() => []),
          start: jest.fn(),
          stop: jest.fn(),
        }}
      >
        {children}
      </GameContext.Provider>
    );

    const { result } = renderHook(() => useGameContext(), { wrapper });

    expect(result.current.animals).toEqual([]);
    expect(result.current.animals).toHaveLength(0);
  });
});
