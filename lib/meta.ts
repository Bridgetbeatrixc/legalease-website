import type { Metadata } from "next";
import { getDict } from "./dict";
import { href, HTML_LANG, LANGS, type Lang } from "./i18n";

// Title, description, icon and the links to the same page in the other languages.
export function pageMeta(lang: Lang, path: string, title?: string, description?: string): Metadata {
  const d = getDict(lang);
  return {
    title: title ? `${title} | LegalEase` : d.meta.title,
    description: description ?? d.meta.description,
    icons: { icon: "/assets/legalease-icon.png" },
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [HTML_LANG[l], href(l, path)])) },
  };
}
