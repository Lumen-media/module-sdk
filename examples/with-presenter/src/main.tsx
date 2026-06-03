import { type LumenHost, LumenPlugin } from "@lumen-media/module-sdk";
import {
	LumenHostProvider,
	useSlideState,
} from "@lumen-media/module-sdk/hooks";

function SlideStatePanel() {
	const state = useSlideState();
	return (
		<div className="lumen-mod-com-lumen-example-with-presenter">
			<p>Presentation: {state === "live" ? "LIVE" : "Idle"}</p>
		</div>
	);
}

export default class WithPresenterPlugin extends LumenPlugin {
	async onload(host: LumenHost): Promise<void> {
		if (host.window === "main") {
			host.panels.add({
				id: "with-presenter.status",
				slot: "sidebar.right.tabs",
				title: "Presentation Status",
				component: () => (
					<LumenHostProvider value={host}>
						<SlideStatePanel />
					</LumenHostProvider>
				),
			});

			host.commands.add({
				id: "with-presenter.go-live",
				title: "With Presenter: Go Live",
				run: () =>
					host.presentation.project("with-presenter.slide", {
						text: "Hello from the module!",
					}),
			});

			host.commands.add({
				id: "with-presenter.stop",
				title: "With Presenter: Stop",
				run: () => host.presentation.clear(),
			});
		}

		host.bus.on<{ text: string }>("with-presenter:message", ({ text }) => {
			host.log.info(`Bus message received: ${text}`);
		});
	}
}
