/**
 * Parse a netlab fence body: optional YAML front-matter for `show` layers,
 * then topology YAML.
 */

const ALL_LAYERS = [
  "nodes",
  "links",
  "ip",
  "bgp",
  "ospf",
  "isis",
  "vlan",
  "vrf",
  "vxlan",
  "evpn",
];

const LAYER_SET = new Set(ALL_LAYERS);

/**
 * @param {string} raw
 * @returns {string[]}
 */
export function parseShowList(raw) {
  if (raw == null || raw === "") return [];
  if (Array.isArray(raw)) {
    return raw.map(String).map((s) => s.trim().toLowerCase()).filter((s) => LAYER_SET.has(s));
  }
  return String(raw)
    .split(/[,|\s]+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => LAYER_SET.has(s));
}

/**
 * @param {unknown} raw
 * @param {boolean} fallback
 */
function parseBoolean(raw, fallback) {
  if (raw === undefined || raw === null || raw === "") return fallback;
  if (typeof raw === "boolean") return raw;
  const token = String(raw).trim().toLowerCase();
  if (["false", "no", "0", "off"].includes(token)) return false;
  if (["true", "yes", "1", "on"].includes(token)) return true;
  return fallback;
}

/**
 * @param {string} body
 * @param {Record<string, string> | undefined} directiveAttrs
 * @returns {{ yaml: string, show: string[] | null, clickToZoom: boolean }}
 */
export function parseFenceBody(body, directiveAttrs) {
  const text = String(body ?? "").replace(/^\uFEFF/, "");
  let yaml = text;
  /** @type {string[] | null} */
  let show = null;
  /** @type {boolean | undefined} */
  let clickToZoom;

  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (fm) {
    const meta = fm[1];
    yaml = fm[2];
    const showLine = meta.match(/^\s*show\s*:\s*(.+)\s*$/m);
    if (showLine) {
      const val = showLine[1].trim();
      if (val.startsWith("[")) {
        const inner = val.replace(/^\[/, "").replace(/\]$/, "");
        show = parseShowList(inner.replace(/['"]/g, ""));
      } else {
        show = parseShowList(val);
      }
    }
    const zoomLine = meta.match(/^\s*click_to_zoom\s*:\s*(.+)\s*$/m);
    if (zoomLine) clickToZoom = parseBoolean(zoomLine[1], true);
  }

  // Leading comment: # show: nodes,bgp,ip
  if (!show) {
    const comment = yaml.match(/^\s*#\s*show\s*:\s*(.+)\s*$/m);
    if (comment) {
      show = parseShowList(comment[1]);
    }
  }

  if (directiveAttrs?.show != null && String(directiveAttrs.show).trim()) {
    show = parseShowList(directiveAttrs.show);
  }
  if (directiveAttrs?.click_to_zoom != null) {
    clickToZoom = parseBoolean(directiveAttrs.click_to_zoom, true);
  }

  return {
    yaml: yaml.trim(),
    show: show && show.length ? show : null,
    clickToZoom: clickToZoom ?? true,
  };
}

export { ALL_LAYERS, LAYER_SET };
