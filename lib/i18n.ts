// The site's languages. Indonesian lives at the root (/, /layanan/...); the others under /en and /zh.

export const LANGS = ["id", "en", "zh"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABEL: Record<Lang, string> = { id: "ID", en: "EN", zh: "中文" };
export const LANG_NAME: Record<Lang, string> = { id: "Bahasa Indonesia", en: "English", zh: "简体中文" };
export const HTML_LANG: Record<Lang, string> = { id: "id", en: "en", zh: "zh-Hans" };

// A site path ("/", "/#faq", "/layanan/pajak") in the given language.
export function href(lang: Lang, path: string) {
  if (lang === "id") return path;
  if (path === "/") return `/${lang}`;
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

// Fills {name}-style placeholders.
export function fill(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? "");
}
