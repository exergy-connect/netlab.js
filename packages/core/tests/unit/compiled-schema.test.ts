import { test } from "node:test";
import assert from "node:assert/strict";
import { validateAt } from "../../src/validate/validate-at.js";
import { YangValidator } from "@exergy-connect/xyang";
import { toYangInstance } from "../../src/validate/instance-adapter.js";
import { loadSourceYang } from "../../../../tools/yang-source.js";
import type { Topology } from "../../src/types.js";

const topology = (mac: string, target = "a"): Topology => ({
  nodes: { a: { name: "a", device: "none" } },
  links: [{ linkindex: 1, interfaces: [{ node: target }] }],
  gateway: { anycast: { mac } },
}) as unknown as Topology;

test("bundled schema agrees with the YANG model on augmented patterns and references", () => {
  const sourceValidator = new YangValidator(loadSourceYang());
  for (const [value, expected] of [
    [topology("02:00:00:00:00:01"), true],
    [topology("01:00:00:00:00:01"), false],
    [topology("not-a-mac"), false],
    [topology("02:00:00:00:00:01", "missing"), false],
  ] as const) {
    const bundled = validateAt(structuredClone(value), "user_input");
    const sourceTopology = structuredClone(value);
    sourceTopology.stage = "user_input";
    const source = sourceValidator.validate(toYangInstance(sourceTopology), { nativeJson: true });
    assert.equal(source.isValid, expected, JSON.stringify(source.errors));
    assert.equal(bundled.ok, expected, JSON.stringify(bundled.errors));
  }
});
