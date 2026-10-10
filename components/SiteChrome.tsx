import { INSTAGRAM_HANDLE, INSTAGRAM_URL, serviceGroups, WA_DISPLAY, WA_URL } from "@/lib/content";
import { Nav } from "./Nav";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Announcement strip, menu, footer and WhatsApp button shared by every page.
export function SiteHeader() {
  return (
    <>
      <div className="strip">
        <div className="wrap">
          <span>
            <strong>Konsultasi pertama gratis</strong> untuk pendirian PT, CV, dan perizinan usaha
          </span>
          <a href="/#kontak">Lihat detail</a>
        </div>
      </div>

      <Nav />
    </>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="logo" href="/" aria-label="LegalEase, ke halaman utama">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/legalease-logo.png" alt="LegalEase" width={165} height={38} />
              </a>
              <p>Konsultan legalitas, perizinan, dan pajak untuk pemilik usaha di Indonesia. Legal Made Easy.</p>
            </div>
            <div>
              <h3>Layanan</h3>
              <ul>
                {serviceGroups.map((g) => (
                  <li key={g.title}>
                    <a href="/#semua-layanan">{g.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Panduan</h3>
              <ul>
                <li><a href="/#semua-layanan">Semua layanan</a></li>
                <li><a href="/#cara-kerja">Cara kerja</a></li>
                <li><a href="/#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3>Hubungi kami</h3>
              <ul>
                <li><a href={WA_URL} target="_blank" rel="noopener">WhatsApp {WA_DISPLAY}</a></li>
                <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram {INSTAGRAM_HANDLE}</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-base">
            <span>&copy; 2026 LegalEase</span>
            <span>Konsultan legal swasta, bukan instansi pemerintah.</span>
          </div>
        </div>
      </footer>

      <a className="wa-float" href={WA_URL} target="_blank" rel="noopener" aria-label="Chat WhatsApp LegalEase">
        <WhatsAppIcon />
      </a>
    </>
  );
}
