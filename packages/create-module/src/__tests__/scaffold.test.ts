import { existsSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { scaffoldModule } from "../index.js";

const tmp = join(tmpdir(), "lumen-scaffold-test");
const templateDir = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

beforeEach(() => mkdirSync(tmp, { recursive: true }));
afterEach(() => rmSync(tmp, { recursive: true, force: true }));

describe("scaffoldModule", () => {
	it("creates the module directory", async () => {
		await scaffoldModule("my-test-mod", { cwd: tmp, templateDir });
		expect(existsSync(join(tmp, "my-test-mod"))).toBe(true);
	});

	it("creates manifest.json inside the module directory", async () => {
		await scaffoldModule("my-test-mod", { cwd: tmp, templateDir });
		expect(existsSync(join(tmp, "my-test-mod", "manifest.json"))).toBe(true);
	});

	it("creates src/main.ts", async () => {
		await scaffoldModule("my-test-mod", { cwd: tmp, templateDir });
		expect(existsSync(join(tmp, "my-test-mod", "src", "main.ts"))).toBe(true);
	});

	it("throws when the target directory already exists", async () => {
		mkdirSync(join(tmp, "existing"), { recursive: true });
		await expect(scaffoldModule("existing", { cwd: tmp })).rejects.toThrow(
			"Directory already exists",
		);
	});

	it("throws when the name is empty", async () => {
		await expect(scaffoldModule("", { cwd: tmp })).rejects.toThrow(
			"Module name is required",
		);
	});
});
