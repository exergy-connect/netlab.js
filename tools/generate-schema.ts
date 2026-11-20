/** Generate the bundled xYang schema after changes to the YANG source. */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { generateJsonSchema } from "@exergy-connect/xyang";
import { loadSourceYang } from "./yang-source.js";

const destination = fileURLToPath(new URL("../packages/core/src/generated/netlab-schema.json", import.meta.url));
const { schema, diagnostics } = generateJsonSchema(loadSourceYang());
if (diagnostics.length) throw new Error(`Schema export reported diagnostics: ${JSON.stringify(diagnostics)}`);
writeFileSync(destination, `${JSON.stringify(schema)}\n`);
console.log(`Wrote ${destination}`);
