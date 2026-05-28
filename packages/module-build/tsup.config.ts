import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	treeshake: true,
	external: ["vite", "@lumen-media/module-sdk"],
});
