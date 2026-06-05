import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function getCliVersion(): string {
	try {
		const pkgPath = resolve(
			dirname(fileURLToPath(import.meta.url)),
			"../../package.json",
		);
		return (JSON.parse(readFileSync(pkgPath, "utf8")) as { version: string })
			.version;
	} catch {
		return "";
	}
}

function printBanner(name: string) {
	const version = getCliVersion();
	const tag = version ? ` v${version}` : "";

	console.log("");
	console.log(`  \x1b[36m◆  Lumen Module\x1b[0m\x1b[2m${tag}\x1b[0m`);
	console.log("");
	console.log(`  \x1b[2mScaffolding:\x1b[0m \x1b[1m${name}\x1b[0m`);
	console.log("");
}

function printSuccess(name: string) {
	console.log(`  \x1b[32m✓\x1b[0m  Module created`);
	console.log("");
	console.log("  Next steps:");
	console.log("");
	console.log(`  \x1b[2m$\x1b[0m  cd \x1b[1m${name}\x1b[0m`);
	console.log(`  \x1b[2m$\x1b[0m  npm install`);
	console.log(`  \x1b[2m$\x1b[0m  npm run dev`);
	console.log("");
}

export async function runInit(args: string[]): Promise<number> {
	const name = args[0];
	if (!name) {
		console.error("Usage: lumen-module init <name>");
		return 1;
	}

	printBanner(name);

	try {
		const { scaffoldModule } = await import("@lumen-media/create-module");
		await scaffoldModule(name);
		printSuccess(name);
		return 0;
	} catch (err) {
		console.error(`\n  \x1b[31m✗\x1b[0m  ${(err as Error).message}\n`);
		return 1;
	}
}
