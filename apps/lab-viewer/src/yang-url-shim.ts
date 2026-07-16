/** Map module URLs to a virtual path so defaultYangDir resolves to /yang. */
export function fileURLToPath(url: string | URL): string {
  const s = String(url);
  if (s.startsWith("file:")) {
    return decodeURIComponent(s.replace(/^file:\/\//, "").replace(/^file:\//, "/"));
  }
  // Vite http(s) module URL for schema.ts → pretend we live under /packages/core/src/validate
  return "/packages/core/src/validate/schema.js";
}

export default { fileURLToPath };
