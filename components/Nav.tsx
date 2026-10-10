"use client";

import { useEffect, useRef, useState } from "react";
import { WA_URL } from "@/lib/content";
import type { Dict } from "@/lib/dict";
import { href, LANG_LABEL, LANG_NAME, LANGS, type Lang } from "@/lib/i18n";
import { ServiceIcon } from "./ServiceIcon";

type Props = { lang: Lang; path: string; t: Dict["nav"]; groups: Dict["serviceGroups"] };

// `path` is the current page without its language prefix, so the switcher can link to it in each language.
export function Nav({ lang, path, t, groups }: Props) {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const sub = useRef<HTMLDivElement>(null);

  // Close the services dropdown on Escape or a click outside it.
  useEffect(() => {
    if (!subOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!sub.current?.contains(e.target as Node)) setSubOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSubOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [subOpen]);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="logo" href={href(lang, "/")} aria-label={t.homeLabel}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/legalease-logo.png" alt="LegalEase" width={165} height={38} />
        </a>
        <button className="menu-btn" aria-expanded={open} aria-controls="navLinks" onClick={() => setOpen(!open)}>
          {t.menu}
        </button>
        <nav
          className={open ? "nav-links open" : "nav-links"}
          id="navLinks"
          aria-label={t.mainLabel}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) {
              setOpen(false);
              setSubOpen(false);
            }
          }}
        >
          <div className={subOpen ? "nav-sub open" : "nav-sub"} ref={sub}>
            <button className="nav-sub-btn" aria-expanded={subOpen} aria-controls="navSub" onClick={() => setSubOpen(!subOpen)}>
              {t.services}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="nav-sub-panel" id="navSub">
              {groups.map((g) => (
                <div key={g.title}>
                  <p className="nav-sub-title">{g.title}</p>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.name}>
                        <a href={href(lang, `/layanan/${it.slug}`)}>
                          <ServiceIcon name={it.icon} />
                          {it.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <a className="nav-sub-all" href={href(lang, "/#semua-layanan")}>
                {t.allServices}
              </a>
              <a className="nav-sub-all" href={href(lang, "/kbli")}>
                {t.kbli}
              </a>
            </div>
          </div>
          <a href={href(lang, "/#cara-kerja")}>{t.howItWorks}</a>
          <a href={href(lang, "/#faq")}>{t.faq}</a>
          <div className="lang-switch" role="group" aria-label={t.language}>
            {LANGS.map((l) => (
              <a key={l} href={href(l, path)} hrefLang={l} lang={l} title={LANG_NAME[l]} aria-current={l === lang ? "true" : undefined}>
                {LANG_LABEL[l]}
              </a>
            ))}
          </div>
          <a className="btn btn-line" href={WA_URL} target="_blank" rel="noopener">
            {t.contact}
          </a>
          <a className="btn btn-blue" href={href(lang, "/#kontak")}>
            {t.consult}
          </a>
        </nav>
      </div>
    </header>
  );
}
