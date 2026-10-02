import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  /**
   * Public base path.
   *
   * GitHub Pages serves this repo from a subpath
   * (https://dysignooorg-max.github.io/HMCN/), so assets must be requested
   * from /HMCN/favicon.svg rather than /favicon.svg. The deploy workflow sets
   * VITE_BASE=/HMCN/ for that reason.
   *
   * A custom domain (e.g. helpmycoursenow.com) serves from the root, so the
   * default "/" is correct there and no override is needed.
   */
  base: process.env.VITE_BASE || "/",
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    // Allow the sandbox preview host (and any tunnel/proxy host) to load the
    // dev server. Without this, Vite returns 403 "Blocked request".
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
