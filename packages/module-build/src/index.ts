import {
	copyFileSync,
	cpSync,
	existsSync,
	mkdirSync,
	readFileSync,
} from "node:fs";
import { resolve } from "node:path";
import type { ModuleManifest } from "@lumen/module-sdk";
import type { Plugin, UserConfig } from "vite";
import { warnUnnamespacedCss } from "./css-lint.js";
import { loadAndValidateManifest } from "./manifest-loader.js";

export interface LumenModuleOptions {
	manifest?: string;
	entry?: string;
	styles?: string;
	assets?: string;
}

const HOST_EXTERNALS = [
	"react",
	"react-dom",
	"@lumen/ui",
	"@lumen/module-sdk",
];

function isHostExternal(id: string): boolean {
	if (HOST_EXTERNALS.includes(id)) return true;
	return HOST_EXTERNALS.some((pkg) => id.startsWith(`${pkg}/`));
}

export default function lumenModule(opts: LumenModuleOptions = {}): Plugin {
	const manifestPath = opts.manifest ?? "manifest.json";
	let manifest: ModuleManifest;
	let projectRoot: string;
	let outDir: string;
	let resolvedManifestPath: string;

	return {
		name: "lumen-module",

		config(_userConfig) {
			projectRoot = process.cwd();
			resolvedManifestPath = resolve(projectRoot, manifestPath);

			manifest = loadAndValidateManifest(resolvedManifestPath);

			const entry = opts.entry
				? resolve(projectRoot, opts.entry)
				: resolve(projectRoot, "src/main.ts");

			const config: UserConfig = {
				build: {
					lib: {
						entry,
						formats: ["es"],
						fileName: () => "main.js",
					},
					rollupOptions: {
						external: (id) => isHostExternal(id),
					},
					sourcemap: true,
					emptyOutDir: true,
					outDir: "dist",
					minify: false,
				},
				esbuild: {
					jsx: "automatic",
				},
			};

			return config;
		},

		configResolved(resolved) {
			outDir = resolve(resolved.root, resolved.build.outDir);
		},

		closeBundle() {
			mkdirSync(outDir, { recursive: true });

			copyFileSync(resolvedManifestPath, resolve(outDir, "manifest.json"));

			const stylesPath = opts.styles
				? resolve(projectRoot, opts.styles)
				: resolve(projectRoot, "styles.css");
			if (existsSync(stylesPath)) {
				const css = readFileSync(stylesPath, "utf8");
				warnUnnamespacedCss(css, manifest.id);
				copyFileSync(stylesPath, resolve(outDir, "styles.css"));
			}

			const assetsPath = opts.assets
				? resolve(projectRoot, opts.assets)
				: resolve(projectRoot, "assets");
			if (existsSync(assetsPath)) {
				cpSync(assetsPath, resolve(outDir, "assets"), { recursive: true });
			}
		},
	};
}
