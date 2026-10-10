"use client";

import { useRef, useState } from "react";
import { WA_NUMBER } from "@/lib/content";
import type { Dict } from "@/lib/dict";
import { fill } from "@/lib/i18n";
import { useSiteState } from "./SiteState";

// Builds a prefilled WhatsApp message; nothing is sent until the visitor taps the link.
export function LeadForm({ t, groups }: { t: Dict["form"]; groups: Dict["serviceGroups"] }) {
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
      setResult({ error: t.missing });
      (n ? waRef : nameRef).current?.focus();
      return;
    }
    const text = fill(t.template, { name: n, wa: w, service: leadService }) + (msg.trim() ? `\n\n${msg.trim()}` : "");
    setResult({ href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}` });
  }

  return (
    // The data- attributes let the plain-HTML version build the same message.
    <form id="leadForm" noValidate onSubmit={onSubmit} data-missing={t.missing} data-open={t.open} data-template={t.template}>
      <div className="field">
        <label htmlFor="f-name">{t.name}</label>
        <input ref={nameRef} id="f-name" name="name" autoComplete="name" placeholder={t.namePh} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="f-wa">{t.wa}</label>
        <input ref={waRef} id="f-wa" name="wa" inputMode="tel" autoComplete="tel" placeholder={t.waPh} value={wa} onChange={(e) => setWa(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="f-svc">{t.service}</label>
        <select id="f-svc" name="svc" value={leadService} onChange={(e) => setLeadService(e.target.value)}>
          {groups.map((g) => (
            <optgroup key={g.title} label={g.title}>
              {g.items.map((it) => (
                <option key={it.name}>{it.name}</option>
              ))}
            </optgroup>
          ))}
          <option>{t.unsure}</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-msg">{t.msg}</label>
        <textarea
          id="f-msg"
          name="msg"
          placeholder={t.msgPh}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <button className="btn btn-blue" type="submit">
        {t.submit}
      </button>
      <p className="form-result" id="formResult" role="status" hidden={!result}>
        {result?.error}
        {result?.href && (
          <a href={result.href} target="_blank" rel="noopener">
            {t.open}
          </a>
        )}
      </p>
    </form>
  );
}
