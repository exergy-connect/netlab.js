/**
 * Embedded SVG symbol glyphs for topology nodes.
 */

/** @returns {string} SVG <defs> fragment with symbols */
export function iconDefs() {
  return `
  <symbol id="nl-glyph-router" viewBox="0 0 64 64">
    <rect x="8" y="18" width="48" height="28" rx="6" class="nl-glyph-body"/>
    <circle cx="20" cy="32" r="4" class="nl-glyph-port"/>
    <circle cx="32" cy="32" r="4" class="nl-glyph-port"/>
    <circle cx="44" cy="32" r="4" class="nl-glyph-port"/>
    <path d="M16 18 V12 M32 18 V10 M48 18 V12" class="nl-glyph-antenna" fill="none"/>
    <circle cx="16" cy="10" r="2.5" class="nl-glyph-tip"/>
    <circle cx="32" cy="8" r="2.5" class="nl-glyph-tip"/>
    <circle cx="48" cy="10" r="2.5" class="nl-glyph-tip"/>
  </symbol>
  <symbol id="nl-glyph-switch" viewBox="0 0 64 64">
    <rect x="6" y="22" width="52" height="22" rx="4" class="nl-glyph-body"/>
    <rect x="12" y="28" width="8" height="10" rx="1.5" class="nl-glyph-port"/>
    <rect x="24" y="28" width="8" height="10" rx="1.5" class="nl-glyph-port"/>
    <rect x="36" y="28" width="8" height="10" rx="1.5" class="nl-glyph-port"/>
    <rect x="48" y="28" width="6" height="10" rx="1.5" class="nl-glyph-port"/>
    <path d="M20 22 V16 H28 V22 M36 22 V14 H44 V22" class="nl-glyph-antenna" fill="none"/>
  </symbol>
  <symbol id="nl-glyph-host" viewBox="0 0 64 64">
    <rect x="14" y="12" width="36" height="28" rx="3" class="nl-glyph-body"/>
    <rect x="18" y="16" width="28" height="16" rx="1" class="nl-glyph-screen"/>
    <path d="M24 40 H40 L44 50 H20 Z" class="nl-glyph-body"/>
    <rect x="22" y="50" width="20" height="4" rx="1" class="nl-glyph-port"/>
  </symbol>`;
}

/**
 * @param {"router" | "switch" | "host"} glyph
 */
export function glyphHref(glyph) {
  if (glyph === "switch") return "#nl-glyph-switch";
  if (glyph === "host") return "#nl-glyph-host";
  return "#nl-glyph-router";
}

/** AS / accent color palette (static SVG). */
export const AS_COLORS = [
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
  "#f472b6",
  "#fb7185",
  "#2dd4bf",
  "#c084fc",
];

/**
 * @param {number | undefined} asn
 */
export function asColor(asn) {
  if (asn == null || Number.isNaN(Number(asn))) return AS_COLORS[0];
  return AS_COLORS[Math.abs(Number(asn)) % AS_COLORS.length];
}

/**
 * OSPF/ISIS area accents — cool underlay family (avoid warm overlay pinks/oranges).
 * @param {string} area
 */
export function areaColor(area) {
  const s = String(area ?? "0.0.0.0");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  const palette = ["#2dd4bf", "#38bdf8", "#5eead4", "#67e8f9", "#4ade80", "#7dd3fc"];
  return palette[h % palette.length];
}
