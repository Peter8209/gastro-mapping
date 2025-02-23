import React from "react"; // ✅ Musí byť, aby React bol definovaný
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // ✅ Uisti sa, že importuješ globálne CSS

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

