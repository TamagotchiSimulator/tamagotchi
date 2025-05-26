import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { GameProvider } from "./providers/game-provider";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";

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

export * from "@testing-library/react";
export { customRender as render };
