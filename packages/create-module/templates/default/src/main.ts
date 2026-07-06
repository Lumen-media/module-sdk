import css from "./styles.css?inline";
import { type LumenHost, LumenPlugin } from "@lumen-media/module-sdk";
import { setupI18n, t } from "./i18n.js";

export default class __PASCAL__Plugin extends LumenPlugin {
  private styleEl: HTMLStyleElement | null = null;

  async onload(host: LumenHost): Promise<void> {
    this.styleEl = document.createElement("style");
    this.styleEl.setAttribute("data-module", host.meta.id);
    this.styleEl.textContent = css;
    document.head.appendChild(this.styleEl);

    setupI18n(host.app.locale);

    host.commands.add({
      id: "__KEBAB__.hello",
      title: "__NAME__: hello",
      run: () => host.ui.notify({ message: t("hello", { name: "__NAME__" }) }),
    });
  }

  async onunload(): Promise<void> {
    this.styleEl?.remove();
    this.styleEl = null;
  }
}
