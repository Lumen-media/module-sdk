import { describe, expect, it } from "vitest";
import { manifestSchema } from "../index.js";
import { createMockHost } from "../testing.js";

describe("createMockHost", () => {
	it("returns a host with the expected shape", () => {
		const host = createMockHost();
		expect(host.meta.id).toBe("test-module");
		expect(host.window).toBe("main");
		expect(typeof host.bus.emit).toBe("function");
		expect(typeof host.bus.on).toBe("function");
		expect(typeof host.panels.add).toBe("function");
		expect(typeof host.commands.invoke).toBe("function");
	});

	it("merges overrides onto the base host", () => {
		const host = createMockHost({ meta: { id: "custom", version: "1.0.0" } });
		expect(host.meta.id).toBe("custom");
		expect(host.meta.version).toBe("1.0.0");
	});

	it("bus.on returns a disposable", () => {
		const host = createMockHost();
		const d = host.bus.on("test", () => {});
		expect(typeof d.dispose).toBe("function");
	});

	it("queue.state returns the initial queue state", () => {
		const host = createMockHost();
		const state = host.queue.state();
		expect(state.items).toEqual([]);
		expect(state.currentIndex).toBeNull();
	});

	it("themes.current returns a string", () => {
		const host = createMockHost();
		expect(typeof host.themes.current()).toBe("string");
	});

	it("presentation.state returns idle", () => {
		const host = createMockHost();
		expect(host.presentation.state()).toBe("idle");
	});
});

describe("manifestSchema", () => {
	it("exports the JSON schema object", () => {
		expect(manifestSchema).toBeDefined();
		expect(typeof manifestSchema).toBe("object");
	});

	it("has the required fields declared", () => {
		expect(manifestSchema.required).toContain("id");
		expect(manifestSchema.required).toContain("name");
		expect(manifestSchema.required).toContain("version");
		expect(manifestSchema.required).toContain("api");
		expect(manifestSchema.required).toContain("minLumenVersion");
	});
});
