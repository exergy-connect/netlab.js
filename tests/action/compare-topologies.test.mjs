import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

test('comparison normalizes export shapes but preserves data differences', () => {
  const dir = mkdtempSync(join(tmpdir(), 'netlab-compare-'));
  try {
    const files = ['python.json', 'js.json', 'python-normal.json', 'js-normal.json'].map(f => join(dir, f));
    writeFileSync(files[0], JSON.stringify({nodes: {r1: {name: 'r1', id: 1}}, links: [], vlans: {red: {id: 10}}, vrfs: {blue: {id: 1}}, defaults: {device: 'python'}}));
    writeFileSync(files[1], JSON.stringify({topology: {links: [], nodes: [{id: 1, name: 'r1'}], vlans: {red: {id: 10}}, vrfs: {blue: {id: 1}}, defaults: {device: 'js'}}}));
    const run = () => spawnSync(process.execPath, ['tools/compare-topologies.mjs', ...files], {encoding: 'utf8'});
    assert.equal(run().status, 0);
    assert.equal(readFileSync(files[2], 'utf8'), readFileSync(files[3], 'utf8'));
    const baseline = {links: [], nodes: [{id: 1, name: 'r1'}], vlans: {red: {id: 10}}, vrfs: {blue: {id: 1}}};
    for (const [key, value] of Object.entries({nodes: [{id: 2, name: 'r1'}], links: [{linkindex: 1}], vlans: {red: {id: 20}}, vrfs: {blue: {id: 2}}})) {
      writeFileSync(files[1], JSON.stringify({topology: {...baseline, [key]: value}}));
      assert.equal(run().status, 0);
      assert.notEqual(readFileSync(files[2], 'utf8'), readFileSync(files[3], 'utf8'), key);
    }
  } finally { rmSync(dir, {recursive: true, force: true}); }
});
