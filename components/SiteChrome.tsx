import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WA_DISPLAY, WA_URL } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, type Lang } from "@/lib/i18n";
import { Nav } from "./Nav";
import { Rich } from "./Rich";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Announcement strip, menu, footer and WhatsApp button shared by every page.
export function SiteHeader({ lang, path }: { lang: Lang; path: string }) {
  const d = getDict(lang);
  return (
    <>
      <div className="strip">
        <div className="wrap">
          <span>
            <Rich text={d.strip.text} tag="strong" />
          </span>
          <a href={href(lang, "/#kontak")}>{d.strip.link}</a>
        </div>
      </div>

      <Nav lang={lang} path={path} t={d.nav} groups={d.serviceGroups} />
    </>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <>
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="logo" href={href(lang, "/")} aria-label={d.nav.homeLabel}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/legalease-logo.png" alt="LegalEase" width={165} height={38} />
              </a>
              <p>{d.footer.about}</p>
            </div>
            <div>
              <h3>{d.footer.services}</h3>
              <ul>
                {d.serviceGroups.map((g) => (
                  <li key={g.title}>
                    <a href={href(lang, "/#semua-layanan")}>{g.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{d.footer.guide}</h3>
              <ul>
                <li><a href={href(lang, "/#semua-layanan")}>{d.home.allTitle}</a></li>
                <li><a href={href(lang, "/kbli")}>{d.footer.kbli}</a></li>
                <li><a href={href(lang, "/kalkulator-pph")}>{d.footer.pph}</a></li>
                <li><a href={href(lang, "/#cara-kerja")}>{d.nav.howItWorks}</a></li>
                <li><a href={href(lang, "/#faq")}>{d.nav.faq}</a></li>
              </ul>
            </div>
            <div>
              <h3>{d.footer.contact}</h3>
              <ul>
                <li><a href={WA_URL} target="_blank" rel="noopener">WhatsApp {WA_DISPLAY}</a></li>
                <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram {INSTAGRAM_HANDLE}</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-base">
            <span>&copy; 2026 LegalEase</span>
            <span>{d.footer.base}</span>
          </div>
        </div>
      </footer>

      <a className="wa-float" href={WA_URL} target="_blank" rel="noopener" aria-label={d.footer.waFloat}>
        <WhatsAppIcon />
      </a>
    </>
  );
}
