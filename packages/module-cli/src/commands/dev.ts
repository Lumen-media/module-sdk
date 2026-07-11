import { existsSync, watch } from "node:fs";
import { resolve } from "node:path";
import { build } from "vite";

const DEV_SERVER = "http://127.0.0.1:5179";
const CONFIG_FILES = ["vite.config.ts", "vite.config.js", "vite.config.mjs"];

async function registerModule(path: string): Promise<string> {
	const res = await fetch(`${DEV_SERVER}/modules`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ path, dev_mode: true }),
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Failed to register module: ${res.status} ${text}`);
	}

	const data = (await res.json()) as { id: string };
	console.log(`Module registered: ${data.id}`);
	return data.id;
}

async function triggerReload(id: string): Promise<void> {
	const res = await fetch(`${DEV_SERVER}/modules/${id}/reload`, {
		method: "POST",
	});

	if (!res.ok) {
		const text = await res.text();
		console.error(`Reload failed: ${res.status} ${text}`);
	}
}

async function runViteBuild(cwd: string): Promise<void> {
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
}

const WATCHED_PATTERNS = ["src", "manifest.json", "styles.css", "assets"];
const IGNORE_PREFIXES = ["dist", "node_modules", ".git"];

function shouldWatch(filename: string): boolean {
	if (IGNORE_PREFIXES.some((p) => filename.startsWith(p))) return false;
	return WATCHED_PATTERNS.some((p) => filename.startsWith(p));
}

export async function runDev(_args: string[]): Promise<number> {
	const cwd = process.cwd();

	if (!existsSync(resolve(cwd, "manifest.json"))) {
		console.error("No manifest.json found in current directory.");
		return 1;
	}

	console.log("Building module...");
	await runViteBuild(cwd);

	const distPath = resolve(cwd, "dist");
	if (!existsSync(distPath)) {
		console.error("Build did not produce a dist/ directory.");
		return 1;
	}

	console.log("Registering module with Lumen dev server...");
	const moduleId = await registerModule(distPath);

	console.log(`Watching for changes... (Ctrl+C to stop)`);

	const watcher = watch(cwd, { recursive: true }, (_event, filename) => {
		if (!filename || !shouldWatch(filename)) return;

		console.log(`\nChange detected: ${filename}`);
		console.log("Rebuilding...");

		runViteBuild(cwd)
			.then(() => triggerReload(moduleId))
			.then(() => console.log("Module reloaded, waiting for changes..."))
			.catch((err: Error) =>
				console.error(`Build/reload error: ${err.message}`),
			);
	});

	process.on("SIGINT", () => {
		console.log("\nStopping dev mode...");
		watcher.close();
		process.exit(0);
	});

	process.on("SIGTERM", () => {
		watcher.close();
		process.exit(0);
	});

	return new Promise<never>(() => {});
}
