import { describe, expect, it, vi } from "vitest";
import { expectedNamespace, warnUnnamespacedCss } from "../css-lint.js";

describe("expectedNamespace", () => {
	it("converts dots to dashes in the module id", () => {
		expect(expectedNamespace("com.example.my-module")).toBe(
			".lumen-mod-com-example-my-module",
		);
	});
});

describe("warnUnnamespacedCss", () => {
	it("does not warn when all selectors are namespaced", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const css = `.lumen-mod-com-example-my-module .title { color: red; }`;
		warnUnnamespacedCss(css, "com.example.my-module");
		expect(warn).not.toHaveBeenCalled();
		warn.mockRestore();
	});

	it("warns on selectors not under the namespace", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const css = `.title { color: red; }`;
		warnUnnamespacedCss(css, "com.example.my-module");
		expect(warn).toHaveBeenCalled();
		warn.mockRestore();
	});

	it("does not warn on :root selectors", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const css = `:root { --color: red; }`;
		warnUnnamespacedCss(css, "com.example.my-module");
		expect(warn).not.toHaveBeenCalled();
		warn.mockRestore();
	});

	it("does not warn on html or body selectors", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const css = `html { box-sizing: border-box; } body { margin: 0; }`;
		warnUnnamespacedCss(css, "com.example.my-module");
		expect(warn).not.toHaveBeenCalled();
		warn.mockRestore();
	});
});
