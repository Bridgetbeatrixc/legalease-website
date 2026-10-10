import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WA_DISPLAY, WA_URL } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { fill, href, type Lang } from "@/lib/i18n";
import { Faq } from "@/components/Faq";
import { LeadForm } from "@/components/LeadForm";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Rich } from "@/components/Rich";
import { ServiceMedia } from "@/components/ServiceMedia";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ServiceLink } from "@/components/ServiceLink";
import { SiteStateProvider } from "@/components/SiteState";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

// The home page in any language. Rendered by app/(id)/page.tsx and app/[lang]/page.tsx.
export function HomePage({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const h = d.home;
  const items = d.serviceGroups.flatMap((g) => g.items);
  // The contact form's option for a service card, matched by page slug.
  const leadFor = (slug: string) => items.find((it) => it.slug === slug)!.name;
  return (
    <SiteStateProvider initial={items[0].name}>
      <main id="top">
        <section className="hero">
          <div className="wrap">
            <div className="hero-card on-dark">
              <div className="hero-text">
                <h1>
                  <Rich text={h.h1} tag="b" />
                </h1>
                <p className="lede">{h.lede}</p>
                <div className="chips">
                  {h.chips.map((c) => (
                    <a key={c} href="#semua-layanan">
                      {c}
                    </a>
                  ))}
                </div>
                <p className="tagline">Legal Made Easy</p>
                <div className="hero-cta">
                  <a className="btn btn-ghost-dark" href="#layanan">
                    {h.seeServices}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </a>
                  <a className="btn btn-blue" href={WA_URL} target="_blank" rel="noopener">
                    <WhatsAppIcon />
                    {h.contactUs}
                  </a>
                </div>
              </div>
              <PhotoSlot src="/images/hero.jpg" alt={h.heroAlt} label={h.heroPhoto} />
            </div>

            <div className="facts">
              {d.facts.map((f) => (
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
                <Rich text={h.whyTitle} />
              </h2>
              <p>{h.whyText}</p>
            </div>
            <div className="why">
              {d.reasons.map((r) => (
                <article key={r.title}>
                  <div className="body">
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                  <PhotoSlot src={r.image} alt={r.alt} label={h.photo} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="layanan" aria-labelledby="svcTitle">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">{h.svcEyebrow}</span>
              <h2 id="svcTitle">{h.svcTitle}</h2>
              <p>{h.svcIntro}</p>
            </div>
            <div className="svc-cards">
              {d.services.map((s) => (
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
                    <ServiceLink className="btn btn-blue" href="#kontak" lead={leadFor(s.slug)}>
                      {h.contactUs}
                    </ServiceLink>
                    <a className="btn btn-line" href={href(lang, `/layanan/${s.slug}`)}>
                      {h.detail}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band partners" aria-labelledby="partnerTitle">
          <div className="wrap">
            <h2 id="partnerTitle">{h.partnersTitle}</h2>
            <ul>
              {d.agencies.map((a) => (
                <li key={a.name}>
                  {a.name}
                  <small>{a.role}</small>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band" id="semua-layanan" aria-labelledby="allTitle">
          <div className="wrap">
            <div className="sec-head left">
              <h2 id="allTitle">{h.allTitle}</h2>
              <p>{h.allText}</p>
            </div>
            <div className="svc-dir">
              {d.serviceGroups.map((g) => (
                <div className="svc-group" key={g.title}>
                  <h3>{g.title}</h3>
                  <p className="svc-group-intro">{g.intro}</p>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.name}>
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
              ))}
            </div>
          </div>
        </section>

        <section className="process on-dark" id="cara-kerja" aria-labelledby="stepsTitle">
          <div className="wrap process-grid">
            <div>
              <h2 id="stepsTitle">
                <Rich text={h.stepsTitle} />
              </h2>
              <p className="lede">{h.stepsLede}</p>
              <ol className="steps">
                {d.steps.map((s) => (
                  <li key={s.title}>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <PhotoSlot src="/images/proses.jpg" alt={h.processAlt} label={h.photo} />
          </div>
        </section>

        <section className="band" id="faq" aria-labelledby="faqTitle">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="faqTitle">
                <Rich text={h.faqTitle} />
              </h2>
            </div>
            <Faq groups={d.faqGroups} label={h.faqTabs} />
          </div>
        </section>

        <section className="band" id="kontak" aria-labelledby="contactTitle">
          <div className="wrap">
            <div className="cta on-dark">
              <div className="cta-side">
                <h2 id="contactTitle">
                  <Rich text={h.contactTitle} tag="b" />
                </h2>
                <p className="lede">{h.contactLede}</p>
                <PhotoSlot src="/images/konsultasi.jpg" alt={h.contactAlt} label={h.photo} />
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
              <LeadForm t={d.form} groups={d.serviceGroups} />
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="promoTitle">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="promoTitle">{h.promoTitle}</h2>
            </div>
            <div className="promos">
              <div className="promo promo-ig">
                <h3>{h.igTitle}</h3>
                <p>{h.igText}</p>
                <a className="btn btn-blue" href={INSTAGRAM_URL} target="_blank" rel="noopener">
                  {fill(h.igBtn, { handle: INSTAGRAM_HANDLE })}
                </a>
              </div>
              <div className="promo promo-wa">
                <h3>{h.waTitle}</h3>
                <p>{h.waText}</p>
                <a className="btn btn-white" href={WA_URL} target="_blank" rel="noopener">
                  {fill(h.waBtn, { number: WA_DISPLAY })}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteStateProvider>
  );
}
