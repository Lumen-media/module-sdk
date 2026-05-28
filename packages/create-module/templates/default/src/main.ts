import { type LumenHost, LumenPlugin } from "@lumen-media/module-sdk";

export default class __PASCAL__Plugin extends LumenPlugin {
	async onload(host: LumenHost): Promise<void> {
		host.commands.add({
			id: "__KEBAB__.hello",
			title: "__NAME__: hello",
			run: () => host.ui.notify({ message: "Hello from __NAME__!" }),
		});
	}
}
