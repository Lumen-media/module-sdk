export async function runInit(args: string[]): Promise<number> {
	const name = args[0];
	if (!name) {
		console.error("Usage: lumen-module init <name>");
		return 1;
	}

	try {
		const { scaffoldModule } = await import("@lumen-media/create-module");
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
