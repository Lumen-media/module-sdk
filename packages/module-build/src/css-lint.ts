const MAX_WARNINGS = 5;

export function expectedNamespace(moduleId: string): string {
	return `.lumen-mod-${moduleId.replace(/\./g, "-")}`;
}

export function warnUnnamespacedCss(css: string, moduleId: string): void {
	const ns = expectedNamespace(moduleId);
	const ruleHead = /(^|\})\s*([^{}@][^{}]*)\{/g;

	let warned = 0;
	let match = ruleHead.exec(css);

	while (match !== null) {
		const head = match[2];
		if (!head) continue;
		const selectors = head
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean);

		for (const selector of selectors) {
			if (selector.startsWith(":root")) continue;
			if (selector.startsWith("html") || selector.startsWith("body")) continue;
			if (selector.includes(ns)) continue;

			warned++;
			if (warned <= MAX_WARNINGS) {
				console.warn(
					`[lumen-module] CSS selector "${selector}" is not namespaced under "${ns}".`,
				);
			}
		}
		match = ruleHead.exec(css);
	}

	if (warned > MAX_WARNINGS) {
		console.warn(
			`[lumen-module] ${warned - MAX_WARNINGS} additional un-namespaced selectors omitted.`,
		);
	}
}
