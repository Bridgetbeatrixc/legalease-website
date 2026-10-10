import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import type { Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return pageMeta((await params).lang as Lang, "/");
}

export default async function Page({ params }: Params) {
  const lang = (await params).lang as Lang;
  return (
    <>
      <SiteHeader lang={lang} path="/" />
      <HomePage lang={lang} />
      <SiteFooter lang={lang} />
    </>
  );
}
