import { createContext, useContext } from "react";
import { Game } from "../game";
import { Animal } from "../animals";
export const GameContext = createContext<{
  game: Game;
  animals: Animal[];
} | null>(null);
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
