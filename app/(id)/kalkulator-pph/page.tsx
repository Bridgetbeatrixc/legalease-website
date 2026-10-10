import { PphPage } from "@/components/PphPage";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { id } from "@/lib/dict/id";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("id", "/kalkulator-pph", id.pph.title, id.pph.lede);

export default function Page() {
  return (
    <>
      <SiteHeader lang="id" path="/kalkulator-pph" />
      <PphPage lang="id" />
      <SiteFooter lang="id" />
    </>
  );
}
