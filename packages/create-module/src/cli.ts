import { argv, exit, stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { scaffoldModule } from "./index.js";

async function ask(
	rl: ReturnType<typeof createInterface>,
	question: string,
	fallback = "",
): Promise<string> {
	const label = fallback ? `${question} (${fallback}): ` : `${question}: `;
	const answer = (await rl.question(label)).trim();
	return answer || fallback;
}

async function main(): Promise<number> {
	const name = argv[2];
	if (!name || name === "-h" || name === "--help") {
		console.log("Usage: create-module <name>");
		console.log("");
		console.log("Scaffolds a new Lumen module in ./<name>/");
		return name ? 0 : 1;
	}

	const rl = createInterface({ input: stdin, output: stdout });

	const description = await ask(rl, "Description", "A Lumen module");
	const author = await ask(rl, "Author");

	rl.close();

	try {
		const target = await scaffoldModule(name, { description, author });
		console.log(`\nCreated ${target}`);
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
