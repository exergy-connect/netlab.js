function norm(p: string): string {
  return p.replace(/\\/g, "/");
}

export function resolve(...parts: string[]): string {
  const stack: string[] = [];
  const joined = parts.map(norm).join("/");
  const absolute = joined.startsWith("/");
  for (const part of joined.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") stack.pop();
    else stack.push(part);
  }
  return (absolute ? "/" : "") + stack.join("/");
}

export function dirname(p: string): string {
  const n = norm(p).replace(/\/$/, "");
  const i = n.lastIndexOf("/");
  if (i < 0) return ".";
  if (i === 0) return "/";
  return n.slice(0, i);
}

export function join(...parts: string[]): string {
  return resolve(parts.join("/"));
}

export function basename(p: string, ext?: string): string {
  const base = norm(p).split("/").pop() ?? "";
  if (ext && base.endsWith(ext)) return base.slice(0, -ext.length);
  return base;
}

export default { resolve, dirname, join, basename };
