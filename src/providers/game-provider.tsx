/**
 * The provider for the game state.
 * This is where we get the game instance, and make it available
 * to any child components.
 */
// GameContext.tsx
import { ReactNode } from "react";
import { useGame } from "../hooks/use-game";
import { GameContext } from "../contexts/use-game-context";

export function GameProvider({ children }: { children: ReactNode }) {
  const gameData = useGame();

  return (
    <GameContext.Provider value={gameData}>{children}</GameContext.Provider>
  );
}
