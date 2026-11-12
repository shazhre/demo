// Copies the static site into ./public for hosts that expect a publish directory.
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public");
const entries = ["index.html", "css", "js", "images"];

if (!existsSync(join(root, "index.html"))) {
  console.error("build: index.html not found at project root");
  process.exit(1);
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const entry of entries) {
  const src = join(root, entry);
  if (!existsSync(src)) {
    console.warn(`build: skipping missing ${entry}`);
    continue;
  }
  cpSync(src, join(out, entry), { recursive: true });
  console.log(`build: copied ${entry}`);
}

console.log("build: output ready in public/");
