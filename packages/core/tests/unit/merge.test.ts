import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { deepMerge } from "../../src/data/merge.js";
import { getPath, setPath } from "../../src/data/path.js";

describe("deepMerge", () => {
  it("merges nested objects and lets overlay win on scalars", () => {
    const out = deepMerge({ a: { b: 1, c: 2 }, x: 1 }, { a: { b: 9 }, x: 3 });
    assert.equal(out.x, 3);
    assert.deepEqual(out.a, { b: 9, c: 2 });
  });

  it("honors _removed_attr tombstones", () => {
    const out = deepMerge({ a: 1, _removed_attr: ["b"] }, { b: 2, c: 3 });
    assert.equal(out.a, 1);
    assert.equal(out.b, undefined);
    assert.equal(out.c, 3);
  });
});

describe("path helpers", () => {
  it("gets and sets dotted paths", () => {
    const o: Record<string, unknown> = {};
    setPath(o, "defaults.device", "frr");
    assert.equal(getPath(o, "defaults.device"), "frr");
  });
});
