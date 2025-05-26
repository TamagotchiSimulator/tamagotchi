import { render as customRender, screen } from "../../test-utils";
import "@testing-library/jest-dom";
import { GetStarted } from "./index";
import { NewAnimalDialog } from "../new-animal-dialog";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";

describe("Get Started component behaves as expected", () => {
  it("renders the welcome message and get started button", () => {
    customRender(<GetStarted />);

    expect(
      screen.getByText("Welcome to the magical world of animal care!")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Get started" })
    ).toBeInTheDocument();
  });

  describe("Dialog interaction", () => {
    beforeEach(() => {
      // We have jest running fake timers by default, but here we need to
      // use real timers so that the dialog opens as expected
      jest.useRealTimers();
    });

    afterEach(() => {
      jest.useFakeTimers();
    });

    it("opens the new animal dialog when requested", async () => {
      customRender(
        <>
          <GetStarted />
          <NewAnimalDialog />
        </>
      );

      const dialogBefore = screen.queryByTestId("new-animal-dialog");
      expect(dialogBefore).not.toBeInTheDocument();

      const getStartedButton = screen.getByRole("button", {
        name: "Get started",
      });
      await userEvent.click(getStartedButton);

      const dialogAfter = screen.getByTestId("new-animal-dialog");
      expect(dialogAfter).toBeInTheDocument();
    });
  });
});
