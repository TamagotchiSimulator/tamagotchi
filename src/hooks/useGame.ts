/**
 * A react hook that allows consuming components to subscribe to
 * the main game state, and add / remove animals from the game.
 */

import { useEffect, useState } from "react";
import { Game } from "../game";

export function useGame() {
  const [game] = useState(() => new Game());
  const [animals, setAnimals] = useState<ReturnType<typeof game.getAnimals>>(
    []
  );

  useEffect(() => {
    const unsubscribe = game.onAnimalsChange(setAnimals);
    game.start();

    return () => {
      unsubscribe();
    };
  }, [game]);

  return { game, animals };
}
