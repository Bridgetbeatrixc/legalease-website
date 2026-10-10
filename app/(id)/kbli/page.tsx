import { KbliPage } from "@/components/KbliPage";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { id } from "@/lib/dict/id";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("id", "/kbli", id.kbli.title, id.kbli.lede);

export default function Page() {
  return (
    <>
      <SiteHeader lang="id" path="/kbli" />
      <KbliPage lang="id" />
      <SiteFooter lang="id" />
    </>
  );
}
