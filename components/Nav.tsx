"use client";

import { useEffect, useRef, useState } from "react";
import { serviceGroups, WA_URL } from "@/lib/content";
import { ServiceIcon } from "./ServiceIcon";

export function Nav() {
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
        <a className="logo" href="/" aria-label="LegalEase, ke halaman utama">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/legalease-logo.png" alt="LegalEase" width={165} height={38} />
        </a>
        <button className="menu-btn" aria-expanded={open} aria-controls="navLinks" onClick={() => setOpen(!open)}>
          Menu
        </button>
        <nav
          className={open ? "nav-links open" : "nav-links"}
          id="navLinks"
          aria-label="Utama"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) {
              setOpen(false);
              setSubOpen(false);
            }
          }}
        >
          <div className={subOpen ? "nav-sub open" : "nav-sub"} ref={sub}>
            <button className="nav-sub-btn" aria-expanded={subOpen} aria-controls="navSub" onClick={() => setSubOpen(!subOpen)}>
              Layanan
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="nav-sub-panel" id="navSub">
              {serviceGroups.map((g) => (
                <div key={g.title}>
                  <p className="nav-sub-title">{g.title}</p>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.name}>
                        <a href={`/layanan/${it.slug}`}>
                          <ServiceIcon name={it.icon} />
                          {it.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <a className="nav-sub-all" href="/#semua-layanan">
                Lihat semua layanan
              </a>
            </div>
          </div>
          <a href="/#cara-kerja">Cara kerja</a>
          <a href="/#faq">FAQ</a>
          <a className="btn btn-line" href={WA_URL} target="_blank" rel="noopener">
            Hubungi
          </a>
          <a className="btn btn-blue" href="/#kontak">
            Konsultasi gratis
          </a>
        </nav>
      </div>
    </header>
  );
}
