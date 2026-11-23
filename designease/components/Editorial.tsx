// Homepage sections, v3 layout (from Bridget's refs: staggered hero with a
// glossy object, category marquee, fanned service cards, giant "about us"
// word with floating photos, curvy process path, result cards, bento pricing,
// staggered offer). Colours, type and logo stay DesignEase.
import Link from "next/link";
import { DM_URL, base, dict, getFounders, projects, type Lang } from "@/lib/content";
import { Arrow } from "./Site";

function CircleArrow() {
  return (
    <span className="carrow" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

export function PillLink({ href, label, external = false, light = false }: { href: string; label: string; external?: boolean; light?: boolean }) {
  const cls = `cpill ${light ? "cpill-light" : ""}`;
  const inner = (
    <>
      <span className="cpill-label">{label}</span>
      <CircleArrow />
    </>
  );
  return external ? (
    <a className={cls} href={href} target="_blank" rel="noopener">
      {inner}
    </a>
  ) : (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}

/** The DesignEase D, filled with a real glossy photo texture, as the hero "object". */
function GlossyMark({ id = "g" }: { id?: string }) {
  return (
    <svg className="gmark" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <pattern id={`${id}-tex`} patternUnits="userSpaceOnUse" width="100" height="100">
          <image href="/img/tex/glossy.jpg" x="-20" y="-10" width="140" height="210" preserveAspectRatio="xMidYMid slice" />
        </pattern>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="0.45" stopColor="#7fa2ff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d="M22 32 V84 H50 A34 34 0 0 0 50 16 H38" fill="none" stroke={`url(#${id}-tex)`} strokeWidth="13" />
      <path d="M22 32 V84 H50 A34 34 0 0 0 50 16 H38" fill="none" stroke={`url(#${id}-edge)`} strokeWidth="13" opacity="0.55" style={{ mixBlendMode: "screen" }} />
    </svg>
  );
}

export function HeroV3({ lang }: { lang: Lang }) {
  const t = dict[lang].home;
  return (
    <section className="h3">
      <div className="h3-glow" aria-hidden="true" />
      <div className="wrap h3-inner">
        <div className="h3-object" aria-hidden="true">
          <GlossyMark id="hero" />
        </div>
        <h1 className="h3-title">
          {t.heroLines.map((l, i) => (
            <span key={l} className={`h3-line h3-l${i}`}>
              {i === 2 ? <em>{l}</em> : l}
            </span>
          ))}
        </h1>
        <div className="h3-foot">
          <p className="h3-small">{t.heroSmall}</p>
          <div className="h3-cta">
            <p>{t.heroSub}</p>
            <PillLink href={DM_URL} external label="DM @designease_id" light />
          </div>
        </div>
      </div>
      <div className="h3-horizon" aria-hidden="true" />
    </section>
  );
}

export function Marquee({ lang }: { lang: Lang }) {
  const items = dict[lang].home.marquee;
  const loop = [...items, ...items];
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        {loop.map((m, i) => (
          <span key={i}>
            {m}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export function BigStatement({ lang }: { lang: Lang }) {
  const t = dict[lang].home;
  return (
    <section className="bigst">
      <div className="wrap">
        <h2 className="bigst-title">
          {t.bigA}
          <br />
          <span>{t.bigB}</span>
        </h2>
        <p className="bigst-sub">{t.bigSub}</p>
        <div className="reel">
          <video src="/video/sjk-story.mp4" poster="/img/work/sjk-story.jpg" autoPlay muted loop playsInline />
          <div className="reel-side">
            <img src="/img/work/jp-slide1.jpg" alt="" loading="lazy" />
            <img src="/img/work/tg1.jpg" alt="" loading="lazy" />
          </div>
          <div className="reel-side reel-side-r">
            <img src="/img/work/kc1.jpg" alt="" loading="lazy" />
            <img src="/img/work/lm1.jpg" alt="" loading="lazy" />
          </div>
        </div>
        <div className="center">
          <PillLink href={`${base(lang)}/work/`} label={dict[lang].hero.secondary} />
        </div>
      </div>
    </section>
  );
}

export function FannedServices({ lang }: { lang: Lang }) {
  const t = dict[lang].home;
  const list = dict[lang].services.list;
  const looks = ["fan-blue", "fan-paper", "fan-grey"];
  return (
    <section className="fan-sec">
      <div className="wrap">
        <h2 className="sec-title center-text">
          {t.svcA}
          <br />
          <span className="dim">{t.svcB}</span>
        </h2>
        <div className="fan">
          {list.map((s, i) => (
            <article key={s.no} className={`fan-card ${looks[i]} ${i === list.length - 1 ? "fan-open" : ""}`} tabIndex={0}>
              <div className="fan-head">
                <span className="fan-no">{s.no}</span>
                <h3>{s.title}</h3>
              </div>
              <div className="fan-body">
                <p>{s.line}</p>
                <ul>
                  {s.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              {i === list.length - 1 && (
                <div className="fan-object" aria-hidden="true">
                  <GlossyMark id="fan" />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutGiant({ lang }: { lang: Lang }) {
  const t = dict[lang].home;
  const f = getFounders(lang);
  return (
    <section className="ag">
      <div className="wrap">
        <p className="crumb">
          {t.crumbA} / <em>{t.crumbB}</em>
        </p>
        <div className="ag-stage">
          <img className="ag-photo ag-p1" src={f[0].img} alt={f[0].name} loading="lazy" />
          <img className="ag-photo ag-p2" src="/img/work/sjk-story.jpg" alt="" loading="lazy" />
          <img className="ag-photo ag-p3" src={f[2].img} alt={f[2].name} loading="lazy" />
          <img className="ag-photo ag-p4" src="/img/work/pj-slide1.jpg" alt="" loading="lazy" />
          <img className="ag-photo ag-p5" src={f[1].img} alt={f[1].name} loading="lazy" />
          <h2 className="ag-word">{t.aboutWord}</h2>
        </div>
        <div className="ag-based">
          <span className="plus">+</span>
          <p>{t.based}</p>
          <i />
        </div>
        <p className="ag-big">{t.aboutBig}</p>
        <div className="ag-stagger">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
        </div>
        <div className="stats">
          {t.stats.map((s) => (
            <div key={s.l}>
              <strong>{s.n}</strong>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessPath({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const steps = t.process.steps;
  return (
    <section className="pp">
      <div className="wrap pp-wrap">
        <svg className="pp-line" viewBox="0 0 1000 1400" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M560 20 C 560 120, 540 200, 600 260 C 700 360, 820 260, 720 200 C 620 140, 520 300, 540 420 C 560 540, 300 520, 290 640 C 280 760, 460 760, 560 820 C 700 900, 780 980, 640 1060 C 520 1130, 360 1120, 400 1240 C 420 1300, 520 1330, 560 1390"
            fill="none"
            stroke="#7fa2ff"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <p className="pp-label">
          <i />
          <em>{t.home.processLabel}</em>
        </p>
        <h2 className="pp-title">
          {t.process.h2a} <em>{t.process.h2b}</em>
        </h2>
        {steps.map((s, i) => (
          <div key={s.title} className={`pp-step pp-s${i}`}>
            <span className="pp-no">0{i + 1}.</span>
            <h3>
              <i />
              {s.title}
            </h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ResultCards({ lang }: { lang: Lang }) {
  const t = dict[lang].home;
  const featured = projects.filter((p) => p.featured);
  return (
    <section className="rc-sec">
      <div className="rc-glow" aria-hidden="true" />
      <div className="wrap rc-grid">
        <h2 className="sec-title rc-title">
          {t.workA}
          <br />
          <em>{t.workB}</em>
        </h2>
        {featured.map((p, i) => (
          <Link key={p.slug} href={`${base(lang)}/work/#${p.slug}`} className={`rc rc-${i}`}>
            <div className="rc-top">
              <h3>{p.name}</h3>
              <span className="rc-tag">{p.tag[lang]}</span>
            </div>
            <div className="rc-img">
              <img src={p.cover} alt={p.name} loading="lazy" />
            </div>
            <div className="rc-foot">
              <strong>{p.big?.[lang] ?? ""}</strong>
              <span className={p.status === "progress" ? "rc-live" : ""}>{p.bigNote?.[lang]}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function BentoPricing({ lang }: { lang: Lang }) {
  const t = dict[lang].pricing;
  return (
    <section className="bento-sec" id="pricing">
      <div className="wrap">
        <div className="bento-head">
          <div>
            <h2 className="sec-title">
              {t.h2a}
              <br />
              <em>{t.h2b}</em>
            </h2>
            <p className="bento-intro">{t.intro}</p>
          </div>
          <PillLink href={DM_URL} external label={dict[lang].home.contactUs} light />
        </div>
        <div className="bento">
          {t.plans.map((p, i) => (
            <article key={p.name} className={`bento-card b${i}`}>
              <span className="bento-no">0{i + 1}</span>
              <div>
                <h3>{p.name}</h3>
                <p>{p.forWho}</p>
                <ul>
                  {p.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <span className="bento-price">{p.price ? `${t.from} ${p.price} ${p.unit}` : t.pending}</span>
              </div>
            </article>
          ))}
          <div className="bento-card b3" aria-hidden="true">
            <img src="/img/tex/silk.jpg" alt="" />
            <div className="bento-object">
              <GlossyMark id="bento" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Offer({ lang }: { lang: Lang }) {
  const t = dict[lang].home;
  return (
    <section className="offer">
      <div className="offer-object" aria-hidden="true">
        <GlossyMark id="offer" />
      </div>
      <div className="wrap offer-inner">
        <h2 className="offer-title">
          {t.offerLines.map((l, i) => (
            <span key={l} className={`ol ol${i}`}>
              {i === 2 ? <em>{l}</em> : l}
            </span>
          ))}
        </h2>
        <div className="offer-body">
          <p>{t.offerSub}</p>
          <span className="offer-tc">{dict[lang].pricing.terms}</span>
          <PillLink href={DM_URL} external label={t.offerCta} light />
        </div>
      </div>
    </section>
  );
}

export { Arrow };
