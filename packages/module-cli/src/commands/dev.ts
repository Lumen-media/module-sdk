export async function runDev(_args: string[]): Promise<number> {
	console.error("dev: not implemented yet.");
	console.error(
		"Once the Lumen app exposes its dev-mode HTTP endpoint (127.0.0.1:5179),",
	);
	console.error(
		"this command will load and hot-reload the module against a running instance.",
	);
	console.error("");
	console.error("For now: lumen-module build && reload manually.");
	return 2;
}
