import type { Diagnostic, DiagnosticCollectorLike } from "../types.js";

export class DiagnosticCollector implements DiagnosticCollectorLike {
  private items: Diagnostic[] = [];

  error(d: Omit<Diagnostic, "severity"> & { severity?: "error" }): void {
    this.items.push({ ...d, severity: "error" });
  }

  warning(d: Omit<Diagnostic, "severity"> & { severity?: "warning" }): void {
    this.items.push({ ...d, severity: "warning" });
  }

  hasErrors(): boolean {
    return this.items.some((i) => i.severity === "error");
  }

  list(): Diagnostic[] {
    return [...this.items];
  }

  clear(): void {
    this.items = [];
  }
}

/** Map xYang validation messages into Netlab-like diagnostic codes. */
export function mapXyangError(
  message: string,
  path?: string,
): Omit<Diagnostic, "severity"> {
  const lower = message.toLowerCase();
  let category = "VALUE";
  let code = "VALUE";
  if (lower.includes("missing") || lower.includes("required") || lower.includes("mandatory")) {
    category = "MISSING";
    code = "MISSING";
  } else if (lower.includes("type") || lower.includes("pattern") || lower.includes("range")) {
    category = "TYPE";
    code = "TYPE";
  } else if (lower.includes("unknown") || lower.includes("not allowed") || lower.includes("unexpected")) {
    category = "ATTR";
    code = "ATTR";
  } else if (lower.includes("leafref") || lower.includes("instance")) {
    category = "VALUE";
    code = "VALUE";
  } else if (lower.includes("depend")) {
    category = "DEPEND";
    code = "DEPEND";
  }
  return {
    code,
    category,
    module: "xyang",
    message,
    path,
  };
}
