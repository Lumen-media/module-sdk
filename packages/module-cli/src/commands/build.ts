import { existsSync } from "node:fs";
import { resolve } from "node:path";

const CONFIG_FILES = ["vite.config.ts", "vite.config.js", "vite.config.mjs"];

export async function runBuild(_args: string[]): Promise<number> {
	const { build } = await import("vite");
	const cwd = process.cwd();
	const hasUserConfig = CONFIG_FILES.some((f) => existsSync(resolve(cwd, f)));

	if (hasUserConfig) {
		await build({ root: cwd });
	} else {
		const { default: lumenModule } = await import("@lumen-media/module-build");
		await build({
			root: cwd,
			configFile: false,
			plugins: [lumenModule()],
		});
	}

	return 0;
}
