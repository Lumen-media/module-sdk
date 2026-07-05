import { cpSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "tsup";

function getPackageVersion(name: string): string {
	const pkgPath = resolve(__dirname, "..", name, "package.json");
	const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
	return pkg.version;
}

export default defineConfig({
	entry: {
		cli: "src/cli.ts",
		index: "src/index.ts",
	},
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	onSuccess: async () => {
		cpSync("templates", "dist/templates", { recursive: true });

		const sdkVersion = getPackageVersion("module-sdk");
		const cliVersion = getPackageVersion("module-cli");

		const pkgPath = resolve("dist", "templates", "default", "package.json");
		const pkg = readFileSync(pkgPath, "utf8");
		const updated = pkg
			.replace("__SDK_VERSION__", sdkVersion)
			.replace("__CLI_VERSION__", cliVersion);
		writeFileSync(pkgPath, updated);
	},
});
