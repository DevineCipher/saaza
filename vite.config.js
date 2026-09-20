import { copyFileSync, existsSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repo = "saaza";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    {
      name: "spa-github-pages-404",
      closeBundle() {
        if (existsSync("dist/index.html")) {
          copyFileSync("dist/index.html", "dist/404.html");
        }
      },
    },
  ],
  base: command === "build" ? `/${repo}/` : "/",
}));
