import { execSync } from "node:child_process";
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export interface ScaffoldOptions {
	cwd?: string;
	template?: string;
	templateDir?: string;
	description?: string;
	author?: string;
}

interface Replacements {
	__NAME__: string;
	__KEBAB__: string;
	__PASCAL__: string;
	__ID__: string;
	__DESCRIPTION__: string;
	__AUTHOR__: string;
}

function resolveLatestVersion(packageName: string): string | null {
	try {
		const result = execSync(`npm view ${packageName} version`, {
			encoding: "utf-8",
			timeout: 5000,
			stdio: ["ignore", "pipe", "ignore"],
		});
		return result.trim();
	} catch {
		return null;
	}
}

export async function scaffoldModule(
	name: string,
	opts: ScaffoldOptions = {},
): Promise<string> {
	if (!name?.trim()) {
		throw new Error("Module name is required.");
	}

	const cwd = opts.cwd ?? process.cwd();
	const templateName = opts.template ?? "default";

	const kebab = toKebab(name);
	const pascal = toPascal(name);
	const id = `com.example.${kebab}`;
	const target = resolve(cwd, kebab);

	if (existsSync(target)) {
		throw new Error(`Directory already exists: ${target}`);
	}

	const here = opts.templateDir ?? dirname(fileURLToPath(import.meta.url));
	const templateRoot = resolve(here, "templates", templateName);
	if (!existsSync(templateRoot)) {
		throw new Error(`Template not found: ${templateName}`);
	}

	const replacements: Replacements = {
		__NAME__: name,
		__KEBAB__: kebab,
		__PASCAL__: pascal,
		__ID__: id,
		__DESCRIPTION__: opts.description ?? "A Lumen module",
		__AUTHOR__: opts.author ?? "",
	};

	copyTree(templateRoot, target, replacements);

	// Resolve latest SDK/CLI versions from npm registry
	const pkgJsonPath = join(target, "package.json");
	const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf8"));

	const sdkLatest = resolveLatestVersion("@lumen-media/module-sdk");
	const cliLatest = resolveLatestVersion("@lumen-media/module-cli");

	if (sdkLatest && pkgJson.devDependencies?.["@lumen-media/module-sdk"]) {
		pkgJson.devDependencies["@lumen-media/module-sdk"] = `^${sdkLatest}`;
	}
	if (cliLatest && pkgJson.devDependencies?.["@lumen-media/module-cli"]) {
		pkgJson.devDependencies["@lumen-media/module-cli"] = `^${cliLatest}`;
	}

	writeFileSync(pkgJsonPath, `${JSON.stringify(pkgJson, null, 2)}\n`);

	return target;
}

function copyTree(src: string, dst: string, replacements: Replacements): void {
	mkdirSync(dst, { recursive: true });
	for (const entry of readdirSync(src)) {
		const srcPath = join(src, entry);
		const resolvedName = entry.startsWith("_") ? `.${entry.slice(1)}` : entry;
		const dstName = applyReplacements(resolvedName, replacements);
		const dstPath = join(dst, dstName);
		const stat = statSync(srcPath);
		if (stat.isDirectory()) {
			copyTree(srcPath, dstPath, replacements);
		} else {
			const content = readFileSync(srcPath, "utf8");
			writeFileSync(dstPath, applyReplacements(content, replacements));
		}
	}
}

function applyReplacements(input: string, replacements: Replacements): string {
	let out = input;
	for (const [from, to] of Object.entries(replacements)) {
		out = out.split(from).join(to);
	}
	return out;
}

function toKebab(input: string): string {
	return input
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function toPascal(input: string): string {
	return input
		.trim()
		.split(/[^a-zA-Z0-9]+/)
		.filter(Boolean)
		.map((word) => {
			const first = word[0] ?? "";
			return first.toUpperCase() + word.slice(1).toLowerCase();
		})
		.join("");
}
