import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { GameProvider } from "./providers/game-provider";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsTestingAdapter>
      <GameProvider>{children}</GameProvider>
    </NuqsTestingAdapter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AppProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
