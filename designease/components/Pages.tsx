import { DM_URL, dict, type Lang } from "@/lib/content";
import { AboutGiant, BentoPricing, BigStatement, FannedServices, HeroV3, Marquee, Offer, ProcessPath, ResultCards } from "./Editorial";
import { Footer, Header, Kicker, Arrow } from "./Site";
import {
  AllWork,
  ClosingCta,
  Hero,
  PageHero,
  Places,
  Pricing,
  Process,
  SelectedWork,
  Statement,
  Services,
  Team,
  WhyBranding,
  WorkRail,
} from "./Sections";

function Shell({ lang, path, children }: { lang: Lang; path: string; children: React.ReactNode }) {
  return (
    <>
      <Header lang={lang} path={path} />
      <main>{children}</main>
      <Footer lang={lang} />
    </>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <Shell lang={lang} path="/">
      <HeroV3 lang={lang} />
      <Marquee lang={lang} />
      <BigStatement lang={lang} />
      <FannedServices lang={lang} />
      <AboutGiant lang={lang} />
      <ProcessPath lang={lang} />
      <ResultCards lang={lang} />
      <BentoPricing lang={lang} />
      <Offer lang={lang} />
      <ClosingCta lang={lang} />
    </Shell>
  );
}

export function WorkPage({ lang }: { lang: Lang }) {
  const t = dict[lang].pages.work;
  return (
    <Shell lang={lang} path="/work/">
      <PageHero kicker={t.kicker} a={t.h1a} b={t.h1b} sub={t.sub} tex="silk" />
      <AllWork lang={lang} />
      <ClosingCta lang={lang} />
    </Shell>
  );
}

export function ServicesPage({ lang }: { lang: Lang }) {
  const t = dict[lang].pages.services;
  return (
    <Shell lang={lang} path="/services/">
      <PageHero kicker={t.kicker} a={t.h1a} b={t.h1b} sub={t.sub} tex="motion" />
      <Services lang={lang} full />
      <Process lang={lang} />
      <Pricing lang={lang} />
      <ClosingCta lang={lang} />
    </Shell>
  );
}

export function AboutPage({ lang }: { lang: Lang }) {
  const t = dict[lang].pages.about;
  return (
    <Shell lang={lang} path="/about/">
      <PageHero kicker={t.kicker} a={t.h1a} b={t.h1b} sub={t.sub} tex="silkdark" />
      <section className="section">
        <div className="wrap story dropcap-story">
          {t.story.map((p, i) => (
            <p key={i} className={i === 0 ? "story-first" : ""}>
              {p}
            </p>
          ))}
        </div>
      </section>
      <Team lang={lang} />
      <WhyBranding lang={lang} />
      <Places lang={lang} />
      <section className="section">
        <div className="wrap legal">
          <Kicker>{t.legalKicker}</Kicker>
          <p className="lead">{t.legal}</p>
        </div>
      </section>
      <ClosingCta lang={lang} />
    </Shell>
  );
}

export function ContactPage({ lang }: { lang: Lang }) {
  const t = dict[lang].pages.contact;
  const c = dict[lang].cta;
  return (
    <Shell lang={lang} path="/contact/">
      <PageHero kicker={t.kicker} a={t.h1a} b={t.h1b} sub={t.sub} tex="glossy" />
      <section className="section">
        <div className="wrap contact">
          <div>
            <Kicker>{t.listTitle}</Kicker>
            <ol className="contact-list">
              {t.list.map((l, i) => (
                <li key={l}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {l}
                </li>
              ))}
            </ol>
          </div>
          <a className="dm-card" href={DM_URL} target="_blank" rel="noopener">
            <span className="kicker">Instagram</span>
            <strong>@designease_id</strong>
            <span className="pill pill-solid">
              <span>{c.button}</span>
              <Arrow />
            </span>
          </a>
        </div>
      </section>
      <Places lang={lang} />
    </Shell>
  );
}
