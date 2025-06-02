import { renderHook, act } from "@testing-library/react";
import { useGame } from "./use-game";
import { createAnimal, AnimalType } from "../animals";
import { jest } from "@jest/globals";
import { GameProvider } from "../providers/game-provider";
import { ReactNode } from "react";

describe("the useGame hook behaves as expected", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Game startup", () => {
    it("Should start with an empty animals array if no animals are created", () => {
      const { result } = renderHook(() => useGame());

      expect(result.current.animals).toEqual([]);
      expect(result.current.getAnimals()).toEqual([]);
    });

    it("Should give us access to the functions we need to manage the game", () => {
      const { result } = renderHook(() => useGame());

      expect(typeof result.current.addAnimal).toBe("function");
      expect(typeof result.current.createAndAddAnimal).toBe("function");
      expect(typeof result.current.removeAnimal).toBe("function");
      expect(typeof result.current.getAnimals).toBe("function");
      expect(typeof result.current.start).toBe("function");
      expect(typeof result.current.stop).toBe("function");
    });
  });

  describe("Animals can be added", () => {
    it("Should add a new animal to the game", () => {
      const { result } = renderHook(() => useGame());
      const testAnimal = createAnimal(AnimalType.Cat, "Mittens");

      act(() => {
        result.current.addAnimal(testAnimal);
      });

      expect(result.current.animals).toHaveLength(1);
      expect(result.current.animals[0]).toBe(testAnimal);
      expect(result.current.getAnimals()).toContain(testAnimal);
    });

    it("Should be able to create and add an animal via one function", () => {
      const { result } = renderHook(() => useGame());

      act(() => {
        result.current.createAndAddAnimal(AnimalType.Poodle, "Sandy");
      });

      expect(result.current.animals).toHaveLength(1);
      expect(result.current.animals[0].name).toBe("Sandy");
      expect(result.current.animals[0].type).toBe(AnimalType.Poodle);
    });

    it("should handle multiple animals", () => {
      const { result } = renderHook(() => useGame());

      act(() => {
        result.current.createAndAddAnimal(AnimalType.Cat, "Mittens");
        result.current.createAndAddAnimal(AnimalType.Dinosaur, "Rex");
      });

      expect(result.current.animals).toHaveLength(2);
      expect(result.current.animals[0].name).toBe("Mittens");
      expect(result.current.animals[1].name).toBe("Rex");
    });

    it("Should remove an animal via id", () => {
      const { result } = renderHook(() => useGame());
      const testAnimal = createAnimal(AnimalType.Cat, "Mittens");

      act(() => {
        result.current.addAnimal(testAnimal);
      });

      expect(result.current.animals).toHaveLength(1);

      act(() => {
        result.current.removeAnimal(testAnimal.id);
      });

      expect(result.current.animals).toHaveLength(0);
      expect(result.current.getAnimals()).toEqual([]);
    });

    it("Should return animals array from getAnimals", () => {
      const { result } = renderHook(() => useGame());
      const testAnimal = createAnimal(AnimalType.Cat, "Mittens");

      act(() => {
        result.current.addAnimal(testAnimal);
      });

      const animals1 = result.current.getAnimals();
      const animals2 = result.current.getAnimals();

      expect(animals1).toEqual(animals2);
    });

    it("Should add animals when we use addAnimal", async () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <GameProvider>{children}</GameProvider>
      );

      const { result } = renderHook(() => useGame(), { wrapper });
      const testAnimal = createAnimal(AnimalType.Cat, "Mittens");

      act(() => {
        result.current.addAnimal(testAnimal);
      });

      expect(result.current.animals).toHaveLength(1);
      expect(result.current.animals[0]).toEqual(testAnimal);
    });

    describe("Game functionality", () => {
      it("should start and stop the game", () => {
        const { result } = renderHook(() => useGame());

        // Game should have start/stop functions
        expect(typeof result.current.start).toBe("function");
        expect(typeof result.current.stop).toBe("function");

        // Should be able to call them without errors
        act(() => {
          result.current.stop();
        });

        act(() => {
          result.current.start();
        });
      });

      it("Should update the animal stats when we tick over time", () => {
        const { result } = renderHook(() => useGame());
        const testAnimal = createAnimal(AnimalType.Cat, "Mittens");

        act(() => {
          result.current.addAnimal(testAnimal);
        });

        const initialHunger = testAnimal.stats.hunger;
        const initialHappiness = testAnimal.stats.happiness;
        const initialSleep = testAnimal.stats.sleep;

        act(() => {
          testAnimal.update(2000);
        });

        expect(testAnimal.stats.hunger).toBeGreaterThan(initialHunger);
        expect(testAnimal.stats.happiness).toBeLessThan(initialHappiness);
        expect(testAnimal.stats.sleep).toBeGreaterThan(initialSleep);
      });

      it("Should let us interact with animals", () => {
        const { result } = renderHook(() => useGame());
        const testAnimal = createAnimal(AnimalType.Cat, "Mittens");

        act(() => {
          result.current.addAnimal(testAnimal);
        });

        const initialHunger = testAnimal.stats.hunger;
        const initialHappiness = testAnimal.stats.happiness;
        const initialSleep = testAnimal.stats.sleep;

        act(() => {
          testAnimal.feed();
        });
        expect(testAnimal.stats.hunger).toBeLessThan(initialHunger);

        act(() => {
          testAnimal.play();
        });
        expect(testAnimal.stats.happiness).toBeGreaterThan(initialHappiness);

        act(() => {
          testAnimal.sleep();
        });
        expect(testAnimal.stats.sleep).toBeLessThan(initialSleep);
      });

      it("Should return true if animal is no longer part of the mortal realm", () => {
        const { result } = renderHook(() => useGame());
        const testAnimal = createAnimal(AnimalType.Cat, "Mittens");

        act(() => {
          result.current.addAnimal(testAnimal);
        });

        expect(testAnimal.isDead()).toBe(false);

        act(() => {
          testAnimal.stats.hunger = 100;
          testAnimal.stats.happiness = 0;
        });

        expect(testAnimal.isDead()).toBe(true);
      });
    });

    it("Should be able to see updated animal stats whilst the game tick runs the update function", async () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <GameProvider>{children}</GameProvider>
      );
      const { result } = renderHook(() => useGame(), { wrapper });

      const mockedPerformanceNow = jest.spyOn(performance, "now");
      let currentTime = 1000;
      mockedPerformanceNow.mockImplementation(() => currentTime);

      const mockedRAF = jest.spyOn(window, "requestAnimationFrame");
      const rafCallbacks: FrameRequestCallback[] = [];
      mockedRAF.mockImplementation((callback: FrameRequestCallback) => {
        rafCallbacks.push(callback);
        return 1;
      });

      act(() => {
        result.current.createAndAddAnimal(AnimalType.Cat, "Mittens");
      });

      const initialAnimal = result.current.animals[0];
      const initialStats = initialAnimal.getStats();

      act(() => {
        currentTime += 2000;
        if (rafCallbacks.length > 0) {
          rafCallbacks.forEach((callback) => callback(currentTime));
        }
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const updatedAnimal = result.current.animals[0];
      const updatedStats = updatedAnimal.getStats();

      expect(updatedStats.hunger).toBeGreaterThan(initialStats.hunger);
      expect(updatedStats.happiness).toBeLessThan(initialStats.happiness);
    });
  });
});
