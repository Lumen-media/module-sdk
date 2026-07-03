import { type LumenHost, LumenPlugin } from "@lumen-media/module-sdk";
import { setupI18n, t } from "./i18n.js";

export default class __PASCAL__Plugin extends LumenPlugin {
  async onload(host: LumenHost): Promise<void> {
    setupI18n(host.app.locale);

    host.commands.add({
      id: "__KEBAB__.hello",
      title: "__NAME__: hello",
      run: () => host.ui.notify({ message: t("hello", { name: "__NAME__" }) }),
    });
  }
}
