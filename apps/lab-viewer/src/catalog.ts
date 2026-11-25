/** Repository filters shared with lab.net's public/examples/index.json. */
export const repositories = [
  { title: "BGP basic labs", url: "https://github.com/bgplab/bgplab/tree/master", include: ["basic/*/topology.yml"] },
  { title: "netlab integration", numericFilenamesOnly: true, url: "https://github.com/ipspace/netlab/tree/dev/tests/integration", include: [
    "bgp/*.{yml,yaml}", "evpn/*.{yml,yaml}", "evpn.multihoming/*.{yml,yaml}",
    "gateway/*.{yml,yaml}", "isis/*.{yml,yaml}", "lag/*.{yml,yaml}", "mlag.vtep/*.{yml,yaml}", "mpls/*.{yml,yaml}",
    "ospf/*/*.{yml,yaml}", "vlan/*.{yml,yaml}", "vxlan/*.{yml,yaml}",
  ] },
];

type Repository = typeof repositories[number];
export type CatalogEntry = { path: string; url: string };

function glob(pattern: string): RegExp {
  let result = "^";
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === "*") result += "[^/]*";
    else if (char === "?") result += "[^/]";
    else result += char.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(result + "$");
}

export async function fetchRepository(repo: Repository, fetcher: typeof fetch = fetch): Promise<CatalogEntry[]> {
  const parts = new URL(repo.url).pathname.split("/").filter(Boolean);
  const [owner, name, , ref, ...directory] = parts;
  const prefix = directory.length ? directory.join("/") + "/" : "";
  const patterns = repo.include.flatMap(pattern => {
    const match = /\{([^{}]+)\}/.exec(pattern);
    return match ? match[1].split(",").map(alt => glob(pattern.replace(match[0], alt))) : [glob(pattern)];
  });
  const response = await fetcher(`https://api.github.com/repos/${owner}/${name}/git/trees/${encodeURIComponent(ref)}?recursive=1`);
  if (!response.ok) throw new Error(`${repo.title}: HTTP ${response.status}`);
  const data = await response.json() as { truncated?: boolean; tree: { type: string; path: string }[] };
  if (data.truncated) throw new Error(`${repo.title}: incomplete GitHub file list`);
  return data.tree.filter(entry => entry.type === "blob" && entry.path.startsWith(prefix))
    .map(entry => ({ path: entry.path.slice(prefix.length), url: `https://raw.githubusercontent.com/${owner}/${name}/${encodeURIComponent(ref)}/${entry.path.split("/").map(encodeURIComponent).join("/")}` }))
    .filter(entry => (!("numericFilenamesOnly" in repo) || !repo.numericFilenamesOnly || /^[0-9]/.test(entry.path.split("/").pop() ?? "")) && patterns.some(pattern => pattern.test(entry.path)))
    .sort((a, b) => a.path.localeCompare(b.path));
}
