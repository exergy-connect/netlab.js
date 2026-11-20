import { build } from "esbuild";

await build({
  entryPoints: ["tools/normalize-topology.mjs"],
  outfile: "action-dist/normalize-topology.mjs",
  bundle: true,
  minify: true,
  platform: "node",
  target: "node24",
  format: "esm",
  // Bundled CommonJS dependencies may require Node built-ins at runtime.
  banner: { js: 'import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);' },
  legalComments: "linked",
});
