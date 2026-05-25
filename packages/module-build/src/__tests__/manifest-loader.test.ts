import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadAndValidateManifest, ManifestError } from "../manifest-loader.js";

const tmp = join(tmpdir(), "lumen-manifest-test");

beforeEach(() => mkdirSync(tmp, { recursive: true }));
afterEach(() => rmSync(tmp, { recursive: true, force: true }));

function writeManifest(name: string, content: unknown): string {
	const path = join(tmp, name);
	writeFileSync(path, JSON.stringify(content));
	return path;
}

describe("loadAndValidateManifest", () => {
	it("returns the manifest for a valid file", () => {
		const path = writeManifest("valid.json", {
			id: "com.example.my-module",
			name: "My Module",
			version: "1.0.0",
			api: "^0.1.0",
			minLumenVersion: "1.0.0",
		});
		const manifest = loadAndValidateManifest(path);
		expect(manifest.id).toBe("com.example.my-module");
		expect(manifest.name).toBe("My Module");
	});

	it("throws ManifestError for a missing required field", () => {
		const path = writeManifest("missing-id.json", {
			name: "No ID",
			version: "1.0.0",
			api: "^0.1.0",
			minLumenVersion: "1.0.0",
		});
		expect(() => loadAndValidateManifest(path)).toThrow(ManifestError);
	});

	it("throws ManifestError for an invalid version string", () => {
		const path = writeManifest("bad-version.json", {
			id: "com.example.my-module",
			name: "My Module",
			version: "not-semver",
			api: "^0.1.0",
			minLumenVersion: "1.0.0",
		});
		expect(() => loadAndValidateManifest(path)).toThrow(ManifestError);
	});

	it("throws ManifestError when the file does not exist", () => {
		expect(() =>
			loadAndValidateManifest(join(tmp, "nonexistent.json")),
		).toThrow(ManifestError);
	});

	it("throws ManifestError for malformed JSON", () => {
		const path = join(tmp, "bad.json");
		writeFileSync(path, "{ not json }");
		expect(() => loadAndValidateManifest(path)).toThrow(ManifestError);
	});
});
