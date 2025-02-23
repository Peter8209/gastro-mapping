import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/gastro-mapping/gastro-table-setup/", // Nastavenie správnej cesty
  build: {
    outDir: "dist",
  },
});

