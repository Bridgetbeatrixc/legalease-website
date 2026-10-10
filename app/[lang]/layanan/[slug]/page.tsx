import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/ServicePageView";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import type { Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { getServicePage, servicePages } from "@/lib/service-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = getServicePage(lang as Lang, slug);
  return page ? pageMeta(lang as Lang, `/layanan/${slug}`, page.name, page.lede) : {};
}

export default async function Page({ params }: Params) {
  const { lang, slug } = await params;
  const page = getServicePage(lang as Lang, slug);
  if (!page) notFound();
  return (
    <>
      <SiteHeader lang={lang as Lang} path={`/layanan/${slug}`} />
      <ServicePageView lang={lang as Lang} page={page} />
      <SiteFooter lang={lang as Lang} />
    </>
  );
}
