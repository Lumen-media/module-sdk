import { cpSync } from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		cli: "src/cli.ts",
		index: "src/index.ts",
	},
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	banner: { js: "#!/usr/bin/env node" },
	onSuccess: async () => {
		cpSync("templates", "dist/templates", { recursive: true });
	},
});
