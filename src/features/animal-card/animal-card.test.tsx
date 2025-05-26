import { render as customRender, screen } from "../../test-utils";
import "@testing-library/jest-dom";
import { AnimalCard } from "./index";
import { Poodle } from "../../animals/poodle";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";

describe("AnimalCard component renders and behaves as expected", () => {
  let testPoodle: Poodle;

  beforeEach(() => {
    testPoodle = new Poodle("Pauline");
  });

  describe("Rendering", () => {
    it("renders the animal card with correct title and stats", () => {
      customRender(<AnimalCard animal={testPoodle} />);

      // Check if the card title is rendered correctly
      expect(screen.getByText("Pauline (poodle)")).toBeInTheDocument();

      // Check if stat labels are present
      expect(screen.getByText("Hunger")).toBeInTheDocument();
      expect(screen.getByText("Happiness")).toBeInTheDocument();
      expect(screen.getByText("Tiredness")).toBeInTheDocument();

      // Check if action buttons are present
      expect(screen.getByRole("button", { name: "Feed" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Sleep" })).toBeInTheDocument();

      // Check if the poodle image is present
      expect(screen.getByAltText("Poodle")).toBeInTheDocument();
    });

    it("sadly shows dead animal indicator when animal is no longer with us (dead)", () => {
      // Make the animal dead by setting hunger to 100
      testPoodle.stats.hunger = 100;
      customRender(<AnimalCard animal={testPoodle} />);

      expect(screen.getByText("Pauline (poodle) 🪦")).toBeInTheDocument();
    });

    it("disables buttons when animal is dead", () => {
      // Make the animal dead
      testPoodle.stats.hunger = 100;
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

      // Stats should have changed according to the poodle's rate change
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
