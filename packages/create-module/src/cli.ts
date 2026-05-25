import { argv, exit } from "node:process";
import { scaffoldModule } from "./index.js";

async function main(): Promise<number> {
	const name = argv[2];
	if (!name || name === "-h" || name === "--help") {
		console.log("Usage: create-module <name>");
		console.log("");
		console.log("Scaffolds a new Lumen module in ./<name>/");
		return name ? 0 : 1;
	}

	try {
		const target = await scaffoldModule(name);
		console.log(`Created ${target}`);
		console.log("");
		console.log("Next steps:");
		console.log(`  cd ${name}`);
		console.log("  pnpm install");
		console.log("  pnpm build");
		return 0;
	} catch (err) {
		console.error((err as Error).message);
		return 1;
	}
}

exit(await main());
