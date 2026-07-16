/** Plain JSON-compatible topology object (Netlab-shaped). */
export type JsonValue = null | boolean | number | string | JsonObject | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

export type Topology = JsonObject & {
  stage?: Stage;
  name?: string;
  provider?: string;
  module?: string[];
  defaults?: JsonObject;
  nodes?: Record<string, Node>;
  links?: Link[];
  groups?: Record<string, Group>;
  addressing?: JsonObject;
  pools?: JsonObject;
  ospf?: JsonObject;
  bgp?: JsonObject;
  isis?: JsonObject;
  vlans?: JsonObject;
  vrfs?: JsonObject;
};

export type Stage = "user_input" | "normalized" | "addressed" | "transformed";

export type Node = JsonObject & {
  name?: string;
  device?: string;
  id?: number;
  role?: string;
  module?: string[];
  interfaces?: Interface[];
  mgmt?: JsonObject;
  loopback?: JsonObject;
  af?: JsonObject;
  ospf?: JsonObject;
  bgp?: JsonObject;
  isis?: JsonObject;
};

export type Link = JsonObject & {
  linkindex?: number;
  type?: string;
  prefix?: JsonObject;
  interfaces?: LinkInterface[];
  bridge?: string;
  "netlab-internal:_linkname"?: string;
};

export type LinkInterface = JsonObject & {
  node?: string;
  ipv4?: string | boolean;
  ipv6?: string | boolean;
  ifindex?: number;
  ifname?: string;
};

export type Interface = JsonObject & {
  ifindex?: number;
  ifname?: string;
  ipv4?: string | boolean;
  ipv6?: string | boolean;
  linkindex?: number;
  neighbors?: Neighbor[];
  ospf?: JsonObject;
  isis?: JsonObject;
  vlan?: JsonObject;
  vrf?: string;
};

export type Neighbor = JsonObject & {
  node?: string;
  ifname?: string;
  ipv4?: string | boolean;
  ipv6?: string | boolean;
};

export type Group = JsonObject & {
  members?: string[];
  device?: string;
  module?: string[];
  node_data?: JsonObject;
};

export type DeviceDef = JsonObject & {
  name?: string;
  description?: string;
  interface_name?: string;
  mgmt_if?: string;
  loopback_interface_name?: string;
  role?: string;
  parent?: string;
  daemon?: boolean;
  _meta_device?: boolean;
  features?: JsonObject;
  clab?: JsonObject;
};

export type Diagnostic = {
  code: string;
  category: string;
  module: string;
  message: string;
  path?: string;
  severity: "error" | "warning";
};

export type TransformContext = {
  diagnostics: DiagnosticCollectorLike;
  devices: Record<string, DeviceDef>;
  snapshot?: (label: string) => void;
  yangDir?: string;
};

export type DiagnosticCollectorLike = {
  error(d: Omit<Diagnostic, "severity"> & { severity?: "error" }): void;
  warning(d: Omit<Diagnostic, "severity"> & { severity?: "warning" }): void;
  hasErrors(): boolean;
  list(): Diagnostic[];
  clear(): void;
};

export const INTERNAL_NS = "netlab-internal";
export const INTERNAL_LINKNAME = `${INTERNAL_NS}:_linkname`;
export const SUPPORTED_DEVICES = ["none", "linux", "frr", "bird"] as const;
export const SUPPORTED_PROVIDER = "clab" as const;
