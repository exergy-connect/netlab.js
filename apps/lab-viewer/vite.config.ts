import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  root: ".",
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
