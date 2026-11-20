/** Adapt keyed Netlab dictionaries to RFC 7951 keyed-list instances for YANG regression validation. */
export function projectBgpDictionaries<T>(input: T): T {
  const output = structuredClone(input) as any;
  const root = output.topology;
  const entries = (value: any, key: string, numeric = false): any => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return value;
    return Object.entries(value).map(([name, body]) => ({
      ...(body && typeof body === "object" && !Array.isArray(body) ? body : { invalid: body }),
      [key]: numeric && /^\d+$/.test(name) ? Number(name) : name,
    }));
  };
  const imports = (bgp: any) => {
    const value = bgp?.import;
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    bgp.import = Object.entries(value).map(([protocol, setting]) => ({
      protocol,
      ...(setting === null ? {} : typeof setting === "object" && !Array.isArray(setting)
        ? setting : { enabled: setting }),
    }));
  };
  const vrfs = (owner: any) => {
    if (!owner?.vrfs) return;
    owner.vrfs = entries(owner.vrfs, "name");
    if (Array.isArray(owner.vrfs)) for (const vrf of owner.vrfs) imports(vrf.bgp);
  };
  if (root?.bgp) {
    if (root.bgp.as_list) root.bgp.as_list = entries(root.bgp.as_list, "asn", true);
    if (root.bgp.confederation) root.bgp.confederation = entries(root.bgp.confederation, "asn", true);
  }
  vrfs(root);
  for (const node of root?.nodes ?? []) { imports(node.bgp); vrfs(node); }
  return output;
}
