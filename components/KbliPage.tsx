import { WA_NUMBER } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, type Lang } from "@/lib/i18n";
import { Rich } from "@/components/Rich";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

// The KBLI lookup page. The search itself runs in public/js/kbli.js, so it works the same in the
// plain-HTML copy of the site; the labels it needs are passed as data- attributes.
export function KbliPage({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const t = d.kbli;
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waText)}`;

  return (
    <main className="sp">
      <section className="sp-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label={d.sp.crumbs}>
            <a href={href(lang, "/")}>{d.sp.home}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t.title}</span>
          </nav>
          <div className="sp-hero-card kbli-hero">
            <div>
              <span className="eyebrow">{t.title}</span>
              <h1>
                <Rich text={t.h1} />
              </h1>
              <p className="lede">{t.lede}</p>
              <p className="kbli-disclaimer">{t.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="kbliSearchTitle">
        <div className="wrap">
          <div
            className="kbli"
            id="kbli"
            data-count={t.count}
            data-none={t.none}
            data-loading={t.loading}
          >
            <div className="kbli-top">
              <h2 id="kbliSearchTitle">{t.searchTitle}</h2>
              <div className="kbli-version" role="group" aria-label={t.version}>
                <button type="button" data-version="2025" aria-pressed="true">
                  KBLI 2025
                </button>
                <button type="button" data-version="2020" aria-pressed="false">
                  KBLI 2020
                </button>
              </div>
            </div>
            <p className="kbli-note" data-for="2025">{t.v2025}</p>
            <p className="kbli-note" data-for="2020" hidden>
              {t.v2020}
            </p>
            <div className="kbli-controls">
              <div className="field">
                <label htmlFor="kbliQuery">{t.searchLabel}</label>
                <input id="kbliQuery" type="search" placeholder={t.searchPh} autoComplete="off" />
              </div>
              <div className="field">
                <label htmlFor="kbliSection">{t.section}</label>
                <select id="kbliSection">
                  <option value="">{t.allSections}</option>
                </select>
              </div>
            </div>
            <p className="kbli-count" id="kbliCount" role="status">
              {t.loading}
            </p>
            <div className="kbli-head" aria-hidden="true">
              <span>{t.code}</span>
              <span>{t.titleCol}</span>
              <span>{t.section}</span>
            </div>
            <ol className="kbli-list" id="kbliList"></ol>
            <button type="button" className="btn btn-line kbli-more" id="kbliMore" hidden>
              {t.more}
            </button>
            <p className="kbli-src" data-for="2025">
              {t.src2025} <a href="/data/kbli-2025/SUMBER.txt">{t.licence}</a>
            </p>
            <p className="kbli-src" data-for="2020" hidden>
              {t.src2020}
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap sp-lists kbli-info">
          <div>
            <h2>{t.whatTitle}</h2>
            {t.whatText.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div>
            <h2>{t.useTitle}</h2>
            <ul className="sp-check">
              {t.uses.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t.tipsTitle}</h2>
            <ul className="sp-docs">
              {t.tips.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sp-cta">
            <div>
              <h2>{t.helpTitle}</h2>
              <p>{t.helpText}</p>
            </div>
            <a className="btn btn-white" href={waHref} target="_blank" rel="noopener">
              <WhatsAppIcon />
              {t.helpBtn}
            </a>
          </div>
        </div>
      </section>
      <script src="/js/kbli.js" async />
    </main>
  );
}

