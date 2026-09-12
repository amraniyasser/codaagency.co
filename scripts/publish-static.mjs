import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "out");
const manifestPath = path.join(root, ".static-export.json");
const protectedNames = new Set([".git", ".github", "src", "scripts", "public", "node_modules", "package.json", "package-lock.json", "README.md"]);
let previous = [];
try { previous = JSON.parse(await readFile(manifestPath, "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
const entries = await readdir(output);
for (const name of new Set([...previous, ...entries])) {
  if (path.basename(name) !== name || protectedNames.has(name)) throw new Error(`Unsafe static output entry: ${name}`);
}
for (const name of previous) await rm(path.join(root, name), {recursive:true,force:true});
for (const name of entries) await cp(path.join(output, name),path.join(root,name),{recursive:true});
await writeFile(path.join(root,".nojekyll"), "");
await writeFile(manifestPath, JSON.stringify(entries,null,2)+"\n");

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://amraniyasser.github.io/codaagency.co").replace(/\/$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/codaagency.co";
const today = new Date().toISOString().slice(0,10);
await writeFile(path.join(root,"robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
await writeFile(path.join(root,"sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc><lastmod>${today}</lastmod></url></urlset>\n`);
await writeFile(path.join(root,"llms.txt"), `# Coda Agency\n\n> Agence de création de sites web au Maroc, pour les entreprises de tous secteurs.\n\n## Site officiel\n- [Coda Agency](${base}/) : design, développement et référencement de sites web sur mesure.\n- [Notre approche](${base}/#approche)\n- [Parler d’un projet](${base}/#contact)\n\n## À propos\nCoda conçoit des expériences web adaptées à l’identité et aux besoins de chaque entreprise. Les bases SEO, GEO et AEO sont intégrées à la conception.\n\n## Concepts créatifs\nMaison Azur, Aura Botanique, Studio Élan et Tempo sont des marques fictives imaginées pour présenter des directions créatives. Elles ne constituent pas des références clients.\n`);

// Only preserve the old URL navigation as small noindex bridges. They are not
// SEO landing pages and are deliberately absent from the sitemap. GitHub Pages
// cannot issue server-side 301s; use real redirects when moving to a custom host.
const legacyRoutes = ["creation-site-web-agadir","creation-site-web-casablanca","creation-site-web-maroc","creation-site-web-marrakech","creation-site-web-rabat","creation-site-web-tanger","prix-site-web-maroc","seo-geo-aeo","site-ecommerce","site-vitrine"];
for(const route of legacyRoutes) {
  const dest = `${basePath}/${route==="seo-geo-aeo" ? "#approche" : route==="prix-site-web-maroc" ? "#contact" : ""}`;
  await mkdir(path.join(root,route),{recursive:true});
  await writeFile(path.join(root,route,"index.html"),`<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${base}/"><meta http-equiv="refresh" content="0;url=${dest}"><title>Coda Agency — Notre nouvel univers</title></head><body><p>Découvrez notre nouvel univers : <a href="${dest}">Coda Agency, création de sites web au Maroc</a>.</p></body></html>`);
}
console.log(`Static site prepared at repository root: ${entries.length} entries, 1 indexable page, ${legacyRoutes.length} old URL bridges.`);
