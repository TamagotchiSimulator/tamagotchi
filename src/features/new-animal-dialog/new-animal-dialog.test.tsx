import { screen } from "@testing-library/react";
import { render, RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GameProvider } from "../../providers/game-provider";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { NewAnimalDialog } from "./index";
import React, { ReactElement } from "react";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";

// Custom render function for this test file to control search params
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { searchParams?: string }
) => {
  const { searchParams, ...renderOptions } = options || {};

  const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <NuqsTestingAdapter searchParams={searchParams}>
        <GameProvider>{children}</GameProvider>
      </NuqsTestingAdapter>
    );
  };

  return render(ui, { wrapper: AppProviders, ...renderOptions });
};

describe("Dialog reacts to url state", () => {
  it("dialog is hidden by default", () => {
    customRender(<NewAnimalDialog />);

    const dialog = screen.queryByTestId("new-animal-dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it("dialog is shown when url state is true", () => {
    customRender(<NewAnimalDialog />, {
      searchParams: "?new-animal-dialog=true",
    });

    const dialog = screen.getByTestId("new-animal-dialog");
    expect(dialog).toBeInTheDocument();
  });
});

describe("We can interact with the dialog", () => {
  beforeEach(() => {
    // We have jest running fake timers by default, but here we need to
    // use real timers so that the dialog closes as expected
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.useFakeTimers();
  });

  it("we can create a new animal", async () => {
    customRender(<NewAnimalDialog />, {
      searchParams: "?new-animal-dialog=true",
    });

    const animalNameInput = screen.getByLabelText("Animal name");
    const animalTypeRadio = screen.getByLabelText("poodle");
    const createButton = screen.getByTestId("create-button");

    await userEvent.type(animalNameInput, "Doug");
    await userEvent.click(animalTypeRadio);
    await userEvent.click(createButton);

    const dialog = screen.queryByTestId("new-animal-dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it("animal name input should be invalid when empty", () => {
    customRender(<NewAnimalDialog />, {
      searchParams: "?new-animal-dialog=true",
    });

    const animalNameInput = screen.getByTestId(
      "animal-name-test-id"
    ) satisfies HTMLInputElement;

    // Test the validity state
    expect(animalNameInput.validity.valid).toBe(false);
    expect(animalNameInput.validity.valueMissing).toBe(true);
  });

  it("animal name input should be valid when filled", async () => {
    customRender(<NewAnimalDialog />, {
      searchParams: "?new-animal-dialog=true",
    });

    const animalNameInput = screen.getByTestId(
      "animal-name-test-id"
    ) satisfies HTMLInputElement;

    await userEvent.type(animalNameInput, "Doug");

    expect(animalNameInput.validity.valid).toBe(true);
    expect(animalNameInput.validity.valueMissing).toBe(false);
  });
});
