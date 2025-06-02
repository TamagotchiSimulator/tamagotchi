/**
 * A react hook that contains the main game logic and state management.
 * This replaces the class-based Game approach with a React hook-based solution.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Animal, AnimalType, createAnimal } from "../animals";

export function useGame() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  const deltaRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  /**
   * Adds an animal to the game state
   */
  const addAnimal = useCallback((animal: Animal) => {
    setAnimals((prevAnimals) => [...prevAnimals, animal]);
  }, []);

  /**
   * Wrapper function that allows us to create an animal
   * then add it to the game
   */
  const createAndAddAnimal = useCallback(
    (type: AnimalType, name: string) => {
      const newAnimal = createAnimal(type, name);
      addAnimal(newAnimal);
    },
    [addAnimal]
  );

  /**
   * Remove an animal from the game by id
   */
  const removeAnimal = useCallback((id: string) => {
    setAnimals((prevAnimals) =>
      prevAnimals.filter((animal) => animal.id !== id)
    );
  }, []);

  /**
   * Get a copy of the current animals array
   */
  const getAnimals = useCallback(() => {
    return [...animals];
  }, [animals]);

  /**
   * Updates the animals stats based on the delta time
   * that we provide via the game tick. We only return
   * a new array if the animals stats have actually changed.
   */
  const update = useCallback((delta: number) => {
    setAnimals((prevAnimals) => {
      let hasUpdated = false;
      const updatedAnimals = prevAnimals.map((animal) => {
        const preUpdateStats = animal.getStats();
        animal.update(delta);
        const postUpdateStats = animal.getStats();

        const totalPreValue = Object.values(preUpdateStats).reduce(
          (acc, curr) => acc + curr,
          0
        );

        const totalPostValue = Object.values(postUpdateStats).reduce(
          (acc, curr) => acc + curr,
          0
        );

        if (totalPreValue !== totalPostValue) {
          hasUpdated = true;
        }

        return animal;
      });

      return hasUpdated ? [...updatedAnimals] : prevAnimals;
    });
  }, []);

  /**
   * The game tick - the beating heart of our little fake tamagochi
   */
  const tick = useCallback(() => {
    if (!isRunningRef.current) {
      return;
    }

    const currentTime = performance.now();
    deltaRef.current = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    update(deltaRef.current);
    animationFrameIdRef.current = window.requestAnimationFrame(tick);
  }, [update]);

  /**
   * Start the game loop
   */
  const start = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      lastTimeRef.current = performance.now();
      tick();
    }
  }, [tick]);

  /**
   * Stop the game loop
   */
  const stop = useCallback(() => {
    isRunningRef.current = false;
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    start();

    return () => {
      stop();
    };
  }, [start, stop]);

  return {
    animals,
    addAnimal,
    createAndAddAnimal,
    removeAnimal,
    getAnimals,
    start,
    stop,
  };
}
