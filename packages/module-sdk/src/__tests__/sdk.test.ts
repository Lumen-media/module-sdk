import { describe, expect, it } from "vitest";
import { manifestSchema } from "../index.js";
import { createMockHost } from "../testing.js";

describe("createMockHost (smoke)", () => {
	it("returns a host with the expected shape", () => {
		const h = createMockHost();
		expect(h.meta.id).toBe("test-module");
		expect(h.window).toBe("main");
		expect(typeof h.bus.emit).toBe("function");
		expect(typeof h.bus.on).toBe("function");
		expect(typeof h.panels.add).toBe("function");
		expect(typeof h.commands.invoke).toBe("function");
	});

	it("merges overrides onto the base host", () => {
		const h = createMockHost({ meta: { id: "custom", version: "1.0.0" } });
		expect(h.meta.id).toBe("custom");
		expect(h.meta.version).toBe("1.0.0");
	});

	it("respects window override", () => {
		const h = createMockHost({ window: "surface" });
		expect(h.window).toBe("surface");
	});

	it("exposes app metadata", () => {
		const h = createMockHost();
		expect(typeof h.app.version).toBe("string");
		expect(typeof h.app.locale).toBe("string");
	});

	it("supports all window contexts", () => {
		expect(createMockHost().window).toBe("main");
		expect(createMockHost({ window: "presenter" }).window).toBe("presenter");
		expect(createMockHost({ window: "surface" }).window).toBe("surface");
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
