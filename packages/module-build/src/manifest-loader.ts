import { readFileSync } from "node:fs";
import { type ModuleManifest, manifestSchema } from "@lumen/module-sdk";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(manifestSchema);

export class ManifestError extends Error {
	constructor(
		message: string,
		public readonly path: string,
	) {
		super(message);
		this.name = "ManifestError";
	}
}

export function loadAndValidateManifest(path: string): ModuleManifest {
	let raw: unknown;
	try {
		const content = readFileSync(path, "utf8");
		raw = JSON.parse(content);
	} catch (err) {
		throw new ManifestError(
			`Could not read or parse manifest at ${path}: ${(err as Error).message}`,
			path,
		);
	}

	if (!validate(raw)) {
		const details = (validate.errors ?? [])
			.map((e) => `  - ${e.instancePath || "/"} ${e.message}`)
			.join("\n");
		throw new ManifestError(
			`Manifest validation failed at ${path}:\n${details}`,
			path,
		);
	}

	return raw as unknown as ModuleManifest;
}
