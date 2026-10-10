import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceGroups, WA_NUMBER } from "@/lib/content";
import { getServicePage, servicePages } from "@/lib/service-pages";
import { ServiceIcon } from "@/components/ServiceIcon";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getServicePage((await params).slug);
  if (!page) return {};
  return { title: `${page.name} | LegalEase`, description: page.lede };
}

export default async function ServicePage({ params }: Params) {
  const page = getServicePage((await params).slug);
  if (!page) notFound();

  const group = serviceGroups.find((g) => g.items.some((it) => it.slug === page.slug))!;
  const icon = group.items.find((it) => it.slug === page.slug)!.icon;
  const related = group.items.filter((it) => it.slug !== page.slug);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Halo LegalEase, saya ingin konsultasi tentang ${page.name}.`)}`;

  return (
    <main className="sp">
      <section className="sp-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Lokasi halaman">
            <a href="/">Beranda</a>
            <span aria-hidden="true">/</span>
            <a href="/#semua-layanan">{group.title}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.name}</span>
          </nav>
          <div className="sp-hero-card">
            <div>
              <span className="eyebrow">{page.name}</span>
              <h1>{page.headline}</h1>
              <p className="lede">{page.lede}</p>
              <div className="hero-cta">
                <a className="btn btn-blue" href={waHref} target="_blank" rel="noopener">
                  <WhatsAppIcon />
                  Konsultasi gratis
                </a>
                <a className="btn btn-ghost-dark" href="/#semua-layanan">
                  Lihat layanan lain
                </a>
              </div>
            </div>
            <div className="sp-hero-icon" aria-hidden="true">
              <ServiceIcon name={icon} />
            </div>
          </div>
        </div>
      </section>

      {page.options && (
        <section className="band">
          <div className="wrap">
            <div className="sec-head left">
              <h2>Pilihan layanan</h2>
            </div>
            <div className="sp-options">
              {page.options.map((o) => (
                <article key={o.name}>
                  <h3>{o.name}</h3>
                  <p>{o.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="band">
        <div className="wrap sp-lists">
          <div>
            <h2>Yang kami kerjakan</h2>
            <ul className="sp-check">
              {page.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Yang perlu kamu siapkan</h2>
            <ul className="sp-docs">
              {page.requirements.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head left">
            <h2>Alur pengurusan</h2>
          </div>
          <ol className="steps sp-steps">
            {page.steps.map((s) => (
              <li key={s.title}>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          {page.notes && (
            <div className="sp-notes">
              <h3>Perlu kamu tahu</h3>
              <ul>
                {page.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head left">
            <h2>Pertanyaan tentang {page.name}</h2>
          </div>
          <div className="faq-panel">
            {page.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sp-cta">
            <div>
              <h2>Konsultasikan {page.name} dengan tim kami</h2>
              <p>Konsultasi pertama gratis. Rincian biaya dan perkiraan waktu kami kirim tertulis sebelum proses dimulai.</p>
            </div>
            <a className="btn btn-white" href={waHref} target="_blank" rel="noopener">
              <WhatsAppIcon />
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="band sp-related">
          <div className="wrap">
            <div className="svc-group">
              <h3>Layanan lain di {group.title}</h3>
              <ul>
                {related.map((it) => (
                  <li key={it.slug}>
                    <a href={`/layanan/${it.slug}`}>
                      <ServiceIcon name={it.icon} />
                      <span>
                        <strong>{it.name}</strong>
                        <span>{it.text}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
