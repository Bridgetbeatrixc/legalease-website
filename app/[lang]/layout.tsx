import "../globals.css";
import { RootDoc } from "@/components/RootDoc";
import type { Lang } from "@/lib/i18n";

// English and Chinese pages, under /en and /zh.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <RootDoc lang={lang as Lang}>{children}</RootDoc>;
}
