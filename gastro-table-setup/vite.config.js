import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Build sa uloží do dist/ namiesto build/
  },
  base: "./", // Dôležité pre GitHub Pages
});

