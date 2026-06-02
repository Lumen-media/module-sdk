type Messages = Record<string, string>;
type Translations = Record<string, Messages>;

let _locale = "en";
const _translations: Translations = {};

export function setupI18n(locale: string, translations: Translations) {
  _locale = locale;
  Object.assign(_translations, translations);
}

export function t(key: string, params?: Record<string, string>): string {
  const lang =
    _translations[_locale] ??
    _translations[_locale.split("-")[0]] ??
    _translations["en"] ??
    {};

  let message = lang[key] ?? key;

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      message = message.replaceAll(`{{${k}}}`, v);
    }
  }

  return message;
}
