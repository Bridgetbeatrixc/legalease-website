import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/ServicePageView";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { pageMeta } from "@/lib/meta";
import { getServicePage, servicePages } from "@/lib/service-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage("id", slug);
  return page ? pageMeta("id", `/layanan/${slug}`, page.name, page.lede) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const page = getServicePage("id", slug);
  if (!page) notFound();
  return (
    <>
      <SiteHeader lang="id" path={`/layanan/${slug}`} />
      <ServicePageView lang="id" page={page} />
      <SiteFooter lang="id" />
    </>
  );
}
