import {
  agencies,
  comparison,
  facts,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  reasons,
  services,
  steps,
  WA_DISPLAY,
  WA_URL,
} from "@/lib/content";
import { Faq } from "@/components/Faq";
import { LeadForm } from "@/components/LeadForm";
import { Nav } from "@/components/Nav";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ServiceMedia } from "@/components/ServiceMedia";
import { ServiceDetail } from "@/components/ServiceDetail";
import { ServiceLink } from "@/components/ServiceLink";
import { SiteStateProvider } from "@/components/SiteState";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const heroChips = [
  { key: "pendirian", label: "Pendirian Usaha" },
  { key: "perizinan", label: "Perizinan & OSS" },
  { key: "pajak", label: "Pajak" },
  { key: "hukum", label: "Hukum & Merek" },
  { key: "website", label: "Website" },
  { key: "branding", label: "Branding" },
] as const;

export default function Home() {
  return (
    <SiteStateProvider>
      <div className="strip">
        <div className="wrap">
          <span>
            <strong>Konsultasi pertama gratis</strong> untuk pendirian PT, CV, dan perizinan usaha
          </span>
          <a href="#kontak">Lihat detail</a>
        </div>
      </div>

      <Nav />

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <div className="hero-card on-dark">
              <div className="hero-text">
                <h1>
                  Urus <b className="hl">legalitas</b> dan <b className="hl">perizinan</b> bisnismu di satu tempat
                </h1>
                <p className="lede">
                  Pendirian PT dan CV, NIB di OSS, pajak, dan merek, sampai website dan branding usahamu. Tim LegalEase
                  yang mengerjakan, kamu fokus menjalankan usaha.
                </p>
                <div className="chips">
                  {heroChips.map((c) => (
                    <ServiceLink key={c.key} href="#detail" tab={c.key}>
                      {c.label}
                    </ServiceLink>
                  ))}
                </div>
                <p className="tagline">Legal Made Easy</p>
                <div className="hero-cta">
                  <a className="btn btn-ghost-dark" href="#layanan">
                    Lihat layanan
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </a>
                  <a className="btn btn-blue" href={WA_URL} target="_blank" rel="noopener">
                    <WhatsAppIcon />
                    Hubungi Kami
                  </a>
                </div>
              </div>
              <PhotoSlot src="/images/hero.jpg" alt="Pemilik usaha meninjau dokumen perusahaan di kantor" label="Foto utama" />
            </div>

            <div className="facts">
              {facts.map((f) => (
                <div key={f.value}>
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="whyTitle">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="whyTitle">
                Mengapa memilih <span className="hl">LegalEase</span>?
              </h2>
              <p>
                Mengurus legalitas sering macet di hal kecil: dokumen kurang, kode KBLI salah, atau tidak tahu prosesnya
                sudah sampai mana. Ini yang kami jaga.
              </p>
            </div>
            <div className="why">
              {reasons.map((r) => (
                <article key={r.title}>
                  <div className="body">
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                  <PhotoSlot src={r.image} alt={r.alt} label="Foto" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="layanan" aria-labelledby="svcTitle">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Layanan unggulan kami</span>
              <h2 id="svcTitle">Dari berdirinya usaha sampai dikenal pelanggan</h2>
              <p>Enam layanan yang kami tangani. Pilih yang kamu butuhkan, atau ceritakan usahamu dan kami bantu menentukan.</p>
            </div>
            <div className="svc-cards">
              {services.map((s) => (
                <article className="svc-card" key={s.key}>
                  <ServiceMedia service={s.key} alt={s.name} />
                  <h3>{s.name}</h3>
                  <div className="tags">
                    {s.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <p>{s.summary}</p>
                  <div className="btns">
                    <ServiceLink className="btn btn-blue" href="#kontak" lead={s.name}>
                      Hubungi Kami
                    </ServiceLink>
                    <ServiceLink className="btn btn-line" href="#detail" tab={s.key}>
                      Lihat detail
                    </ServiceLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band partners" aria-labelledby="partnerTitle">
          <div className="wrap">
            <h2 id="partnerTitle">Instansi tempat kami mengurus dokumenmu</h2>
            <ul>
              {agencies.map((a) => (
                <li key={a.name}>
                  {a.name}
                  <small>{a.role}</small>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band" id="detail" aria-labelledby="detailTitle">
          <div className="wrap">
            <div className="sec-head left">
              <h2 id="detailTitle">Detail layanan</h2>
            </div>
            <ServiceDetail />
          </div>
        </section>

        <section className="band" id="bentuk-usaha" aria-labelledby="formTitle">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="formTitle">
                PT, CV, atau <span className="hl">PT Perorangan</span>?
              </h2>
              <p>Perbedaan utamanya ada di jumlah pendiri dan sejauh mana harta pribadimu ikut menanggung risiko usaha.</p>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Aspek</th>
                    {comparison.columns.map((c) => (
                      <th scope="col" key={c}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((r) => (
                    <tr key={r.aspect}>
                      <th scope="row">{r.aspect}</th>
                      {r.values.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note">Ringkasan umum. Saat konsultasi, kami cocokkan dengan rencana usaha, modal, dan KBLI-mu.</p>
          </div>
        </section>

        <section className="process on-dark" id="cara-kerja" aria-labelledby="stepsTitle">
          <div className="wrap process-grid">
            <div>
              <h2 id="stepsTitle">
                Empat langkah sampai <span className="hl">dokumen di tanganmu</span>
              </h2>
              <p className="lede">Kamu cukup kirim data. Sisanya kami urus dan kabari di setiap tahap.</p>
              <ol className="steps">
                {steps.map((s) => (
                  <li key={s.title}>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <PhotoSlot src="/images/proses.jpg" alt="Tim LegalEase menyerahkan dokumen perusahaan kepada klien" label="Foto" />
          </div>
        </section>

        <section className="band" id="faq" aria-labelledby="faqTitle">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="faqTitle">
                Apa yang sering <span className="hl">ditanyakan</span> pemilik usaha?
              </h2>
            </div>
            <Faq />
          </div>
        </section>

        <section className="band" id="kontak" aria-labelledby="contactTitle">
          <div className="wrap">
            <div className="cta on-dark">
              <div className="cta-side">
                <h2 id="contactTitle">
                  Siap mengurus <b className="hl">legalitas bisnismu</b> sekarang?
                </h2>
                <p className="lede">Isi formulir ini dan pesanmu akan terbuka di WhatsApp. Konsultasi pertama gratis.</p>
                <PhotoSlot src="/images/konsultasi.jpg" alt="Konsultan LegalEase berdiskusi dengan dua pemilik usaha" label="Foto" />
                <div className="cta-contacts">
                  <span>
                    WhatsApp{" "}
                    <a href={WA_URL} target="_blank" rel="noopener">
                      {WA_DISPLAY}
                    </a>
                  </span>
                  <span>
                    Instagram{" "}
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
                      {INSTAGRAM_HANDLE}
                    </a>
                  </span>
                </div>
              </div>
              <LeadForm />
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="promoTitle">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="promoTitle">Jadilah yang pertama tahu promo LegalEase</h2>
            </div>
            <div className="promos">
              <div className="promo promo-ig">
                <h3>Ikuti kami di Instagram</h3>
                <p>Tips legalitas usaha, perubahan aturan OSS, dan promo layanan setiap minggu.</p>
                <a className="btn btn-blue" href={INSTAGRAM_URL} target="_blank" rel="noopener">
                  Buka {INSTAGRAM_HANDLE}
                </a>
              </div>
              <div className="promo promo-wa">
                <h3>Tanya langsung lewat WhatsApp</h3>
                <p>Kirim pertanyaanmu ke tim kami. Kami balas di hari kerja.</p>
                <a className="btn btn-white" href={WA_URL} target="_blank" rel="noopener">
                  Chat {WA_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="logo" href="#top" aria-label="LegalEase, ke halaman utama">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/legalease-logo.png" alt="LegalEase" width={165} height={38} />
              </a>
              <p>Konsultan legalitas, perizinan, dan pajak untuk pemilik usaha di Indonesia. Legal Made Easy.</p>
            </div>
            <div>
              <h3>Layanan</h3>
              <ul>
                {services.map((s) => (
                  <li key={s.key}>
                    <ServiceLink href="#detail" tab={s.key}>
                      {s.name}
                    </ServiceLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Panduan</h3>
              <ul>
                <li><a href="#bentuk-usaha">PT, CV, atau PT Perorangan</a></li>
                <li><a href="#cara-kerja">Cara kerja</a></li>
                <li><a href="#faq">FAQ</a></li>
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
    </SiteStateProvider>
  );
}
