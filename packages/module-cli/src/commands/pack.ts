import { createWriteStream, readFileSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import archiver from "archiver";
import { runBuild } from "./build.js";

interface MinimalManifest {
	id: string;
	version: string;
}

export async function runPack(_args: string[]): Promise<number> {
	const buildResult = await runBuild([]);
	if (buildResult !== 0) return buildResult;

	const cwd = process.cwd();
	const distDir = resolvePath(cwd, "dist");
	const manifestPath = resolvePath(distDir, "manifest.json");
	const manifest = JSON.parse(
		readFileSync(manifestPath, "utf8"),
	) as MinimalManifest;

	const outName = `${manifest.id}-${manifest.version}.lumenpack`;
	const outPath = resolvePath(distDir, outName);

	await new Promise<void>((done, fail) => {
		const output = createWriteStream(outPath);
		const archive = archiver("zip", { zlib: { level: 9 } });

		output.on("close", () => done());
		archive.on("error", fail);

		archive.pipe(output);
		archive.glob("**/*", {
			cwd: distDir,
			ignore: ["*.lumenpack"],
		});
		archive.finalize();
	});

	console.log(`Packed ${outName}`);
	return 0;
}
