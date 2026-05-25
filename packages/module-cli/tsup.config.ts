import { defineConfig } from "tsup";

export default defineConfig({
	entry: { "lumen-module": "src/index.ts" },
	format: ["esm"],
	dts: false,
	sourcemap: true,
	clean: true,
	banner: { js: "#!/usr/bin/env node" },
	external: ["@lumen/module-build", "@lumen/module-sdk", "archiver", "vite"],
});
