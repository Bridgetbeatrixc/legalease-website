import type { Lang } from "@/lib/i18n";
import { en } from "./en";
import { id } from "./id";
import type { Dict } from "./types";
import { zh } from "./zh";

const dicts: Record<Lang, Dict> = { id, en, zh };

export function getDict(lang: Lang) {
  return dicts[lang];
}

export type { Dict };
