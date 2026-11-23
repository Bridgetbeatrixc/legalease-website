import Link from "next/link";
import { DM_URL, IG_URL, IG_HANDLE, base, dict, type Lang } from "@/lib/content";

export function Mark({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M22 32 V84 H50 A34 34 0 0 0 50 16 H38" fill="none" stroke={color} strokeWidth="11" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <Mark size={20} />
      <span>DesignEase</span>
    </span>
  );
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export function DmButton({ label, variant = "solid" }: { label: string; variant?: "solid" | "ghost" }) {
  return (
    <a className={`pill pill-${variant}`} href={DM_URL} target="_blank" rel="noopener">
      <span>{label}</span>
      <Arrow />
    </a>
  );
}

/** Two-line editorial headline: white first line, blue second line. */
export function Title({ a, b, as = "h2", className = "" }: { a: string; b: string; as?: "h1" | "h2"; className?: string }) {
  const Tag = as;
  return (
    <Tag className={`title ${className}`}>
      {a}
      <br />
      <span className="accent">{b}</span>
    </Tag>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker">{children}</p>;
}

export function Header({ lang, path }: { lang: Lang; path: string }) {
  const t = dict[lang];
  const b = base(lang);
  const other = lang === "en" ? `/id${path}` : path;
  const links = [
    { href: `${b}/work/`, label: t.nav.work },
    { href: `${b}/services/`, label: t.nav.services },
    { href: `${b}/about/`, label: t.nav.about },
    { href: `${b}/contact/`, label: t.nav.contact },
  ];
  return (
    <header className="header">
      <div className="wrap header-row">
        <Link href={`${b}/`} className="header-logo" aria-label="DesignEase home">
          <Logo />
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={path === l.href.replace(b, "") ? "on" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-end">
          <Link className="lang" href={other} hrefLang={lang === "en" ? "id" : "en"}>
            {lang === "en" ? "ID" : "EN"}
          </Link>
          <a className="pill pill-small" href={DM_URL} target="_blank" rel="noopener">
            {t.nav.dm}
          </a>
          <details className="menu">
            <summary aria-label="Menu">
              <span />
              <span />
            </summary>
            <div className="menu-panel">
              {links.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              <Link href={other}>{t.langSwitch.label}</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const b = base(lang);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Logo />
            <p className="footer-tag">{t.footer.tagline}</p>
          </div>
          <nav className="footer-nav">
            <Link href={`${b}/work/`}>{t.nav.work}</Link>
            <Link href={`${b}/services/`}>{t.nav.services}</Link>
            <Link href={`${b}/about/`}>{t.nav.about}</Link>
            <Link href={`${b}/contact/`}>{t.nav.contact}</Link>
            <a href={IG_URL} target="_blank" rel="noopener">
              Instagram
            </a>
          </nav>
        </div>
        <div className="footer-giant" aria-hidden="true">
          DesignEase
        </div>
        <div className="footer-bottom">
          <span>{t.footer.company}</span>
          <span>{t.footer.cities}</span>
          <a href={IG_URL} target="_blank" rel="noopener">
            @{IG_HANDLE}
          </a>
        </div>
      </div>
    </footer>
  );
}
