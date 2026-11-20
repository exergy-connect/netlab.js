import type { ModuleHooks } from "./registry.js";

// Netlab's BFD module supplies defaults; routing modules apply protocol state.
export const name = "bfd";
const hooks: ModuleHooks = { name };
export default hooks;
