import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/testing.ts", "src/hooks.ts", "src/ui.ts"],
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	treeshake: true,
	external: ["react", "react-dom"],
});
