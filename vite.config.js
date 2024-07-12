import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        competition: resolve(__dirname, "src/competition/index.html"),
        leaguePages: resolve(__dirname, "src/league_pages/index.html"),
      },
    },
  },
});
