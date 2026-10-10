import { WA_NUMBER } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { fill, href, type Lang } from "@/lib/i18n";
import type { ServicePage } from "@/lib/service-pages";
import { ServiceIcon } from "@/components/ServiceIcon";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

// A service page in any language. Rendered by app/(id)/layanan/[slug] and app/[lang]/layanan/[slug].
export function ServicePageView({ lang, page }: { lang: Lang; page: ServicePage }) {
  const d = getDict(lang);
  const t = d.sp;
  const group = d.serviceGroups.find((g) => g.items.some((it) => it.slug === page.slug))!;
  const icon = group.items.find((it) => it.slug === page.slug)!.icon;
  const related = group.items.filter((it) => it.slug !== page.slug);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(fill(t.waText, { name: page.name }))}`;

  return (
    <main className="sp">
      <section className="sp-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label={t.crumbs}>
            <a href={href(lang, "/")}>{t.home}</a>
            <span aria-hidden="true">/</span>
            <a href={href(lang, "/#semua-layanan")}>{group.title}</a>
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
                  {t.consult}
                </a>
                <a className="btn btn-ghost-dark" href={href(lang, "/#semua-layanan")}>
                  {t.otherServices}
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
              <h2>{t.options}</h2>
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
            <h2>{t.includes}</h2>
            <ul className="sp-check">
              {page.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t.requirements}</h2>
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
            <h2>{t.steps}</h2>
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
              <h3>{t.notes}</h3>
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
            <h2>{fill(t.faqTitle, { name: page.name })}</h2>
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
              <h2>{fill(t.ctaTitle, { name: page.name })}</h2>
              <p>{t.ctaText}</p>
            </div>
            <a className="btn btn-white" href={waHref} target="_blank" rel="noopener">
              <WhatsAppIcon />
              {t.ctaBtn}
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="band sp-related">
          <div className="wrap">
            <div className="svc-group">
              <h3>{fill(t.related, { group: group.title })}</h3>
              <ul>
                {related.map((it) => (
                  <li key={it.slug}>
                    <a href={href(lang, `/layanan/${it.slug}`)}>
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
