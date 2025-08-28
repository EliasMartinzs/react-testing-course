import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import AppWithContext from "./AppWithContext.tsx";
import { FlowProvider } from "./FlowContent.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlowProvider>
      <AppWithContext />
    </FlowProvider>
  </StrictMode>
);
