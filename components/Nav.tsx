"use client";

import { useState } from "react";
import { WA_URL } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="logo" href="#top" aria-label="LegalEase, ke halaman utama">
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
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <a href="#layanan">Layanan</a>
          <a href="#semua-layanan">Semua layanan</a>
          <a href="#cara-kerja">Cara kerja</a>
          <a href="#faq">FAQ</a>
          <a className="btn btn-line" href={WA_URL} target="_blank" rel="noopener">
            Hubungi
          </a>
          <a className="btn btn-blue" href="#kontak">
            Konsultasi gratis
          </a>
        </nav>
      </div>
    </header>
  );
}
