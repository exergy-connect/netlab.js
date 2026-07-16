# Netlab topology runtime styles

Theme-aware CSS for the dynamic mount. Tokens come from the active xFrame
theme (`--accent`, `--fg`, `--bg`, `--surface-bg`, `--muted`, `--border`, …).

```css
.netlab-topology {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem;
  width: min(100%, 46rem);
  max-height: min(72vh, 32rem);
  margin: 0 auto;
  padding: 0.55rem 0.7rem 0.4rem;
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  background:
    radial-gradient(120% 80% at 10% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 55%),
    var(--surface-bg);
  color: var(--fg);
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  flex: 0 1 auto;
  min-height: 0;
  overflow: hidden;
}

.nl-shell {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-height: 0;
  flex: 1 1 auto;
}

.nl-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: center;
  flex: 0 0 auto;
}

.nl-chip {
  appearance: none;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface-bg) 88%, var(--bg));
  color: var(--muted);
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  font: 600 0.72rem/1.3 ui-sans-serif, system-ui, sans-serif;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.nl-chip.is-on,
.nl-chip[aria-pressed="true"] {
  color: var(--fg);
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  background: color-mix(in srgb, var(--accent) 18%, var(--surface-bg));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent);
}

.nl-chip-zoom {
  margin-left: 0.15rem;
  text-transform: none;
  letter-spacing: 0;
}

.nl-svg {
  width: 100%;
  height: auto;
  max-height: min(52vh, 22rem);
  display: block;
  border-radius: 0.6rem;
  background: color-mix(in srgb, var(--bg) 78%, var(--surface-bg));
  color: var(--muted);
  flex: 1 1 auto;
  min-height: 0;
}

.nl-svg-zoomable {
  cursor: zoom-in;
}

/* Body-level portal — escapes #xframe transform / overflow clipping */
.nl-zoom-overlay {
  position: fixed;
  inset: 0;
  z-index: 10050;
  display: grid;
  place-items: center;
  padding: 2.5vh 3vw;
  box-sizing: border-box;
  background: color-mix(in srgb, #020617 72%, transparent);
  backdrop-filter: blur(4px);
  cursor: zoom-out;
}

.nl-zoom-overlay[hidden] {
  display: none;
}

.nl-zoom-stage {
  box-sizing: border-box;
  width: min(96vw, 1100px);
  max-height: 92vh;
  margin: 0;
  padding: 0;
  cursor: default;
  overflow: auto;
}

.nl-zoom-stage .netlab-topology,
.netlab-topology.is-zoomed {
  width: 100%;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0.85rem 1rem 0.65rem;
  border-radius: 1rem;
  box-shadow: 0 24px 80px color-mix(in srgb, #000 45%, transparent);
}

.nl-zoom-stage .nl-svg,
.netlab-topology.is-zoomed .nl-svg {
  max-height: min(78vh, 40rem);
  cursor: zoom-out;
}

.nl-zoom-stage .nl-shell,
.netlab-topology.is-zoomed .nl-shell {
  height: 100%;
}

html.nl-topology-zoomed,
html.nl-topology-zoomed body {
  overflow: hidden;
}

/* Underlay = cool steel; overlay (BGP / tunnels) = warm pink–orange / violet */
.nl-link {
  stroke: color-mix(in srgb, #6b8cae 70%, var(--border));
  stroke-width: 2.6;
  stroke-linecap: round;
  transition: stroke 160ms ease, opacity 160ms ease, stroke-width 160ms ease;
}

.nl-link-ospf {
  stroke-width: 3.2;
}

.nl-bgp {
  fill: none;
  stroke-width: 2.3;
  stroke-dasharray: 7 5;
  stroke-linecap: round;
  transition: stroke 160ms ease, opacity 160ms ease;
}

.nl-bgp-ibgp {
  stroke: color-mix(in srgb, #f472b6 75%, var(--accent));
  color: color-mix(in srgb, #f472b6 75%, var(--accent));
}

.nl-bgp-ebgp {
  stroke: color-mix(in srgb, #fb923c 80%, var(--accent));
  color: color-mix(in srgb, #fb923c 80%, var(--accent));
}

.nl-overlay {
  fill: none;
  stroke: color-mix(in srgb, #c084fc 70%, var(--accent));
  stroke-width: 1.8;
  stroke-dasharray: 3 6;
  opacity: 0.8;
}

.nl-isis {
  fill: none;
  stroke: color-mix(in srgb, #2dd4bf 65%, var(--accent));
  stroke-width: 2;
  stroke-dasharray: 2 4;
}

.nl-link.is-hot,
.nl-isis.is-hot {
  stroke: color-mix(in srgb, #6b8cae 40%, var(--accent));
  stroke-width: 3.4;
  opacity: 1;
  color: color-mix(in srgb, #6b8cae 40%, var(--accent));
}

.nl-bgp.is-hot,
.nl-overlay.is-hot {
  stroke: color-mix(in srgb, #f472b6 55%, var(--accent));
  stroke-width: 3.4;
  opacity: 1;
  color: color-mix(in srgb, #f472b6 55%, var(--accent));
}

.nl-link.is-dimmed,
.nl-bgp.is-dimmed,
.nl-overlay.is-dimmed,
.nl-isis.is-dimmed {
  opacity: 0.18;
}

.nl-node-disc {
  fill: var(--surface-bg);
  stroke-width: 2;
  transition: fill 160ms ease, stroke 160ms ease, opacity 160ms ease;
}

.nl-node-halo {
  fill: none;
  stroke-width: 2.5;
  opacity: 0.55;
}

.nl-glyph {
  pointer-events: none;
}

.nl-glyph-body {
  fill: color-mix(in srgb, var(--surface-bg) 70%, var(--bg));
  stroke: var(--accent);
  stroke-width: 2;
}

.nl-glyph-port {
  fill: var(--accent);
  stroke: none;
}

.nl-glyph-screen {
  fill: var(--bg);
  stroke: var(--accent);
  stroke-width: 1;
}

.nl-glyph-antenna {
  fill: none;
  stroke: var(--muted);
  stroke-width: 1.8;
  stroke-linecap: round;
}

.nl-glyph-tip {
  fill: var(--accent);
  stroke: none;
}

.nl-label {
  fill: var(--fg);
  font: 600 13px ui-sans-serif, system-ui, sans-serif;
  pointer-events: none;
  user-select: none;
}

.nl-sub {
  fill: var(--muted);
  font: 500 10px ui-sans-serif, system-ui, sans-serif;
  pointer-events: none;
  user-select: none;
}

.nl-ip,
.nl-ip-link {
  fill: color-mix(in srgb, #9ec0dc 65%, var(--fg));
  font: 500 9px ui-monospace, SFMono-Regular, Menlo, monospace;
  pointer-events: none;
  user-select: none;
}

.nl-ip-loopback {
  fill: color-mix(in srgb, #f9a8d4 70%, var(--fg));
  font: 600 9px ui-monospace, SFMono-Regular, Menlo, monospace;
  pointer-events: none;
  user-select: none;
}

.nl-node.is-selected .nl-node-disc {
  fill: color-mix(in srgb, var(--accent) 55%, var(--surface-bg));
  stroke: var(--fg);
  stroke-width: 3;
}

.nl-node.is-neighbor .nl-node-disc {
  stroke: color-mix(in srgb, var(--accent) 50%, var(--fg));
  stroke-width: 3;
  fill: color-mix(in srgb, var(--accent) 16%, var(--surface-bg));
}

.nl-node.is-dimmed {
  opacity: 0.28;
}

.nl-meta {
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
  padding-bottom: 0.1rem;
}

.nl-hint {
  margin: 0;
  color: var(--muted);
  font: 0.75rem/1.3 ui-sans-serif, system-ui, sans-serif;
  text-align: center;
}
```
