import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initPixelIfConsented } from "./utils/pixel";

// Re-activate the Meta Pixel for returning visitors who already accepted
// cookies, without showing the banner again.
initPixelIfConsented();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
