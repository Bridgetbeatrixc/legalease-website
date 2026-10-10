"use client";

import { useRef, useState } from "react";
import { services, WA_NUMBER } from "@/lib/content";
import { useSiteState } from "./SiteState";

// Builds a prefilled WhatsApp message; nothing is sent until the visitor taps the link.
export function LeadForm() {
  const { leadService, setLeadService } = useSiteState();
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState<{ error?: string; href?: string } | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const waRef = useRef<HTMLInputElement>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const w = wa.trim();
    if (!n || !w) {
      setResult({ error: "Isi nama dan nomor WhatsApp dulu, supaya tim kami bisa membalas." });
      (n ? waRef : nameRef).current?.focus();
      return;
    }
    const text = `Halo LegalEase, saya ${n} (${w}).\nLayanan: ${leadService}` + (msg.trim() ? `\n\n${msg.trim()}` : "");
    setResult({ href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}` });
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="f-name">Nama lengkap</label>
        <input ref={nameRef} id="f-name" autoComplete="name" placeholder="Contoh: Rina Kartika" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="f-wa">Nomor WhatsApp</label>
        <input ref={waRef} id="f-wa" inputMode="tel" autoComplete="tel" placeholder="08xx xxxx xxxx" value={wa} onChange={(e) => setWa(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="f-svc">Layanan yang dibutuhkan</label>
        <select id="f-svc" value={leadService} onChange={(e) => setLeadService(e.target.value)}>
          {services.map((s) => (
            <option key={s.key}>{s.name}</option>
          ))}
          <option>Belum tahu, ingin konsultasi</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-msg">Ceritakan usahamu</label>
        <textarea
          id="f-msg"
          placeholder="Contoh: Saya ingin mendirikan PT untuk usaha kopi dengan 2 pendiri di Jakarta Selatan."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <button className="btn btn-blue" type="submit">
        Kirim via WhatsApp
      </button>
      <p className="form-result" role="status" hidden={!result}>
        {result?.error}
        {result?.href && (
          <a href={result.href} target="_blank" rel="noopener">
            Buka WhatsApp untuk mengirim pesan
          </a>
        )}
      </p>
    </form>
  );
}
