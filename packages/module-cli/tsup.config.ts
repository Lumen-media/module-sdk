import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: { "lumen-module": "src/index.ts" },
	format: ["esm"],
	dts: false,
	sourcemap: true,
	clean: true,
	splitting: false,
	banner: { js: "#!/usr/bin/env node" },
	external: [
		"archiver",
		"vite",
	],
	onSuccess: async () => {
		const src = resolve("node_modules/@lumen-media/create-module/dist/templates");
		if (existsSync(src)) {
			cpSync(src, resolve("dist/templates"), { recursive: true });
		}
	},
});
