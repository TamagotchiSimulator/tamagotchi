import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GameProvider } from "./providers/game-provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
    </GameProvider>
  </StrictMode>
);
