import { HomePage } from "@/components/HomePage";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("id", "/");

export default function Page() {
  return (
    <>
      <SiteHeader lang="id" path="/" />
      <HomePage lang="id" />
      <SiteFooter lang="id" />
    </>
  );
}
