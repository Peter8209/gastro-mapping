import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./", // Uistite sa, že root je správne nastavený
  build: {
    outDir: "build",
    rollupOptions: {
      input: "index.html", // Nastavuje správnu cestu k index.html
    },
  },
  server: {
    open: true, // Automaticky otvára stránku pri vývoji
  },
});

