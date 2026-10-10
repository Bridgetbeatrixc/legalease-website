import type { Metadata } from "next";
import { KbliPage } from "@/components/KbliPage";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const t = getDict(lang).kbli;
  return pageMeta(lang, "/kbli", t.title, t.lede);
}

export default async function Page({ params }: Params) {
  const lang = (await params).lang as Lang;
  return (
    <>
      <SiteHeader lang={lang} path="/kbli" />
      <KbliPage lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
