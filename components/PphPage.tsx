import { WA_NUMBER } from "@/lib/content";
import { getDict } from "@/lib/dict";
import type { PphTab } from "@/lib/dict/types";
import { href, type Lang } from "@/lib/i18n";
import { PPH23_OPTIONS, PPH42_OPTIONS, PTKP_MAX_DEPENDENTS, UMKM_TAXPAYER_TYPES } from "@/lib/tax";
import { PageScript } from "@/components/PageScript";
import { Rich } from "@/components/Rich";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const TABS: PphTab[] = ["p21", "umkm", "p23", "p42", "ppn"];
const pct = (rate: number) => `${+(rate * 100).toFixed(2)}%`.replace(".", ",");

function Money({ id, label, hint }: { id: string; label: string; hint?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type="text" inputMode="numeric" autoComplete="off" placeholder="0" data-money="" />
      {hint && <small className="pph-hint">{hint}</small>}
    </div>
  );
}

function Rows({ rows }: { rows: [string, string, boolean?][] }) {
  return (
    <dl className="pph-rows">
      {rows.map(([key, label, strong]) => (
        <div key={key} className={strong ? "pph-strong" : undefined}>
          <dt>{label}</dt>
          <dd data-out={key}>–</dd>
        </div>
      ))}
    </dl>
  );
}

// The tax calculator page. Labels are rendered here; public/js/pph.js runs lib/tax.ts (as js/tax.js)
// and fills in the numbers, so it works the same in the plain-HTML copy of the site.
export function PphPage({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const t = d.pph;
  const o = t.out;
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waText)}`;
  const rateFmt = (r: number) => (lang === "id" ? pct(r) : pct(r).replace(",", "."));

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

      <section className="band">
        <div className="wrap">
          <div className="pph" id="pph">
            <div className="faq-tabs pph-tabs" role="tablist" aria-label={t.tabsLabel}>
              {TABS.map((k, i) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  className="faq-tab"
                  id={`ptab-${k}`}
                  aria-controls={`ppanel-${k}`}
                  aria-selected={i === 0}
                  tabIndex={i === 0 ? 0 : -1}
                >
                  {t.tabs[k]}
                </button>
              ))}
            </div>

            <div className="pph-panel" role="tabpanel" id="ppanel-p21" aria-labelledby="ptab-p21" data-calc="p21">
              <p className="pph-intro">{t.intro.p21}</p>
              <div className="pph-grid">
                <form className="pph-form">
                  <Money id="p21-gross" label={t.f.gross} hint={t.f.grossHint} />
                  <Money id="p21-ded" label={t.f.deductions} hint={t.f.deductionsHint} />
                  <div className="pph-pair">
                    <div className="field">
                      <label htmlFor="p21-married">{t.f.status}</label>
                      <select id="p21-married" name="p21-married">
                        <option value="0">{t.f.single}</option>
                        <option value="1">{t.f.married}</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="p21-dep">{t.f.dependents}</label>
                      <select id="p21-dep" name="p21-dep">
                        {Array.from({ length: PTKP_MAX_DEPENDENTS + 1 }, (_, n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
                <div className="pph-result">
                  <h3>{o.annual}</h3>
                  <Rows
                    rows={[
                      ["status", o.status],
                      ["grossAnnual", o.grossAnnual],
                      ["jobCost", o.jobCost],
                      ["otherDeductions", o.otherDeductions],
                      ["ptkp", o.ptkp],
                      ["pkp", o.pkp],
                      ["topBracketRate", o.topBracket],
                      ["effectiveRate", o.effectiveRate],
                      ["taxMonthly", o.taxMonthly],
                      ["taxAnnual", o.taxAnnual, true],
                    ]}
                  />
                  <h3>{o.ter}</h3>
                  <Rows
                    rows={[
                      ["ter.category", o.category],
                      ["ter.rate", o.terRate],
                      ["ter.taxMonthly", o.terMonthly, true],
                    ]}
                  />
                </div>
              </div>
              <p className="pph-note">{t.notes.p21}</p>
            </div>

            <div className="pph-panel" role="tabpanel" id="ppanel-umkm" aria-labelledby="ptab-umkm" data-calc="umkm" hidden>
              <p className="pph-intro">{t.intro.umkm}</p>
              <div className="pph-grid">
                <form className="pph-form">
                  <div className="field">
                    <label htmlFor="umkm-type">{t.f.taxpayer}</label>
                    <select id="umkm-type" name="umkm-type">
                      {UMKM_TAXPAYER_TYPES.map((x) => (
                        <option key={x.key} value={x.key}>
                          {t.umkmTypes[x.key]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Money id="umkm-turnover" label={t.f.turnover} hint={t.f.turnoverHint} />
                  <Money id="umkm-before" label={t.f.before} hint={t.f.beforeHint} />
                </form>
                <div className="pph-result">
                  <Rows
                    rows={[
                      ["rate", o.rate],
                      ["exemptPortion", o.exempt],
                      ["taxableTurnover", o.taxable],
                      ["tax", o.tax, true],
                    ]}
                  />
                  <p className="pph-warn" data-show="limit" hidden>
                    {t.notes.umkmLimit}
                  </p>
                  <p className="pph-warn" data-show="legacy" hidden>
                    {t.notes.umkmLegacy}
                  </p>
                </div>
              </div>
              <p className="pph-note">{t.notes.umkm}</p>
            </div>

            <div className="pph-panel" role="tabpanel" id="ppanel-p23" aria-labelledby="ptab-p23" data-calc="p23" hidden>
              <p className="pph-intro">{t.intro.p23}</p>
              <div className="pph-grid">
                <form className="pph-form">
                  <div className="field">
                    <label htmlFor="p23-kind">{t.f.kind}</label>
                    <select id="p23-kind" name="p23-kind">
                      {PPH23_OPTIONS.map((x) => (
                        <option key={x.key} value={x.key}>
                          {t.p23Kinds[x.key]} ({rateFmt(x.rate)})
                        </option>
                      ))}
                    </select>
                  </div>
                  <Money id="p23-amount" label={t.f.amount} />
                  <label className="pph-check">
                    <input type="checkbox" id="p23-npwp" name="p23-npwp" defaultChecked />
                    {t.f.npwp}
                  </label>
                </form>
                <div className="pph-result">
                  <Rows
                    rows={[
                      ["rate", o.rate],
                      ["tax", o.tax, true],
                      ["net", o.net],
                    ]}
                  />
                </div>
              </div>
              <p className="pph-note">{t.notes.p23}</p>
            </div>

            <div className="pph-panel" role="tabpanel" id="ppanel-p42" aria-labelledby="ptab-p42" data-calc="p42" hidden>
              <p className="pph-intro">{t.intro.p42}</p>
              <div className="pph-grid">
                <form className="pph-form">
                  <div className="field">
                    <label htmlFor="p42-kind">{t.f.kind}</label>
                    <select id="p42-kind" name="p42-kind">
                      {PPH42_OPTIONS.map((x) => (
                        <option key={x.key} value={x.key}>
                          {t.p42Kinds[x.key]} ({rateFmt(x.rate)})
                        </option>
                      ))}
                    </select>
                  </div>
                  <Money id="p42-amount" label={t.f.amount} />
                </form>
                <div className="pph-result">
                  <Rows
                    rows={[
                      ["rate", o.rate],
                      ["tax", o.tax, true],
                      ["net", o.net],
                    ]}
                  />
                </div>
              </div>
              <p className="pph-note">{t.notes.p42}</p>
            </div>

            <div className="pph-panel" role="tabpanel" id="ppanel-ppn" aria-labelledby="ptab-ppn" data-calc="ppn" hidden>
              <p className="pph-intro">{t.intro.ppn}</p>
              <div className="pph-grid">
                <form className="pph-form">
                  <Money id="ppn-amount" label={t.f.price} />
                  <div className="field">
                    <label htmlFor="ppn-mode">{t.f.mode}</label>
                    <select id="ppn-mode" name="ppn-mode">
                      <option value="excl">{t.f.excl}</option>
                      <option value="incl">{t.f.incl}</option>
                    </select>
                  </div>
                  <label className="pph-check">
                    <input type="checkbox" id="ppn-lux" name="ppn-lux" />
                    {t.f.luxury}
                  </label>
                </form>
                <div className="pph-result">
                  <Rows
                    rows={[
                      ["price", o.price],
                      ["dpp", o.dpp],
                      ["effectiveRate", o.effectiveRate],
                      ["ppn", o.ppn, true],
                      ["total", o.total, true],
                    ]}
                  />
                </div>
              </div>
              <p className="pph-note">{t.notes.ppn}</p>
            </div>

            <p className="kbli-src">{t.asOf}</p>
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
      <PageScript src="/js/pph.js" />
    </main>
  );
}
