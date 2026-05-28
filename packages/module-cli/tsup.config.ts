import { defineConfig } from "tsup";

export default defineConfig({
	entry: { "lumen-module": "src/index.ts" },
	format: ["esm"],
	dts: false,
	sourcemap: true,
	clean: true,
	banner: { js: "#!/usr/bin/env node" },
	external: [
		"@lumen-media/create-module",
		"@lumen-media/module-build",
		"@lumen-media/module-sdk",
		"archiver",
		"vite",
	],
});
