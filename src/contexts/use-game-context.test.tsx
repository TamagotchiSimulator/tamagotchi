import React from "react";
import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { GameContext, useGameContext } from "./use-game-context";
import { Game } from "../game";
import { Cat } from "../animals/cat";
import { Dinosaur } from "../animals/dinosaur";
import { Animal } from "../animals";

describe("useGameContext", () => {
  it("should throw an error when used outside of GameProvider", () => {
    expect(() => {
      renderHook(() => useGameContext());
    }).toThrow("useGame must be used within GameProvider");
  });

  it("should return the context value when used within GameProvider", () => {
    const game = new Game();
    const cat = new Cat("Mittens");
    const dinosaur = new Dinosaur("Dino");
    const animals = [cat, dinosaur];

    const wrapper = ({ children }: { children: ReactNode }) => (
      <GameContext.Provider
        value={{
          animals,
          game,
        }}
      >
        {children}
      </GameContext.Provider>
    );

    const { result } = renderHook(() => useGameContext(), { wrapper });

    expect(result.current.game).toBe(game);
    expect(result.current.animals).toEqual(animals);
  });

  it("should return the correct animals array", () => {
    const game = new Game();
    const cat = new Cat("Whiskers");
    const dinosaur = new Dinosaur("Dino");
    const animals = [cat, dinosaur];

    const wrapper = ({ children }: { children: ReactNode }) => (
      <GameContext.Provider
        value={{
          game,
          animals,
        }}
      >
        {children}
      </GameContext.Provider>
    );

    const { result } = renderHook(() => useGameContext(), { wrapper });

    expect(result.current.animals).toHaveLength(2);
    expect(result.current.animals[0]).toBeInstanceOf(Cat);
    expect(result.current.animals[1]).toBeInstanceOf(Dinosaur);
    expect(result.current.animals[0].name).toBe("Whiskers");
    expect(result.current.animals[1].name).toBe("Dino");
  });

  it("should be able to start with an empty animals array", () => {
    const game = new Game();
    const animals: Animal[] = [];
    const wrapper = ({ children }: { children: ReactNode }) => (
      <GameContext.Provider
        value={{
          game,
          animals,
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
