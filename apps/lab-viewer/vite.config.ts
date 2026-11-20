import { defineConfig } from "vite";
import path from "node:path";

// GitHub project pages serve from /<repo>/ when publishing the /docs folder.
const base = process.env.VITE_BASE_PATH || "/";
const buildTime = new Date().toISOString();
const shim = (name: string) => path.resolve(import.meta.dirname, `src/${name}`);
export default defineConfig({
  root: import.meta.dirname,
  base,
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  // Keep the xYang filesystem shim live instead of baking it into Vite's dependency cache.
  optimizeDeps: { exclude: ["@exergy-connect/xyang"] },
  resolve: {
    alias: [
      {
        find: "@exergy-connect/netlab",
        replacement: path.resolve(import.meta.dirname, "../../packages/core/src/browser.ts"),
      },
      // Shim Node built-ins referenced by xYang in the browser
      { find: /^node:fs$/, replacement: shim("yang-fs-shim.ts") },
      { find: /^fs$/, replacement: shim("yang-fs-shim.ts") },
      { find: /^node:path$/, replacement: shim("yang-path-shim.ts") },
      { find: /^path$/, replacement: shim("yang-path-shim.ts") },
      { find: /^node:url$/, replacement: shim("yang-url-shim.ts") },
      { find: /^url$/, replacement: shim("yang-url-shim.ts") },
    ],
  },
  server: {
    fs: {
      allow: [path.resolve(import.meta.dirname, "../.."), path.resolve(import.meta.dirname, "../../../xYang")],
    },
  },
});
