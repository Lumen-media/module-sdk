import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgPath = resolve(here, "../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version: string };

export const version: string = pkg.version;
