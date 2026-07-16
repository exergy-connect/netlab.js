import { defineConfig } from "vite";
import path from "node:path";

// GitHub project pages serve from /<repo>/ when publishing the /docs folder.
const base = process.env.VITE_BASE_PATH || "/";
const buildTime = new Date().toISOString();

export default defineConfig({
  root: ".",
  base,
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@exergy-connect/netlab": path.resolve(__dirname, "../../packages/core/src/browser.ts"),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, "../.."), path.resolve(__dirname, "../../../xYang")],
    },
  },
});
