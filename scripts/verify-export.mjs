import { readFile, access, readdir, stat } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const basePath=process.env.NEXT_PUBLIC_BASE_PATH ?? "/codaagency.co";
const origin=(process.env.NEXT_PUBLIC_SITE_URL ?? "https://amraniyasser.github.io/codaagency.co").replace(/\/$/,"");
const html=await readFile(path.join(root,"index.html"),"utf8");
assert.equal((html.match(/<h1\b/g)||[]).length,1,"One and only one H1");
assert(html.includes('lang="fr"'),"French document language");
assert(html.includes(`rel="canonical" href="${origin}/"`),"Canonical uses the actual published URL");
assert(html.includes('property="og:image"'),"Social image is present");
assert(html.includes('name="twitter:card" content="summary_large_image"'),"Twitter card is present");
for(const [,json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { const data=JSON.parse(json); assert.equal(data["@graph"].length,4,"Complete Organization, WebSite, WebPage and Service schema"); }
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
const urls=new Set([...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match=>match[1]));
for(const [,srcset] of html.matchAll(/srcSet="([^"]+)"/gi)) for(const src of srcset.split(",")) urls.add(src.trim().split(" ")[0]);
for(const url of urls) {
  if(url.startsWith("#")) { assert(ids.has(url.slice(1)),`Missing anchor ${url}`); continue; }
  if(!url.startsWith("/")) continue;
  assert(url.startsWith(`${basePath}/`),`Incorrect base path ${url}`);
  const relative=url.slice(basePath.length+1).split(/[?#]/)[0];
  if(!relative) continue;
  await access(path.join(root,relative));
}
const walk=async dir=>(await Promise.all((await readdir(dir)).map(async name=>{const full=path.join(dir,name);return (await stat(full)).isDirectory()?walk(full):[full];}))).flat();
for(const file of await walk(path.join(root,"_next/static"))) {
  if(!file.endsWith(".css")) continue;
  const css=await readFile(file,"utf8");
  for(const [,url] of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    if(url.startsWith("data:")) continue;
    await access(url.startsWith(basePath)?path.join(root,url.slice(basePath.length)):path.resolve(path.dirname(file),url));
  }
}
for(const file of [".nojekyll","sitemap.xml","robots.txt","llms.txt","404.html","assets/logo/coda-agency.svg","assets/favicon/apple-touch-icon.png","assets/social/coda-og.jpg"]) await access(path.join(root,file));
const sitemap=await readFile(path.join(root,"sitemap.xml"),"utf8");
assert.equal((sitemap.match(/<loc>/g)||[]).length,1,"No unbuilt routes in sitemap");
assert(html.includes("Concepts créatifs imaginés par Coda"),"Fictional concepts are identified");
assert(!html.includes("L’envoi sera connecté"),"No old nonfunctional form placeholder");
console.log(`Export verified: ${urls.size} URLs, anchors, image variants, font URLs, metadata, JSON-LD, favicon, sitemap and 404.`);
