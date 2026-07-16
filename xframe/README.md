# xFrame content plugins (netlab.js)

Local [xFrame.present](https://github.com/exergy-connect/xFrame.present) content
plugins for Netlab topologies.

| Path | Role |
| --- | --- |
| [`netlab-topology.xp`](netlab-topology.xp) | Demo deck (selective static + interactive dynamic) |
| [`plugins/netlab-topology/`](plugins/netlab-topology/) | Fence language `netlab` → layered SVG / runtime mount |

## Fence language: `netlab`

Body is Netlab topology YAML. The plugin transforms it with
`@exergy-connect/netlab`, then renders physical links plus virtual overlays
(BGP, OSPF, IP, ISIS, VLAN, VRF, VXLAN/EVPN).

### Selective static layers

Pass `show` on `@image` (forwarded into the content plugin), or as fence YAML
front-matter / a leading `# show:` comment. Unset `@image` params also inherit
from surrounding `@region` options and document front matter (`caption`,
`show`, nested `image:`, …).

```yaml
@image
  caption: iBGP view
  show: nodes,links,bgp,ip
  content: |
    ```netlab
    defaults.device: frr
    module: [bgp, ospf]
    …
    ```
```

Layer ids: `nodes`, `links`, `ip`, `bgp`, `ospf`, `isis`, `vlan`, `vrf`,
`vxlan`, `evpn`. Default is every layer present in the transformed topology.

### Dynamic evaluation

Under `@evaluation dynamic`, the plugin embeds a JSON VizModel and mounts
`runtime.js` with layer chips, click-to-focus, and **click-to-zoom** (toolbar
`zoom` chip or double-click the canvas; Escape / backdrop to close). Disable
with fence front-matter:

```netlab
---
click_to_zoom: false
---
defaults.device: frr
…
```

## Build the demo

Requires a built xFrame.present checkout (sibling path assumed below) and a
built netlab.js core (`npm run build` in this repo).

```bash
# From netlab.js root
npm run build

# Compile the deck (auto-loads xframe/plugins/)
node ../xFrame.present/dist/build-cli.js xframe/netlab-topology.xp --ir --html
```

Outputs beside the source:

- `xframe/netlab-topology.xp.json`
- `xframe/netlab-topology.html`
- `xframe/.xframe/content-cache/<slotId>/<contentHash>.svg`

Force regeneration of cached diagrams:

```bash
node ../xFrame.present/dist/build-cli.js xframe/netlab-topology.xp \
  --html --force-content-plugins
```

Explicit plugin path (if the deck lives elsewhere):

```bash
node ../xFrame.present/dist/build-cli.js path/to/deck.xp \
  --content-plugin xframe/plugins/netlab-topology/index.mjs \
  --html
```
