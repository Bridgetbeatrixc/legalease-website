import Link from "next/link";
import { base, dict, getFounders, projects, type Lang, type Project } from "@/lib/content";
import { Arrow, DmButton, Kicker, Mark, Title } from "./Site";

export function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;
  return (
    <section className="hero tex tex-silk">
      <div className="wrap hero-inner">
        <Kicker>{t.kicker}</Kicker>
        <Title as="h1" a={t.h1a} b={t.h1b} className="hero-title" />
        <div className="hero-foot">
          <p className="lead">{t.sub}</p>
          <div className="actions">
            <DmButton label={t.primary} />
            <Link className="pill pill-ghost" href={`${base(lang)}/work/`}>
              <span>{t.secondary}</span>
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="hero-cities">
          {t.cities.map((c) => (
            <div key={c.city} className="city">
              <span className="city-dot" />
              <span className="city-name">{c.city}</span>
              <span className="city-coord">{c.coord}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A slow-scrolling strip of real work right under the hero. */
export function WorkRail() {
  const imgs = [
    "/img/work/tg1.jpg",
    "/img/work/jp-slide1.jpg",
    "/img/work/kc-logo.jpg",
    "/img/work/sjk-story.jpg",
    "/img/work/pj-slide1.jpg",
    "/img/work/lm1.jpg",
    "/img/work/kasheer-3.jpg",
    "/img/work/kc1.jpg",
    "/img/work/rintisan-2.jpg",
    "/img/work/tg-logo.jpg",
  ];
  const loop = [...imgs, ...imgs];
  return (
    <div className="rail" aria-hidden="true">
      <div className="rail-track">
        {loop.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

export function Services({ lang, full = false }: { lang: Lang; full?: boolean }) {
  const t = dict[lang].services;
  return (
    <section className="section">
      <div className="wrap">
        <div className="split-head">
          <div>
            <Kicker>{t.kicker}</Kicker>
            <Title a={t.h2a} b={t.h2b} />
          </div>
          <p className="lead muted">{t.intro}</p>
        </div>
        <div className="svc-list">
          {t.list.map((s) => (
            <article key={s.no} className="svc">
              <span className="svc-no">{s.no}</span>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-line">{s.line}</p>
              <ul className="svc-items">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {!full && (
          <Link className="text-link" href={`${base(lang)}/services/`}>
            {t.more} <Arrow />
          </Link>
        )}
      </div>
    </section>
  );
}

function ProjectMeta({ p, lang, index, total }: { p: Project; lang: Lang; index: number; total: number }) {
  const l = dict[lang].labels;
  return (
    <div className="case-meta">
      <div className="case-top">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {p.status === "progress" ? <span className="badge">● {l.onProgress}</span> : <span>{p.tag[lang]}</span>}
      </div>
      <h3 className="case-name">{p.name}</h3>
      {p.status === "progress" && <p className="case-tag">{p.tag[lang]}</p>}
      <p className="case-sum">{p.summary[lang]}</p>
      <div className="case-svcs">
        <span className="case-label">{l.services}</span>
        <ul>
          {p.services[lang].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SelectedWork({ lang }: { lang: Lang }) {
  const t = dict[lang].work;
  const featured = projects.filter((p) => p.featured);
  return (
    <section className="section">
      <div className="wrap">
        <div className="split-head">
          <div>
            <Kicker>{t.kicker}</Kicker>
            <Title a={t.h2a} b={t.h2b} />
          </div>
          <Link className="text-link" href={`${base(lang)}/work/`}>
            {t.all} <Arrow />
          </Link>
        </div>
        <div className="cases">
          {featured.map((p, i) => (
            <article key={p.slug} className={`case ${i % 2 ? "case-flip" : ""}`}>
              <Link href={`${base(lang)}/work/#${p.slug}`} className="case-img">
                <img src={p.cover} alt={`${p.name}: ${p.tag[lang]}`} loading="lazy" />
              </Link>
              <ProjectMeta p={p} lang={lang} index={i} total={featured.length} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AllWork({ lang }: { lang: Lang }) {
  const t = dict[lang].work;
  return (
    <section className="section section-tight">
      <div className="wrap">
        {projects.map((p, i) => (
          <article key={p.slug} id={p.slug} className="project">
            <ProjectMeta p={p} lang={lang} index={i} total={projects.length} />
            <div className={`gallery gallery-${p.galleryShape ?? "portrait"} n${p.gallery.length}`}>
              {p.gallery.map((g) => (
                <img key={g} src={g} alt={`${p.name}`} loading="lazy" />
              ))}
            </div>
          </article>
        ))}
        <p className="fineprint">{t.note}</p>
      </div>
    </section>
  );
}

export function WhyBranding({ lang }: { lang: Lang }) {
  const t = dict[lang].why;
  return (
    <section className="section band-blue">
      <div className="outline-word" aria-hidden="true">
        brand
      </div>
      <div className="wrap">
        <Kicker>{t.kicker}</Kicker>
        <Title a={t.h2a} b={t.h2b} className="on-blue" />
        <div className="why">
          {t.points.map((p) => (
            <div key={p.no} className="why-item">
              <span className="why-no">{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process({ lang }: { lang: Lang }) {
  const t = dict[lang].process;
  return (
    <section className="section band-grey">
      <div className="wrap process">
        <div className="process-head">
          <Kicker>{t.kicker}</Kicker>
          <Title a={t.h2a} b={t.h2b} />
        </div>
        <ol className="steps">
          {t.steps.map((s, i) => (
            <li key={s.title} className={`step ${i === 0 ? "step-on" : ""}`}>
              {i === 0 && (
                <>
                  <i className="h tl" />
                  <i className="h tr" />
                  <i className="h bl" />
                  <i className="h br" />
                </>
              )}
              <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Places({ lang }: { lang: Lang }) {
  const t = dict[lang].places;
  const cities = dict[lang].hero.cities;
  return (
    <section className="section tex tex-silkdark">
      <div className="wrap">
        <div className="split-head">
          <div>
            <Kicker>{t.kicker}</Kicker>
            <Title a={t.h2a} b={t.h2b} />
          </div>
          <p className="lead muted">{t.body}</p>
        </div>
        <div className="ticket">
          <div className="ticket-city">
            <span className="ticket-code">SIN</span>
            <span className="ticket-name">{cities[0].city}</span>
            <span className="ticket-coord">{cities[0].coord}</span>
          </div>
          <div className="ticket-line" aria-hidden="true">
            <span />
            <Mark size={22} />
            <span />
          </div>
          <div className="ticket-city ticket-right">
            <span className="ticket-code">SUB</span>
            <span className="ticket-name">{cities[1].city}</span>
            <span className="ticket-coord">{cities[1].coord}</span>
          </div>
        </div>
        <Kicker>{t.langsKicker}</Kicker>
        <div className="langs">
          {t.langs.map((l, i) => (
            <div key={l.name} className="lang-row">
              <span className={`lang-word ${i === 1 ? "accent" : ""}`}>{l.word}</span>
              <span className="lang-meta">
                <strong>{l.name}</strong>
                <span>{l.note}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing({ lang }: { lang: Lang }) {
  const t = dict[lang].pricing;
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="split-head">
          <div>
            <Kicker>{t.kicker}</Kicker>
            <Title a={t.h2a} b={t.h2b} />
          </div>
          <p className="lead muted">{t.intro}</p>
        </div>
        <div className="plans">
          {t.plans.map((p) => (
            <article key={p.name} className="plan">
              <h3>{p.name}</h3>
              <p className="plan-for">{p.forWho}</p>
              <div className="plan-price">
                {p.price ? (
                  <>
                    <span className="plan-from">{t.from}</span>
                    <strong>{p.price}</strong>
                    <span className="plan-unit">{p.unit}</span>
                  </>
                ) : (
                  <span className="plan-pending">{t.pending}</span>
                )}
              </div>
              <ul>
                {p.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="trial">
          <p>{t.trial}</p>
          <span>{t.terms}</span>
        </div>
      </div>
    </section>
  );
}

export function Team({ lang }: { lang: Lang }) {
  const t = dict[lang].team;
  return (
    <section className="section">
      <div className="wrap">
        <div className="center-head">
          <Kicker>{t.kicker}</Kicker>
          <Title a={t.h2a} b={t.h2b} />
          <p className="lead muted">{t.sub}</p>
        </div>
        <div className="team">
          {getFounders(lang).map((f) => (
            <figure key={f.name} className="founder">
              <img src={f.img} alt={f.name} loading="lazy" />
              <figcaption>
                <span className="kicker">
                  {f.role} · {f.city}
                </span>
                <strong>{f.name}</strong>
                <span>{f.focus}</span>
                <span className="founder-edu">{f.edu}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingCta({ lang }: { lang: Lang }) {
  const t = dict[lang].cta;
  return (
    <section className="cta tex tex-glossy">
      <div className="wrap cta-inner">
        <Mark size={44} color="#fff" />
        <Title a={t.h2a} b={t.h2b} />
        <p className="lead">{t.sub}</p>
        <DmButton label={t.button} />
      </div>
    </section>
  );
}

export function PageHero({ kicker, a, b, sub, tex = "motion" }: { kicker: string; a: string; b: string; sub: string; tex?: string }) {
  return (
    <section className={`page-hero tex tex-${tex}`}>
      <div className="wrap">
        <Kicker>{kicker}</Kicker>
        <Title as="h1" a={a} b={b} className="page-title" />
        <p className="lead">{sub}</p>
      </div>
    </section>
  );
}
