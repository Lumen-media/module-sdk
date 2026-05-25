import { argv, exit } from "node:process";
import { runBuild } from "./commands/build.js";
import { runDev } from "./commands/dev.js";
import { runInit } from "./commands/init.js";
import { runPack } from "./commands/pack.js";
import { runValidate } from "./commands/validate.js";
import { version } from "./version.js";

const HELP = `lumen-module v${version}

Usage:
  lumen-module <command> [options]

Commands:
  init <name>           Scaffold a new module from the starter template
  build                 Build the module via Vite + @lumen/module-build
  pack                  Build, then zip dist/ into {id}-{version}.lumenpack
  validate [path]       Validate the manifest at path (default: manifest.json)
  dev [path]            Watch a module folder and hot-reload in a running Lumen
  publish               (Not implemented) Open a PR to community-modules

Options:
  -h, --help            Show this help
  -v, --version         Show CLI version
`;

async function main(): Promise<number> {
	const [, , cmd, ...rest] = argv;

	try {
		switch (cmd) {
			case "build":
				return await runBuild(rest);
			case "pack":
				return await runPack(rest);
			case "validate":
				return await runValidate(rest);
			case "dev":
				return await runDev(rest);
			case "init":
				return await runInit(rest);
			case "publish":
				console.error("publish: not implemented yet.");
				return 2;
			case "-h":
			case "--help":
			case undefined:
				console.log(HELP);
				return 0;
			case "-v":
			case "--version":
				console.log(version);
				return 0;
			default:
				console.error(`Unknown command: ${cmd}\n`);
				console.error(HELP);
				return 1;
		}
	} catch (err) {
		console.error((err as Error).message);
		return 1;
	}
}

exit(await main());
