// Minimal reproduction of an augmented, keyed list validated with xYang 1.0.5.
// Run: node tools/repro-vlan-key.mjs
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { YangParser, YangValidator } from "@exergy-connect/xyang";

const directory = mkdtempSync(join(tmpdir(), "xyang-vlan-key-"));
try {
  const host = join(directory, "host.yang");
  const augment = join(directory, "vlan.yang");
  writeFileSync(host, `module host {
  yang-version 1.1;
  namespace "urn:example:host";
  prefix h;
  container topology;
}\n`);
  writeFileSync(augment, `module vlan {
  yang-version 1.1;
  namespace "urn:example:vlan";
  prefix v;
  import host { prefix h; }
  augment "/h:topology" {
    list vlans {
      key "name";
      leaf name { type string; }
    }
  }
}\n`);
  const parser = new YangParser({ includePath: [directory], expandUses: true });
  const module = parser.parseFile(host);
  parser.parseFile(augment);
  const input = { topology: { vlans: [{ name: "red" }] } };
  const result = new YangValidator(module).validate(input, { nativeJson: true });
  console.log("input:", JSON.stringify(input));
  console.log("valid:", result.isValid);
  console.log("errors:", JSON.stringify(result.errors));
} finally {
  rmSync(directory, { recursive: true, force: true });
}
