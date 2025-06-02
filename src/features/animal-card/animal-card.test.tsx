import { render as customRender, screen } from "../../test-utils";
import "@testing-library/jest-dom";
import { AnimalCard } from "./index";
import { createAnimal, AnimalType, Animal } from "../../animals";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";

describe("AnimalCard component renders and behaves as expected", () => {
  let testPoodle: Animal;

  beforeEach(() => {
    testPoodle = createAnimal(AnimalType.Poodle, "Pauline");
  });

  describe("Rendering", () => {
    it("renders the animal card with correct title and stats", () => {
      customRender(<AnimalCard animal={testPoodle} />);

      expect(screen.getByText("Pauline (poodle)")).toBeInTheDocument();

      expect(screen.getByText("Hunger")).toBeInTheDocument();
      expect(screen.getByText("Happiness")).toBeInTheDocument();
      expect(screen.getByText("Tiredness")).toBeInTheDocument();

      expect(screen.getByRole("button", { name: "Feed" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Sleep" })).toBeInTheDocument();

      expect(screen.getByAltText("Poodle")).toBeInTheDocument();
    });

    it("sadly shows dead animal indicator when animal is no longer with us (dead)", () => {
      testPoodle.stats.hunger = 100;
      testPoodle.stats.happiness = 0;
      customRender(<AnimalCard animal={testPoodle} />);

      expect(screen.getByText("Pauline (poodle) 🪦")).toBeInTheDocument();
    });

    it("disables buttons when animal is no longer living", () => {
      testPoodle.stats.hunger = 100;
      testPoodle.stats.happiness = 0;
      customRender(<AnimalCard animal={testPoodle} />);

      expect(screen.getByRole("button", { name: "Feed" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Play" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Sleep" })).toBeDisabled();
    });
  });

  describe("Stats update with game tick", () => {
    it("updates stats after 2 seconds", () => {
      customRender(<AnimalCard animal={testPoodle} />);

      const defaultHunger = testPoodle.stats.hunger;
      const defaultHappiness = testPoodle.stats.happiness;
      const defaultSleep = testPoodle.stats.sleep;

      jest.advanceTimersByTime(2000);
      testPoodle.update(2000);

      expect(testPoodle.stats.hunger).toBeGreaterThan(defaultHunger);
      expect(testPoodle.stats.happiness).toBeLessThan(defaultHappiness);
      expect(testPoodle.stats.sleep).toBeGreaterThan(defaultSleep);
    });
  });

  describe("Buttons work as expected", () => {
    beforeEach(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      jest.useFakeTimers();
    });

    it("clicking feed reduces hunger", async () => {
      customRender(<AnimalCard animal={testPoodle} />);

      const initialHunger = testPoodle.stats.hunger;
      const feedButton = screen.getByRole("button", { name: "Feed" });

      await userEvent.click(feedButton);

      expect(testPoodle.stats.hunger).toBe(initialHunger - 10);
    });

    it("clicking play increases happiness", async () => {
      customRender(<AnimalCard animal={testPoodle} />);

      const initialHappiness = testPoodle.stats.happiness;
      const playButton = screen.getByRole("button", { name: "Play" });

      await userEvent.click(playButton);

      expect(testPoodle.stats.happiness).toBe(initialHappiness + 10);
    });

    it("clicking sleep reduces tiredness", async () => {
      customRender(<AnimalCard animal={testPoodle} />);

      const initialSleep = testPoodle.stats.sleep;
      const sleepButton = screen.getByRole("button", { name: "Sleep" });

      await userEvent.click(sleepButton);

      expect(testPoodle.stats.sleep).toBe(initialSleep - 10);
    });
  });
});
