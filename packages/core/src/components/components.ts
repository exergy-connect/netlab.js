import type { JsonObject, Link, Node, Topology } from "../types.js";
import { canonicalizeLinks } from "../links/links.js";

/**
 * Expand component includes: nodes with `include: ComponentName` get replaced by
 * prefixed copies of component nodes/links. Simplified port of components.expand_components.
 */
export function expandComponents(topology: Topology): void {
  const components = (topology as JsonObject).components as Record<string, JsonObject> | undefined;
  if (!components || typeof components !== "object") return;

  const nodes = topology.nodes ?? {};
  const toAdd: Record<string, Node> = {};
  const toRemove: string[] = [];
  const extraLinks: Link[] = [];

  for (const [nname, node] of Object.entries(nodes)) {
    const include = (node as JsonObject).include;
    if (typeof include !== "string") continue;
    const comp = components[include];
    if (!comp) continue;
    toRemove.push(nname);
    const prefix = nname;
    const cNodes = (comp.nodes ?? {}) as Record<string, Node>;
    for (const [cn, cdata] of Object.entries(cNodes)) {
      const nn = `${prefix}_${cn}`;
      toAdd[nn] = { ...(cdata as Node), name: nn };
    }
    const cLinks = (comp.links ?? []) as unknown[];
    // Temporarily attach for canonicalize-style rewrite with renamed nodes
    for (const raw of cLinks) {
      extraLinks.push(prefixLink(raw, prefix, Object.keys(cNodes)));
    }
  }

  for (const n of toRemove) delete nodes[n];
  Object.assign(nodes, toAdd);
  topology.nodes = nodes;
  topology.links = [...(topology.links ?? []), ...extraLinks];
  delete (topology as JsonObject).components;

  // Re-canonicalize links after expansion
  canonicalizeLinks(topology);
}

function prefixLink(raw: unknown, prefix: string, cnames: string[]): Link {
  const rename = (n: string) => (cnames.includes(n) ? `${prefix}_${n}` : n);
  if (Array.isArray(raw)) {
    return { interfaces: raw.map((n) => ({ node: rename(String(n)) })) };
  }
  if (raw && typeof raw === "object") {
    const obj = { ...(raw as JsonObject) } as Link;
    if (Array.isArray(obj.interfaces)) {
      obj.interfaces = obj.interfaces.map((i) => ({
        ...i,
        node: rename(String(i.node ?? "")),
      }));
      return obj;
    }
    const out: Link = { interfaces: [] };
    const intf: NonNullable<Link["interfaces"]> = [];
    for (const [k, v] of Object.entries(obj)) {
      if (cnames.includes(k)) {
        intf.push(
          v && typeof v === "object" && !Array.isArray(v)
            ? { ...(v as object), node: rename(k) }
            : { node: rename(k) },
        );
      } else {
        (out as JsonObject)[k] = v as never;
      }
    }
    out.interfaces = intf;
    return out;
  }
  return { interfaces: [] };
}
