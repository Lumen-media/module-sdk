import { describe, expect, it } from "vitest";
import { manifestSchema } from "../index.js";
import { createMockHost } from "../testing.js";

function host() {
	return createMockHost();
}

describe("createMockHost", () => {
	it("returns a host with the expected shape", () => {
		const h = host();
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

	describe("bus / events", () => {
		it("bus.on returns a disposable", () => {
			const d = host().bus.on("test", () => {});
			expect(typeof d.dispose).toBe("function");
		});

		it("bus.emit does not throw", () => {
			expect(() => host().bus.emit("test", { value: 1 })).not.toThrow();
		});

		it("events has the same shape as bus", () => {
			const h = host();
			expect(typeof h.events.emit).toBe("function");
			expect(typeof h.events.on).toBe("function");
			const d = h.events.on("test", () => {});
			expect(typeof d.dispose).toBe("function");
		});
	});

	describe("panels", () => {
		it("add returns a disposable", () => {
			const d = host().panels.add({
				id: "test.panel",
				slot: "sidebar.right.tabs",
				title: "Test",
				component: () => null,
			});
			expect(typeof d.dispose).toBe("function");
		});
	});

	describe("commands", () => {
		it("add returns a disposable", () => {
			const d = host().commands.add({
				id: "test.cmd",
				title: "Test Command",
				run: () => {},
			});
			expect(typeof d.dispose).toBe("function");
		});

		it("invoke returns undefined", () => {
			expect(host().commands.invoke("test.cmd")).toBeUndefined();
		});

		it("addPrefix returns a disposable", () => {
			const d = host().commands.addPrefix({
				prefix: "test",
				title: "Test",
				handle: () => [],
			});
			expect(typeof d.dispose).toBe("function");
		});
	});

	describe("menus", () => {
		it("register returns a disposable", () => {
			const d = host().menus.register({ id: "test", label: "Test" });
			expect(typeof d.dispose).toBe("function");
		});

		it("addItem returns a disposable", () => {
			const d = host().menus.addItem("modules", {
				type: "action",
				id: "test.item",
				label: "Test",
			});
			expect(typeof d.dispose).toBe("function");
		});
	});

	describe("ui", () => {
		it("notify does not throw", () => {
			expect(() => host().ui.notify({ message: "test" })).not.toThrow();
		});

		it("confirm resolves to true", async () => {
			const result = await host().ui.confirm({ title: "Test", message: "?" });
			expect(result).toBe(true);
		});

		it("prompt resolves to null", async () => {
			const result = await host().ui.prompt({ title: "Test" });
			expect(result).toBeNull();
		});

		it("openCommandPalette does not throw", () => {
			expect(() => host().ui.openCommandPalette("search")).not.toThrow();
		});

		it("openDialog does not throw", () => {
			expect(() => host().ui.openDialog("test.panel")).not.toThrow();
		});

		it("openBackgroundPicker does not throw", () => {
			expect(() =>
				host().ui.openBackgroundPicker(() => {}),
			).not.toThrow();
		});

		it("openMediaPicker does not throw", () => {
			expect(() => host().ui.openMediaPicker(() => {})).not.toThrow();
		});
	});

	describe("data", () => {
		it("json.load resolves to an object", async () => {
			const result = await host().data.json.load();
			expect(typeof result).toBe("object");
		});

		it("json.get returns the fallback when key is missing", async () => {
			const result = await host().data.json.get("missing", "default");
			expect(result).toBe("default");
		});

		it("json.set and save resolve without throwing", async () => {
			const h = host();
			await expect(h.data.json.set("key", "value")).resolves.toBeUndefined();
			await expect(h.data.json.save({})).resolves.toBeUndefined();
		});

		it("json.delete resolves without throwing", async () => {
			await expect(host().data.json.delete("key")).resolves.toBeUndefined();
		});

		it("sqlite rejects in mock", async () => {
			await expect(host().data.sqlite()).rejects.toThrow(
				"sqlite not available in tests",
			);
		});
	});

	describe("settings", () => {
		it("load resolves to an object", async () => {
			const result = await host().settings.load();
			expect(typeof result).toBe("object");
		});

		it("save resolves without throwing", async () => {
			await expect(host().settings.save({})).resolves.toBeUndefined();
		});

		it("onChange returns a disposable", () => {
			const d = host().settings.onChange(() => {});
			expect(typeof d.dispose).toBe("function");
		});
	});

	describe("queue", () => {
		it("state returns the initial queue state", () => {
			const state = host().queue.state();
			expect(state.items).toEqual([]);
			expect(state.currentIndex).toBeNull();
		});

		it("onChange returns a disposable", () => {
			const d = host().queue.onChange(() => {});
			expect(typeof d.dispose).toBe("function");
		});

		it("navigation methods do not throw", () => {
			const h = host();
			expect(() => h.queue.next()).not.toThrow();
			expect(() => h.queue.previous()).not.toThrow();
			expect(() => h.queue.goTo(0)).not.toThrow();
		});

		it("registerTrigger returns a disposable", () => {
			const d = host().queue.registerTrigger({
				id: "test.trigger",
				label: "Test",
				ConfigComponent: () => null,
				defaultConfig: {},
				onFire: () => {},
			});
			expect(typeof d.dispose).toBe("function");
		});
	});

	describe("presentation", () => {
		it("state returns idle", () => {
			expect(host().presentation.state()).toBe("idle");
		});

		it("onStateChange returns a disposable", () => {
			const d = host().presentation.onStateChange(() => {});
			expect(typeof d.dispose).toBe("function");
		});

		it("isWindowOpen returns false", () => {
			expect(host().presentation.isWindowOpen()).toBe(false);
		});

		it("project and clear do not throw", () => {
			const h = host();
			expect(() => h.presentation.project("test.view", {})).not.toThrow();
			expect(() => h.presentation.clear()).not.toThrow();
		});
	});

	describe("overlay", () => {
		it("state returns idle", () => {
			expect(host().overlay.state()).toBe("idle");
		});

		it("onStateChange returns a disposable", () => {
			const d = host().overlay.onStateChange(() => {});
			expect(typeof d.dispose).toBe("function");
		});

		it("isWindowOpen returns false", () => {
			expect(host().overlay.isWindowOpen()).toBe(false);
		});

		it("project and clear do not throw", () => {
			const h = host();
			expect(() => h.overlay.project("test.view", {})).not.toThrow();
			expect(() => h.overlay.clear()).not.toThrow();
		});
	});

	describe("surface", () => {
		it("state returns idle", () => {
			expect(host().surface.state()).toBe("idle");
		});

		it("onStateChange returns a disposable", () => {
			const d = host().surface.onStateChange(() => {});
			expect(typeof d.dispose).toBe("function");
		});

		it("isWindowOpen returns false", () => {
			expect(host().surface.isWindowOpen()).toBe(false);
		});

		it("openWindow and clear do not throw", () => {
			const h = host();
			expect(() =>
				h.surface.openWindow("test.panel", {}, { title: "Test" }),
			).not.toThrow();
			expect(() => h.surface.clear()).not.toThrow();
		});
	});

	describe("player", () => {
		it("nextSlide and play do not throw", () => {
			const h = host();
			expect(() => h.player.nextSlide()).not.toThrow();
			expect(() => h.player.play("item-id")).not.toThrow();
		});
	});

	describe("lyrics / library", () => {
		it("are empty objects", () => {
			const h = host();
			expect(h.lyrics).toEqual({});
			expect(h.library).toEqual({});
		});
	});

	describe("themes", () => {
		it("current returns a string", () => {
			expect(typeof host().themes.current()).toBe("string");
		});

		it("onChange returns a disposable", () => {
			const d = host().themes.onChange(() => {});
			expect(typeof d.dispose).toBe("function");
		});

		it("defaultBackground returns null", () => {
			expect(host().themes.defaultBackground()).toBeNull();
		});
	});

	describe("fonts", () => {
		it("list resolves to an array", async () => {
			const result = await host().fonts.list();
			expect(Array.isArray(result)).toBe(true);
		});
	});

	describe("fs", () => {
		it("read resolves to a Uint8Array", async () => {
			const result = await host().fs.read("test.txt");
			expect(result).toBeInstanceOf(Uint8Array);
		});

		it("exists resolves to false", async () => {
			expect(await host().fs.exists("test.txt")).toBe(false);
		});

		it("list resolves to an array", async () => {
			const result = await host().fs.list("dir/");
			expect(Array.isArray(result)).toBe(true);
		});

		it("write and remove resolve without throwing", async () => {
			const h = host();
			await expect(
				h.fs.write("test.txt", new Uint8Array()),
			).resolves.toBeUndefined();
			await expect(h.fs.remove("test.txt")).resolves.toBeUndefined();
		});
	});

	describe("net", () => {
		it("request resolves to an ok response", async () => {
			const res = await host().net.request({ url: "https://example.com" });
			expect(res.ok).toBe(true);
			expect(res.status).toBe(200);
		});

		it("get and post resolve to null", async () => {
			const h = host();
			await expect(h.net.get?.("https://example.com")).resolves.toBeNull();
			await expect(
				h.net.post?.("https://example.com", {}),
			).resolves.toBeNull();
		});
	});

	describe("i18n", () => {
		it("t returns the key as fallback", () => {
			expect(host().i18n.t("greeting")).toBe("greeting");
		});

		it("locale returns en", () => {
			expect(host().i18n.locale()).toBe("en");
		});
	});

	describe("log", () => {
		it("all log methods do not throw", () => {
			const h = host();
			expect(() => h.log.debug("msg")).not.toThrow();
			expect(() => h.log.info("msg")).not.toThrow();
			expect(() => h.log.warn("msg")).not.toThrow();
			expect(() => h.log.error("msg")).not.toThrow();
		});
	});

	describe("window context", () => {
		it('defaults to "main"', () => {
			expect(host().window).toBe("main");
		});

		it('supports "presenter"', () => {
			const h = createMockHost({ window: "presenter" });
			expect(h.window).toBe("presenter");
		});

		it('supports "surface"', () => {
			const h = createMockHost({ window: "surface" });
			expect(h.window).toBe("surface");
		});
	});

	describe("app metadata", () => {
		it("exposes app version and locale", () => {
			const h = host();
			expect(typeof h.app.version).toBe("string");
			expect(typeof h.app.locale).toBe("string");
		});
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
