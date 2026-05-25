import { resolve } from "node:path";

export async function runValidate(args: string[]): Promise<number> {
	const { loadAndValidateManifest } = await import("@lumen/module-build");
	const target = args[0] ?? "manifest.json";
	const path = resolve(process.cwd(), target);

	try {
		const manifest = loadAndValidateManifest(path);
		console.log(`Manifest ${manifest.id} v${manifest.version} is valid.`);
		return 0;
	} catch (err) {
		console.error((err as Error).message);
		return 1;
	}
}
