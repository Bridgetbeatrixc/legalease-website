import type { Metadata } from "next";
import { PphPage } from "@/components/PphPage";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const t = getDict(lang).pph;
  return pageMeta(lang, "/kalkulator-pph", t.title, t.lede);
}

export default async function Page({ params }: Params) {
  const lang = (await params).lang as Lang;
  return (
    <>
      <SiteHeader lang={lang} path="/kalkulator-pph" />
      <PphPage lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
